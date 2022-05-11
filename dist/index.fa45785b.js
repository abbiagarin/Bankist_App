"use strict";
const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const navLink = document.querySelector(".nav__links");
const nav = document.querySelector(".nav");
const navHeader = document.querySelector(".header");
const allsections = document.querySelectorAll(".section");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
// const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
/////////////////////////////////////////////////////////////
//--MENU--HAMBURGER--//
const toggleMenu = function() {
    hamburger.classList.toggle("open");
    navLink.classList.toggle("open");
};
menuBtn.addEventListener("click", toggleMenu);
//----MODAL WINDOW---//
const OpenModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
const closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnOpenModal.forEach((item)=>item.addEventListener("click", OpenModal)
);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
// // COOKIE MESSAGE
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//   "We use cookie for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";
// // header.prepend(message);
// // header.append(message.cloneNode(true));
// header.append(message);
// // remove the cookie message
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });
// //styles
// message.style.backgroundColor = "#37383d";
// message.style.width = "120%";
// console.log(message.style.color);
// console.log(message.style.backgroundColor);
//---SMOOTH SCROLLING---//
btnScrollTo.addEventListener("click", function(e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());
    console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
    console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);
    //Scrolling
    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: "smooth",
    // });
    section1.scrollIntoView({
        behavior: "smooth"
    });
});
//PAGE NAVIGATION USING EVENT PROPAGATION
document.querySelector(".nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    //Matching strategy
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        console.log(id);
        document.querySelector(id).scrollIntoView({
            behavior: "smooth"
        });
    }
});
//TAB COMPONENT
tabsContainer.addEventListener("click", function(e) {
    const clickedButton = e.target.closest(".operations__tab");
    console.log(clickedButton);
    //Guard clause
    if (!clickedButton) return;
    //Remove active classes
    tabs.forEach((tab)=>tab.classList.remove("operations__tab--active")
    );
    tabsContent.forEach((content)=>content.classList.remove("operations__content--active")
    );
    //Activate tab
    clickedButton.classList.add("operations__tab--active");
    // Activate content area
    console.log(clickedButton.dataset.tab);
    document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add("operations__content--active");
});
//MENU FADE ANIMATION
const navLinkHover = function(e) {
    if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");
        siblings.forEach((el)=>{
            if (el !== link) el.style.opacity = this;
        });
    }
};
//Passing 'argument' into handler function
navLink.addEventListener("mouseover", navLinkHover.bind(0.5));
navLink.addEventListener("mouseout", navLinkHover.bind(1));
//STICKY NAVIGATION
// const firstCoords = section1.getBoundingClientRect();
// console.log(firstCoords);
// window.addEventListener("scroll", function () {
//   if (window.scrollY > firstCoords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
//////////////////////////////////////////////////
//Sticky navigation with Intersection API
// const callBack = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };
// const options = {
//   root: null, //viewport or default case
//   threshold: 0.2,
// };
// const observer = new IntersectionObserver(callBack, options);
// observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
};
const options = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
};
const headerObserver = new IntersectionObserver(stickyNav, options);
headerObserver.observe(navHeader);
//Reveal sections
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
};
const revealOptions = {
    root: null,
    threshold: 0.2
};
const sectionObserver = new IntersectionObserver(revealSection, revealOptions);
allsections.forEach((section)=>{
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});
//Reveal Images
const loadImg = function(entries, observer) {
    const [entry] = entries;
    // console.log(entries);
    if (!entry.isIntersecting) return;
    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", function() {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};
const imgOptions = {
    root: null,
    threshold: 0,
    rootMargin: "200px"
};
const imgObserver = new IntersectionObserver(loadImg, imgOptions);
imgTargets.forEach((target)=>imgObserver.observe(target)
);
//LOADING PAGE TO START FROM TOP
const startTop = function() {
    window.onbeforeunload = function() {
        window.scroll(0, 0);
    };
};
//SlIDER
const slider = function() {
    let currSlide = 0;
    const maxSlide = slides.length - 1;
    //Functions
    //Create dots
    const dots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };
    const activateDots = function(slide) {
        document.querySelectorAll(".dots__dot").forEach((dot)=>dot.classList.remove("dots__dot--active")
        );
        document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add("dots__dot--active");
    };
    const goToSlide = function(slide) {
        slides.forEach((s, i)=>s.style.transform = `translateX(${100 * (i - slide)}%)`
        );
    };
    //Next Slide
    const nextSlide = function() {
        if (currSlide === maxSlide) currSlide = 0;
        else currSlide++;
        goToSlide(currSlide);
        activateDots(currSlide);
    };
    //Previous slide
    const previousSlide = function() {
        if (currSlide === 0) currSlide = maxSlide;
        else currSlide--;
        goToSlide(currSlide);
        activateDots(currSlide);
    };
    //Initialization
    const init = function() {
        startTop();
        goToSlide(0);
        dots();
        activateDots(0);
    };
    init();
    //Event handlers
    btnLeft.addEventListener("click", previousSlide);
    btnRight.addEventListener("click", nextSlide);
    //Implementation for left and right keyboard press
    document.addEventListener("keydown", function(e) {
        // console.log(e);
        if (e.key === "ArrowLeft") previousSlide();
        e.key === "ArrowRight" && nextSlide();
    });
    //Activating the dots
    dotContainer.addEventListener("click", function(e) {
        if (e.target.classList.contains("dots__dot")) {
            const { slide  } = e.target.dataset;
            goToSlide(slide);
            activateDots(slide);
        }
    });
};
slider();

//# sourceMappingURL=index.fa45785b.js.map
