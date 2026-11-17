document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".hero-image");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroImage && !prefersReducedMotion) {
    window.addEventListener("scroll", () => {
      const offset = Math.min(window.scrollY * 0.08, 28);
      heroImage.style.transform = `scale(1.02) translateY(${offset}px)`;
    }, { passive: true });
  }

  const revealItems = document.querySelectorAll(".detail-card, .gallery-grid figure");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate(
          [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
        );
        obs.unobserve(entry.target);
      });
    }, { threshold: .12 });
    revealItems.forEach(item => observer.observe(item));
  }
});