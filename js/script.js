//smooth Scroll
document.querySelectorAll('[data-bs-toggle="submenu"]').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const parent = this.closest('.dropdown-submenu');

    parent.classList.toggle('show');
  });
});

const btn = document.querySelector(".scroll-top");

window.addEventListener("scroll", () => {
  btn.classList.toggle("show", window.scrollY > 300);
});

btn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});





  
  //FAQ Section

  function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));

    // Open clicked if it was closed
    if (!isOpen) item.classList.add('open');
  }



  //Doctor slider

  // ── Doctor data — replace src with your real image paths ──
  const doctors = [
    { name: 'Jason Armstrong', role: 'Head of Operation',       img: './images/home-img/doctor1.png' },
    { name: 'Jenifer Olivia',  role: 'Chief Executive Officer', img: './images/home-img/doctor2.png' },
    { name: 'Arnold Maxwell',  role: 'Chief Financial Officer', img: './images/home-img/doctor3.png' },
    { name: 'Jason Armstrong', role: 'Head of Operation',       img: './images/home-img/doctor1.png' },
    { name: 'Jenifer Olivia',  role: 'Chief Executive Officer', img: './images/home-img/doctor2.png' },
    { name: 'Arnold Maxwell',  role: 'Chief Financial Officer', img: './images/home-img/doctor3.png' },
    { name: 'Jason Armstrong', role: 'Head of Operation',       img: './images/home-img/doctor1.png' },
    { name: 'Jenifer Olivia',  role: 'Chief Executive Officer', img: './images/home-img/doctor2.png' },
    { name: 'Arnold Maxwell',  role: 'Chief Financial Officer', img: './images/home-img/doctor3.png' },
    { name: 'Jason Armstrong', role: 'Head of Operation',       img: './images/home-img/doctor1.png' },
    { name: 'Jenifer Olivia',  role: 'Chief Executive Officer', img: './images/home-img/doctor2.png' },
    { name: 'Arnold Maxwell',  role: 'Chief Financial Officer', img: './images/home-img/doctor3.png' },
  ];

  // ── Cards per slide based on screen width ──
  function getCardsPerSlide() {
    const w = window.innerWidth;
    if (w <= 320) return 1;   // 320px → strictly 1 card
    if (w <= 576) return 1;   // up to 576px → 1 card
    if (w < 992)  return 2;   // tablet → 2 cards
    return 3;                  // desktop → 3 cards
  }

  let carouselInstance = null;

  function buildCarousel() {
    const perSlide    = getCardsPerSlide();
    const inner       = document.getElementById('carouselInner');
    const dotsEl      = document.getElementById('teamDots');
    const totalSlides = Math.ceil(doctors.length / perSlide);

    // ── Build slides ──
    // When perSlide === 1: each slide gets ONE card directly — no row wrapper
    // When perSlide > 1: use Bootstrap row/col layout
    let slidesHTML = '';
    for (let s = 0; s < totalSlides; s++) {
      const isActive = s === 0 ? 'active' : '';
      const chunk    = doctors.slice(s * perSlide, s * perSlide + perSlide);

      let innerContent = '';
      if (perSlide === 1) {
        // Single card — no row, no col, just the card full width
        const d = chunk[0];
        innerContent = `
          <div class="team-card">
            <img src="${d.img}" alt="${d.name}" loading="lazy" />
            <div class="team-info">
              <h4>${d.name}</h4>
              <span>${d.role}</span>
            </div>
          </div>`;
      } else {
        const colClass = perSlide === 2 ? 'col-12 col-md-6' : 'col-12 col-md-6 col-lg-4';
        const cards = chunk.map(d => `
          <div class="${colClass}">
            <div class="team-card">
              <img src="${d.img}" alt="${d.name}" loading="lazy" />
              <div class="team-info">
                <h4>${d.name}</h4>
                <span>${d.role}</span>
              </div>
            </div>
          </div>`).join('');
        innerContent = `<div class="row g-4 justify-content-center">${cards}</div>`;
      }

      slidesHTML += `
        <div class="carousel-item ${isActive}">
          ${innerContent}
        </div>`;
    }
    inner.innerHTML = slidesHTML;

    // ── Build dots ──
    dotsEl.innerHTML = Array.from({ length: totalSlides }, (_, i) =>
      `<span class="${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
    ).join('');

    // ── Re-init Bootstrap carousel ──
    if (carouselInstance) carouselInstance.dispose();
    const carouselEl = document.getElementById('teamCarousel');
    carouselInstance = new bootstrap.Carousel(carouselEl, { interval: false, wrap: true });

    // ── Sync dots on slide ──
    carouselEl.addEventListener('slid.bs.carousel', (e) => {
      document.querySelectorAll('#teamDots span').forEach(d => d.classList.remove('active'));
      document.querySelectorAll('#teamDots span')[e.to]?.classList.add('active');
    });

    // ── Dots click ──
    document.querySelectorAll('#teamDots span').forEach(dot => {
      dot.addEventListener('click', () => carouselInstance.to(parseInt(dot.dataset.index)));
    });
  }

  // ── Prev / Next ──
  document.getElementById('teamNext').addEventListener('click', () => carouselInstance?.next());
  // teamPrev is commented out in HTML
  // document.getElementById('teamPrev').addEventListener('click', () => carouselInstance?.prev());

  // ── Init ──
  buildCarousel();

  // ── Rebuild on resize (debounced) ──
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildCarousel, 200);
  });
  