/* It triggers the GSAP animation */
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
    delay: 0.5,
  });

  timeline.set(".loading-screen", { left: "-100%" });
};

contentAnimation = () => {
  var timeline = gsap.timeline();

  timeline.from(".all", {
    duration: 0.5,
    y: 30,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    delay: 0.2,
  });
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
/* makes use of barbajs */
barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        contentAnimation();
      },
      async once(data) {
        contentAnimation();
      },
    },
  ],
});
