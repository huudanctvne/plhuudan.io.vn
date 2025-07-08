document.addEventListener('DOMContentLoaded', function () {
    const starContainers = document.querySelectorAll('.rating-stars');

    starContainers.forEach(container => {
        const rating = parseFloat(container.getAttribute('data-rating'));
        const maxStars = 5;

        // Tạo trước 5 sao rỗng
        for (let i = 1; i <= maxStars; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '★';
            container.appendChild(star);
        }

        // Hiệu ứng tăng dần sau 2 giây
        setTimeout(() => {
            const stars = container.querySelectorAll('.star');
            let i = 0;
            const stepTime = 300; // khoảng thời gian giữa mỗi sao (ms)
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            function lightUpStar() {
                if (i < fullStars) {
                    stars[i].classList.add('filled');
                } else if (i === fullStars && hasHalfStar) {
                    stars[i].style.background = `linear-gradient(to right, #f5b301 50%, #ccc 50%)`;
                    stars[i].style['-webkit-background-clip'] = 'text';
                    stars[i].style['-webkit-text-fill-color'] = 'transparent';
                } else {
                    clearInterval(timer);
                }
                i++;
            }

            const timer = setInterval(lightUpStar, stepTime);
        }, 1000);
    });
});

