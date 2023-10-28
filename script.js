const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", (dets) => {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;

    })
}

var timeout;

function firstPageAnim() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        durattion: 1.5,
        ease: Expo.easeInOut
    })

    tl.to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        stagger: 0.2

    })
    tl.to(".boundingelem2", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2

    })
    tl.from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut,

    })
}

function circleSkew() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", (dets) => {
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        xprev = dets.clientX;

        var ydiff = dets.clientY - yprev;
        yprev = dets.clientY;

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(() => {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        }, 100);

    })
}

circleMouseFollower();
firstPageAnim();
circleSkew();

document.querySelectorAll(".elem").forEach((elem) => {

    var rotate = 0;
    var rdiff = 0;

    elem.addEventListener("mousemove", async (dets) => {

        var diff = dets.clientY - elem.getBoundingClientRect().top;
        rdiff = dets.clientX - rotate;
        rotate = dets.clientX;

        rdiff = gsap.utils.clamp(-20, 20, rdiff);

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: rdiff
        })
    })

    elem.addEventListener("mouseleave", async (dets) => {
        rdiff=0;
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration:0.5
        })
    })
})