/* ===== Header scrolled state ===== */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ===== Reveal on scroll ===== */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduce) {
    reveals.forEach((el) => el.classList.add("in-view"));
} else {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("in-view");
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => io.observe(el));
}

/* ===== Blog modal ===== */
const blogPosts = {
    "custom-architecture": {
        tag: "Development",
        title: "Why custom architecture beats templated builds",
        image: "assets/img/custom_software.webp",
        date: "Sep 14, 2026",
        readTime: "4 min read",
        content: `
        
        <h2>Introduction</h2>
        <p>In today's competitive digital landscape, businesses face a critical decision early in their growth journey: should they build on a <strong>templated platform</strong> or invest in <strong>custom architecture</strong>? Templated builds think WordPress themes, drag and drop website builders or off the shelf SaaS templates, promise speed and low upfront cost. Custom architecture on the other hand is built from the ground up to match a business's exact needs.</p>
        
        <p>While templates can be a smart starting point for very simple projects, businesses that plan to scale, differentiate or compete seriously almost always outgrow them. This article breaks down exactly why <strong>custom architecture beats templated builds</strong> in the areas that matter most: performance, scalability, security, SEO and long-term cost.</p>
        
        
        <h2>1. Scalability: Built to Grow, Not Just to Launch</h2>
        <p>Templated builds are designed for the average use case, not <em>your</em> use case. As traffic, data and feature requirements grow, templates start showing cracks: slow load times, plugin conflicts and rigid database structures that can't handle complexity.</p>
        
        <p><strong>Custom architecture</strong> is designed with scalability in mind from day one. Developers can:</p>
        <ul>
            <li>Choose the right database structure for your data model</li>
            <li>Build modular systems that grow feature by feature without breaking existing functionality</li>
            <li>Optimize the codebase specifically for your traffic patterns and business logic</li>
        </ul>
        <p>This means a custom-built system can handle 10x growth without a costly rebuild, something templated platforms rarely manage gracefully.</p>

        <h2>2. Performance and Page Speed (Direct SEO Advantage)</h2>
        <p>Page speed is a confirmed ranking factor for search engines and it's also one of the biggest weaknesses of templated builds. Most templates are bloated with unused CSS, generic JavaScript libraries and unnecessary plugins that slow down load times.</p>
        
        <p>With <strong>custom web architecture</strong>, every line of code serves a purpose. This results in:</p>
        <ul>
            <li>Faster load times (a key Core Web Vitals metric)</li>
            <li>Lower bounce rates</li>
            <li>Better crawlability for search engine bots</li>
            <li>Improved mobile performance</li>
        </ul>
        <p>Since <strong>site speed directly impacts SEO rankings</strong>, businesses that choose custom-built websites often see measurable improvements in organic search visibility compared to their templated competitors.</p>

        <h2>3. Security: Fewer Vulnerabilities, More Control</h2>
        <p>Templated platforms are a popular target for hackers precisely <em>because</em> they're popular. A vulnerability found in a widely used theme or plugin can expose thousands of websites simultaneously.</p>
        
        <p>Custom architecture reduces this risk by:</p>
        <ul>
            <li>Eliminating unnecessary third-party plugins and their security gaps</li>
            <li>Allowing full control over authentication, data handling and server configuration</li>
            <li>Enabling security updates on your own schedule, not a vendor's</li>
        </ul>
        <p>For businesses handling sensitive customer data: e-commerce, fintech, healthcare. This level of control isn't optional, it's essential.</p>

        <h2>4. Brand Differentiation and User Experience</h2>
        <p>Templates are, by definition, shared by thousands of other businesses. Even with customization options, there's a ceiling to how unique a templated site can look, feel and customers notice.</p>
        
        <p>Custom architecture allows for:</p>
        <ul>
            <li>A fully unique user interface aligned with brand identity</li>
            <li>User flows designed around actual customer behavior, not generic assumptions</li>
            <li>Custom features and interactions competitors simply don't have access to</li>
        </ul>
        <p>This translates into better user engagement, stronger brand recall and higher conversion rates.</p>

        <h2>5. Long-Term Cost: The ROI Templates Don't Show You</h2>
        <p>Templated builds look cheaper upfront and they are initially. But hidden costs add up over time:</p>
        

        <style>
    .modern-table-wrapper {
        margin: 2rem 0;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15);
        overflow: hidden; 
        border: 1px solid #000000;
        background-color: #000000;
    }
    .modern-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        color: #d1d5db;
    }
    .modern-table th {
        background-color: #000000;
        color: #f9fafb;
        font-weight: 600;
        padding: 16px 20px;
        border-bottom: 2px solid #000000;
    }
    .modern-table td {
        padding: 16px 20px;
        border-bottom: 1px solid #000000;
    }
    .modern-table tbody tr:last-child td {
        border-bottom: none;
    }
    .modern-table tbody tr:hover {
        background-color: #000000;
        transition: background-color 0.2s ease;
    }
    .modern-table td strong {
        color: #f3f4f6;
        font-weight: 500;
    }
</style>

<div class="modern-table-wrapper">
    <table class="modern-table">
        <thead>
            <tr>
                <th>Factor</th>
                <th>Templated Build</th>
                <th>Custom Architecture</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Initial Cost</strong></td>
                <td>Low</td>
                <td>Higher</td>
            </tr>
            <tr>
                <td><strong>Scalability Costs</strong></td>
                <td>High (frequent rebuilds)</td>
                <td>Low (built to scale)</td>
            </tr>
            <tr>
                <td><strong>Plugin/License Fees</strong></td>
                <td>Ongoing, recurring</td>
                <td>None or minimal</td>
            </tr>
            <tr>
                <td><strong>Performance Optimization</strong></td>
                <td>Limited, often needs workarounds</td>
                <td>Built-in from the start</td>
            </tr>
            <tr>
                <td><strong>Long-Term ROI</strong></td>
                <td>Diminishes over time</td>
                <td>Increases over time</td>
            </tr>
        </tbody>
    </table>
</div>
        
        
        <br>
        <p>When you factor in plugin subscriptions, performance patches, security fixes and eventual platform migrations, <strong>custom architecture often proves more cost-effective over a 3-5 year horizon</strong>.</p>

        <h2>6. When Templated Builds Still Make Sense</h2>
        <p>To be fair, templates aren't inherently bad. They're a good fit when:</p>
        <ul>
            <li>You need a simple landing page or MVP validated quickly</li>
            <li>Budget constraints rule out custom development at launch</li>
            <li>The business has no immediate plans for scale or complex functionality</li>
        </ul>
        <p>The key is recognizing <em>when</em> a template stops serving the business and planning the transition to custom architecture before performance or security issues start costing customers.</p>

        <h2>Conclusion</h2>
        <p>Choosing between <strong>custom architecture and templated builds</strong> ultimately comes down to your growth ambitions. If you're building a long-term digital asset, one meant to scale, rank well in search engines, stay secure and stand out from competitors, custom architecture consistently delivers better results where it counts most.</p>
    `,
    },
    "seo-checklist": {
    tag: "SEO & Marketing",
    title: "A technical SEO checklist that actually moves rankings",
    image: "assets/img/seo.webp",
    date: "Sep 12, 2026",
    readTime: "8 min read",
    content: `
        <p><strong>Meta Description:</strong> A practical technical SEO checklist covering crawlability, site speed, structured data, and Core Web Vitals — the real factors that move search rankings in 2026.</p>
        
        <h2>Introduction</h2>
        <p>Most "SEO checklists" online repeat the same generic advice — write good titles, use keywords, build backlinks. But <strong>technical SEO</strong> is where the real ranking gains hide, and it's the part most businesses skip because it feels less glamorous than content.</p>
        
        <p>The truth is simple: if search engines can't crawl, render, or trust your site technically, no amount of great content will save your rankings. Below is a <strong>technical SEO checklist</strong> built around the factors that genuinely influence rankings today — not outdated myths.</p>
        
        
        <h2>1. Crawlability and Indexability</h2>
        <p>Before anything else, confirm search engines can actually find and index your pages.</p>
        <ul>
            <li><strong>Check your robots.txt file</strong> — make sure it isn't accidentally blocking important pages</li>
            <li><strong>Submit an updated XML sitemap</strong> via Google Search Console</li>
            <li><strong>Audit for orphan pages</strong> (pages with no internal links pointing to them)</li>
            <li><strong>Fix crawl errors</strong> in Search Console (404s, redirect chains, server errors)</li>
            <li><strong>Review canonical tags</strong> to avoid duplicate content confusion</li>
        </ul>
        <p>A single misconfigured <code>noindex</code> tag or blocked directory can silently tank an entire site's visibility.</p>

        <h2>2. Site Speed and Core Web Vitals</h2>
        <p>Page experience signals — specifically <strong>Core Web Vitals</strong> — remain one of the most measurable technical ranking factors.</p>
        <p>Focus on these three metrics:</p>
        <ul>
            <li><strong>Largest Contentful Paint (LCP)</strong> — should load under 2.5 seconds</li>
            <li><strong>Interaction to Next Paint (INP)</strong> — should stay under 200ms</li>
            <li><strong>Cumulative Layout Shift (CLS)</strong> — should stay under 0.1</li>
        </ul>
        <p>Practical fixes that move the needle:</p>
        <ul>
            <li>Compress and lazy-load images</li>
            <li>Minify CSS/JavaScript and remove unused code</li>
            <li>Use a CDN to reduce server response time</li>
            <li>Switch to modern image formats (WebP/AVIF)</li>
        </ul>

        <h2>3. Mobile-First Optimization</h2>
        <p>Google indexes the mobile version of your site by default. A site that looks great on desktop but breaks on mobile will lose rankings regardless of content quality.</p>
        <ul>
            <li>Test with Google's Mobile-Friendly Test</li>
            <li>Ensure tap targets and font sizes are usable on small screens</li>
            <li>Avoid intrusive interstitials/pop-ups on mobile</li>
        </ul>

        <h2>4. Site Architecture and Internal Linking</h2>
        <p>Search engines rely on your site's structure to understand which pages matter most.</p>
        <ul>
            <li>Keep important pages within <strong>3 clicks</strong> of the homepage</li>
            <li>Use a logical URL structure (avoid deep, messy nesting)</li>
            <li>Build internal links using descriptive, keyword-relevant anchor text</li>
            <li>Group related content into topic clusters/silos</li>
        </ul>
        <p>Strong internal linking distributes "link equity" across your site and helps rank supporting pages, not just your homepage.</p>

        <h2>5. Structured Data (Schema Markup)</h2>
        <p>Structured data doesn't directly boost rankings, but it significantly improves how search engines <em>understand and display</em> your content — which drives higher click-through rates.</p>
        <p>Priority schema types to implement:</p>
        <ul>
            <li>Organization / LocalBusiness schema</li>
            <li>Article / BlogPosting schema</li>
            <li>FAQ and HowTo schema (where relevant)</li>
            <li>Product and Review schema (for e-commerce)</li>
            <li>Breadcrumb schema</li>
        </ul>
        <p>Validate everything with Google's Rich Results Test before deploying.</p>

        <h2>6. HTTPS and Site Security</h2>
        <p>HTTPS has been a baseline ranking signal for years, but it's still worth auditing:</p>
        <ul>
            <li>Confirm all pages redirect properly from HTTP to HTTPS</li>
            <li>Check for mixed content warnings (HTTP resources on HTTPS pages)</li>
            <li>Renew SSL certificates before expiration to avoid trust warnings</li>
        </ul>

        <h2>7. Duplicate Content and Canonicalization</h2>
        <p>Duplicate content dilutes ranking signals across multiple URLs instead of consolidating them into one strong page.</p>
        <ul>
            <li>Use canonical tags consistently across paginated or filtered content</li>
            <li>Set preferred URL parameters in Search Console</li>
            <li>Watch for duplicate content created by both <code>www</code> and non-<code>www</code> versions, or trailing slashes</li>
        </ul>

        <h2>8. Log File Analysis (For Larger Sites)</h2>
        <p>For larger websites, checking server log files reveals exactly how search engine bots crawl your site — data that Search Console alone doesn't show.</p>
        <ul>
            <li>Identify pages being crawled too often (wasting crawl budget)</li>
            <li>Spot important pages that bots rarely visit</li>
            <li>Detect crawl traps caused by faceted navigation or infinite URL parameters</li>
        </ul>

        <h2>9. Structured URL and Redirect Management</h2>
        <ul>
            <li>Avoid unnecessary redirect chains (A → B → C); redirect directly (A → C)</li>
            <li>Use 301 redirects for permanently moved content</li>
            <li>Regularly audit for broken internal links</li>
        </ul>

        <h2>10. Monitor, Don't "Set and Forget"</h2>
        <p>Technical SEO isn't a one-time checklist — it requires ongoing monitoring:</p>
        <ul>
            <li>Set up automated crawl audits (weekly or monthly)</li>
            <li>Track Core Web Vitals trends in Search Console over time</li>
            <li>Monitor indexation status after major site changes or migrations</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Content and backlinks get most of the attention in SEO conversations, but <strong>technical SEO is the foundation everything else depends on</strong>. A perfectly optimized blog post won't rank if the page takes 6 seconds to load, isn't indexed, or sits three redirect hops deep.</p>
        
        <p>Running through this checklist regularly — crawlability, speed, mobile experience, structured data, and site architecture — is what actually moves rankings, rather than just checking boxes.</p>
    `,
},
    "shopify-conversion": {
    tag: "eCommerce",
    title: "What actually moves Shopify conversion rate",
    image: "assets/img/shopifyconversion.webp",
    date: "Sep 10, 2026",
    readTime: "5 min read",
    content: `
        <p><strong>Meta Description:</strong> Discover the proven factors that actually improve Shopify conversion rates — from page speed and checkout flow to trust signals and product page optimization.</p>
        
        <h2>Introduction</h2>
        <p>The average Shopify store converts at roughly <strong>1–2%</strong>, yet top-performing stores in the same niches regularly hit <strong>3–5% or higher</strong>. The difference usually isn't luck, a bigger ad budget, or a trendier theme — it's a handful of specific, measurable factors that most store owners overlook.</p>
        
        <p>This guide breaks down <strong>what actually moves Shopify conversion rate</strong>, based on the elements that consistently separate high-converting stores from the rest.</p>
        
        
        <h2>1. Page Speed (Especially on Mobile)</h2>
        <p>Over 70% of Shopify traffic is mobile, and speed is one of the strongest predictors of conversion rate. Every additional second of load time increases bounce rate and cart abandonment.</p>
        <p>What actually helps:</p>
        <ul>
            <li>Compress product images (WebP format, proper sizing)</li>
            <li>Limit the number of apps installed — each one adds script weight</li>
            <li>Choose a lightweight, well-coded theme instead of a feature-bloated one</li>
            <li>Enable lazy loading for below-the-fold images</li>
        </ul>
        <p>A store that loads in under 2 seconds will consistently outperform a slower competitor, even with identical products and pricing.</p>

        <h2>2. Checkout Flow Simplicity</h2>
        <p>Checkout is where most conversions are lost. Shopify's checkout is already optimized, but store owners can still improve the path leading up to it.</p>
        <ul>
            <li>Enable <strong>Shop Pay</strong> and other express checkout options to reduce steps</li>
            <li>Offer guest checkout — don't force account creation</li>
            <li>Minimize form fields to only what's essential</li>
            <li>Display shipping costs and estimated delivery early, not as a surprise at checkout</li>
        </ul>
        <p>Unexpected costs at checkout remain one of the top reasons for cart abandonment across all e-commerce platforms, not just Shopify.</p>

        <h2>3. Product Page Optimization</h2>
        <p>The product page is where buying decisions actually happen. High-converting product pages consistently include:</p>
        <ul>
            <li><strong>High-quality images</strong> from multiple angles, plus lifestyle shots</li>
            <li><strong>Short-form video</strong> showing the product in use</li>
            <li>Clear, benefit-driven descriptions (not just specs)</li>
            <li>Visible size/fit guides for apparel</li>
            <li>Social proof — reviews, ratings, and user-generated content directly on the page</li>
        </ul>
        <p>Stores that A/B test product page layouts typically find that moving reviews and trust badges closer to the "Add to Cart" button improves conversion.</p>

        <h2>4. Trust Signals</h2>
        <p>Shoppers convert when they feel confident the store is legitimate and the purchase is safe.</p>
        <p>Key trust elements that move the needle:</p>
        <ul>
            <li>Visible SSL/security badges near checkout</li>
            <li>Clear, easy-to-find return and refund policy</li>
            <li>Real customer reviews (with photos, where possible)</li>
            <li>Contact information and responsive customer support options</li>
            <li>Recognizable payment icons (Visa, PayPal, Shop Pay, etc.)</li>
        </ul>
        <p>New or lesser-known brands benefit the most from stacking multiple trust signals, since they haven't yet built organic brand trust.</p>

        <h2>5. Smart Use of Urgency and Scarcity</h2>
        <p>When used honestly, urgency and scarcity cues can meaningfully lift conversion rate:</p>
        <ul>
            <li>Low-stock indicators ("Only 3 left")</li>
            <li>Limited-time offers with a visible countdown</li>
            <li>Free shipping thresholds ("Add $15 more for free shipping")</li>
        </ul>
        <p>The key is authenticity — fake countdowns or perpetually "almost sold out" products erode trust once customers notice the pattern.</p>

        <h2>6. Site Search and Navigation</h2>
        <p>Visitors who use on-site search convert at significantly higher rates than those who browse manually — but only if the search actually works well.</p>
        <ul>
            <li>Use a search app with typo-tolerance and filtering (many default Shopify searches are weak)</li>
            <li>Organize collections clearly by category, not just by "New Arrivals"</li>
            <li>Ensure filtering (size, color, price) works smoothly on mobile</li>
        </ul>

        <h2>7. Personalization and Upsells</h2>
        <p>Strategic product recommendations increase average order value and conversion simultaneously.</p>
        <ul>
            <li>"Frequently bought together" bundles</li>
            <li>Post-purchase upsell offers</li>
            <li>Personalized recommendations based on browsing behavior</li>
        </ul>
        <p>These work best when relevant and non-intrusive — aggressive upselling before checkout can backfire.</p>

        <h2>8. Clear, Benefit-Focused Copywriting</h2>
        <p>Generic product descriptions ("100% cotton, machine washable") convert far worse than benefit-driven copy that answers "why should I care?"</p>
        <ul>
            <li>Lead with the problem the product solves</li>
            <li>Use natural language your actual customers would use (this also helps organic SEO)</li>
            <li>Keep copy scannable — short paragraphs, bullet points, bolded key benefits</li>
        </ul>

        <h2>9. Load-Bearing Apps vs. App Bloat</h2>
        <p>Every Shopify app added to a store has a tradeoff between functionality and performance. Store owners should regularly audit installed apps and remove:</p>
        <ul>
            <li>Apps that aren't actively used</li>
            <li>Apps duplicating built-in Shopify functionality</li>
            <li>Apps significantly slowing down page load (checked via Shopify's theme speed report)</li>
        </ul>

        <h2>10. Continuous A/B Testing</h2>
        <p>The stores that consistently improve conversion rate over time don't guess — they test.</p>
        <ul>
            <li>Test one variable at a time (headline, image, CTA button color/copy)</li>
            <li>Use tools like Google Optimize alternatives or built-in Shopify apps for A/B testing</li>
            <li>Let tests run long enough to reach statistical significance before making decisions</li>
        </ul>

        

        <h2>Conclusion</h2>
        <p>Improving <strong>Shopify conversion rate</strong> isn't about chasing every new app or theme trend — it's about consistently optimizing the fundamentals: speed, trust, a frictionless checkout, and product pages that actually answer customer questions. Stores that systematically work through these factors see compounding gains, often outperforming competitors with bigger marketing budgets but weaker on-site experience.</p>
    `,
},
};

