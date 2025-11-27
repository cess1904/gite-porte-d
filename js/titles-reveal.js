document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".title-reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  titles.forEach(t => observer.observe(t));
});
