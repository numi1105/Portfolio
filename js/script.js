$(function () {
    // // 새로고침 확인
    // const navigationEntries = performance.getEntriesByType("navigation");
    // const isReload =
    //     navigationEntries.length > 0 && navigationEntries[0].type === "reload"; // 새로고침이면 "reload"

    // // 현재 페이지가 index.html인지 확인
    // const isIndexPage =
    //     window.location.pathname.endsWith("index.html") ||
    //     window.location.pathname === "/";

    // // 첫 방문 여부 확인
    // const isFirstVisit = !sessionStorage.getItem("visited");

    // // **다른 페이지에서 index.html로 이동한 경우 visited 기록 삭제**
    // if (document.referrer && !document.referrer.includes("index.html")) {
    //     sessionStorage.removeItem("visited");
    // }

    // // 새로고침하면 첫 페이지로 이동하면서 로딩 표시
    // if (isReload && isIndexPage) {
    //     sessionStorage.removeItem("visited");
    //     window.location.href = "index.html#section1";
    //     setTimeout(() => {
    //         $(".loading").fadeOut();
    //     }, 1500);
    // }

    // // 첫 방문일 경우만 로딩 표시
    // if (isIndexPage && (!sessionStorage.getItem("visited") || isReload)) {
    //     $body.append(loadingTag);
    //     const $loading = $(".loading");

    //     $(window).on("load", () => {
    //         setTimeout(() => {
    //             $loading.fadeOut();
    //             sessionStorage.setItem("visited", "true"); // 방문 여부 저장
    //         }, 1500);
    //     });
    // }

    // 탑버튼
    const $header = $("header");
    const $btnTop = $(".btn-top");

    // AOS.js를 적용할 대상
    const $aniEl = $("[data-aos]");

    // 페이지가 로딩되면 탑버튼 숨기기
    $btnTop.hide();

    // 탑버튼을 클릭했을 때 상단으로 이동
    $btnTop.on("click", () => {
        $.fn.fullpage.moveTo("section1");
    });

    // 초기화
    $("#fullpage").fullpage({
        // * 인디케이터 커스텀

        // 1. 사용할 요소의 이름을 지정
        menu: ".indicator",

        // 2. 앵커(영역)의 이름을 설정
        anchors: ["section1", "section2", "section3", "section4", "footer"],

        // 3. 실제 사용될 링크에 data-menuanchor= "영역이름" 적용

        // * 속도조절
        scrollingSpeed: 1000,

        // * 섹션 영역에서 콘텐츠 세로 정렬(상단 기준)
        verticalCentered: false,

        // * 슬라이더 관련 설정
        slidesNavigation: true,

        // 영역에 진입한 후
        afterLoad: function (anchorLink, index) {
            console.log("영역에 진입한 후 : " + anchorLink, index);

            // section4 영역에 진입하면 탑버튼이 보이게
            if (anchorLink === "section4" || anchorLink === "footer") $btnTop.fadeIn();

            // 초기화
            AOS.init();
            // console.log($aniEl);
            $aniEl.addClass("aos-animate");
        },

        // 영역을 떠나갈 때
        onLeave: function (index, nextIndex, direction) {
            console.log("영역을 떠나갈 때 : " + index, nextIndex, direction);

            // section4 영역을 떠나고 휠을 올렸을 때 탑버튼 숨기기
            if (index === 4 || direction === "up") $btnTop.fadeOut();

            // if () {} else {} 다운시 헤더 숨기기
            if (direction === "down") {
                $header.addClass("hide");
            } else {
                $header.removeClass("hide");
            }

            // aos-animate 클래스가 없으면 애니메이션 동작 X
            $aniEl.removeClass("aos-animate");
        },
    });

    // Home: Section1
    // 타임라인 정의
    const mainImg = document.querySelector(".section1 figure img");
    const mainTitle = document.querySelector(".section1 dl dt");
    const subTitle1 = document.querySelectorAll(".sub-title1");
    const subTitle2 = document.querySelectorAll(".sub-title2");
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });
    tl.from(".logo", { y: -100, opacity: 0, delay: 1.5 });
    tl.from(".gnb li a", {
        y: -100,
        opacity: 0,
        stagger: 0.1,

        // 콜백옵션
        onComplete: () => {
            gsap.to(".logo", { y: 10, yoyo: true, repeat: 5, duration: 0.5 });
        },
    });
    tl.from(
        mainTitle,
        {
            x: -300,
            opacity: 0,
            ease: "none",
            // scrollTrigger: {
            //     trigger: mainTitle,
            //     // markers: true,
            //     start: "top 60%",
            //     toggleActions: "play none none reverse",
            // },
        },
        "-=0.6"
    );
    tl.from(
        subTitle1,
        {
            x: 300,
            opacity: 0,
            ease: "none",
            // scrollTrigger: {
            //     trigger: subTitle1,
            //     // markers: true,
            //     start: "top 70%", //trigger/viewport(scroller)
            //     toggleActions: "play none none reverse",
            // },
        },
        "<"
    );
    tl.from(
        subTitle2,
        {
            x: 300,
            opacity: 0,
            ease: "none",
            // scrollTrigger: {
            //     trigger: subTitle2,
            //     // markers: true,
            //     start: "top 70%", //trigger/viewport(scroller)
            //     toggleActions: "play none none reverse",
            // },
        },
        "<"
    );
    // mainTitle과 subTitle가 글자 하나씩 컬러가 그라데이션으로 변하는 효과
    const splitText = (el) => {
        el.innerHTML = el.textContent.replace(/(\S)/g, "<span>$1</span>");
    };

    splitText(mainTitle);
    subTitle1.forEach(splitText);
    subTitle2.forEach(splitText);

    const gradientColors = ["#0F5284", "#FFFFFF"];

    gsap.fromTo(
        mainTitle.querySelectorAll("span"),
        { color: gradientColors[0] },
        {
            color: gradientColors[1],
            stagger: 0.02,
            duration: 3,
            ease: "power2.inOut",
            delay: 1.5, // 1초 뒤에 작동
            repeat: -1,
            yoyo: true,
        }
    );

    subTitle1.forEach((title) => {
        gsap.fromTo(
            title.querySelectorAll("span"),
            { color: gradientColors[0] },
            {
                color: gradientColors[1],
                stagger: 0.02,
                duration: 3,
                ease: "power2.inOut",
                delay: 2,
                repeat: -1,
                yoyo: true,
            }
        );
    }, "+=0.5");

    subTitle2.forEach((title) => {
        gsap.fromTo(
            title.querySelectorAll("span"),
            { color: gradientColors[0] },
            {
                color: gradientColors[1],
                stagger: 0.04,
                duration: 3,
                ease: "power2.inOut",
                delay: 3,
                repeat: -1,
                yoyo: true,
            }
        );
    });

    gsap.from(mainImg, {
        autoAlpha: 0,
        scale: 0.5,
        duration: 1.5,
        onComplete: () => {
            gsap.to(mainImg, {
                rotation: "+=360",
                repeat: -1,
                ease: "linear",
                duration: 5,
            });
        },
    });

    // Section4: Contact
    const section4Mottojp = document.querySelector(".section4 .mottojp");
    const section4Mottoko = document.querySelectorAll(".section4 .mottoko");

    splitText(section4Mottojp);
    section4Mottoko.forEach(splitText);

    gsap.fromTo(
        section4Mottojp.querySelectorAll("span"),
        { color: gradientColors[0] },
        {
            color: gradientColors[1],
            stagger: 0.02,
            duration: 3,
            ease: "power2.inOut",
            delay: 1,
            repeat: -1,
            yoyo: true,
        }
    );

    section4Mottoko.forEach((title) => {
        gsap.fromTo(
            title.querySelectorAll("span"),
            { color: gradientColors[0] },
            {
                color: gradientColors[1],
                stagger: 0.02,
                duration: 3,
                ease: "power2.inOut",
                delay: 1.5,
                repeat: -1,
                yoyo: true,
            }
        );
    });

    gsap.fromTo(
        ".section4 figure",
        { y: -50 },
        {
            y: 0,
            opacity: 1,
            duration: 3,
            ease: "bounce.out",
            repeat: -1,
            yoyo: true,
            // scrollTrigger: {
            //     trigger: ".section4 figure",
            //     start: "top 80%",
            //     toggleActions: "play none none reverse",
            // },
        }
    );

    // 마우스 따라다니는 지구본
    const $window = $(window);
    const $cursor = $(".cursor");

    let x = 0;
    let y = 0;
    let mx = 0;
    let my = 0;
    let speed = 0.08;

    // 마우스를 움직이면
    $window.on("mousemove", (e) => {
        // 마우스의 좌표값을 가져와서
        x = e.pageX;
        y = e.pageY;
    });

    function moving() {
        // 마우스 좌표값을 수정
        mx += (x - mx) * speed;
        my += (y - my) * speed;

        // cursor의 좌표값으로
        $cursor.css({
            left: mx,
            top: my,
        });
        requestAnimationFrame(moving);
    }

    moving();
});