const blogModal = document.getElementById("blogModal");
if (blogModal) {
    const modalImg = document.getElementById("blogModalImg");
    const modalTag = document.getElementById("blogModalTag");
    const modalTitle = document.getElementById("blogModalTitle");
    const modalMeta = document.getElementById("blogModalMeta");
    const modalContent = document.getElementById("blogModalContent");
    let lastFocused = null;

    const openBlogModal = (id) => {
        const post = blogPosts[id];
        if (!post) return;
        modalImg.src = post.image;
        modalImg.alt = post.title;
        modalTag.textContent = post.tag;
        modalTitle.textContent = post.title;
        modalMeta.innerHTML = `<span>${post.date}</span><span>·</span><span>${post.readTime}</span>`;
        modalContent.innerHTML = post.content;
        lastFocused = document.activeElement;
        blogModal.classList.add("is-open");
        blogModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        blogModal.querySelector(".blog-modal__close").focus();
    };

    const closeBlogModal = () => {
        blogModal.classList.remove("is-open");
        blogModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll("[data-post]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            openBlogModal(el.getAttribute("data-post"));
        });
        if (el.classList.contains("blog-card")) {
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBlogModal(el.getAttribute("data-post"));
                }
            });
        }
    });

    blogModal.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", closeBlogModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && blogModal.classList.contains("is-open")) {
            closeBlogModal();
        }
    });
}

