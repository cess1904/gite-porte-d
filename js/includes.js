// === includes.js ===
// Fichier commun pour :
// 1️⃣ Inclure automatiquement le header & footer
// 2️⃣ Initialiser le menu burger
// 3️⃣ Lancer le slider automatique des avis (si présent sur la page) 
// 4️⃣ LANCEMENT GLOBAL APRÈS CHARGEMENT DU DOM 
// 5 FAQ




// ----------------------
// 1️⃣ INJECTION DES FRAGMENTS HTML
// ----------------------
async function includeHTML() {
  const slots = document.querySelectorAll("[data-include]");
  for (const slot of slots) {
    const url = slot.getAttribute("data-include");
    try {
      const res = await fetch(url);
      const html = await res.text();
      // Remplace entièrement le <div data-include="..."> par le contenu du fichier
      slot.outerHTML = html;
    } catch (e) {
      console.error("Erreur include:", url, e);
    }
  }
}


// ----------------------
// 2️⃣ INITIALISATION DU MENU BURGER
// ----------------------
function initBurgerMenu() {
  // On écoute les clics sur tout le document (utile car le header est injecté dynamiquement)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".burger");
    if (!btn) return;

    // Recherche du header parent (peut s’appeler .header ou .site-header selon ton code)
    const header =
      btn.closest(".header") ||
      btn.closest(".site-header") ||
      document;

    // Recherche du menu de navigation (classe .nav ou .nav-links selon ton HTML)
    const nav =
      header.querySelector(".nav") ||
      header.querySelector(".nav-links") ||
      header.querySelector("nav");

    if (!nav) return;

    // Bascule de l’état ouvert/fermé
    const open = !nav.classList.contains("open");
    nav.classList.toggle("open", open);
    btn.classList.toggle("is-active", open);
    document.body.classList.toggle("no-scroll", open);
  });

  // Ferme le menu si on clique en dehors
  document.addEventListener("click", (e) => {
    const isMenu = e.target.closest(".nav, .nav-links");
    const isBurger = e.target.closest(".burger");
    if (isMenu || isBurger) return;

    const nav =
      document.querySelector(".nav.open") ||
      document.querySelector(".nav-links.open");
    if (nav) {
      nav.classList.remove("open");
      document.body.classList.remove("no-scroll");
      const activeBurger = document.querySelector(".burger.is-active");
      if (activeBurger) activeBurger.classList.remove("is-active");
    }
  });

  // Ferme le menu avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const nav =
      document.querySelector(".nav.open") ||
      document.querySelector(".nav-links.open");
    if (nav) {
      nav.classList.remove("open");
      document.body.classList.remove("no-scroll");
      const activeBurger = document.querySelector(".burger.is-active");
      if (activeBurger) activeBurger.classList.remove("is-active");
    }
  });
}


// ----------------------
// 3️⃣ SLIDER AUTOMATIQUE DES AVIS
// ----------------------
function initAvisSlider() {
  const avisCards = document.querySelectorAll(".avis-card");
  if (!avisCards.length) return; // certaines pages n'ont pas cette section

  let index = 0;
  avisCards[0].classList.add("active"); // active le premier avis

  function changeAvis() {
    avisCards[index].classList.remove("active");
    index = (index + 1) % avisCards.length;
    avisCards[index].classList.add("active");
  }

  setInterval(changeAvis, 6000); // changement toutes les 6 secondes
}


// ----------------------
// 4️⃣ LANCEMENT GLOBAL APRÈS CHARGEMENT DU DOM
// ----------------------
document.addEventListener("DOMContentLoaded", async () => {
  await includeHTML();   // attend que le header/footer soient injectés
  initBurgerMenu();      // initialise le menu burger
  initAvisSlider();      // active le slider si présent
});


// ----------------------
// 5 FAQ
//    ----------------------

  document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll("#faq .faq-question");

    questions.forEach((btn) => {
      btn.addEventListener("click", function () {
        const answer = this.nextElementSibling;
        const isOpen = answer.classList.contains("open");

        // on ferme tout si tu veux un seul ouvert à la fois
        // (commente ce bloc si tu veux pouvoir en ouvrir plusieurs)
        // document.querySelectorAll("#faq .faq-answer.open").forEach((openAns) => {
        //   openAns.style.maxHeight = null;
        //   openAns.classList.remove("open");
        //   openAns.previousElementSibling.classList.remove("open");
        // });

        if (!isOpen) {
          // ouvrir
          answer.classList.add("open");
          this.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.marginBottom = "0.5rem";
        } else {
          // fermer
          answer.classList.remove("open");
          this.classList.remove("open");
          answer.style.maxHeight = null;
          answer.style.marginBottom = "0";
        }
      });
    });
  });



 // ----------------------
// Parallax section AVIS (desktop uniquement)
// ----------------------


(function() {
  const section = document.querySelector('.avis-portd');
  if (!section) return;

  function isDesktop() {
    return window.innerWidth >= 900;
  }

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();

    if (isDesktop()) {
      // 💻 Parallax normal (identique à avant)
      const parallax = rect.top * -1;
      section.style.backgroundPositionY = `${parallax}px`;
    } else {
      // 📱 Micro-parallax mobile (ultra doux)
      // rect.top varie entre 0 → -scroll
      const soft = rect.top * -0.08; // 8% du mouvement (doux et discret)
      section.style.backgroundPositionY = `${soft}px`;
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  window.addEventListener('resize', updateParallax);

  // Position initiale
  updateParallax();
})();

  









