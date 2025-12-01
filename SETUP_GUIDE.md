# 🚀 Quick Setup Guide

Get your course sales platform live in 15 minutes!

## Step 1: Update Configuration (5 minutes)

Open `config.js` and update these essential fields:

```javascript
// 1. Your Site Information
site: {
    name: "Your Course Name Here",
    email: "support@yourdomain.com",
    url: "https://yourdomain.com"
}

// 2. Your Course Details
course: {
    title: "Your Amazing Course",
    subtitle: "What students will learn",
    duration: "90 Days",  // Or your course length
}

// 3. Your Pricing (optional - update after Stripe setup)
pricing: {
    basic: { price: 199 },
    pro: { price: 399 },
    enterprise: { price: 799 }
}
```

## Step 2: Deploy to GitHub Pages (2 minutes)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select your branch: `claude/course-sales-page-01TxWiBKAzrKqaUcaxgu5t7b`
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Visit: `https://YOUR-USERNAME.github.io/selectionprep2/`

## Step 3: Test Your Site (3 minutes)

1. Open your live site
2. Navigate through all pages:
   - Landing page ✓
   - Course preview ✓
   - Checkout (demo mode) ✓
   - Terms & Privacy ✓

## Step 4: Set Up Stripe (5 minutes)

### Create Stripe Account
1. Go to https://stripe.com
2. Sign up (it's free!)
3. Complete verification

### Get Your API Keys
1. In Stripe Dashboard, go to: **Developers** → **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_`)
3. Update in `config.js`:

```javascript
stripe: {
    publishableKey: "pk_test_YOUR_KEY_HERE"  // Paste here
}
```

### Create Products
1. In Stripe Dashboard, go to: **Products** → **Add Product**
2. Create three products:
   - **Basic Plan** - $199
   - **Pro Plan** - $399
   - **Enterprise Plan** - $799

3. For each product, copy the **Price ID** (starts with `price_`)
4. Update in `config.js`:

```javascript
stripe: {
    prices: {
        basic: "price_YOUR_BASIC_ID",
        pro: "price_YOUR_PRO_ID",
        enterprise: "price_YOUR_ENTERPRISE_ID"
    }
}
```

5. Commit and push changes:
```bash
git add config.js
git commit -m "Update Stripe configuration"
git push
```

## ⚠️ Important: Backend Required for Real Payments

The checkout currently runs in **DEMO MODE**. For real payments, you need a backend server.

### Quick Backend Setup Options:

#### Option A: Netlify Functions (Easiest - 10 minutes)
1. Create `netlify/functions/create-checkout-session.js`
2. Add Stripe secret key to Netlify environment variables
3. Deploy to Netlify (drag & drop your folder)

#### Option B: Vercel (Easy - 10 minutes)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Add Stripe secret key in Vercel dashboard

#### Option C: Heroku (Traditional - 15 minutes)
1. Create Node.js server (example in README.md)
2. Deploy to Heroku
3. Set environment variables

**Full instructions in README.md - Search for "Set Up Backend"**

## What You Have Now

✅ Professional landing page
✅ Course content page
✅ Stripe checkout integration
✅ Legal pages (Terms, Privacy)
✅ Mobile responsive design
✅ Analytics ready
✅ Demo mode working

## What You Need to Do Next

### Before Taking Real Payments:
1. [ ] Set up backend server (see README.md)
2. [ ] Configure Stripe webhook
3. [ ] Test with Stripe test cards
4. [ ] Switch to live Stripe keys
5. [ ] Set up email notifications

### Content Updates:
1. [ ] Replace Lorem Ipsum with your course content
2. [ ] Add your testimonials
3. [ ] Update course modules
4. [ ] Add real images/videos
5. [ ] Customize colors and branding

### Legal:
1. [ ] Review Terms of Service with a lawyer
2. [ ] Review Privacy Policy for your region
3. [ ] Add your business address if required
4. [ ] Comply with local e-commerce laws

## Test Cards for Stripe

Use these cards to test payments (in test mode):

- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **3D Secure**: 4000 0027 6000 3184

Use any future expiry date and any 3-digit CVC.

## Need Help?

- 📖 **Full Documentation**: See `README.md`
- 🔧 **Troubleshooting**: See "Troubleshooting" section in README
- 💬 **Stripe Docs**: https://stripe.com/docs
- 🎯 **GitHub Pages**: https://pages.github.com

## Quick Customization Checklist

Edit `config.js` to update:
- [ ] Site name and tagline
- [ ] Course title and description
- [ ] Pricing and features
- [ ] Benefits section
- [ ] Testimonials
- [ ] FAQs
- [ ] Social media links
- [ ] Contact email

Then commit and push to see changes live!

---

## 🎉 You're Ready!

Your course platform is now live. Focus on creating great content and let the platform handle the sales!

**Next Steps:**
1. Share your link on social media
2. Start adding course content
3. Set up email marketing
4. Launch your first cohort!

Good luck with your course! 🚀