/* ===== Drag-to-scroll (portfolio + testimonials + blog) ===== */
function initDragTrack(track) {
    if (!track) return;
    let down = false,
        startX = 0,
        startScroll = 0,
        moved = false;

    track.addEventListener("pointerdown", (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        down = true;
        moved = false;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.classList.add("dragging");
    });

    window.addEventListener("pointermove", (e) => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startScroll - dx;
    });

    const end = () => {
        if (!down) return;
        down = false;
        track.classList.remove("dragging");
    };
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);

    track.addEventListener(
        "click",
        (e) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
            }
        },
        true,
    );

    track.addEventListener(
        "wheel",
        (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                track.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        },
        { passive: true },
    );
}

initDragTrack(document.getElementById("pfTrack"));
initDragTrack(document.getElementById("tqTrack"));
initDragTrack(document.getElementById("blogTrack"));

const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
    const note = document.getElementById("newsletterNote");
    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        note.textContent = "Thanks — you're on the list.";
        note.classList.add("is-success");
        newsletterForm.reset();
    });
}

/* ===== Mobile nav toggle ===== */
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
if (navToggle && mobileNav) {
    const closeMobileNav = () => {
        mobileNav.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
        const isOpen = mobileNav.classList.toggle("open");
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobileNav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", closeMobileNav);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) closeMobileNav();
    });
}


