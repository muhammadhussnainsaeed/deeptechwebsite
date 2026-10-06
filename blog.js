/* DeepTech blog post pages: header, mobile nav, theme, share, cookie consent */

/* ===== Header scrolled state ===== */
const header = document.getElementById("header");
if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

/* ===== Reveal on scroll (same behaviour as the homepage) ===== */
(function () {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
        reveals.forEach((el) => el.classList.add("in-view"));
        return;
    }
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
})();

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
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMobileNav));
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) closeMobileNav();
    });
}

/* ===== Theme toggle (shares the "deeptech-theme" key with the homepage) ===== */
(function () {
    const root = document.documentElement;
    const KEY = "deeptech-theme";
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleMobile = document.getElementById("themeToggleMobile");

    const getTheme = () => root.getAttribute("data-theme") || "light";
    const setTheme = (theme) => {
        root.setAttribute("data-theme", theme);
        try { localStorage.setItem(KEY, theme); } catch (e) { }
        document.querySelectorAll(".mobile-nav__theme-label").forEach((el) => {
            el.textContent = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
        });
        [themeToggle, themeToggleMobile].forEach((btn) => {
            if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
        });
    };
    const toggle = () => setTheme(getTheme() === "dark" ? "light" : "dark");

    if (themeToggle) themeToggle.addEventListener("click", toggle);
    if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggle);
    setTheme(getTheme());
})();

/* ===== Share buttons ===== */
(function () {
    const box = document.getElementById("share");
    if (!box) return;
    const canonical = document.querySelector('link[rel="canonical"]');
    const url = encodeURIComponent(canonical ? canonical.href : location.href);
    const text = encodeURIComponent(box.dataset.title || document.title);

    const targets = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
    box.querySelectorAll("[data-share]").forEach((a) => {
        a.href = targets[a.dataset.share] || "#";
    });

    const copyBtn = document.getElementById("copyLink");
    const label = document.getElementById("copyLinkLabel");
    if (copyBtn) {
        copyBtn.addEventListener("click", async () => {
            const link = canonical ? canonical.href : location.href;
            try {
                await navigator.clipboard.writeText(link);
            } catch (e) {
                const ta = document.createElement("textarea");
                ta.value = link;
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand("copy"); } catch (err) { }
                ta.remove();
            }
            label.textContent = "Link copied";
            setTimeout(() => (label.textContent = "Copy link"), 2000);
        });
    }
})();

/* ===== Cookie banner (same consent key + GA as the homepage) ===== */
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookieBanner");
    const acceptBtn = document.getElementById("acceptCookies");
    const declineBtn = document.getElementById("declineCookies");
    const GA_MEASUREMENT_ID = "G-N3XTF9FKGB";
    let gaLoaded = false;

    const loadGoogleAnalytics = () => {
        if (gaLoaded || window.gtag) return;
        gaLoaded = true;
        const s = document.createElement("script");
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        s.async = true;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag("js", new Date());
        window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
    };

    if (!banner || !acceptBtn || !declineBtn) return;
    const status = localStorage.getItem("deeptech-cookie-consent");
    if (status === "accepted") {
        loadGoogleAnalytics();
    } else if (!status) {
        setTimeout(() => {
            banner.classList.add("is-visible");
            banner.setAttribute("aria-hidden", "false");
        }, 1000);
    }
    const hide = () => {
        banner.classList.remove("is-visible");
        banner.setAttribute("aria-hidden", "true");
    };
    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("deeptech-cookie-consent", "accepted");
        hide();
        loadGoogleAnalytics();
    });
    declineBtn.addEventListener("click", () => {
        localStorage.setItem("deeptech-cookie-consent", "declined");
        hide();
    });
});