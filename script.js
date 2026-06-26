document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('main section[id]');
  const revealItems = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-fill');
  const yearLabel = document.getElementById('year');

  if (yearLabel) {
    yearLabel.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', open.toString());
      document.body.classList.toggle('nav-open', open);
    });

    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach((link) => link.classList.remove('active'));
          const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector('.skill-fill');
          if (bar) {
            const value = bar.getAttribute('data-progress') || '0';
            requestAnimationFrame(() => {
              bar.style.width = `${value}%`;
            });
          }
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillBars.forEach((bar) => {
    const card = bar.closest('.skill-card');
    if (card) {
      skillObserver.observe(card);
    }
  });
});