/* ===== Privacy Policy / Terms modal ===== */
const legalContent = {
    privacy: {
        title: "Privacy Policy",
        updated: "Last updated: September 2026",
        content: `
            <p>This Privacy Policy describes how DeepTech ("we", "us", "our") collects, uses, and protects information when you visit our website or use our services.</p>
            <h3>Information We Collect</h3>
            <p>We may collect information you provide directly to us, such as your name, email address, phone number, and any details you share when requesting a quote or subscribing to our newsletter. We may also automatically collect certain technical information, including your IP address, browser type, and pages visited, to help us understand how our site is used.</p>
            <h3>How We Use Your Information</h3>
            <ul>
                <li>To respond to inquiries and provide quotes</li>
                <li>To deliver the services you've requested</li>
                <li>To send updates, newsletters, or marketing communications (only if you've opted in)</li>
                <li>To improve our website and services</li>
            </ul>
            <h3>Sharing Your Information</h3>
            <p>We do not sell your personal information. We may share information with trusted third-party service providers who help us operate our business (such as hosting or email delivery), and only to the extent necessary for them to perform those services.</p>
            <h3>Data Security</h3>
            <p>We take reasonable technical and organizational measures to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.</p>
            <h3>Your Rights</h3>
            <p>You may request access to, correction of, or deletion of your personal information at any time by contacting us at info@deeptechtechnologies.com.</p>
            <h3>Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
            <p><em>This is placeholder text. Please replace with your finalized privacy policy before publishing.</em></p>
        `,
    },
    terms: {
        title: "Terms of Service",
        updated: "Last updated: September 2026",
        content: `
            <p>These Terms of Service ("Terms") govern your use of the DeepTech website and services. By accessing our website or engaging our services, you agree to these Terms.</p>
            <h3>Services</h3>
            <p>DeepTech provides software development, web design, mobile app development, and digital marketing services. The specific scope, timeline, and cost of any engagement will be outlined in a separate proposal or agreement.</p>
            <h3>Quotes and Payment</h3>
            <p>Quotes provided are estimates based on the information available at the time and may be revised once full project requirements are confirmed. Payment terms, including any deposits or milestone payments, will be specified in the project agreement.</p>
            <h3>Intellectual Property</h3>
            <p>Unless otherwise agreed in writing, ownership of final deliverables transfers to the client upon full payment. DeepTech retains the right to showcase completed work in its portfolio unless the client requests otherwise.</p>
            <h3>Client Responsibilities</h3>
            <p>Clients are responsible for providing timely feedback, content, and access required to complete a project. Delays caused by incomplete information may affect project timelines.</p>
            <h3>Limitation of Liability</h3>
            <p>DeepTech is not liable for indirect, incidental, or consequential damages arising from the use of our services, to the fullest extent permitted by law.</p>
            <h3>Termination</h3>
            <p>Either party may terminate an ongoing engagement as outlined in the specific project agreement. Fees for work completed up to the termination date remain payable.</p>
            <h3>Governing Law</h3>
            <p>These Terms are governed by the laws applicable in Pakistan, without regard to conflict of law principles.</p>
            <p><em>This is placeholder text. Please replace with your finalized terms of service before publishing.</em></p>
        `,
    },
};

