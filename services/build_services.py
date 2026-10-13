#!/usr/bin/env python3
"""
DeepTech services page generator.

Edit the SERVICES data below (your real content), then run:  python3 build_services.py
It rewrites services/<slug>.html for every service and refreshes the cards on services.html.

Conventions
- Any text wrapped in [square brackets] is shown highlighted yellow as a placeholder.
- Results use real numbers from your portfolio case studies only; None = placeholder tile.
"""
import html, json, os, re

E = html.escape


def t(s):
    """Escape text; [bracketed] text becomes a highlighted placeholder."""
    if s.startswith("[") and s.endswith("]"):
        return '<span class="ph">%s</span>' % E(s)
    return E(s)


# ------------------------------------------------------------------ portfolio
PORTFOLIO = {
    "gm": ("GM-official.webp", "FinTech Platform & Trading Academy", "WordPress · WooCommerce · Course enrollments +45%"),
    "ahmed": ("ahmedfashion.webp", "Wholesale Fashion E-Commerce", "WooCommerce · Wholesale inquiries +210%"),
    "estimation": ("estimationcenter.webp", "Construction Estimating Platform", "Web development + SEO · Quote requests +150%"),
    "halal": ("halalguidelines.webp", "Halal Certification Consulting", "Web development + SEO · Consultation leads +180%"),
    "bilal": ("bilaltoys.webp", "B2C Toy Retail Platform", "WooCommerce · Online sales +120%"),
    "damascus": ("damascusdepot.webp", "Premium Knives E-Commerce", "WooCommerce · International sales +135%"),
}

PILLARS = {
    "software": ("Software Engineering & Development", "services.html#software"),
    "design": ("Design & User Experience", "services.html#design"),
    "marketing": ("Digital Marketing & SEO", "services.html#marketing"),
}

PROCESS = {
    "software": [
        ("Discovery & scoping", "We define your goals, users, features and technical requirements in a free consultation."),
        ("Architecture & design", "We plan the structure and design the key screens and flows before any code is written."),
        ("Build & test", "Development in clear milestones with regular demos, testing and your feedback built in."),
        ("Launch", "Deployment, final checks and handover with documentation and training."),
        ("Support & iterate", "Post-launch support, monitoring and improvements, with 24/7 consultancy."),
    ],
    "design": [
        ("Discovery", "We learn your brand, audience, competitors and goals."),
        ("Concepts", "Wireframes, mood boards or concept directions for you to react to."),
        ("Design", "Refined, high-fidelity designs built in Figma, with revisions based on your feedback."),
        ("Handoff", "Final files, assets and guidelines, ready for development or print."),
        ("Support", "Ongoing tweaks and consultancy as your product or brand evolves."),
    ],
    "marketing": [
        ("Audit & goals", "We review your current presence, competitors and set measurable targets."),
        ("Strategy", "A prioritized plan covering channels, keywords, content and budget."),
        ("Execution", "We implement the plan consistently, month after month."),
        ("Report", "Transparent weekly or monthly reports tied to real outcomes."),
        ("Optimize", "We double down on what works and fix what does not, to improve ROI."),
    ],
}

# ------------------------------------------------------------------ services
S = []


def svc(**k):
    S.append(k)


svc(
    slug="web-development", old_id="web-development", pillar="software",
    name="Full-Stack Web Development",
    short="Custom websites and web applications on modern architectures, built to scale.",
    lead="Custom websites and web applications engineered for speed, security and growth, built around how your business actually operates.",
    overview=[
        "Off-the-shelf templates work until your business needs something they cannot do: a custom workflow, a customer portal, a specific integration, or simply a site that loads fast and ranks well. Our full-stack development covers everything from the visible front end to the secure back end and database behind it.",
        "We architect each project around your operational requirements, build it in clear milestones, and hand it over with documentation so you are never locked in or left guessing.",
    ],
    benefits=[
        ("Built around your workflow", "Features and flows are designed for how your team and customers actually work, not forced into a template."),
        ("Fast and secure", "Lightweight builds, optimized assets and secure coding practices protect both user experience and your data."),
        ("Scales with growth", "A clean architecture means you can add features, traffic and integrations without rebuilding from scratch."),
        ("Easy to manage", "An admin panel or CMS lets your team update content without calling a developer."),
        ("SEO-ready foundations", "Clean markup, fast load times and a sound structure give search engines every reason to rank you."),
        ("You own it", "Source code and deliverables transfer to you once invoices are settled."),
    ],
    results=[("+150%", "Quote requests", "Estimation Center"), ("+180%", "Consultation leads", "Halal Guidelines"), ("+60%", "Lead conversion rate", "GM Official Services")],
    usecases=["Corporate and lead-generation websites", "Customer portals and dashboards", "Quote, booking and inquiry systems", "Internal tools and workflow apps", "Platforms with user accounts and payments"],
    included=["Requirements discovery and technical architecture", "Responsive front-end development", "Secure back end, database and APIs", "Admin panel or CMS", "Performance and security hardening", "SEO-ready technical foundations", "Testing across devices and browsers", "Deployment, documentation and handover"],
    tech=["JavaScript", "PHP", "[add: React / Node / Laravel / etc.]"],
    timeline="4–9 weeks", bestfor="Businesses that have outgrown templates or need custom workflows and integrations.",
    portfolio=["estimation", "halal", "gm"],
    faqs=[
        ("How long does a custom website take?", "Our recent projects launched in 4 to 9 weeks depending on scope. You get a firm timeline in your quote."),
        ("Can you add features after launch?", "Yes. We build on a clean, scalable architecture and offer ongoing support so new features are easy to add."),
        ("Will I be able to update content myself?", "Yes. We include an admin panel or CMS and train your team to use it."),
        ("Who owns the code?", "You do. Custom source code and deliverables transfer to you once all related invoices are settled."),
    ],
    related=["wordpress-woocommerce", "ui-ux-design", "technical-on-page-seo"],
)

