// Minimal WebMCP tool registration example (experimental API, Chrome 149+)
// Registers a "request_quote" action an AI agent could invoke directly.
if ('modelContext' in navigator) {
    navigator.modelContext.registerTool({
        name: "request_quote",
        description: "Open the quote request form on the DeepTech site",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
            document.querySelector('#cta')?.scrollIntoView({ behavior: 'smooth' });
            return { content: [{ type: "text", text: "Scrolled to the quote request section." }] };
        }
    });
}
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

/* ===== Blog cards: whole card opens its post page ===== */
document.querySelectorAll(".blog-card[data-href]").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return; // real links navigate natively
        window.location.href = card.dataset.href;
    });
});

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
    <p>This Privacy Policy outlines how DeepTech Technologies ("DeepTech", "we", "us", or "our") collects, processes, stores, and protects personal data when you visit our website, interact with our platforms, or engage our engineering and technical services.</p>

    <h3>1. Information We Collect</h3>
    <p>We collect personal information to deliver reliable services, maintain system security, and manage client engagements. This falls into three categories:</p>
    <ul>
        <li><strong>Directly Provided Information:</strong> Contact details (name, email address, phone number), business credentials, and project specifications submitted via contact forms, quote requests, or consultation bookings.</li>
        <li><strong>Technical & Telemetry Data:</strong> Automatically logged network metadata, including IP addresses, browser engine details, operating system versions, referring URLs, and session timestamps collected via server access logs and telemetry tools.</li>
        <li><strong>Cookies & Session Trackers:</strong> Essential session cookies to maintain application state, alongside minimal analytics tags to measure interface performance and user navigation patterns.</li>
    </ul>

    <h3>2. How We Use Information</h3>
    <p>We process collected data under standard contractual necessity, legitimate business interests, and explicit consent:</p>
    <ul>
        <li>Scoping, estimating, and delivering contracted software engineering, architecture, and technology consulting services.</li>
        <li>Maintaining platform reliability, monitoring API uptime, and auditing infrastructure security against malicious activity.</li>
        <li>Communicating project milestones, system updates, billing invoices, and direct administrative notices.</li>
        <li>Distributing engineering insights or product releases (strictly on an opt-in basis, with one-click unsubscribe functionality).</li>
    </ul>

    <h3>3. Data Sharing & Infrastructure Subprocessors</h3>
    <p>DeepTech Technologies does not sell, rent, or monetize personal information. Data disclosures are restricted to authorized subprocessors operating under strict confidentiality and data protection agreements:</p>
    <ul>
        <li><strong>Infrastructure & Hosting Providers:</strong> Enterprise cloud hosts and database clusters maintaining industry-standard encryption standards.</li>
        <li><strong>Operational Tooling:</strong> Transactional email relays, client relationship management (CRM) systems, and monitoring utilities strictly necessary for service operations.</li>
        <li><strong>Legal Mandates:</strong> Situations where disclosure is required by law, subpoena, or valid regulatory enforcement proceedings.</li>
    </ul>

    <h3>4. Security Architecture & Data Retention</h3>
    <p>We enforce technical and organizational safeguards across all environments, including TLS 1.3 encryption for data in transit, encrypted storage volumes at rest, strict role-based access control (RBAC), and multi-factor authentication for operational personnel. We retain personal information only as long as necessary to fulfill project requirements, resolve disputes, and satisfy statutory tax or accounting obligations.</p>

    <h3>5. Your Rights & Contact Details</h3>
    <p>Subject to applicable data protection laws (such as GDPR or relevant local data statutes), you possess the right to access, rectify, export, or permanently erase your personal data held within our systems. To exercise these rights or raise inquiries regarding your data, contact our security team directly at <a href="mailto:info@deeptechtechnologies.com">info@deeptechtechnologies.com</a>.</p>
    `,
    },
    terms: {
        title: "Terms of Service",
        updated: "Last updated: September 2026",
        content: `
        <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("Client", "User", or "you") and DeepTech Technologies ("DeepTech", "we", "us", or "our"). By accessing our website, utilizing our infrastructure, or executing a Statement of Work (SOW), you agree to comply with and be bound by these Terms.</p>

        <h3>1. Scope of Services & Engagements</h3>
        <p>DeepTech Technologies provides software engineering, system architecture, mobile and web application development, UI/UX design, and technical consulting services. Specific deliverables, delivery timelines, hardware/cloud infrastructure requirements, and commercial considerations are defined in individual SOWs, proposals, or Master Services Agreements (MSAs). In the event of a conflict between these Terms and an executed SOW, the specific terms of the SOW shall supersede.</p>

        <h3>2. Estimates, Milestone Payments, & Invoicing</h3>
        <ul>
            <li><strong>Quotations:</strong> Preliminary estimates are non-binding calculations based on initial discovery. Formal budgets and delivery phases are locked upon execution of an SOW.</li>
            <li><strong>Payment Schedules:</strong> Services typically operate on milestone-based billing, sprint retainers, or advance commitment deposits. Invoices are due within the payment window specified in the project agreement (defaulting to 14 calendar days from receipt).</li>
            <li><strong>Delays & Suspension:</strong> Failure to settle milestone payments within the agreed window grants DeepTech the right to pause active development cycles, withhold staging deployments, or suspend API access until outstanding balances are resolved.</li>
        </ul>

        <h3>3. Intellectual Property & Deliverables Assignment</h3>
        <ul>
            <li><strong>Transfer of Ownership:</strong> All custom source code, documentation, UI assets, and deliverables developed specifically for the Client transfer to the Client's exclusive ownership upon complete and final settlement of all related invoices.</li>
            <li><strong>Pre-Existing IP & Tooling:</strong> DeepTech retains all rights, title, and interest in internal frameworks, development libraries, proprietary starter kits, and third-party open-source components embedded within deliverables. The Client is granted an irrevocable, royalty-free, perpetual license to use and modify such embedded elements solely as part of the delivered solution.</li>
            <li><strong>Portfolio & Attribution:</strong> Unless explicitly restricted via an executed Non-Disclosure Agreement (NDA), DeepTech reserves the right to reference the project name, high-level case study metrics, and non-confidential UI designs within our professional portfolio and marketing channels.</li>
        </ul>

        <h3>4. Client Obligations & Dependencies</h3>
        <p>Timely completion of projects depends on prompt client cooperation. The Client agrees to:</p>
        <ul>
            <li>Provide designated points of contact with decision-making authority for milestone sign-offs.</li>
            <li>Furnish necessary API credentials, third-party licenses, brand assets, and technical documentation required for system execution.</li>
            <li>Review deliverables and provide consolidated feedback within 7 business days of release to prevent scope drift and pipeline stall.</li>
        </ul>

        <h3>5. Change Requests & Scope Management</h3>
        <p>Any modification, expansion, or architectural change requested outside the specifications established in the SOW requires a formal Change Order. Change Orders will itemize the adjustment to costs, architecture, and deployment schedules before work proceeds.</p>

        <h3>6. Warranties & Post-Deployment Support</h3>
        <p>DeepTech warrants that custom deliverables will materially conform to the agreed SOW specifications upon deployment. We typically provide a standard 30-day post-launch warranty window dedicated to resolving critical functional bugs resulting from our code. Except as expressly stated, our services and software are delivered "as is" without warranties regarding uninterrupted uptime, third-party API dependencies, or hosting platform outages.</p>

        <h3>7. Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, neither party shall be liable for indirect, incidental, punitive, or consequential damages (including loss of profits, data corruption, or business interruption). DeepTech's aggregate liability under any engagement shall not exceed the total fees actually received by DeepTech for the specific milestone or project phase directly giving rise to the claim.</p>

        <h3>8. Termination & Exit Procedures</h3>
        <p>Either party may terminate an engagement for convenience by providing 30 days' written notice, or immediately for cause upon a material breach that remains uncured for 14 days following notification. Upon termination, the Client remains liable for all work executed and non-cancelable third-party commitments incurred up to the effective termination date. Upon full payment of prorated charges, DeepTech will provide available code repositories and export assets to facilitate handover.</p>

        <h3>9. Governing Law & Dispute Resolution</h3>
        <p>These Terms and any project engagements are governed by and construed under the laws of Pakistan. The parties agree to first seek an amicable resolution through informal executive-level discussions. If unresolved within 30 days, disputes shall be submitted to binding arbitration in Islamabad/Rawalpindi in accordance with the Arbitration Act, 1940, or referred to competent courts of jurisdiction.</p>
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

/* Open a legal modal when arriving via index.html#privacy or #terms (used by blog page footers) */
(function () {
    const key = location.hash.replace("#", "");
    if (key !== "privacy" && key !== "terms") return;
    const trigger = document.querySelector(`[data-legal="${key}"]`);
    if (trigger) trigger.click();
    history.replaceState(null, "", location.pathname + location.search);
})();

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
                    heroVideo.play().catch(() => { });
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