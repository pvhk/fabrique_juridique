document.addEventListener('DOMContentLoaded', function () {

    let header = document.querySelector('header');
    if (header) {
        // -------------------- header
        let body = document.body;
        let link = document.querySelector('header .toggle');
        let bar1 = document.querySelector('header .toggle .bar1');
        let bar2 = document.querySelector('header .toggle .bar2');
        let bar3 = document.querySelector('header .toggle .bar3');
        let menu = document.querySelector('header .mobile_menu');
        let itemMenu = document.querySelectorAll('header .mobile_menu li');
        let header = new TimelineMax({ paused: true, reversed: true });

        header.set(body, { className: '+= scroll_disabled' }, 0);
        header.to(menu, .4, { y: 0, ease: Power2.easeInOut }, 0);
        header.to(bar1, .2, { rotation: 45, x: 11, y: 11, ease: Power2.easeInOut }, 0);
        header.to(bar2, .2, { autoAlpha: 0, ease: Power2.easeInOut }, 0);
        header.to(bar3, .2, { rotation: -45, x: 11, y: -11, ease: Power2.easeInOut }, 0);
        header.to(body, .4, { backgroundColor: 'rgba(0, 0, 0, .2)', ease: Power2.easeInOut }, 0);
        header.staggerTo(itemMenu, .4, { autoAlpha: 1, y: 0, ease: Power2.easeOut }, .08, .4);

        link.addEventListener('click', function () {
            header.reversed() ? header.play() : header.reverse();
        }, false);
        body.addEventListener('click', function () {
            if (body.classList.contains('scroll_disabled')) {
                header.reverse();
            }
        }, false);

    }

    // password show / hide
    $('.password').click(function () {
        $(this).find('svg').toggleClass('fa-eye fa-eye-slash');
        var input = $('.input-img input');
        if (input.attr('type') == 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });

});