svc(
    slug="shopify-development", old_id="shopify", pillar="software",
    name="Shopify Store Development",
    short="Custom Shopify stores with tailored themes and smooth checkout for retail growth.",
    lead="Custom Shopify stores built for retail growth: tailored themes, a smooth checkout and a catalog that makes buying easy.",
    overview=[
        "Shopify gives you a reliable, managed platform for selling online. The difference between an average store and a high-converting one is in the details: the theme, the product structure, the checkout experience and the speed.",
        "We build Shopify stores that match your brand, are easy for you to run day to day, and are set up to convert visitors into customers.",
    ],
    benefits=[
        ("Launch faster", "A managed platform means hosting, security and payments are handled, so you can focus on selling."),
        ("A store that feels like your brand", "Custom themes rather than generic templates, so you stand out from competitors."),
        ("Higher conversion", "Clean product pages, simple navigation and a friction-free checkout reduce abandoned carts."),
        ("Easy to manage", "Add products, run promotions and fulfil orders without technical help."),
        ("Mobile-first", "Most shoppers browse on their phones, so every page is designed and tested for mobile first."),
        ("Room to grow", "Apps and integrations extend your store as your business expands."),
    ],
    results=[("+135%", "International sales (our WooCommerce store, Damascus Depot)", "Damascus Depot"), ("+120%", "Online sales (our WooCommerce store, Bilal Toys)", "Bilal Toys"), (None, "[Add your Shopify result]", "")],
    usecases=["New online stores", "Replatforming from another e-commerce system", "Fashion, lifestyle and retail brands", "Direct-to-consumer brands", "Stores selling to international customers"],
    included=["Custom theme design and build", "Product, collection and navigation structure", "Payment gateway setup", "Shipping and tax configuration", "App and integration setup", "Speed and mobile optimization", "On-page SEO basics", "Training and handover"],
    tech=["Shopify", "Liquid", "JavaScript", "Figma"],
    timeline="[4–6 weeks]", bestfor="Retail and direct-to-consumer brands launching or relaunching an online store.",
    portfolio=["damascus", "bilal", "ahmed"],
    faqs=[
        ("Shopify or WooCommerce: which is better?", "Shopify suits teams that want a managed, low-maintenance store. WooCommerce suits those who want full control and custom B2B or wholesale flows. We recommend based on your needs."),
        ("Can you migrate my existing store?", "Yes. We can migrate products, customers and content from your current platform."),
        ("Can I sell internationally?", "Yes. We configure international payments, shipping rates and taxes as needed."),
        ("Will I be able to manage the store myself?", "Yes. We train your team and hand over everything you need."),
    ],
    related=["wordpress-woocommerce", "technical-on-page-seo", "ui-ux-design"],
)

svc(
    slug="wordpress-woocommerce", old_id="wordpress", pillar="software",
    name="WordPress & WooCommerce Development",
    short="Bespoke WordPress sites and WooCommerce stores on lightweight, custom architecture.",
    lead="Bespoke WordPress sites for content-heavy businesses and WooCommerce stores for B2B, B2C and wholesale, built lightweight rather than bloated.",
    overview=[
        "WordPress powers a huge share of the web because it is flexible and easy to manage. But heavy themes and plugin overload make many sites slow and fragile. We build WordPress and WooCommerce on lightweight custom architecture so your site is fast, secure and genuinely yours.",
        "From lead-generation websites and consulting platforms to full wholesale and retail stores, we shape the platform around your sales process, including quote requests and WhatsApp integration where they help close deals.",
    ],
    benefits=[
        ("Full ownership and control", "Your site, your data, your hosting. No platform lock-in."),
        ("Fast, lightweight builds", "Custom themes without unnecessary plugins keep pages quick even with heavy product galleries."),
        ("Built for B2B and B2C", "Standard carts, quote requests, wholesale flows and WhatsApp ordering, depending on how you sell."),
        ("Easy content management", "Your team can update pages, products and posts without a developer."),
        ("Search-friendly", "Technical SEO and clean structure help you capture organic traffic."),
        ("Flexible payments and shipping", "Local and international payment gateways and automated shipping rates."),
    ],
    results=[("+210%", "Wholesale inquiries", "Ahmed Fashion"), ("+135%", "International sales", "Damascus Depot"), ("+120%", "Online sales", "Bilal Toys")],
    usecases=["Wholesale and B2B catalogs", "Retail and niche e-commerce stores", "Consulting and service lead-generation sites", "Course and membership platforms", "Content-heavy business websites"],
    included=["Custom lightweight theme", "WooCommerce catalog, cart and checkout", "Payment gateway and shipping setup", "Quote-request and lead-capture flows", "WhatsApp integration", "Mobile-first layouts", "Technical SEO foundations", "Training and handover"],
    tech=["WordPress", "WooCommerce", "PHP", "JavaScript", "Payment APIs", "Figma"],
    timeline="4–6 weeks", bestfor="Wholesalers, retailers and service businesses wanting full ownership and easy content management.",
    portfolio=["ahmed", "bilal", "damascus"],
    faqs=[
        ("Will my WordPress site be slow?", "No. We build on lightweight custom architecture and avoid plugin overload, so pages load quickly even with heavy media."),
        ("Can WooCommerce handle wholesale?", "Yes. We have built B2B flows with quote requests and WhatsApp integration alongside standard retail checkout."),
        ("Do you handle payments for Pakistan and abroad?", "Yes. We integrate secure local and international payment methods and automated shipping rates."),
        ("Do you provide support after launch?", "Yes. We offer a 30-day post-launch warranty for bugs in our code, plus ongoing support."),
    ],
    related=["shopify-development", "web-development", "technical-on-page-seo"],
)

