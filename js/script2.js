$(function () {
    // 타이틀 타임라인
    const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power4.out" },
    });
    tl.from("header nav h1", { y: -100, opacity: 0 }, "-=0.5");
    // Ensure this selector matches an existing element in your HTML
    tl.from("header nav h2", { y: -100, opacity: 0 }, "-=0.5");
    tl.from("header nav ul li", { y: -100, opacity: 0, stagger: 0.1 }, "-=0.5");

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
        anchors: ["section1", "section2", "section3"],

        // * 속도조절
        scrollingSpeed: 1000,

        // * 섹션 영역에서 콘텐츠 세로 정렬(상단 기준)
        verticalCentered: false,

        // * 슬라이더 관련 설정
        slidesNavigation: true,

        // 영역에 진입한 후
        afterLoad: function (anchorLink, index) {
            console.log("영역에 진입한 후 : " + anchorLink, index);

            // section3 영역에 진입하면 탑버튼이 보이게
            if (anchorLink === "section3") $btnTop.fadeIn();

            // 초기화
            AOS.init();
            // console.log($aniEl);
            $aniEl.addClass("aos-animate");
        },

        // 영역을 떠나갈 때
        onLeave: function (index, nextIndex, direction) {
            console.log("영역을 떠나갈 때 : " + index, nextIndex, direction);

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
        },
    });

    // 섹션별로 모두 적용될 수 있게
    $(".section").each(function () {
        const mySlider = new Swiper($(this).find(".my-slider")[0], {
            loop: true,

            pagination: {
                el: $(this).find(".swiper-pagination")[0],
                clickable: true,
            },
            navigation: {
                nextEl: $(this).find(".swiper-button-next")[0],
                prevEl: $(this).find(".swiper-button-prev")[0],
            },
            on: {
                slideChange: function () {
                    const liEl = $(this.el)
                        .closest(".section")
                        .find(".info-list li");
                    liEl.removeClass("active");
                    liEl.eq(this.realIndex).addClass("active");
                },
            },
        });
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
});
