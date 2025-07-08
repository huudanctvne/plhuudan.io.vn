function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

document.addEventListener('DOMContentLoaded', function () {
    const starContainers = document.querySelectorAll('.rating-stars');

    starContainers.forEach(container => {
        const rating = parseFloat(container.getAttribute('data-rating'));
        const maxStars = 5;
        const step = 0.5;

        for (let i = 1; i <= maxStars; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            star.innerHTML = '★'; // Unicode sao
            container.appendChild(star);
        }

        setTimeout(() => {
            const stars = container.querySelectorAll('.star');
            stars.forEach((star, index) => {
                const starValue = index + 1;
                if (starValue <= rating) {
                    star.classList.add('filled');
                } else if (rating + 0.5 >= starValue) {
                    star.style.background = `linear-gradient(to right, #f5b301 50%, #ccc 50%)`;
                    star.style['-webkit-background-clip'] = 'text';
                    star.style['-webkit-text-fill-color'] = 'transparent';
                }
            });
        }, 2000); // Hiệu ứng sau 2 giây
    });
});
