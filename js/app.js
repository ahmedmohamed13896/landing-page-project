/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const loadDom = () => {
  const sections = document.querySelectorAll("section");
  const header = document.querySelector(".page__header");
  const navbarList = document.getElementById("navbar__list");
  const mainHeader = document.querySelector(".main__hero");
  const menuLinks = document.querySelectorAll(".menu_link");
  let windowHeight = window.innerHeight;
  let timeOut1;
  /**
 * End Global Variables
 

 * Start Helper Functions
 *
 */
  const fadeHeader = () => {
    clearTimeout(timeOut1);
    header.style.opacity = "1";
    header.style.display = "block";

    if (document.body.scrollTop > mainHeader.offsetTop) {
      timeOut1 = setTimeout(() => {
        header.style.opacity = "0";
      }, 3000);
    }
  };

  /**
 * End Helper Functions
 
 * Begin Main Functions
 *
 */

  // build the nav
  const navBarBuilder = () => {
    let navHTML = "";
    for (let i = 0; i < sections.length; i++) {
      const id = sections[i].getAttribute("id");
      const dataNav = sections[i].dataset.nav;
      navHTML += `<li>
                  <a href="#${id}" data-section="${id}"  class="menu__link">${dataNav}</a>
                </li>`;
    }
    navbarList.innerHTML = navHTML;
  };

  // Add class 'active' to section when near top of viewport
  const setActiveSection = (currentSection) => {
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove("active");
    }
    currentSection.classList.add("active");
  };
  // Scroll to anchor ID using scrollTO event
  const scrollToSection = (e) => {
    e.preventDefault();
    const currentSection = document.getElementById(e.target.dataset.section);
    const sectionOffset = currentSection.offsetTop;
    window.scroll(0, sectionOffset);
    setActiveSection(currentSection);
  };

  /**
   * End Main Functions
   * Begin Events
   *
   */

  // Build menu
  navBarBuilder();

  // Scroll to section on link click
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", scrollToSection);
  }
  // Set sections as active
  window.onscroll = function () {
    windowHeight = window.innerHeight;

    clearTimeout(timeOut1);
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().bottom >= windowHeight / 1.75) {
        setActiveSection(sections[i]);
        break;
      }
    }
    fadeHeader();
  };
};

document.addEventListener("DOMContentLoaded", loadDom);