const legalModal = document.getElementById("legalModal");
if (legalModal) {
    const legalTitle = document.getElementById("legalModalTitle");
    const legalMeta = document.getElementById("legalModalMeta");
    const legalContentEl = document.getElementById("legalModalContent");
    let legalLastFocused = null;

    const openLegalModal = (key) => {
        const doc = legalContent[key];
        if (!doc) return;
        legalTitle.textContent = doc.title;
        legalMeta.innerHTML = `<span>${doc.updated}</span>`;
        legalContentEl.innerHTML = doc.content;
        legalLastFocused = document.activeElement;
        legalModal.classList.add("is-open");
        legalModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        legalModal.querySelector(".blog-modal__close").focus();
    };

    const closeLegalModal = () => {
        legalModal.classList.remove("is-open");
        legalModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (legalLastFocused) legalLastFocused.focus();
    };

    document.querySelectorAll("[data-legal]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            openLegalModal(el.getAttribute("data-legal"));
        });
    });

    legalModal.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", closeLegalModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && legalModal.classList.contains("is-open")) {
            closeLegalModal();
        }
    });
}

/* ===== Hero video: robust cross-browser autoplay (Safari/iOS-safe) ===== */
const heroVideo = document.getElementById("heroVideo");
if (heroVideo) {
    // Safari requires muted to be set as a live property, not just the HTML attribute,
    // and it must be set before play() is ever attempted.
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.setAttribute("muted", "");
    heroVideo.playsInline = true;
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "true");

    let attempts = 0;
    const tryPlay = () => {
        attempts++;
        const p = heroVideo.play();
        if (p !== undefined) {
            p.catch(() => {
                // Safari sometimes rejects the very first play() call before
                // the video has enough data buffered — retry a couple of times
                // once metadata/data is available, then fall back to a
                // user-gesture resume (iOS low-power mode, etc.).
                if (attempts < 4) {
                    setTimeout(tryPlay, 300);
                    return;
                }
                const resume = () => {
                    heroVideo.play().catch(() => {});
                    document.removeEventListener("touchstart", resume);
                    document.removeEventListener("click", resume);
                };
                document.addEventListener("touchstart", resume, { once: true, passive: true });
                document.addEventListener("click", resume, { once: true });
            });
        }
    };

    // Kick off as soon as enough data is available, and again on load,
    // and again when the tab/page becomes visible (iOS Safari can pause
    // background video and not auto-resume it).
    if (heroVideo.readyState >= 2) {
        tryPlay();
    } else {
        heroVideo.addEventListener("loadeddata", tryPlay, { once: true });
        heroVideo.addEventListener("canplay", tryPlay, { once: true });
    }
    window.addEventListener("load", tryPlay);
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden && heroVideo.paused) tryPlay();
    });
    heroVideo.addEventListener("pause", () => {
        if (!document.hidden) tryPlay();
    });
}

/* ===== Hero intro: looping label <-> typewriter headline, both typed, mirrored exits ===== */
const heroLabel = document.getElementById("heroLabel");
const heroLabelLine1 = document.getElementById("heroLabelLine1");
const heroLabelLine2 = document.getElementById("heroLabelLine2");
const heroTypewriter = document.getElementById("heroTypewriter");
const heroLine1 = document.getElementById("heroLine1");
const heroLine2 = document.getElementById("heroLine2");
const heroPills = document.getElementById("heroPills");

