const packageData = {
  heatpump: {
    eco: '£8,900',
    competitor: '£11,600',
    saving: '£1,120'
  },
  solar: {
    eco: '£7,400',
    competitor: '£9,900',
    saving: '£980'
  },
  hybrid: {
    eco: '£14,700',
    competitor: '£18,900',
    saving: '£1,860'
  }
};

const priceButtons = document.querySelectorAll('.price-btn');
const ecoAmount = document.querySelector('[data-eco]');
const competitorAmount = document.querySelector('[data-competitor]');
const savingAmount = document.querySelector('[data-saving]');

if (priceButtons.length) {
  priceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const view = button.dataset.view;
      const data = packageData[view];
      if (!data) return;

      ecoAmount.textContent = data.eco;
      competitorAmount.textContent = data.competitor;
      savingAmount.textContent = data.saving;

      priceButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    });
  });
}

const revealItems = document.querySelectorAll('.reveal, .value-card, .feature-panel, .info-card');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in-view'));
}

const sectionLinks = [...document.querySelectorAll('.side-nav a[href^="#"]')];
const navigationSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
const sidePanelContent = document.querySelector('.side-panel-content');

function updateSidePanelPosition() {
  if (sidePanelContent) {
    sidePanelContent.classList.toggle('is-scrolled', window.scrollY > 72);
  }
}

updateSidePanelPosition();
window.addEventListener('scroll', updateSidePanelPosition, { passive: true });

function setActiveSection(sectionId) {
  sectionLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
  });
}

sectionLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveSection(link.getAttribute('href').slice(1));
  });
});

if ('IntersectionObserver' in window && navigationSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

    if (visibleSection) setActiveSection(visibleSection.target.id);
  }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });

  navigationSections.forEach((section) => sectionObserver.observe(section));
}

