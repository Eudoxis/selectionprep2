// ============================================
// PRODUCTION CONFIGURATION
// ============================================
// Update these values to customize your course site

const CONFIG = {
    // ============================================
    // SITE INFORMATION
    // ============================================
    site: {
        name: "YourCourse",
        tagline: "Transform Your Career in 90 Days",
        description: "Master the skills that top companies are hiring for. Join 10,000+ successful students who've advanced their careers.",
        url: "https://yourdomain.com",
        email: "support@yourdomain.com",
        year: new Date().getFullYear()
    },

    // ============================================
    // COURSE INFORMATION
    // ============================================
    course: {
        title: "Complete Professional Development Course",
        subtitle: "From Beginner to Expert",
        duration: "90 Days",
        studentsCount: "10,000+",
        rating: "4.9/5",
        successRate: "90%",
        language: "English",
        lastUpdated: "2024"
    },

    // ============================================
    // STRIPE CONFIGURATION
    // ============================================
    // Get your keys from: https://dashboard.stripe.com/apikeys
    stripe: {
        publishableKey: "pk_test_YOUR_PUBLISHABLE_KEY_HERE", // Replace with your Stripe publishable key
        // Price IDs from Stripe Dashboard
        prices: {
            basic: "price_1234567890_BASIC",      // Replace with actual Stripe Price ID
            pro: "price_1234567890_PRO",          // Replace with actual Stripe Price ID
            enterprise: "price_1234567890_ENT"    // Replace with actual Stripe Price ID
        },
        // Success/Cancel URLs
        successUrl: "/success.html",
        cancelUrl: "/index.html"
    },

    // ============================================
    // PRICING PLANS
    // ============================================
    pricing: {
        basic: {
            name: "Basic",
            price: 199,
            currency: "$",
            features: [
                { included: true, text: "Full Course Access" },
                { included: true, text: "All Video Lessons" },
                { included: true, text: "Downloadable Resources" },
                { included: true, text: "Certificate of Completion" },
                { included: false, text: "1-on-1 Mentorship" },
                { included: false, text: "Job Placement Support" }
            ]
        },
        pro: {
            name: "Pro",
            price: 399,
            currency: "$",
            featured: true,
            badge: "Most Popular",
            features: [
                { included: true, text: "Everything in Basic" },
                { included: true, text: "1-on-1 Mentorship (4 Sessions)" },
                { included: true, text: "Code Review" },
                { included: true, text: "Private Community Access" },
                { included: true, text: "Job Placement Support" },
                { included: true, text: "Lifetime Updates" }
            ]
        },
        enterprise: {
            name: "Enterprise",
            price: 799,
            currency: "$",
            features: [
                { included: true, text: "Everything in Pro" },
                { included: true, text: "Unlimited Mentorship" },
                { included: true, text: "Priority Support" },
                { included: true, text: "Career Coaching" },
                { included: true, text: "Interview Prep" },
                { included: true, text: "Resume Review" }
            ]
        }
    },

    // ============================================
    // SOCIAL MEDIA LINKS
    // ============================================
    social: {
        twitter: "https://twitter.com/yourhandle",
        linkedin: "https://linkedin.com/company/yourcompany",
        youtube: "https://youtube.com/@yourchannel",
        instagram: "https://instagram.com/yourhandle",
        facebook: "https://facebook.com/yourpage",
        discord: "https://discord.gg/yourserver"
    },

    // ============================================
    // BENEFITS/FEATURES
    // ============================================
    benefits: [
        {
            icon: "🚀",
            title: "Career Acceleration",
            description: "Fast-track your career with industry-recognized skills and certifications"
        },
        {
            icon: "👨‍🏫",
            title: "Expert Instructors",
            description: "Learn from professionals with 10+ years of real-world experience"
        },
        {
            icon: "💼",
            title: "Real Projects",
            description: "Build portfolio-worthy projects that impress employers"
        },
        {
            icon: "🎯",
            title: "Lifetime Access",
            description: "Unlimited access to all course materials and future updates"
        },
        {
            icon: "👥",
            title: "Community Support",
            description: "Join an active community of learners and mentors"
        },
        {
            icon: "📜",
            title: "Certificate",
            description: "Earn a professional certificate upon completion"
        }
    ],

    // ============================================
    // TESTIMONIALS
    // ============================================
    testimonials: [
        {
            rating: 5,
            text: "This course completely changed my career trajectory. Within 3 months of completing it, I landed my dream job with a 40% salary increase!",
            author: "John Smith",
            title: "Software Engineer at Google",
            avatar: "JS"
        },
        {
            rating: 5,
            text: "The instructors are phenomenal. They break down complex topics into easy-to-understand lessons. Best investment I've made in my education.",
            author: "Sarah Davis",
            title: "Product Manager at Meta",
            avatar: "SD"
        },
        {
            rating: 5,
            text: "I was a complete beginner, and now I'm confidently building professional projects. The support from the community is incredible!",
            author: "Michael Johnson",
            title: "Freelance Developer",
            avatar: "MJ"
        }
    ],

    // ============================================
    // FAQS
    // ============================================
    faqs: [
        {
            question: "How long do I have access to the course?",
            answer: "You have lifetime access to the course materials, including all future updates and additions. Learn at your own pace!"
        },
        {
            question: "What if I'm a complete beginner?",
            answer: "This course is designed for all levels. We start from the basics and progressively build your skills to an advanced level."
        },
        {
            question: "Is there a money-back guarantee?",
            answer: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied for any reason, we'll refund your purchase in full."
        },
        {
            question: "How much time do I need to dedicate?",
            answer: "We recommend 5-10 hours per week to complete the course in 90 days. However, you can learn at your own pace with lifetime access."
        },
        {
            question: "Do I get a certificate?",
            answer: "Yes! Upon completion, you'll receive a professional certificate that you can add to your resume and LinkedIn profile."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment processor."
        },
        {
            question: "Can I get a refund after starting the course?",
            answer: "Yes, within 30 days of purchase, you can request a full refund, no questions asked. Just contact our support team."
        },
        {
            question: "Do you offer payment plans?",
            answer: "Currently, we offer one-time payments. However, we're working on adding payment plan options soon."
        }
    ],

    // ============================================
    // COURSE MODULES (For course.html)
    // ============================================
    modules: [
        {
            number: 1,
            title: "Lorem Ipsum Fundamentals",
            lessons: [
                { title: "Introduction to Lorem", duration: "12:45", type: "video", completed: true },
                { title: "Dolor Sit Amet Basics", duration: "18:30", type: "video", completed: true },
                { title: "Consectetur Adipiscing", duration: "22:15", type: "video", active: true },
                { title: "Elit Sed Do", duration: "15:20", type: "video" },
                { title: "Eiusmod Tempor", duration: "20:00", type: "video" },
                { title: "Quiz: Module 1 Assessment", duration: "10 questions", type: "quiz" },
                { title: "Incididunt Ut Labore", duration: "25:10", type: "video" },
                { title: "Assignment: Dolore Magna Project", duration: "Due in 5 days", type: "assignment" }
            ]
        },
        {
            number: 2,
            title: "Advanced Aliqua Techniques",
            lessons: [
                { title: "Ut Enim Ad Minim", duration: "16:40", type: "video" },
                { title: "Veniam Quis Nostrud", duration: "19:25", type: "video" },
                { title: "Exercitation Ullamco", duration: "23:50", type: "video" },
                { title: "Laboris Nisi Ut", duration: "21:15", type: "video" },
                { title: "Quiz: Module 2 Assessment", duration: "15 questions", type: "quiz" },
                { title: "Aliquip Ex Ea Commodo", duration: "28:30", type: "video" }
            ]
        },
        {
            number: 3,
            title: "Consequat Duis Mastery",
            lessons: [
                { title: "Aute Irure Dolor", duration: "14:55", type: "video" },
                { title: "Reprehenderit in Voluptate", duration: "20:40", type: "video" },
                { title: "Velit Esse Cillum", duration: "18:20", type: "video" },
                { title: "Dolore Eu Fugiat", duration: "26:10", type: "video" },
                { title: "Nulla Pariatur", duration: "22:35", type: "video" },
                { title: "Quiz: Module 3 Assessment", duration: "20 questions", type: "quiz" },
                { title: "Final Project: Excepteur Sint", duration: "Due in 14 days", type: "assignment" }
            ]
        },
        {
            number: 4,
            title: "Occaecat Cupidatat Certification",
            lessons: [
                { title: "Proident Sunt in Culpa", duration: "17:50", type: "video" },
                { title: "Qui Officia Deserunt", duration: "24:15", type: "video" },
                { title: "Mollit Anim Id", duration: "19:30", type: "video" },
                { title: "Final Exam: Comprehensive Assessment", duration: "50 questions", type: "quiz" },
                { title: "Certificate of Completion", duration: "Download", type: "certificate" }
            ]
        }
    ],

    // ============================================
    // EMAIL NOTIFICATIONS (For backend integration)
    // ============================================
    emails: {
        welcome: {
            subject: "Welcome to {courseName}!",
            template: "welcome"
        },
        purchase: {
            subject: "Your purchase is confirmed!",
            template: "purchase-confirmation"
        },
        completion: {
            subject: "Congratulations! You've completed the course!",
            template: "course-completion"
        }
    },

    // ============================================
    // ANALYTICS (Optional - Add your tracking IDs)
    // ============================================
    analytics: {
        googleAnalytics: "G-XXXXXXXXXX", // Replace with your GA4 ID
        facebookPixel: "XXXXXXXXXX",     // Replace with your Facebook Pixel ID
        hotjar: "XXXXXXX"                // Replace with your Hotjar ID
    },

    // ============================================
    // FEATURE FLAGS
    // ============================================
    features: {
        enableCheckout: true,          // Enable/disable checkout functionality
        enableDiscussions: true,       // Enable/disable discussion section
        enableNotes: true,             // Enable/disable notes feature
        showProgress: true,            // Show/hide progress tracking
        enableCertificates: true,      // Enable/disable certificates
        maintenanceMode: false         // Set to true to show maintenance page
    },

    // ============================================
    // CONTENT DELIVERY
    // ============================================
    cdn: {
        // If you're hosting videos elsewhere
        videoProvider: "self-hosted", // Options: "self-hosted", "vimeo", "youtube", "wistia"
        videoBaseUrl: "/videos/",
        imagesBaseUrl: "/images/",
        documentsBaseUrl: "/documents/"
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}

// For Node.js environments (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
