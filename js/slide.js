$(document).ready(function(){
    var container = $('.container'),
        slides = container.children('.slidesWrap'),
        slide = slides.children('.slide'),
        slideCount = slide.length,
        currentIdx = 0,
        slideMargin = 6,
        slideWidth = 90,
        move = slideMargin + slideWidth,
        newSlides,
        newSlidesWidth,
        btnNext = $('.next'),
        btnBack = $('.prev');
    slides.append(slide.clone().addClass('clone'));
    slides.prepend(slide.clone().addClass('clone'));
    function slideLayout(sw, sm) {
        newSlides = $('.slide');
        newSlides.each(function(index){
            $(this).css({left: (sw+sm)*index+'px', width: sw +'px'});
        });
    }
    slideLayout(slideWidth, slideMargin);
    function setSlidePos(){
        var startPos = - move * slideCount +'px';
        slides.css({ transform: 'translateX('+ startPos +')' });
    }
    setSlidePos();
    function moveSlide(index){
        slides.stop().animate({ left: move * -index + 'px' }, 500, function () {
            if (currentIdx >= slideCount || currentIdx <= -slideCount) {
                slides.css({ left: '0px' });
                currentIdx = 0;
            }
        });
        currentIdx = index;
    }
    btnNext.click(function(){
        moveSlide(currentIdx + 1);
    })
    btnBack.click(function () {
        moveSlide(currentIdx - 1);
    })
    $(window).resize(function(){
        newSlideWidth = slides.width() * 18/100;
        move = newSlidesWidth + slideMargin;
        slideLayout(newSlideWidth, slideMargin);
        setSlidePos();
    })
    setInterval(function(){
        moveSlide(currentIdx + 1)
    },5000)
    $('.slidesWrap').mouseenter(function(){
        clearInterval()
    })
})
function sliderGe(slideRan, jump) {
    var childBtnNext = slideRan.children(".row__item-next"),
        childBtnBack = slideRan.children(".row__item-back");

    var slides = slideRan.children('.row__container-sc'),
        slide = slides.children(".row__img-link"),
        currentIdx = 0,
        marginSlide = 6,
        slideCount = slide.length,
        slideWidth = slide.width(),
        move = marginSlide + slideWidth;
    var newSlideWidth;
    var widthW = $(window).width();
    var number;
    if (widthW > 1023) {
        number = 5;
    } else if (widthW < 1024 && widthW > 739) {
        number = 4;
    } else if (widthW < 740 && widthW > 519) {
        number = 3;
    } else {
        number = 2;
}

hoverRowMovie(slideRan, childBtnNext);

childBtnNext.click(function () {
    if (currentIdx < (slideCount - number)) {
        // Nếu số phim còn lại nhỏ hơn lượt lướt chuẩn
        if (slideCount - currentIdx - number < number) {
            moveSlide(slideCount - number);
        }
        else {
            moveSlide(currentIdx + number);
        }
    }
    if (currentIdx >= slideCount - number) {
        setTimeout(() => {
            $(this).hide();
            slideRan.unbind();
            hoverRowMovie(slideRan, childBtnBack);
        }, 400);
    }
    childBtnBack.css("transform", "translate(0)");
    childBtnBack.css("display", "block");
    hoverRowMovie(slideRan, childBtnBack);

});

childBtnBack.click(function () {
    if (currentIdx > 0) {
        if (currentIdx < number) {
            moveSlide(0);
        } else {
            moveSlide(currentIdx - number);
        }
    }
    if (currentIdx <= 0) {
        setTimeout(() => {
            $(this).hide();
            slideRan.unbind();
            hoverRowMovie(slideRan, childBtnNext);
        }, 400);
    }
    childBtnNext.css("transform", "translate(0)");
    childBtnNext.css("display", "block");
    hoverRowMovie(slideRan, childBtnNext);
});

function moveSlide(index) {
    slides.css({ transition: 'all linear' })
    slides.css({ transition: '0.5s' })
    slides.css({ transform: 'translateX(calc(-' + move * index + 'px)' });
    currentIdx = index;
}
// Responsive slider
$(window).resize(function () {
    widthW = $(window).width();
    if (widthW > 1023) {
        number = 5;
    } else if (widthW < 1024 && widthW > 739) {
        number = 4;
    } else if (widthW < 740 && widthW > 519) {
        number = 3;
    } else {
        number = 2;
    }
    newSlideWidth = slide.width();
    move = newSlideWidth + marginSlide;
    slides.css({ transition: '0s' })
    slides.css({ transform: 'translateX(calc(-' + move * currentIdx + 'px)' });
});
}