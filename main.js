/* State Services — navigation foundation */

const navExpand = document.getElementById('nav-expand');
const navExpandList = document.getElementById('nav-expand-list');
const navExpandIcon = document.getElementById('nav-expand-icon');

if (navExpand && navExpandList && navExpandIcon) {
  navExpand.addEventListener('click', () => {
    navExpandList.classList.toggle('show-list');
    navExpandIcon.classList.toggle('rotate-icon');
  });
}

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollDown = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 58;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__list a[href="#${sectionId}"]`);

    if (!navLink) return;

    const isActive = scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight;
    navLink.classList.toggle('active-link', isActive);
  });
}

window.addEventListener('scroll', scrollActive, { passive: true });
scrollActive();
