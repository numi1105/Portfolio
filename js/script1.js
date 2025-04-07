$(function () {
    // 타이틀 타임라인
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power4.out" } });
    tl.from("header nav h1", { y: -100, opacity: 0 }, "<");
    tl.from("header nav h2", { y: -100, opacity: 0 }, "-=0.5");
    tl.from("header nav ul li", { y: -100, opacity: 0, stagger: 0.1 }, "-=0.5");
    tl.from(".profile-1st", { x: -100, opacity: 0, stagger: 0.1 });
    tl.from(".profile-2nd", { y: 100, opacity: 0, stagger: 0.1 });
    // tl.from(".whoryou", { y: -100, opacity: 0, stagger: 0.1 });

    // AOS 초기화 설정 수정
    AOS.init({
        duration: 1000,
        once: false, // false로 변경하여 반복 실행되도록        offset: 100,
        disable: false,
    });

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
    // 마우스 따라다니는 비행기
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

    const paths = document.querySelectorAll(".check path");

    // 초기화
    $("#fullpage").fullpage({
        // * 인디케이터 커스텀

        // 1. 사용할 요소의 이름을 지정
        menu: ".indicator",

        // 2. 앵커(영역)의 이름을 설정
        anchors: ["section1", "section2", "section3"],

        // * 속도조절
        scrollingSpeed: 1000,

        // * 섹션 영역에서 콘텐츠 세로 정렬(상단 기준)
        verticalCentered: false,

        // * 슬라이더 관련 설정
        slidesNavigation: true,

        // 슬라이드 이동 후 콜백
        afterSlideLoad: function (section, origin, destination, direction) {
            console.log("슬라이드 로드:", section, origin, destination);

            // section1의 두 번째 슬라이드로 이동했을 때
            if (section.index === 0 && destination === 1) {
                // hobby-list 애니메이션 실행
                gsap.from(".hobby-list", {
                    y: 100,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power4.out",
                });
            }
        },

        // 슬라이드 이동 전 콜백
        onSlideLeave: function (section, origin, destination, direction) {
            console.log("슬라이드 떠남:", section, origin, destination);

            // section1의 슬라이드 이동 시
            if (section.index === 0) {
                // section1은 인덱스가 0
                // aos-animate 클래스 제거
                $(".hobby-list").removeClass("aos-animate");
            }
        },

        afterLoad: function (anchorLink, index) {
            console.log("영역에 진입한 후 : " + anchorLink, index);

            if (anchorLink === "section1") {
                // section1 영역에 진입하면
                $(".section1 [data-aos]").addClass("aos-animate");
            }

            // section2 영역에 진입하면
            if (anchorLink === "section2") {
                $(".section2 [data-aos]").addClass("aos-animate");

                // 텍스트 애니메이션 완료 후 SVG 애니메이션 실행
                gsap.fromTo(
                    ".section2 .text-animation", // 텍스트 애니메이션 대상
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        onComplete: () => {
                            // 텍스트 애니메이션 완료 후 실행
                            setTimeout(() => {
                                paths.forEach((path, index) => {
                                    gsap.to(path, {
                                        strokeDashoffset: 0,
                                        duration: 1,
                                        delay: index * 0.5,
                                    });
                                });
                            }, 500); // 약간의 지연 시간 추가
                        },
                    }
                );
            }

            // section3 영역에 진입하면
            if (anchorLink === "section3") {
                $btnTop.fadeIn();
                $(".section3 [data-aos]").addClass("aos-animate");
            }

            // 현재 섹션의 AOS 요소들 활성화
            $(`.section${index} [data-aos]`).addClass("aos-animate");
        },

        onLeave: function (index, nextIndex, direction) {
            console.log("영역을 떠나갈 때 : " + index, nextIndex, direction);

            // strokeDashoffset 초기화 - 즉시 실행되도록 수정
            if (index === 2) {
                paths.forEach((path) => {
                    gsap.set(path, {
                        strokeDashoffset: 1000,
                        immediateRender: true,
                        overwrite: true,
                    });
                });
            }

            // section3 영역을 떠나고 휠을 올렸을 때 탑버튼 숨기기
            if (index === 3 || direction === "up") $btnTop.fadeOut();

            // if () {} else {} 다운시 헤더 숨기기
            if (direction === "down") {
                $header.addClass("hide");
            } else {
                $header.removeClass("hide");
            }

            // aos-animate 클래스가 없으면 애니메이션 동작 X
            $aniEl.removeClass("aos-animate");

            // 떠나는 섹션의 AOS 요소들 비활성화
            $(`.section${index} [data-aos]`).removeClass("aos-animate");
        },
    });
});