if (heroLabel && heroLabelLine1 && heroLabelLine2 && heroTypewriter && heroLine1 && heroLine2) {
    const LABEL_LINE1 = "Hey there, meet DeepTech";
    const LABEL_LINE2 = "your software & growth engineering partner.";
    const HEAD_LINE1 = "We don't just build software.";
    const HEAD_LINE2 = "We engineer growth.";

    const TYPE_SPEED = 32; // ms per character
    const LABEL_HOLD = 1600; // ms label stays fully visible before exiting
    const HEADLINE_HOLD = 2400; // ms headline stays fully visible before exiting
    const TRANSITION = 700; // ms, matches CSS transition duration

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const typeText = (el, text, onDone) => {
        let i = 0;
        const tick = () => {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                i++;
                setTimeout(tick, TYPE_SPEED);
            } else if (onDone) {
                onDone();
            }
        };
        tick();
    };

    const clearClasses = (el) => {
        el.classList.remove("hero__intro-line--in", "hero__intro-line--exit-up", "hero__intro-line--exit-down");
    };

    if (reduceMotion) {
        heroLabel.style.display = "none";
        heroLine1.textContent = HEAD_LINE1;
        heroLine2.textContent = HEAD_LINE2;
        heroTypewriter.classList.add("hero__intro-line--in");
        document.querySelectorAll(".hero__cursor").forEach((c) => (c.style.display = "none"));
        if (heroPills) heroPills.classList.add("is-visible");
    } else {
        const loop = () => {
            // reset both lines to hidden state
            heroLabelLine1.textContent = "";
            heroLabelLine2.textContent = "";
            heroLine1.textContent = "";
            heroLine2.textContent = "";
            clearClasses(heroLabel);
            clearClasses(heroTypewriter);

            // 1. type + fade in the label
            heroLabel.classList.add("hero__intro-line--in");
            typeText(heroLabelLine1, LABEL_LINE1, () => {
                typeText(heroLabelLine2, LABEL_LINE2, () => {
                    // 2. hold, then exit label upward+blur
                    setTimeout(() => {
                        heroLabel.classList.remove("hero__intro-line--in");
                        heroLabel.classList.add("hero__intro-line--exit-up");

                        // 3. after exit transition, type + fade in the headline
                        setTimeout(() => {
                            heroTypewriter.classList.add("hero__intro-line--in");
                            typeText(heroLine1, HEAD_LINE1, () => {
                                typeText(heroLine2, HEAD_LINE2, () => {
                                    if (heroPills && !heroPills.classList.contains("is-visible")) {
                                        heroPills.classList.add("is-visible");
                                    }
                                    // 4. hold, then exit headline downward+blur
                                    setTimeout(() => {
                                        heroTypewriter.classList.remove("hero__intro-line--in");
                                        heroTypewriter.classList.add("hero__intro-line--exit-down");

                                        // 5. after exit transition, loop back to label
                                        setTimeout(loop, TRANSITION);
                                    }, HEADLINE_HOLD);
                                });
                            });
                        }, TRANSITION);
                    }, LABEL_HOLD);
                });
            });
        };

        loop();
    }
}

/* ===== Email pill: copy to clipboard ===== */
const pillEmail = document.getElementById("pillEmail");
if (pillEmail) {
    pillEmail.addEventListener("click", () => {
        const email = pillEmail.getAttribute("data-email");
        if (navigator.clipboard && email) {
            navigator.clipboard.writeText(email).then(() => {
                const label = pillEmail.querySelector("span");
                const original = label.innerHTML;
                label.textContent = "Copied!";
                setTimeout(() => {
                    label.innerHTML = original;
                }, 1500);
            });
        }
    });
}

/* ===== Theme toggle (light default, persisted) ===== */
(function () {
    const root = document.documentElement;
    const STORAGE_KEY = "deeptech-theme";

    const getTheme = () => root.getAttribute("data-theme") || "light";
    const setTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
        document.querySelectorAll(".mobile-nav__theme-label").forEach((el) => {
            el.textContent = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        });
        [themeToggle, themeToggleMobile].forEach((btn) => {
            if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        });
    };

    const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

    const themeToggle = document.getElementById("themeToggle");
    const themeToggleMobile = document.getElementById("themeToggleMobile");

    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

    // sync label/aria state on load in case theme was set by the inline head script
    setTheme(getTheme());
})();



