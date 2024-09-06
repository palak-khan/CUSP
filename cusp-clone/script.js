// <!--=============== LOCOMOTIVE FEATURE ===============-->
function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();
const text = new SplitType(".heading h1", { types: "chars" });

document.querySelectorAll(".box-2-heading h1").forEach(function (elem) {
  var elemText = elem.textContent;
  var splited = elemText.split("");
  var clutter = "";
  splited.forEach(function (e) {
    clutter += `<span>${e}</span>`;
  });
  elem.innerHTML = clutter;
});

// <!--=============== HOME PAGE ANIMATION ===============-->
function timeline0() {
  var tl = gsap.timeline({});

  tl.to(".loader-line", {
    width: "23vw",
    duration: 2,
    onStart: loaderAnimation,
  })
    .to(".loader-part2 p ,.loader-line", {
      opacity: 0,
    })
    .to(".slide1 img:nth-child(1)", {
      opacity: 0,
      duration: 1,
    })

    .to(".loader-part1", { top: "-100%", duration: 3 }, "x")
    .to(".loader-part2", { bottom: "-100%", duration: 3 }, "x")
    .to(".center-box", {
      height: "90vh",
      duration: 2,
      delay: -1.5,
    })
    .to(
      ".left-img",
      {
        left: "-30%",

        transform: "rotate(-15deg)",
        duration: 1,
        opacity: 1,
      },
      "z"
    )
    .to(
      ".right-img",
      {
        right: "-30%",

        transform: "rotate(15deg)",
        duration: 1,
        opacity: 1,
      },
      "z"
    )
    .to(".heading h1 .char", {
      transform: "translateY(0%)",
      stagger: 0.05,
      duration: 1,
    });
}

function scrolling() {
  var tl1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".home",
      scroller: ".main",
      start: "top -10%",
      end: " -100%",
      scrub: 0.5,
      // markers: true,
      pin: true,
    },
  });

  tl1

    .to(
      ".left-img",
      {
        left: "0%",
        opacity: 0,

        transform: "rotate(0deg)",
        duration: 1,
      },
      "same"
    )
    .to(
      ".right-img",
      {
        right: "0%",
        opacity: 0,
        transform: "rotate(0deg)",
        duration: 1,
      },
      "same"
    )
    .to(
      ".slide1",
      {
        top: "-100%",
        duration: 2,
      },
      "samesame"
    )
    .to(
      ".heading h1 .char",
      {
        transform: "translateY(-110%)",
        duration: 2,
        ease: Power0,
      },
      "samesame"
    )
    .to(
      ".center-box2",
      {
        bottom: "90%",
        duration: 2,
        ease: Power0,
      },
      "samesame"
    )
    .to(
      ".box-2-left-img",
      {
        left: "-30%",

        transform: "rotate(-15deg)",
        duration: 2,
        opacity: 1,
      },
      "k"
    )

    .to(
      ".box-2-right-img",
      {
        right: "-30%",

        transform: "rotate(15deg)",
        duration: 2,
        opacity: 1,
      },
      "k"
    )
    .to(".box-2-heading  h1 span", {
      transform: "translateY(-20%)",
      stagger: 0.01,
      duration: 3,
    });
}
// <!--=============== LOADER PAGE ANIMATION ===============-->
function loaderAnimation() {
  var a = 0;
  setInterval(function () {
    a = a + Math.floor(Math.random() * 15);
    if (a < 100) {
      document.querySelector(".counter").innerHTML = a;
    } else {
      a = 100;
      document.querySelector(".counter").innerHTML = a;
    }
  }, 100);
}

window.addEventListener("DOMContentLoaded", function () {
  timeline0();
  scrolling();
});
