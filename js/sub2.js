// 섹션3의 타임라인 효과
const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".section3",
        start: "top center",
        end: "bottom center",
        // toggleActions: "play none none reverse"
        // markers: true,
    },
});

tl3.from(".section3 .info-list li h5", {
    x: -50,
    opacity: 0,
    duration: 0.4,
    delay: 0.6,
})
    .from(".section3 .info-list li h5 span", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
    })
    .from(".section3 .info-list li h6", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
    })
    .from(".section3 .cha-project p", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2,
    })
    .from(".section3 .cha-res dt", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
    })
    .from(".section3 .cha-res dd", {
        x: -50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2,
    });
