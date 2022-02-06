/* It triggers the GSAP animation */
PageTransition = () => {
  var timeline = gsap.timeline();
  timeline.to("header", {
    zIndex: 1,
  });

  timeline.to(".page-transition", {
    duration: 1,
    height: "100%",
    x: "0%",
  });
  timeline.to(".page-transition", {
    duration: 0.8,
    height: "100%",
    x: "100%",
    delay: 0.3,
  });

  timeline.set(".page-transition", {
    x: "-100%",
  });
};

mainAnimation = () => {
  var timeline = gsap.timeline();

  timeline.from(".all", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    delay: 0.8,
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
        PageTransition();
        await delay(1000);
        done();
      },
      async enter(data) {
        mainAnimation();
      },
      async once(data) {
        mainAnimation();
      },
    },
  ],
});
