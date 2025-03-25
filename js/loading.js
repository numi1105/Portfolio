$(function () {
    // Spinner 실행
    const $body = $('body');
    const $loadingElement = $(`<div class="loading">
                <div class="spinner">
                    <div class="dot1"></div>
                    <div class="dot2"></div>
                </div>
            </div>`).appendTo($body);

    // 페이지가 이미 로드되었는지 확인
    if (document.readyState === 'complete') {
        setTimeout(() => {
            $loadingElement.fadeOut(() => {
                $loadingElement.remove();
            });
        }, 1500);
    } else {
        $(window).one('load', () => {
            setTimeout(() => {
                $loadingElement.fadeOut(() => {
                    $loadingElement.remove();
                });
            }, 1500);
        });
    }
});