/* ===== Portfolio case study modal ===== */
const portfolioProjects = {
    "retail-shopify": {
        tag: "SEO and Development",
        title: "FinTech Platform & Trading Academy Build",
        image: "assets/img/GM-official.webp",
        client: "Forex Investment & Education",
        timeframe: "9 weeks",
        overview: `
            <p>GM Official Services needed a highly professional, secure platform to manage their dual-offering: institutional-grade managed Forex accounts and a structured Trading Academy. We built a custom web experience from the ground up, focused on investor transparency, seamless course enrollments, and a frictionless checkout system to support their AI Trading Bot and expanding educational catalog.</p>
        `,
        process: [
            "Audited their service model to design a clear information architecture that effectively separates the Trading Academy from the Managed Forex Accounts",
            "Developed a secure, mobile-first e-commerce cart flow for purchasing trading courses and AI bot access with zero friction",
            "Built a lightweight, custom theme emphasizing institutional trust, capital safety, and transparent risk management",
            "Integrated a structured, step-by-step learning interface allowing students to progress through trading modules and assessments smoothly",
            "Configured dedicated, instant communication channels (like WhatsApp) to provide seamless support for modern investors",
        ],
        tech: ["WordPress", "WooCommerce", "JavaScript", "Payment APIs", "Figma"],
        results: [
            { num: "+45%", label: "Course Enrollments" },
            { num: "+60%", label: "Lead Conversion Rate" },
            { num: "8 wks", label: "Time to launch" },
        ],
    },
    "ahmed-fashion": {
        tag: "E-Commerce Development",
        title: "Wholesale Fashion E-Commerce",
        image: "assets/img/ahmedfashion.webp",
        client: "Apparel Manufacturer & Wholesaler",
        timeframe: "6 weeks",
        overview: `
            <p>The client, a leading manufacturer of girls' traditional Pakistani wear, needed to digitize their physical wholesale operations. They required a platform that could elegantly showcase their intricate, ready-to-wear fancy dresses while simultaneously handling bulk B2B inquiries and direct retail sales. We built a visually rich, high-performing online store designed to highlight their premium fabrics and seamlessly bridge the gap between wholesale buyers and the factory.</p>
        `,
        process: [
            "Mapped out a highly structured product catalog, allowing users to intuitively filter by traditional styles (Gharara, Lahanga) and fabrics",
            "Designed a mobile-first, image-centric product page layout to showcase intricate embroidery, craftsmanship, and fabric quality",
            "Implemented a hybrid purchasing flow featuring a standard cart alongside a dedicated 'Get Quotes' and WhatsApp integration to facilitate fast B2B deal negotiations",
            "Rebuilt the digital storefront on a lightweight, custom architecture to ensure lightning-fast page speeds despite a media-heavy product gallery",
            "Streamlined the user journey for store owners and retail shoppers alike, drastically reducing bounce rates on mobile devices"
        ],
        tech: ["WooCommerce", "PHP", "JavaScript", "WhatsApp API", "Figma"],
        results: [
            { num: "+210%", label: "Wholesale inquiries" },
            { num: "+42%", label: "Mobile conversion" },
            { num: "6 wks", label: "Time to launch" },
        ],
    },
    "estimation-center": {
        tag: "B2B Web Development",
        title: "Construction Bidding & Takeoff Platform",
        image: "assets/img/estimationcenter.webp",
        client: "Construction Estimation Agency",
        timeframe: "5 weeks",
        overview: `
            <p>Estimation Center, a leading provider of pre-construction bidding and quantity takeoff services, needed a professional digital presence to attract general contractors and developers. They required a trust-driven platform that clearly communicated their tech-driven accuracy and fast turnaround times. We designed and built a lead-generation website focused on streamlining quote requests and showcasing their comprehensive estimation process across all major construction trades.</p>
        `,
        process: [
            "Mapped the site architecture to clearly highlight specialized estimation services across major CSI categories (Concrete, Electrical, Plumbing, HVAC)",
            "Designed a clean, corporate UI aimed at building immediate trust and authority with general contractors",
            "Implemented a frictionless 'Get Free Quote' lead-capture flow to streamline client inquiries and project document uploads",
            "Built the platform on a lightweight, responsive architecture to ensure flawless browsing on both desktop and mobile job-site environments",
            "Optimized the site's technical structure and content for targeted B2B search visibility in the construction niche"
        ],
        tech: ["WordPress", "PHP", "JavaScript", "Figma", "Technical SEO"],
        results: [
            { num: "+150%", label: "Quote requests" },
            { num: "5 wks", label: "Time to launch" },
            { num: "100%", label: "Mobile accessibility" },
        ],
    },
    "halal-guidelines": {
        tag: "B2B Web Development",
        title: "Halal Certification Consulting Platform",
        image: "assets/img/halalguidelines.webp",
        client: "Halal Certification Services (USA)",
        timeframe: "4 weeks",
        overview: `
            <p>Halal Guidelines provides end-to-end consulting for US-based food businesses, bakeries, and manufacturers seeking Halal certification. They needed a professional, authoritative digital presence to explain their complex 6-step certification process, build trust with food industry executives, and capture high-intent B2B leads. We designed and built a streamlined platform that simplifies the regulatory journey and converts visitors into consultation bookings.</p>
        `,
        process: [
            "Structured the site architecture to clearly break down the certification lifecycle—from ingredient checking and production compliance to the final audit",
            "Designed a clean, corporate UI that establishes immediate authority and trust with restaurant owners and food manufacturers",
            "Implemented a frictionless lead-capture system to streamline application submissions, initial document reviews, and consultation bookings",
            "Optimized the platform's technical SEO to capture targeted organic search traffic for Halal certification services in the US market",
            "Built the platform on a lightweight, responsive architecture to ensure accessibility and fast load times across all devices"
        ],
        tech: ["WordPress", "PHP", "JavaScript", "Figma", "Technical SEO"],
        results: [
            { num: "+180%", label: "Consultation leads" },
            { num: "4 wks", label: "Time to launch" },
            { num: "100%", label: "Mobile accessibility" },
        ],
    },
    "bilal-toys": {
        tag: "E-Commerce Development",
        title: "B2C Toy Retail Platform",
        image: "assets/img/bilaltoys.webp",
        client: "Bilal Toys",
        timeframe: "4 weeks",
        overview: `
            <p>Bilal Toys, an emerging online toy retailer in Pakistan, needed a vibrant and user-friendly digital storefront to manage their growing inventory of children's toys, STEM kits, and educational games. We built a fast, mobile-optimized e-commerce platform designed to make browsing intuitive for parents while streamlining the checkout and nationwide delivery processes.</p>
        `,
        process: [
            "Structured a comprehensive product taxonomy, organizing hundreds of SKUs into intuitive categories like Baby & Infant, STEM Education, Wooden Toys, and Action Figures",
            "Designed a playful, family-friendly UI that builds trust with parents through clear product descriptions, age-group targeting, and high-quality imagery",
            "Optimized the mobile shopping experience to ensure frictionless browsing and fast checkout for on-the-go shoppers",
            "Integrated secure local payment methods and automated shipping rate calculations for nationwide delivery across Pakistan",
            "Implemented a lightweight theme architecture to ensure rapid page load speeds despite a media-heavy product catalog"
        ],
        tech: ["WooCommerce", "PHP", "JavaScript", "Payment APIs", "Figma"],
        results: [
            { num: "+120%", label: "Online sales" },
            { num: "4 wks", label: "Time to launch" },
            { num: "-65%", label: "Mobile bounce rate" },
        ],
    },
    "damascus-depot": {
        tag: "E-Commerce Development",
        title: "Premium Hand-Forged Knives E-Commerce",
        image: "assets/img/damascusdepot.webp",
        client: "Damascus Depot",
        timeframe: "5 weeks",
        overview: `
            <p>Damascus Depot, a retailer of premium hand-forged Damascus steel knives and outdoor gear, needed a robust digital storefront to expand their international reach. They required a platform that matched the rugged, high-quality nature of their craftsmanship while handling a diverse catalog of hunting knives, chef sets, and swords. We built a visually immersive e-commerce experience optimized for global sales, high-resolution product showcasing, and seamless cross-border checkout.</p>
        `,
        process: [
            "Designed a premium, rugged UI focused on high-resolution image galleries to highlight the intricate patterns and craftsmanship of the Damascus steel",
            "Structured a detailed product catalog with intuitive filtering for blade types, handle materials, and intended use (e.g., hunting, culinary, tactical)",
            "Integrated international payment gateways and automated shipping calculators to support frictionless cross-border commerce",
            "Optimized individual product pages to include detailed technical specifications, zoomed-in imagery, and care instructions to build buyer confidence",
            "Implemented technical SEO strategies targeting high-intent keywords for custom and hand-forged knives to drive niche organic traffic"
        ],
        tech: ["WooCommerce", "PHP", "JavaScript", "Payment APIs", "Figma"],
        results: [
            { num: "+135%", label: "International sales" },
            { num: "5 wks", label: "Time to launch" },
            { num: "+50%", label: "Mobile conversions" },
        ],
    }
};

