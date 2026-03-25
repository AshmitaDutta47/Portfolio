// ── Typed Animation ──
const roles = ["Software Developer", "CSE Student @ KIIT", "AI Enthusiast", "Problem Solver"];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const target = document.getElementById("typed");
    const current = roles[roleIndex];

    target.textContent = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    if (!isDeleting && charIndex === current.length + 1) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ── Navbar Scroll Shadow ──
window.addEventListener("scroll", () => {
    document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── Skill Bar Animation ──
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".skill-fill").forEach(bar => {
                bar.style.width = bar.dataset.width + "%";
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.querySelector("#skills");
if (skillsSection) skillObserver.observe(skillsSection);

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

// ── Hamburger Menu ──
document.getElementById("hamburger").addEventListener("click", () => {
    const ul = document.querySelector("nav ul");
    ul.style.display = ul.style.display === "flex" ? "none" : "flex";
    ul.style.flexDirection = "column";
    ul.style.position = "absolute";
    ul.style.top = "65px";
    ul.style.right = "30px";
    ul.style.background = "#fff";
    ul.style.padding = "16px 24px";
    ul.style.border = "1px solid #e0d8cc";
    ul.style.borderRadius = "8px";
    ul.style.gap = "16px";
});

// ── Form Validation ──
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name    = document.getElementById("name").value.trim();
    const email   = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const error   = document.getElementById("error");

    if (!name || !email || !message) {
        error.style.color = "#c0392b";
        error.textContent = "⚠ All fields are required.";
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.style.color = "#c0392b";
        error.textContent = "⚠ Please enter a valid email address.";
        return;
    }

    error.style.color = "#27ae60";
    error.textContent = "✓ Message sent successfully! I'll get back to you soon.";
    this.reset();
});