svc(
    slug="native-mobile-apps", old_id="native-apps", pillar="software",
    name="Native iOS & Android Apps",
    short="Platform-native mobile apps with top performance and deep device integration.",
    lead="Platform-native mobile apps with the best possible performance, device integration and user experience on each operating system.",
    overview=[
        "Native apps are built specifically for iOS or Android, which gives you the smoothest performance, the most polished platform feel and full access to device features like the camera, sensors, notifications and offline storage.",
        "We take your idea from scoping and design through development, testing on real devices and submission to the app stores.",
    ],
    benefits=[
        ("Best performance", "Native code runs fastest and feels most responsive to users."),
        ("Full device access", "Camera, location, sensors, biometrics and notifications work as designed."),
        ("Platform-perfect UX", "Interfaces follow each platform's conventions, so users feel at home."),
        ("Reliable and secure", "Mature platform tools help us build stable, secure apps."),
        ("Store-ready", "We support the submission and review process for both app stores."),
        ("Built to evolve", "A clean architecture makes updates and new features straightforward."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["Customer-facing consumer apps", "Apps needing camera, GPS or sensors", "Performance-critical products", "Companion apps for existing services", "Apps with offline capability"],
    included=["Product scoping and user flows", "UI/UX design", "Native iOS and/or Android development", "Back-end and API integration", "Push notifications", "Testing on real devices", "App store submission support", "Post-launch support"],
    tech=["[confirm: Swift / Kotlin]"],
    timeline="[add]", bestfor="Products that need top performance, deep hardware access or a polished platform-specific feel.",
    portfolio=[],
    faqs=[
        ("Native or cross-platform: which should I choose?", "Cross-platform is usually faster and more cost-effective. Native is best when you need maximum performance or deep device features. We will recommend based on your goals."),
        ("Do you publish the app to the stores?", "Yes. We support submission to the App Store and Google Play."),
        ("Can the app connect to my existing systems?", "Yes. We integrate with your back end and third-party APIs."),
        ("What happens after launch?", "We offer ongoing support, monitoring and updates."),
    ],
    related=["cross-platform-apps", "ui-ux-design", "web-development"],
)

svc(
    slug="cross-platform-apps", old_id="cross-platform", pillar="software",
    name="Cross-Platform Apps: Flutter & React Native",
    short="One codebase for iOS and Android: faster delivery and lower cost.",
    lead="One codebase, both app stores: faster delivery and lower cost than two native apps, without sacrificing quality.",
    overview=[
        "Cross-platform frameworks like Flutter and React Native let us build iOS and Android apps from a single codebase. For most products this means getting to market sooner, spending less, and maintaining one app instead of two.",
        "We design the experience to feel natural on every device and connect the app to your back end and the tools you already use.",
    ],
    benefits=[
        ("Faster to market", "One team and one codebase gets you on both app stores sooner."),
        ("Lower cost", "Shared code reduces build and maintenance effort."),
        ("Consistent experience", "Your brand looks and behaves the same on every device."),
        ("Easier updates", "Ship a feature or fix once and it reaches everyone."),
        ("Near-native performance", "Modern frameworks deliver smooth, responsive apps."),
        ("Ideal for MVPs", "Validate your idea quickly before investing in a larger build."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["Startups launching an MVP", "Business and service apps", "Booking, ordering and loyalty apps", "Apps for both iOS and Android on one budget", "Internal team and field apps"],
    included=["Product scoping and design", "Single codebase for iOS and Android", "API and back-end integration", "Push notifications and in-app features", "Testing on both platforms", "Release to both app stores", "Documentation and handover", "Post-launch support"],
    tech=["Flutter", "React Native"],
    timeline="[add]", bestfor="Startups and businesses that want iOS and Android presence quickly with a shared codebase.",
    portfolio=[],
    faqs=[
        ("Flutter or React Native?", "Both are excellent. We choose based on your product, team and long-term plans, and explain the trade-offs."),
        ("Will it feel like a real native app?", "Yes. Modern cross-platform apps are smooth and responsive on both platforms."),
        ("Can we start with one platform?", "Yes. You can launch on one store first and add the other later."),
        ("How are updates handled?", "Updates are built once and released to both platforms."),
    ],
    related=["native-mobile-apps", "ui-ux-design", "web-development"],
)

svc(
    slug="ui-ux-design", old_id="ui-ux", pillar="design",
    name="Responsive UI/UX & Web Design",
    short="Clean, modern interfaces designed mobile-first and tested across devices.",
    lead="Clean, modern interfaces designed mobile-first and tested across devices, so every page looks right and works smoothly.",
    overview=[
        "Good design is not decoration. It is how visitors understand what you offer, trust you and take the next step. We design interfaces that are clear, fast and consistent on every screen size.",
        "Our process moves from wireframes to interactive prototypes to polished designs in Figma, so you can see and approve the experience before development begins.",
    ],
    benefits=[
        ("First impressions that build trust", "A professional design signals credibility within seconds."),
        ("Better mobile experience", "Mobile-first layouts reduce bounce and keep shoppers engaged."),
        ("Clear navigation", "Visitors find what they need quickly, which means more enquiries and sales."),
        ("Faster development", "Approved designs and handoff files remove guesswork for developers."),
        ("Consistency", "A reusable component system keeps every page cohesive."),
        ("Fewer costly changes", "Prototypes let you test ideas before they are built."),
    ],
    results=[("-65%", "Mobile bounce rate", "Bilal Toys"), ("+42%", "Mobile conversion", "Ahmed Fashion"), ("+50%", "Mobile conversions", "Damascus Depot")],
    usecases=["New website designs", "Redesigns of outdated sites", "App and dashboard interfaces", "E-commerce storefront design", "Landing pages for campaigns"],
    included=["Wireframes", "Interactive prototypes", "High-fidelity page designs", "Mobile, tablet and desktop layouts", "Reusable component library", "Design files and handoff", "Revisions based on your feedback", "Developer support during build"],
    tech=["Figma"],
    timeline="[add]", bestfor="Anyone launching a new site or app, or refreshing one that looks dated or underperforms on mobile.",
    portfolio=["bilal", "ahmed", "damascus"],
    faqs=[
        ("Do I get the design files?", "Yes. Design files and assets are delivered as part of the handover."),
        ("Can you redesign my existing website?", "Yes. We audit what you have, keep what works and rebuild what does not."),
        ("How many revisions are included?", "[add your revision policy]"),
        ("Will you also build the design?", "Yes. We can take the approved design straight into development."),
    ],
    related=["user-journey-conversion", "branding-graphic-design", "web-development"],
)

svc(
    slug="user-journey-conversion", old_id="user-journeys", pillar="design",
    name="User Journey Mapping & Conversion Design",
    short="Map how visitors become customers and remove friction at every step.",
    lead="We map how visitors move from first click to enquiry or purchase, then remove friction at every step to drive conversion.",
    overview=[
        "Traffic is only valuable if it converts. Conversion design starts by understanding who your visitors are, what they want, and where they hesitate or drop off.",
        "We map the journey, restructure navigation and pages, and optimize calls to action, forms and checkout flows so more visitors become leads and customers.",
    ],
    benefits=[
        ("More leads from the same traffic", "Fixing friction points lifts conversion without extra ad spend."),
        ("Lower bounce rates", "Clear, relevant pages keep visitors on your site."),
        ("Smoother checkout", "Fewer steps and clearer forms reduce abandoned purchases."),
        ("Decisions backed by evidence", "We prioritize changes based on user behavior, not opinion."),
        ("Better mobile journeys", "Most visitors are on phones, so we optimize for them first."),
        ("Clear priorities", "You get a ranked list of improvements to tackle."),
    ],
    results=[("-65%", "Mobile bounce rate", "Bilal Toys"), ("+42%", "Mobile conversion", "Ahmed Fashion"), ("+150%", "Quote requests", "Estimation Center")],
    usecases=["Sites with traffic but few enquiries", "Stores with high cart abandonment", "Lead-generation and quote-request flows", "Landing pages for ad campaigns", "Pre-redesign research"],
    included=["Audience and journey mapping", "Analytics and behavior review", "Information architecture and navigation", "Call-to-action and form optimization", "Checkout flow review", "Prioritized recommendations", "Implementation support", "Follow-up measurement"],
    tech=["Figma", "Google Analytics"],
    timeline="[add]", bestfor="Businesses that already get visitors but want more enquiries or sales from them.",
    portfolio=["bilal", "ahmed", "estimation"],
    faqs=[
        ("Do I need to redesign my whole site?", "Not necessarily. Many gains come from targeted fixes to key pages and flows."),
        ("What data do you use?", "We review your analytics, user flows and, where available, behavior data."),
        ("How do you measure success?", "By tracking conversion rates, bounce rates and lead or sales volume against a baseline."),
        ("Can you implement the changes?", "Yes. We can design and build the improvements for you."),
    ],
    related=["ui-ux-design", "technical-on-page-seo", "social-media-ppc"],
)

svc(
    slug="branding-graphic-design", old_id="branding", pillar="design",
    name="Graphic Design & Brand Identity",
    short="A consistent, memorable identity across web, app, social and print.",
    lead="A consistent, memorable identity across your website, app, social media and print.",
    overview=[
        "Your brand is more than a logo. It is the colours, typography, tone and visuals that make people recognize and trust you everywhere they meet you.",
        "We build identities that are distinctive, flexible and easy to apply, then deliver the files and guidelines so your team can use them consistently.",
    ],
    benefits=[
        ("Stand out", "A distinctive identity helps you be remembered in a crowded market."),
        ("Build trust", "Consistent, professional visuals signal reliability."),
        ("Save time", "Guidelines and templates make future design work faster."),
        ("Works everywhere", "Assets are prepared for web, social and print."),
        ("Supports marketing", "Strong branding improves the performance of ads and content."),
        ("Scales with you", "A flexible system grows as your business does."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["New business branding", "Rebrands and refreshes", "Social media and marketing graphics", "Packaging and print collateral", "Brand guidelines for teams"],
    included=["Logo and visual identity", "Colour palette and typography", "Brand usage guidelines", "Social media graphics", "Business and marketing collateral", "Web-ready and print-ready files", "Revisions based on your feedback", "Final source files"],
    tech=["Figma", "[add: Adobe tools]"],
    timeline="[add]", bestfor="New businesses, rebrands and teams that need a consistent visual identity.",
    portfolio=[],
    faqs=[
        ("What files will I receive?", "Logo files in web and print formats, brand guidelines and source files."),
        ("Can you refresh my existing logo?", "Yes. We can evolve what you have or create something new."),
        ("Do you design social media content?", "Yes, and we can also manage your social media accounts."),
        ("How many concepts do I get?", "[add your concept and revision policy]"),
    ],
    related=["ui-ux-design", "messaging-storytelling", "social-media-ppc"],
)

svc(
    slug="messaging-storytelling", old_id="messaging", pillar="design",
    name="Core Messaging & Visual Storytelling",
    short="Clear positioning and visuals so visitors understand and choose you in seconds.",
    lead="Clear positioning and copy direction paired with imagery, so visitors understand what you do and why to choose you within seconds.",
    overview=[
        "Many websites fail not because of design, but because visitors cannot quickly tell what the business does, who it is for and why it is better. Messaging fixes that.",
        "We define your value proposition, shape the story across your pages and combine it with visuals that reinforce it, supported by proof such as case studies and testimonials.",
    ],
    benefits=[
        ("Instant clarity", "Visitors understand your offer within seconds."),
        ("Stronger differentiation", "Your unique strengths come through clearly."),
        ("More persuasive pages", "Structured copy guides visitors toward action."),
        ("Consistent voice", "The same message everywhere builds recognition."),
        ("Proof that builds trust", "Case studies and testimonials are placed where they matter."),
        ("Better campaign results", "Clear messaging improves ads, emails and landing pages."),
    ],
    results=[("+180%", "Consultation leads", "Halal Guidelines"), ("+150%", "Quote requests", "Estimation Center"), (None, "[Add a result]", "")],
    usecases=["Website copy and structure", "Launch positioning", "Service and product pages", "Sales and landing pages", "Brand voice guidelines"],
    included=["Value proposition and key messages", "Audience and competitor review", "Page structure and copy direction", "Visual style guidance", "Trust elements and proof points", "Calls to action", "Review and revisions", "Message guide for your team"],
    tech=["Figma"],
    timeline="[add]", bestfor="Businesses whose website gets visits but does not clearly explain or sell their offer.",
    portfolio=["halal", "estimation"],
    faqs=[
        ("Do you write the copy?", "[confirm: copywriting included or direction only]"),
        ("Can you work with my existing content?", "Yes. We can restructure and sharpen what you already have."),
        ("Is this part of web design?", "It can be. We often include messaging in website projects or offer it separately."),
        ("How do you decide the message?", "From your goals, audience research and competitor review."),
    ],
    related=["branding-graphic-design", "content-influencer-marketing", "technical-on-page-seo"],
)

svc(
    slug="technical-on-page-seo", old_id="seo", pillar="marketing",
    name="Technical & On-Page SEO",
    short="Get found by people already searching for what you offer.",
    lead="Get found by people already searching for what you offer, starting with a technically sound site and well-targeted content.",
    overview=[
        "Search is often the highest-intent traffic a business can get: people actively looking for what you sell. SEO makes sure you appear when they search.",
        "We start with a technical audit to fix speed, structure and crawl issues, then align your pages with the keywords and intent your customers use, and report progress transparently every month.",
    ],
    benefits=[
        ("High-intent visitors", "People who search for your service are far more likely to enquire."),
        ("Compounding returns", "Rankings built now keep delivering traffic over time."),
        ("A stronger website", "Technical fixes improve speed and usability as well as rankings."),
        ("Lower cost per lead", "Organic traffic reduces dependence on paid ads."),
        ("Local and global reach", "Target your city, country or international markets."),
        ("Transparent reporting", "See rankings, traffic and leads every month."),
    ],
    results=[("+180%", "Consultation leads", "Halal Guidelines"), ("+150%", "Quote requests", "Estimation Center"), ("+60%", "Lead conversion rate", "GM Official Services")],
    usecases=["Service businesses wanting more enquiries", "E-commerce stores seeking organic sales", "Sites with slow or declining traffic", "New sites needing a strong foundation", "Businesses targeting specific cities or countries"],
    included=["Technical audit: speed, crawlability, structure, mobile", "Keyword research and intent mapping", "On-page optimization: titles, meta, headings, schema", "Internal linking improvements", "Content recommendations and roadmap", "Competitor analysis", "Analytics and ranking setup", "Weekly or monthly reporting"],
    tech=["Google Search Console", "Google Analytics", "[add: SEO tools]"],
    timeline="[ongoing monthly]", bestfor="Businesses that want a steady flow of qualified enquiries from search.",
    portfolio=["halal", "estimation", "gm"],
    faqs=[
        ("How soon will I see results?", "Technical fixes can help quickly, while sustained ranking growth usually builds over several months. We report progress transparently."),
        ("Do you guarantee rankings?", "No ethical agency can guarantee specific rankings. We commit to a rigorous strategy, clear reporting and measurable progress."),
        ("Do I need new content?", "Often yes. We recommend what to create or improve based on keyword research."),
        ("Do you offer local SEO?", "Yes. We can target specific cities and countries."),
    ],
    related=["link-building-reputation", "content-influencer-marketing", "web-development"],
)

svc(
    slug="link-building-reputation", old_id="link-building", pillar="marketing",
    name="Link Building, Social Signals & Reputation",
    short="Build the authority and trust that search engines and customers look for.",
    lead="Build the authority and trust that search engines and customers look for, using quality-first methods.",
    overview=[
        "Search engines treat links and mentions from trusted sites as votes of confidence. Customers treat reviews and reputation the same way. Both determine whether people trust you before they ever contact you.",
        "We build authority steadily through outreach, quality links and brand mentions, and help you monitor and improve what people see when they search for you.",
    ],
    benefits=[
        ("Higher authority", "Quality links strengthen your rankings."),
        ("More trust", "Strong reviews and mentions reassure new customers."),
        ("Protected reputation", "We monitor and respond to what is said about you online."),
        ("Competitive edge", "We find link opportunities your competitors already have."),
        ("Sustainable growth", "Quality-first methods avoid risky shortcuts."),
        ("Supports SEO", "Authority amplifies your on-page work."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["New sites that need authority", "Businesses competing in crowded search results", "Brands with few or poor reviews", "Companies protecting their reputation", "Businesses expanding into new markets"],
    included=["Backlink audit and competitor gap analysis", "Link-building strategy and outreach", "Social signals and brand mentions", "Review generation guidance", "Reputation monitoring", "Reporting on links and mentions", "Quality and safety checks", "Monthly review"],
    tech=["[add: SEO and outreach tools]"],
    timeline="[ongoing monthly]", bestfor="Businesses that already have a solid site and want stronger authority and trust.",
    portfolio=[],
    faqs=[
        ("Are the links safe?", "We use quality-first methods and avoid risky shortcuts that can harm your site."),
        ("Do you remove negative reviews?", "We help you respond and improve, but we cannot remove legitimate reviews."),
        ("How long does link building take?", "It is gradual. Results typically build over several months."),
        ("Is it needed if I do SEO?", "It strengthens SEO, especially in competitive markets."),
    ],
    related=["technical-on-page-seo", "content-influencer-marketing", "social-media-ppc"],
)

svc(
    slug="content-influencer-marketing", old_id="content-influencer", pillar="marketing",
    name="Influencer Outreach & Content Marketing",
    short="Content that earns attention and partnerships that reach the right audiences.",
    lead="Content that earns attention and partnerships that put your brand in front of the right audiences.",
    overview=[
        "Content marketing builds trust and brings in search traffic over time, while influencer partnerships put your brand in front of audiences that already trust the person recommending you.",
        "We plan content around what your customers want to know, create it, and pair it with carefully chosen creators and campaigns, then review performance so each campaign teaches the next.",
    ],
    benefits=[
        ("Builds authority", "Useful content positions you as the expert."),
        ("Feeds SEO", "Articles and guides capture search traffic."),
        ("Borrowed trust", "Influencers introduce you to engaged audiences."),
        ("Reusable assets", "Content works across your site, email and social channels."),
        ("Clear plan", "An editorial calendar keeps publishing consistent."),
        ("Measured results", "We review each campaign's performance."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["Brands needing regular blog and guide content", "Product launches", "Reaching niche communities", "Building email and social audiences", "Supporting SEO with new content"],
    included=["Content strategy and editorial calendar", "Blog articles, guides and landing pages", "Influencer research and outreach", "Campaign coordination", "Content promotion", "Performance review", "Reporting", "Monthly planning"],
    tech=["[add: tools]"],
    timeline="[ongoing monthly]", bestfor="Brands that want to grow awareness and organic traffic through useful content and partnerships.",
    portfolio=[],
    faqs=[
        ("Do you write the content?", "[confirm]"),
        ("How do you choose influencers?", "By audience fit, engagement and brand alignment."),
        ("How often is content published?", "[add your typical cadence]"),
        ("How do you measure results?", "Through traffic, engagement and leads tied back to each campaign."),
    ],
    related=["technical-on-page-seo", "social-media-ppc", "messaging-storytelling"],
)

svc(
    slug="social-media-ppc", old_id="social-ppc", pillar="marketing",
    name="Social Media Management & PPC",
    short="Consistent social presence plus paid campaigns tuned for cost per lead.",
    lead="Consistent social presence plus paid campaigns tuned for cost per lead, not vanity metrics.",
    overview=[
        "Social media keeps your brand visible and builds community, while paid campaigns put your offer in front of ready-to-buy audiences immediately. Together they make a fast, measurable growth channel.",
        "We plan and manage your content, run targeted campaigns, test and refine continuously, and report on what your budget actually produced.",
    ],
    benefits=[
        ("Immediate visibility", "Paid campaigns put you in front of customers quickly."),
        ("Consistent presence", "Regular, planned posting keeps your brand active."),
        ("Targeted spend", "Audience targeting reduces wasted budget."),
        ("Ongoing optimization", "A/B testing steadily lowers your cost per lead."),
        ("Transparent reporting", "Weekly or monthly reports tied to real outcomes."),
        ("Works with SEO", "Paid and organic channels reinforce each other."),
    ],
    results=[(None, "[Add a result]", ""), (None, "[Add a result]", ""), (None, "[Add a result]", "")],
    usecases=["Launching a new product or service", "Seasonal promotions", "Lead-generation campaigns", "Brands building a social audience", "Retargeting website visitors"],
    included=["Account setup and audit", "Content planning and posting", "Paid campaign strategy and creative", "Audience targeting", "Budget management", "A/B testing and optimization", "Community management", "Weekly or monthly reporting"],
    tech=["[confirm: Google Ads / Meta / LinkedIn / TikTok]"],
    timeline="[ongoing monthly]", bestfor="Businesses that want fast, measurable lead generation alongside a consistent social presence.",
    portfolio=[],
    faqs=[
        ("What ad budget do I need?", "[add guidance]. We recommend a budget based on your goals and market."),
        ("Which platforms do you cover?", "[confirm platforms]"),
        ("Who creates the creative?", "Our design team creates ad and social creative."),
        ("How do I see results?", "You receive weekly or monthly reports tied to real outcomes such as leads and cost per lead."),
    ],
    related=["technical-on-page-seo", "content-influencer-marketing", "branding-graphic-design"],
)

BY_SLUG = {s["slug"]: s for s in S}
SITE = "https://deeptechtechnologies.com"


# ------------------------------------------------------------------ helpers
def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    os.makedirs(os.path.dirname(p) or ".", exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)


src = read("services.html")

# icons: taken from the original blocks on first run, cached after
if os.path.exists("icons.json"):
    ICONS = json.loads(read("icons.json"))
else:
    ICONS = {}
    for m in re.finditer(r'<article class="sp-block[^"]*"[^>]*id="([^"]+)">\s*<span class="sp-block__icon">(.*?)</span>', src, re.S):
        ICONS[m.group(1)] = m.group(2).strip()
    write("icons.json", json.dumps(ICONS))


def icon(s):
    return ICONS.get(s["old_id"], "")


# shared chunks reused from services.html (header + footer + modals)
head_chunk = src.split('<body class="post-page svcpage">')[1].split('<main id="top">')[0]
tail_chunk = src.split('<section class="cta" id="cta">')[1].split("<script src=\"script.js\"></script>")[0]
tail_chunk = '<section class="cta" id="cta">' + tail_chunk

FOOT_MAP = [
    ('href="#web-development"', 'href="web-development.html"'),
    ('href="#native-apps"', 'href="native-mobile-apps.html"'),
    ('href="#shopify"', 'href="shopify-development.html"'),
]


def to_subdir(chunk):
    chunk = chunk.replace('href="index.html', 'href="../index.html')
    chunk = chunk.replace('src="assets/', 'src="../assets/')
    chunk = chunk.replace('href="services.html', 'href="../services.html')
    chunk = chunk.replace('href="blog.html', 'href="../blog.html')
    chunk = chunk.replace('href="services/', 'href="')  # footer links already rewritten on a re-run
    for a, b in FOOT_MAP:
        chunk = chunk.replace(a, b)
    chunk = chunk.replace('href="#design"', 'href="../services.html#design"').replace('href="#marketing"', 'href="../services.html#marketing"')
    return chunk


def card(s, prefix):
    return (
        '<a class="sp-card reveal" id="%s" href="%s%s.html">\n'
        '    <span class="sp-block__icon">%s</span>\n'
        '    <h3 class="sp-card__name">%s</h3>\n'
        '    <p class="sp-card__desc">%s</p>\n'
        '    <span class="sp-card__more">Learn more <span class="arrow">→</span></span>\n'
        '</a>' % (s["old_id"], prefix, s["slug"], icon(s), E(s["name"]), E(s["short"]))
    )


def page(s):
    pname, plink = PILLARS[s["pillar"]]
    url = "%s/services/%s.html" % (SITE, s["slug"])
    title = "%s | DeepTech Technologies" % s["name"]

    benefits = "".join(
        '<div class="sd-benefit reveal"><h3>%s</h3><p>%s</p></div>' % (E(a), E(b)) for a, b in s["benefits"]
    )
    results = ""
    for num, label, proj in s["results"]:
        if num is None:
            results += '<div class="sd-result sd-result--empty"><strong class="ph">[+00%%]</strong><span>%s</span></div>' % t(label)
        else:
            results += '<div class="sd-result"><strong>%s</strong><span>%s</span><em>%s</em></div>' % (E(num), E(label), E(proj))
    use = "".join("<li>%s</li>" % E(x) for x in s["usecases"])
    inc = "".join("<li>%s</li>" % E(x) for x in s["included"])
    proc = "".join(
        '<div class="sp-step reveal"><h3>%s</h3><p>%s</p></div>' % (E(a), E(b)) for a, b in PROCESS[s["pillar"]]
    )
    tags = "".join("<span>%s</span>" % t(x) if not x.startswith("[") else t(x) for x in s["tech"])
    faqs = "".join(
        '<details class="sp-faq"><summary>%s <span class="chev">›</span></summary><p>%s</p></details>' % (t(q), t(a))
        for q, a in s["faqs"]
    )
    proj = ""
    if s["portfolio"]:
        cards = "".join(
            '<a class="sp-proof__card reveal" href="../index.html#portfolio"><img src="../assets/img/%s" alt="%s" loading="lazy">'
            '<div class="sp-proof__cap"><strong>%s</strong><span>%s</span></div></a>'
            % (PORTFOLIO[k][0], E(PORTFOLIO[k][1]), E(PORTFOLIO[k][1]), E(PORTFOLIO[k][2]))
            for k in s["portfolio"]
        )
        proj = (
            '<section class="sp-section" id="work"><div class="sp-section__head"><span class="eyebrow">— Related work</span>'
            '<h2 class="sp-section__title">Proof, not just <span class="crimson">promises.</span></h2>'
            '<p class="sp-section__lead">Projects where we delivered this kind of work. Open the portfolio for the full case studies.</p></div>'
            '<div class="sp-proof">%s</div></section>' % cards
        )
    related = "".join(card(BY_SLUG[r], "") for r in s["related"])

    ld = [
        {"@context": "https://schema.org", "@type": "Service", "name": s["name"], "description": s["lead"], "url": url,
         "provider": {"@type": "ProfessionalService", "name": "DeepTech Technologies", "url": SITE + "/"},
         "areaServed": ["PK", "US", "AE"]},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Services", "item": SITE + "/services.html"},
            {"@type": "ListItem", "position": 3, "name": s["name"], "item": url}]},
        {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in s["faqs"]]},
    ]

    head = to_subdir(head_chunk)
    tail = to_subdir(tail_chunk).replace("Quote%20request", "Quote%20request%3A%20" + E(s["name"]).replace(" ", "%20").replace("&amp;", "%26"))

    body = f"""<!doctype html>
<html lang="en" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{E(title)}</title>
    <meta name="description" content="{E(s['lead'])} Free itemized quote within 48 hours.">
    <meta name="author" content="DeepTech">
    <meta name="theme-color" content="#e11d48">
    <link rel="canonical" href="{url}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{url}">
    <meta property="og:title" content="{E(title)}">
    <meta property="og:description" content="{E(s['lead'])}">
    <meta property="og:image" content="{SITE}/assets/img/og-image.webp">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{E(title)}">
    <meta name="twitter:description" content="{E(s['lead'])}">
    <meta name="twitter:image" content="{SITE}/assets/img/og-image.webp">
    <link rel="icon" type="image/x-icon" href="../assets/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="../site.webmanifest">
    <script>
        (function () {{
            var saved = localStorage.getItem("deeptech-theme");
            document.documentElement.setAttribute("data-theme", saved === "dark" ? "dark" : "light");
        }})();
    </script>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../services.css">
    <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>

<body class="post-page svcpage svcdetail">{head}<main id="top">
        <!-- ===================== HERO ===================== -->
        <section class="sp-hero sd-hero">
            <nav class="sd-crumbs" aria-label="Breadcrumb">
                <a href="../index.html">Home</a><span>/</span><a href="../services.html">Services</a><span>/</span><a href="../{plink}">{E(pname)}</a><span>/</span><span aria-current="page">{E(s['name'])}</span>
            </nav>
            <span class="eyebrow">— {E(pname)}</span>
            <h1 class="sp-hero__title sd-hero__title">{E(s['name'])}</h1>
            <p class="sp-hero__lead">{E(s['lead'])}</p>
            <div class="sp-hero__cta">
                <a class="sp-btn sp-btn--primary" href="#cta">Get a quote for this service</a>
                <a class="sp-btn" href="#benefits">How it helps</a>
                <a class="sp-btn" href="../services.html">All services</a>
            </div>
            <div class="sd-facts">
                <div><span>Typical timeline</span><strong>{t(s['timeline'])}</strong></div>
                <div><span>Best for</span><strong>{t(s['bestfor'])}</strong></div>
                <div><span>Quote</span><strong>Free, within 48 hours</strong></div>
            </div>
        </section>

        <!-- ===================== OVERVIEW ===================== -->
        <section class="sp-section" id="overview">
            <div class="sd-split">
                <div>
                    <span class="eyebrow">— Overview</span>
                    <h2 class="sp-section__title">What it is and <span class="crimson">why it matters.</span></h2>
                    <div class="sd-prose">{"".join("<p>%s</p>" % E(p) for p in s["overview"])}</div>
                </div>
                <aside class="sd-aside">
                    <h3>At a glance</h3>
                    <dl>
                        <dt>Timeline</dt><dd>{t(s['timeline'])}</dd>
                        <dt>Best for</dt><dd>{t(s['bestfor'])}</dd>
                        <dt>Pricing</dt><dd>Custom, itemized quote with flexible payment plans</dd>
                        <dt>Support</dt><dd>24/7 consultancy and 30-day post-launch warranty</dd>
                    </dl>
                    <div class="sp-tags">{tags}</div>
                    <a class="sp-btn sp-btn--primary" href="#cta">Request a quote</a>
                </aside>
            </div>
        </section>

        <!-- ===================== BENEFITS ===================== -->
        <section class="sp-section" id="benefits">
            <div class="sp-section__head">
                <span class="eyebrow">— How it helps</span>
                <h2 class="sp-section__title">What you <span class="crimson">gain.</span></h2>
                <p class="sp-section__lead">The practical benefits this service brings to your business.</p>
            </div>
            <div class="sd-benefits">{benefits}</div>
        </section>

        <!-- ===================== RESULTS ===================== -->
        <section class="sp-section" id="results">
            <div class="sp-section__head">
                <span class="eyebrow">— By the numbers</span>
                <h2 class="sp-section__title">Results from <span class="crimson">real projects.</span></h2>
                <p class="sp-section__lead">Outcomes from client projects where we delivered this kind of work.</p>
            </div>
            <div class="sd-results">{results}</div>
        </section>

        <!-- ===================== WHO + INCLUDED ===================== -->
        <section class="sp-section" id="included">
            <div class="sd-two">
                <div class="sd-listcard reveal">
                    <span class="eyebrow">— Who it's for</span>
                    <h2 class="sd-listcard__title">Common use cases</h2>
                    <ul class="sd-list">{use}</ul>
                </div>
                <div class="sd-listcard reveal" data-delay="1">
                    <span class="eyebrow">— What's included</span>
                    <h2 class="sd-listcard__title">Everything you get</h2>
                    <ul class="sd-list">{inc}</ul>
                </div>
            </div>
        </section>

        <!-- ===================== PROCESS ===================== -->
        <section class="sp-section" id="process">
            <div class="sp-section__head">
                <span class="eyebrow">— Our process</span>
                <h2 class="sp-section__title">How we <span class="crimson">deliver it.</span></h2>
                <p class="sp-section__lead">A clear, transparent process so you always know what is happening, what is next and what it costs.</p>
            </div>
            <div class="sp-process">{proc}</div>
        </section>

        {proj}

        <!-- ===================== FAQ ===================== -->
        <section class="sp-section" id="faq">
            <div class="sp-section__head">
                <span class="eyebrow">— FAQ</span>
                <h2 class="sp-section__title">Questions, <span class="crimson">answered.</span></h2>
            </div>
            <div class="sd-faq">{faqs}</div>
        </section>

        <!-- ===================== RELATED SERVICES ===================== -->
        <section class="sp-section" id="related">
            <div class="sp-section__head">
                <span class="eyebrow">— Related services</span>
                <h2 class="sp-section__title">Pairs well <span class="crimson">with.</span></h2>
                <p class="sp-section__lead">Services that clients often combine with this one.</p>
            </div>
            <div class="sp-cards">{related}</div>
        </section>

        {tail}<script src="../script.js"></script>
</body>

</html>
"""
    write("services/%s.html" % s["slug"], body)


for s in S:
    page(s)

# ---- refresh the cards on services.html
for pillar in PILLARS:
    cards = "\n".join(card(s, "services/") for s in S if s["pillar"] == pillar)
    pat = re.compile(r'(<section class="sp-section" id="%s">.*?)<div class="sp-(?:grid|cards)">.*?</div>\n        </section>' % pillar, re.S)
    new = r'\1<div class="sp-cards">\n' + cards.replace("\\", "\\\\") + "\n            </div>\n        </section>"
    src, n = pat.subn(lambda m: m.group(1) + '<div class="sp-cards">\n' + cards + "\n            </div>\n        </section>", src, count=1)
    assert n == 1, pillar

# footer service links on services.html -> service pages
for a, b in [('href="#web-development"', 'href="services/web-development.html"'),
             ('href="#native-apps"', 'href="services/native-mobile-apps.html"'),
             ('href="#shopify"', 'href="services/shopify-development.html"')]:
    src = src.replace('<li><a %s>' % a, '<li><a %s>' % b)
write("services.html", src)
print("generated %d service pages" % len(S))