const portfolioModal = document.getElementById("portfolioModal");
if (portfolioModal) {
    const pModalImg = document.getElementById("portfolioModalImg");
    const pModalTag = document.getElementById("portfolioModalTag");
    const pModalTitle = document.getElementById("portfolioModalTitle");
    const pModalMeta = document.getElementById("portfolioModalMeta");
    const pModalContent = document.getElementById("portfolioModalContent");
    let pLastFocused = null;

    const renderResults = (results) =>
        `<div class="case-results">${results
            .map(
                (r) =>
                    `<div><span class="case-results__num">${r.num}</span><span class="case-results__label">${r.label}</span></div>`,
            )
            .join("")}</div>`;

    const renderTech = (tech) =>
        `<div class="case-tech">${tech.map((t) => `<span>${t}</span>`).join("")}</div>`;

    const renderProcess = (steps) =>
        `<ul>${steps.map((s) => `<li>${s}</li>`).join("")}</ul>`;

    const openPortfolioModal = (id) => {
        const project = portfolioProjects[id];
        if (!project) return;
        pModalImg.src = project.image;
        pModalImg.alt = project.title;
        pModalTag.textContent = project.tag;
        pModalTitle.textContent = project.title;
        pModalMeta.innerHTML = `<span>${project.client}</span><span>·</span><span>${project.timeframe}</span>`;
        pModalContent.innerHTML = `
            ${project.overview}
            <div class="case-section-title">Results</div>
            ${renderResults(project.results)}
            <div class="case-section-title">How we built it</div>
            ${renderProcess(project.process)}
            <div class="case-section-title">Tech stack</div>
            ${renderTech(project.tech)}
        `;
        pLastFocused = document.activeElement;
        portfolioModal.classList.add("is-open");
        portfolioModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        portfolioModal.querySelector(".blog-modal__close").focus();
    };

    const closePortfolioModal = () => {
        portfolioModal.classList.remove("is-open");
        portfolioModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (pLastFocused) pLastFocused.focus();
    };

    document.querySelectorAll("[data-project]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            openPortfolioModal(el.getAttribute("data-project"));
        });
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPortfolioModal(el.getAttribute("data-project"));
            }
        });
    });

    portfolioModal.querySelectorAll("[data-close]").forEach((el) => {
        el.addEventListener("click", closePortfolioModal);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && portfolioModal.classList.contains("is-open")) {
            closePortfolioModal();
        }
    });
}

/* ===== Cookie Banner & Analytics ===== */
document.addEventListener("DOMContentLoaded", () => {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");

    // Replace this with your actual Google Analytics Measurement ID
    const GA_MEASUREMENT_ID = 'G-N3XTF9FKGB';
    let gaLoaded = false;

    // Function to dynamically inject Google Analytics (guarded against double-injection)
    const loadGoogleAnalytics = () => {
        if (gaLoaded || window.gtag) return;
        gaLoaded = true;

        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        // Anonymize IPs and respect the consent flow that triggered this call
        window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
    };

    if (cookieBanner && acceptBtn && declineBtn) {
        // Check if the user has already consented
        const consentStatus = localStorage.getItem("deeptech-cookie-consent");

        if (consentStatus === "accepted") {
            // If they already accepted in a previous session, load GA immediately
            loadGoogleAnalytics();
        } else if (!consentStatus) {
            // If no choice has been made, show the banner
            setTimeout(() => {
                cookieBanner.classList.add("is-visible");
                cookieBanner.setAttribute("aria-hidden", "false");
            }, 1000); // 1-second delay so it doesn't interrupt the initial page load animation
        }

        // Handle Accept Click
        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("deeptech-cookie-consent", "accepted");
            cookieBanner.classList.remove("is-visible");
            cookieBanner.setAttribute("aria-hidden", "true");
            loadGoogleAnalytics(); // Start tracking now
        });

        // Handle Decline Click
        declineBtn.addEventListener("click", () => {
            localStorage.setItem("deeptech-cookie-consent", "declined");
            cookieBanner.classList.remove("is-visible");
            cookieBanner.setAttribute("aria-hidden", "true");
            // We do NOT load GA here.
        });
    }
});
