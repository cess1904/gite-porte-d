// Calendrier des tarifs : novembre 2025 → novembre 2026

(function () {
  const container = document.getElementById("calendrier-tarifs-container");
  if (!container) return;

  // Configuration de la période
  const startYear = 2025;
  const startMonth = 10; // 0 = janvier, donc 10 = novembre
  const endYear = 2026;
  const endMonth = 10; // 10 = novembre

  const nomsMois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const nomsJours = ["L", "M", "M", "J", "V", "S", "D"];

  // ⚠️ À TOI de remplir ce tableau avec les dates spéciales
  // Format : "YYYY-MM-DD"
  const joursSpeciaux150 = [
    // Exemple :
    // "2025-12-24",
    // "2025-12-25",
    // "2025-12-31",
    // "2026-01-01",
  ];

  function estJourSpecial(dateStr) {
    return joursSpeciaux150.includes(dateStr);
  }

  function formatDateISO(year, month, day) {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  }

  // Parcours des mois
  let year = startYear;
  let month = startMonth;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    const moisDiv = document.createElement("div");
    moisDiv.className = "cal-mois";

    const titre = document.createElement("div");
    titre.className = "cal-mois-titre";
    titre.textContent = `${nomsMois[month]} ${year}`;
    moisDiv.appendChild(titre);

    // En-tête jours de la semaine
    const headerJours = document.createElement("div");
    headerJours.className = "cal-jours-semaine";
    nomsJours.forEach((j) => {
      const span = document.createElement("span");
      span.textContent = j;
      headerJours.appendChild(span);
    });
    moisDiv.appendChild(headerJours);

    // Jours du mois
    const joursContainer = document.createElement("div");
    joursContainer.className = "cal-jours";

    const firstDay = new Date(year, month, 1);
    const nbJours = new Date(year, month + 1, 0).getDate();

    // Décalage pour bien aligner les jours (Lundi = 1, Dimanche = 0)
    let startIndex = firstDay.getDay(); // 0 = Dimanche, 1 = Lundi...

    // Convertir pour que la grille commence par Lundi
    // Si Dimanche (0), on le place en dernier (index 6)
    startIndex = startIndex === 0 ? 6 : startIndex - 1;

    // Cases vides avant le 1er du mois
    for (let i = 0; i < startIndex; i++) {
      const vide = document.createElement("div");
      vide.className = "cal-jour vide";
      joursContainer.appendChild(vide);
    }

    // Cases pour chaque jour
    for (let jour = 1; jour <= nbJours; jour++) {
      const date = new Date(year, month, jour);
      const dayOfWeek = date.getDay(); // 0=Dimanche, 1=Lundi...

      const dateStr = formatDateISO(year, month, jour);

      const jourDiv = document.createElement("div");
      jourDiv.className = "cal-jour";

      const numero = document.createElement("div");
      numero.className = "cal-jour-numero";
      numero.textContent = jour;
      jourDiv.appendChild(numero);

      const prix = document.createElement("div");
      prix.className = "cal-jour-prix";

      // Règles tarifaires :
      // - Dimanche (0) à Jeudi (4) -> 110€ (sauf jour spécial)
      // - Vendredi (5) & Samedi (6) -> 150€
      let isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      if (estJourSpecial(dateStr) || isWeekend) {
        jourDiv.classList.add("special-150");
        prix.textContent = "150 €";
      } else {
        jourDiv.classList.add("semaine-110");
        prix.textContent = "110 €";
      }

      jourDiv.appendChild(prix);
      joursContainer.appendChild(jourDiv);
    }

    moisDiv.appendChild(joursContainer);
    container.appendChild(moisDiv);

    // Mois suivant
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }
})();
