function init() {
  const slides = document.querySelectorAll(".slide");
  const pages = document.querySelectorAll(".page");
  const backgrounds = [
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#4E4342, #161616)`
  ];
  // Tracker
  let current = 0;
  let scrollSlide = 0;

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });

  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    dot.classList.add("active");
  }

  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    // console.log(currentPage);
    // console.log(nextPage);
    const nextLeft = nextPage.querySelector(".hero .left");
    const nextRight = nextPage.querySelector(".hero .right");
    const currentLeft = currentPage.querySelector(".hero .left");
    const currentRight = currentPage.querySelector(".hero .right");
    const nextText = nextPage.querySelector(".details");
    const portfolio = document.querySelector(".portfolio");

    let tl = gsap.timeline({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });
    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=.2")
      .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=.6"
      )
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=.6")
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });

    current = pageNumber;
  }

  document.addEventListener("wheel", throttle(scrollChange, 1500));
  document.addEventListener("touchmove", throttle(scrollChange, 1500)); //mobile

  function switchDots(dotNumber) {
    const activeDot = document.querySelectorAll(".slide")[dotNumber];
    slides.forEach(slide => {
      slide.classList.remove("active");
    });
    activeDot.classList.add("active");
  }

  function scrollChange(e) {
    // console.log(e);
    if (e.deltaY > 0) {
      scrollSlide += 1;
    } else {
      scrollSlide -= 1;
    }
    if (scrollSlide > 2) {
      scrollSlide = 0;
    }
    if (scrollSlide < 0) {
      scrollSlide = 2;
    }
    switchDots(scrollSlide);
    nextSlide(scrollSlide);
    // console.log(scrollSlide);
  }

  const burger = document.querySelector(".menu");
  const burgerLines = document.querySelectorAll(".menu path");
  const navOpen = document.querySelector(".nav-open");
  const contact = document.querySelector(".contact");
  const social = document.querySelector(".social-info");
  const logo = document.querySelector(".logo");

  const tl = gsap.timeline({ paused: true, reversed: true });

  tl.to(navOpen, 0.5, { y: 0 })
    .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 })
    .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, "-=.5")
    .fromTo(logo, 0.2, { color: "white" }, { color: "black" }, "-=1")
    .fromTo(burgerLines, 0.2, { fill: "white" }, { fill: "black" }, "-=1");

  burger.addEventListener("click", () => {
    tl.reversed() ? tl.play() : tl.reverse();
  });
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

init();
