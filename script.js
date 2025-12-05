// Initialize Swiper sliders
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: Combined slider
        const leftSlides = document.querySelectorAll('.left-section .swiper-slide');
        const rightSlides = document.querySelectorAll('.right-section .swiper-slide');
        const allSlides = [...leftSlides, ...rightSlides];
        const totalSlides = allSlides.length;
        const slideInterval = 6000;
        let currentMobileSlide = 0;
        let slideTimer;

        function showMobileSlide(index) {
            // First, reset all slides to default state
            document.querySelectorAll('.left-section .swiper-slide, .right-section .swiper-slide').forEach(slide => {
                slide.style.opacity = '0';
            });

            // Show the appropriate section and slide
            if (index < leftSlides.length) {
                // Show left section
                document.querySelector('.left-section').style.opacity = '1';
                document.querySelector('.right-section').style.opacity = '0';
                if (leftSlides[index]) {
                    leftSlides[index].style.opacity = '1';
                }
            } else {
                // Show right section
                document.querySelector('.left-section').style.opacity = '0';
                document.querySelector('.right-section').style.opacity = '1';
                const rightIndex = index - leftSlides.length;
                if (rightSlides[rightIndex]) {
                    rightSlides[rightIndex].style.opacity = '1';
                }
            }
        }

        function changeMobileSlide() {
            showMobileSlide(currentMobileSlide);
            currentMobileSlide = (currentMobileSlide + 1) % totalSlides;
            console.log('Current slide:', currentMobileSlide, 'Total slides:', totalSlides);
        }

        function startSlideTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(changeMobileSlide, slideInterval);
        }

        // Initialize: Show first slide immediately
        showMobileSlide(0);
        currentMobileSlide = 1;

        // Start mobile slider
        startSlideTimer();

        // Mobile click navigation
        const leftWrap = document.querySelector('.left-wrap');
        const rightWrap = document.querySelector('.right-wrap');

        leftWrap.addEventListener('click', function(e) {
            // content-box 클릭 시 링크 이동
            if (e.target.closest('.content-box')) {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
                return;
            }
            e.preventDefault();
            // Show left section slides
            currentMobileSlide = 0;
            showMobileSlide(currentMobileSlide);
            currentMobileSlide = (currentMobileSlide + 1) % leftSlides.length;
            startSlideTimer();
        });

        rightWrap.addEventListener('click', function(e) {
            // content-box 클릭 시 링크 이동
            if (e.target.closest('.content-box')) {
                const link = this.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
                return;
            }
            e.preventDefault();
            // Show right section slides
            currentMobileSlide = leftSlides.length;
            showMobileSlide(currentMobileSlide);
            currentMobileSlide = leftSlides.length + ((currentMobileSlide - leftSlides.length + 1) % rightSlides.length);
            startSlideTimer();
        });

    } else {
        // Desktop: Original dual slider
        const totalSlides = Math.max(
            document.querySelectorAll('.left-section .swiper-slide').length,
            document.querySelectorAll('.right-section .swiper-slide').length
        );
        const slideInterval = 6000;

        // Left section slider
        const leftSwiper = new Swiper('.left-section .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: false,
            loop: false,
            speed: 1500,
            allowTouchMove: false,
            slidesPerView: 1,
            spaceBetween: 0,
        });

        // Right section slider
        const rightSwiper = new Swiper('.right-section .swiper', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: false,
            loop: false,
            speed: 1500,
            allowTouchMove: false,
            slidesPerView: 1,
            spaceBetween: 0,
        });

        // 동기화된 슬라이더 제어
        function changeSlides() {
            currentSlide = (currentSlide + 1) % totalSlides;

            // left-section은 슬라이드가 적을 수 있으므로 범위 체크
            const leftSlideIndex = currentSlide % document.querySelectorAll('.left-section .swiper-slide').length;
            const rightSlideIndex = currentSlide % document.querySelectorAll('.right-section .swiper-slide').length;

            leftSwiper.slideTo(leftSlideIndex);
            rightSwiper.slideTo(rightSlideIndex);
        }

        // 동시에 슬라이드 변경
        setInterval(changeSlides, slideInterval);
        setTimeout(() => {
            changeSlides();
        }, slideInterval);
    }

    // Hover effects
    const leftWrap = document.querySelector('.left-wrap');
    const rightWrap = document.querySelector('.right-wrap');
    const leftSection = document.querySelector('.left-section');
    const rightSection = document.querySelector('.right-section');

    if (leftWrap && rightWrap && leftSection && rightSection) {
        // Desktop hover effects
        leftWrap.addEventListener('mouseenter', function() {
            leftSection.classList.add('size');
            leftSection.classList.remove('off');
            rightSection.classList.add('off');
        });

        leftWrap.addEventListener('mouseleave', function() {
            leftSection.classList.remove('size');
            rightSection.classList.remove('off');
        });

        rightWrap.addEventListener('mouseenter', function() {
            rightSection.classList.add('size');
            rightSection.classList.remove('off');
            leftSection.classList.add('off');
        });

        rightWrap.addEventListener('mouseleave', function() {
            rightSection.classList.remove('size');
            leftSection.classList.remove('off');
        });

        // Mobile touch effects (only for desktop)
        if (!isMobile) {
            leftWrap.addEventListener('touchstart', function() {
                this.classList.add('active');
            });

            leftWrap.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active');
                }, 500);
            });

            rightWrap.addEventListener('touchstart', function() {
                this.classList.add('active');
            });

            rightWrap.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('active');
                }, 500);
            });
        }
    }
});