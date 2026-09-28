// Nur Lebenslauf-Abschnitte steuern; das Sprachmenü bleibt unabhängig.
(() => {
  const page = document.querySelector(".cv-page");
  if (!page) return;
  const sections = [...page.querySelectorAll("details")];
  const actions = page.querySelector(".cv-actions");
  if (actions) {
    actions.hidden = false;
    actions.addEventListener("click", (event) => {
      const button = event.target.closest("[data-cv-action]");
      if (!button) return;
      sections.forEach((section) => {
        section.open = button.dataset.cvAction === "expand";
      });
    });
  }
  function reveal(hash) {
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    const section = document.getElementById(id);
    if (!section || !page.contains(section) || section.tagName !== "DETAILS")
      return;
    section.open = true;
    section.scrollIntoView({ block: "start" });
  }
  page.querySelector(".cv-nav")?.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) reveal(link.hash);
  });
  window.addEventListener("hashchange", () => reveal(location.hash));
  reveal(location.hash);
  let printState;
  window.addEventListener("beforeprint", () => {
    printState = sections.map((section) => section.open);
    sections.forEach((section) => {
      section.open = true;
    });
  });
  window.addEventListener("afterprint", () => {
    if (printState)
      sections.forEach((section, index) => {
        section.open = printState[index];
      });
  });
})();
