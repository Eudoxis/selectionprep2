// ============================================
// STRIPE CHECKOUT INTEGRATION
// ============================================

// Initialize Stripe
const stripe = Stripe(CONFIG.stripe.publishableKey);

// Create card element
const elements = stripe.elements();
const cardElement = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#1f2937',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            '::placeholder': {
                color: '#9ca3af'
            }
        },
        invalid: {
            color: '#ef4444',
            iconColor: '#ef4444'
        }
    }
});

cardElement.mount('#card-element');

// Handle card errors
cardElement.on('change', (event) => {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Get selected plan from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const selectedPlan = urlParams.get('plan') || 'pro';

// Load plan details
function loadPlanDetails() {
    const plan = CONFIG.pricing[selectedPlan];

    if (!plan) {
        showError('Invalid plan selected');
        return;
    }

    document.getElementById('plan-name').textContent = `${plan.name} Plan`;
    document.getElementById('plan-price').textContent = `${plan.currency}${plan.price}`;
    document.getElementById('total-price').textContent = `${plan.currency}${plan.price}`;

    // Load features
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = '';

    plan.features.forEach(feature => {
        if (feature.included) {
            const li = document.createElement('li');
            li.textContent = feature.text;
            featuresList.appendChild(li);
        }
    });
}

// Form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable submit button and show spinner
    const submitButton = document.getElementById('submit-button');
    const buttonText = document.getElementById('button-text');
    const spinner = document.getElementById('spinner');

    submitButton.disabled = true;
    buttonText.style.display = 'none';
    spinner.style.display = 'block';

    // Get form data
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    try {
        // OPTION 1: Using Stripe Checkout (Recommended for production)
        // This redirects to Stripe's hosted checkout page
        await handleStripeCheckout(email, firstName, lastName);

        // OPTION 2: Using Stripe Payment Intents (For custom checkout)
        // Uncomment this line if you want to use custom checkout flow
        // await handlePaymentIntent(email, firstName, lastName);

    } catch (error) {
        console.error('Payment error:', error);
        showError(error.message || 'An error occurred during payment');

        // Re-enable submit button
        submitButton.disabled = false;
        buttonText.style.display = 'block';
        spinner.style.display = 'none';
    }
});

// OPTION 1: Stripe Checkout (Hosted)
async function handleStripeCheckout(email, firstName, lastName) {
    const plan = CONFIG.pricing[selectedPlan];
    const priceId = CONFIG.stripe.prices[selectedPlan];

    // Create checkout session on your backend
    // THIS REQUIRES A BACKEND SERVER
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            priceId: priceId,
            email: email,
            customerName: `${firstName} ${lastName}`,
            plan: selectedPlan
        })
    });

    const session = await response.json();

    if (session.error) {
        throw new Error(session.error);
    }

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId
    });

    if (result.error) {
        throw new Error(result.error.message);
    }
}

// OPTION 2: Payment Intent (Custom checkout flow)
async function handlePaymentIntent(email, firstName, lastName) {
    // Create payment intent on your backend
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plan: selectedPlan,
            email: email,
            customerName: `${firstName} ${lastName}`
        })
    });

    const { clientSecret, error } = await response.json();

    if (error) {
        throw new Error(error);
    }

    // Confirm the payment
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: `${firstName} ${lastName}`,
                    email: email
                }
            }
        }
    );

    if (stripeError) {
        throw new Error(stripeError.message);
    }

    if (paymentIntent.status === 'succeeded') {
        // Payment successful
        showSuccess('Payment successful! Redirecting...');
        setTimeout(() => {
            window.location.href = 'success.html?plan=' + selectedPlan;
        }, 2000);
    }
}

// DEMO MODE: For testing without backend
// Remove this in production
if (CONFIG.stripe.publishableKey === "pk_test_YOUR_PUBLISHABLE_KEY_HERE") {
    console.warn('⚠️ DEMO MODE: Stripe is not configured. Using demo flow.');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitButton = document.getElementById('submit-button');
        const buttonText = document.getElementById('button-text');
        const spinner = document.getElementById('spinner');

        submitButton.disabled = true;
        buttonText.style.display = 'none';
        spinner.style.display = 'block';

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Redirect to success page
        window.location.href = 'success.html?plan=' + selectedPlan;
    });
}

// Error handling
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// Success handling
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    successDiv.textContent = message;
    successDiv.style.display = 'block';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPlanDetails();

    // Pre-fill email from URL if provided
    const urlEmail = urlParams.get('email');
    if (urlEmail) {
        document.getElementById('email').value = urlEmail;
    }
});

// ============================================
// BACKEND IMPLEMENTATION GUIDE
// ============================================
/*
You need to create these backend endpoints:

1. POST /create-checkout-session
   - Creates a Stripe Checkout Session
   - Returns sessionId

Example Node.js/Express implementation:

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email, customerName, plan } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: 'payment',
            success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.DOMAIN}/checkout.html?plan=${plan}`,
            metadata: {
                customerName: customerName,
                plan: plan
            }
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

2. POST /create-payment-intent
   - Creates a Payment Intent
   - Returns clientSecret

app.post('/create-payment-intent', async (req, res) => {
    const { plan, email, customerName } = req.body;
    const amount = CONFIG.pricing[plan].price * 100; // Stripe uses cents

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            receipt_email: email,
            metadata: {
                customerName: customerName,
                plan: plan
            }
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

3. Webhook endpoint for Stripe events:

app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Grant course access to customer
            await grantCourseAccess(session);
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            // Grant course access to customer
            await grantCourseAccess(paymentIntent);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

async function grantCourseAccess(paymentData) {
    // 1. Create user account
    // 2. Send welcome email
    // 3. Grant access to course content
    // 4. Add to mailing list
    // 5. Send Slack notification (optional)
}
*/
