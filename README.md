# Course Sales Platform - Production Ready

A complete, production-ready course sales platform with Stripe integration, built with HTML, CSS, and JavaScript. Perfect for selling online courses with a professional landing page, checkout system, and course content delivery.

## 🚀 Features

### Landing Page (`index.html`)
- Hero section with compelling call-to-action
- Benefits/features showcase
- Expandable curriculum modules
- Student testimonials
- 3-tier pricing options
- FAQ accordion
- Responsive mobile design

### Course Content Page (`course.html`)
- Sidebar navigation with modules and lessons
- Video player interface
- Tabbed content (Overview, Transcript, Notes, Resources, Discussion)
- Progress tracking
- Interactive features (search, comments, notes)
- Keyboard shortcuts

### Checkout System (`checkout.html`)
- Secure Stripe integration
- Real-time form validation
- Multiple payment methods
- Order summary
- Legal compliance (Terms & Privacy links)

### Configuration (`config.js`)
- Centralized content management
- Easy customization of all text and settings
- Stripe configuration
- Analytics integration
- Feature flags

## 📁 File Structure

```
├── index.html              # Landing/Sales page
├── course.html             # Course content page
├── checkout.html           # Payment checkout page
├── success.html            # Payment success page
├── terms.html              # Terms of Service
├── privacy.html            # Privacy Policy
├── config.js               # Configuration file (CUSTOMIZE THIS)
├── styles.css              # Main stylesheet
├── course-styles.css       # Course page styles
├── script.js               # Landing page JavaScript
├── course-script.js        # Course page JavaScript
├── checkout.js             # Stripe integration
└── README.md               # This file
```

## 🛠️ Setup Instructions

### 1. Customize Configuration

Edit `config.js` and update these critical values:

```javascript
// Site Information
site: {
    name: "YourCourse",  // Your course name
    email: "support@yourdomain.com",  // Your email
    url: "https://yourdomain.com"  // Your domain
},

// Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
stripe: {
    publishableKey: "pk_live_YOUR_KEY_HERE",  // Replace with live key
    prices: {
        basic: "price_YOUR_BASIC_PRICE_ID",
        pro: "price_YOUR_PRO_PRICE_ID",
        enterprise: "price_YOUR_ENTERPRISE_PRICE_ID"
    }
}
```

### 2. Set Up Stripe

1. **Create a Stripe Account**
   - Go to https://stripe.com
   - Sign up for an account
   - Complete verification

2. **Create Products in Stripe Dashboard**
   - Go to Products → Add Product
   - Create three products: Basic, Pro, Enterprise
   - Set prices for each
   - Copy the Price IDs to `config.js`

3. **Get API Keys**
   - Go to Developers → API Keys
   - Copy your Publishable Key to `config.js`
   - Save your Secret Key (needed for backend)

4. **Test Mode**
   - Use test keys (pk_test_...) for testing
   - Switch to live keys for production

### 3. Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages
   - Select branch (main or your feature branch)
   - Click Save

3. **Access Your Site**
   ```
   https://yourusername.github.io/repository-name/
   ```

### 4. Set Up Backend (Required for Payments)

The checkout requires a backend server to process payments. Here's a quick setup:

#### Option A: Node.js/Express Backend

1. Create `server.js`:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/create-checkout-session', async (req, res) => {
    const { priceId, email } = req.body;

    const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${process.env.DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.DOMAIN}/checkout.html`,
    });

    res.json({ sessionId: session.id });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

2. Install dependencies:
```bash
npm install express stripe dotenv
```

3. Create `.env` file:
```
STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY
DOMAIN=https://yourdomain.com
```

4. Deploy to:
   - Heroku
   - Vercel
   - Netlify Functions
   - AWS Lambda

#### Option B: Netlify Functions (Serverless)

1. Create `netlify/functions/create-checkout-session.js`:

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
    const { priceId, email } = JSON.parse(event.body);

    const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        success_url: `${process.env.URL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.URL}/checkout.html`,
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id })
    };
};
```

2. Update `checkout.js` endpoint:
```javascript
const response = await fetch('/.netlify/functions/create-checkout-session', {
    // ...
});
```

### 5. Set Up Webhooks (Important!)

Webhooks notify you when payments succeed:

1. **In Stripe Dashboard**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/webhook`
   - Select events: `checkout.session.completed`

2. **Handle Webhook in Backend**
```javascript
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

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Grant course access
        // Send welcome email
        // Add to database
    }

    res.json({received: true});
});
```

## 🎨 Customization Guide

### Change Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1;  /* Main brand color */
    --secondary-color: #10b981;  /* Success/accent color */
    --text-dark: #1f2937;  /* Main text color */
}
```

### Update Content

All content can be updated in `config.js`:

- **Pricing**: `CONFIG.pricing`
- **Benefits**: `CONFIG.benefits`
- **Testimonials**: `CONFIG.testimonials`
- **FAQs**: `CONFIG.faqs`
- **Course Modules**: `CONFIG.modules`

### Add Images

1. Create an `images` folder
2. Update placeholders:
   - Replace emoji icons with images
   - Update hero section placeholder
   - Add instructor photos

### Add Analytics

In `config.js`:

```javascript
analytics: {
    googleAnalytics: "G-XXXXXXXXXX",
    facebookPixel: "XXXXXXXXXX",
    hotjar: "XXXXXXX"
}
```

Then add tracking scripts to HTML `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📧 Email Integration

After successful purchase, you'll want to:

1. Send welcome email
2. Provide login credentials
3. Grant course access

### Using SendGrid

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendWelcomeEmail(email, name) {
    await sgMail.send({
        to: email,
        from: 'support@yourdomain.com',
        subject: 'Welcome to the Course!',
        html: '<strong>Welcome!</strong> Your access details...'
    });
}
```

### Using Mailchimp

Add customers to your mailing list automatically.

## 🔐 Security Checklist

- [ ] Never commit API keys to Git
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS (GitHub Pages does this automatically)
- [ ] Validate all form inputs
- [ ] Use Stripe's test mode before going live
- [ ] Set up webhook signature verification
- [ ] Add rate limiting to API endpoints
- [ ] Implement CORS properly
- [ ] Keep dependencies updated

## 📱 Mobile Optimization

The site is fully responsive, but test on:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Various screen sizes

## 🚦 Go-Live Checklist

### Before Launch

- [ ] Replace all placeholder content
- [ ] Add real testimonials and reviews
- [ ] Test checkout with Stripe test cards
- [ ] Set up email notifications
- [ ] Create terms and privacy policies (consult lawyer)
- [ ] Configure domain name
- [ ] Set up SSL certificate
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Set up analytics
- [ ] Create social media profiles
- [ ] Prepare marketing materials

### Stripe Test Cards

Use these for testing:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0027 6000 3184`

### Launch Day

- [ ] Switch to Stripe live keys
- [ ] Update config.js with live values
- [ ] Enable webhook in production
- [ ] Monitor error logs
- [ ] Test complete purchase flow
- [ ] Verify email delivery
- [ ] Check analytics tracking

## 🆘 Troubleshooting

### Payments Not Working

1. Check Stripe keys in `config.js`
2. Verify backend endpoint is running
3. Check browser console for errors
4. Ensure webhook is configured
5. Test with Stripe test cards

### Course Page Not Loading

1. Check browser console for JavaScript errors
2. Verify all files are uploaded
3. Clear browser cache
4. Check file paths are correct

### Mobile Issues

1. Test viewport meta tag is present
2. Check CSS media queries
3. Test on real devices, not just emulators

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [GitHub Pages Guide](https://pages.github.com/)
- [Web Accessibility](https://www.w3.org/WAI/)
- [GDPR Compliance](https://gdpr.eu/)

## 💡 Next Steps

1. **Add User Authentication**
   - Use Firebase Auth or Auth0
   - Protect course content behind login

2. **Database Integration**
   - Store user progress
   - Track completions
   - Generate analytics

3. **Video Hosting**
   - Upload to Vimeo/Wistia
   - Add video player URLs
   - Enable DRM protection

4. **Community Features**
   - Add discussion forums
   - Enable student profiles
   - Create leaderboards

5. **Advanced Features**
   - Drip content release
   - Live cohorts
   - One-on-one coaching scheduler
   - Certificate generation
   - Affiliate program

## 📞 Support

For questions or issues:
- Email: support@yourdomain.com
- Documentation: Link to your docs
- Community: Link to your Discord/Slack

## 📝 License

This template is provided as-is. Customize and use for your commercial projects.

---

**Built with ❤️ for course creators**

Ready to launch your course? Follow the setup instructions above and you'll be live in minutes!
