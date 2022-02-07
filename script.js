/* Animates the container that covers the screen using GSAP */
pageTransition = () => {
  var timeline = gsap.timeline();
  timeline.to(".loading-screen", {
    duration: 0.5,
    width: "100%",
    left: "0%",
  });
  timeline.to(".loading-screen", {
    duration: 0.5,
    width: "100%",
    left: "100%",
    delay: 0.2,
  });

  timeline.set(".loading-screen", { left: "-100%" });
};
/* Animation for the content on a scrollable page */
contentAnimation = () => {
  var timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".logo, .botton",
      start: "20px 80%",
      end: "+=300",
      toggleActions: "restart pause none reverse",
    },
  });
  timeline.fromTo(
    ".logo",
    {
      duration: 0.5,
      y: 100,
      opacity: 0,
      stagger: {
        axis: "y",
        grid: "auto",
        ease: "power3.inOut",
        amount: 4,
      },
      delay: 0.5,
    },
    {
      opacity: 1,
      y: 30,
    }
  );

  timeline.fromTo(
    ".button",
    {
      duration: 0.5,
      y: 100,
      opacity: 0,
      stagger: {
        axis: "y",
        grid: "auto",
        ease: "power3.inOut",
        amount: 4,
      },
    },
    {
      opacity: 1,
      y: 30,
    }
  );
};

/* delays the animation */
delay = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

/* makes use of barbajs to trigger GSAP animation*/
barba.init({
  sync: true,
  transitions: [
    {
      /*When leave the current page execute the GSAP transition and delay the other animations*/
      async leave(data) {
        data.current.container.remove();
        const done = this.async();
        pageTransition();
        await delay(800);
        done();
      },
      /*before the transition ends bring the gsap container opacity to 0 */
      async beforeLeave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
        });
      },
      /* before it enters the new page [this case the single page] kill the GSAP scrolltrigger function*/
      async beforeEnter(data) {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      },
      /*Execute the animations for the next page*/
      async enter(data) {
        contentAnimation();
        contentAnimation2();
        return gsap.from(data.next.container, {
          opacity: 0,
        });
      },
      /*Execute the animation once it finish the browser reload*/
      async once(data) {
        contentAnimation();
        contentAnimation2();
      },
    },
  ],
});

/* Function to bring back the viewport to the top of the page*/
function scrollFunction1() {
  let e = document.getElementById("el1");
  e.scrollIntoView({
    block: "start",
    behavior: "smooth",
    inline: "start",
  });
}
/* GSAP animation for a single page page*/
contentAnimation2 = () => {
  var timeline = gsap.timeline({});
  timeline.fromTo(
    ".logo1",
    {
      duration: 0.5,
      y: 100,
      opacity: 0,
      stagger: {
        axis: "y",
        grid: "auto",
        ease: "power3.inOut",
        amount: 4,
      },
      delay: 0.5,
    },
    {
      opacity: 1,
      y: 30,
    }
  );

  timeline.fromTo(
    ".button1",
    {
      duration: 0.5,
      y: 100,
      opacity: 0,
      stagger: {
        axis: "y",
        grid: "auto",
        ease: "power3.inOut",
        amount: 4,
      },
    },
    {
      opacity: 1,
      y: 30,
    }
  );
};
