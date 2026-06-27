// Bilingual toggle: swaps any element with data-en/data-zh attributes,
// persists the choice in localStorage, and applies it instantly on load.

(function () {
    function applyLang(lang) {
        document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
        document.body.classList.toggle("lang-zh", lang === "zh");
        document.body.classList.toggle("lang-en", lang !== "zh");

        document.querySelectorAll("[data-en]").forEach((el) => {
            const value = lang === "zh" ? el.getAttribute("data-zh") : el.getAttribute("data-en");
            if (value === null) return;
            if (el.hasAttribute("data-html")) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });

        document.querySelectorAll(".lang-toggle-label").forEach((el) => {
            el.textContent = lang === "zh" ? "EN" : "中文";
        });

        document.querySelectorAll("[data-en-title]").forEach((el) => {
            const value = lang === "zh" ? el.getAttribute("data-zh-title") : el.getAttribute("data-en-title");
            if (value !== null) document.title = value;
        });
    }

    function getStoredLang() {
        try {
            return localStorage.getItem("site-lang") || "en";
        } catch (e) {
            return "en";
        }
    }

    function setStoredLang(lang) {
        try {
            localStorage.setItem("site-lang", lang);
        } catch (e) {
            /* ignore */
        }
    }

    function init() {
        const current = getStoredLang();
        applyLang(current);

        const btn = document.querySelector(".lang-toggle");
        if (btn) {
            btn.addEventListener("click", () => {
                const next = getStoredLang() === "zh" ? "en" : "zh";
                setStoredLang(next);
                applyLang(next);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
