/*
 * TMP Animation JS
 * (c) 2025 Themes-Park
 * Released under the themes-park.net
 */

// Class names for different scroll and animation states
const TMP_SCROLL_ACTIVATION = "tmp-scroll-trigger";
    TMP_SCROLL_OFFSCREEN_ACTIVATION = "tmp-scroll-trigger--offscreen",
    TMP_SCROLL_ZOOM_IN_ACTIVATION = "animate--zoom-in",
    TMP_SCROLL_CANCEL_ACTIVATION = "tmp-scroll-trigger--cancel";


// Handle intersection events for scroll animations
function onIntersection(entries, observer) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const elementTarget = entry.target;
            if ($(elementTarget).hasClass(TMP_SCROLL_OFFSCREEN_ACTIVATION)) {
                $(elementTarget).removeClass(TMP_SCROLL_OFFSCREEN_ACTIVATION);
                if ($(elementTarget).attr("data-cascade")) {
                    $(elementTarget).css("--animation-order", index);
                }
            }
            observer.unobserve(elementTarget);
        } else {
            $(entry.target).addClass(TMP_SCROLL_OFFSCREEN_ACTIVATION);
            $(entry.target).removeClass(TMP_SCROLL_CANCEL_ACTIVATION);
        }
    });
}

// Initialize scroll animation triggers
function initializeScrollAnimationTrigger(rootEl = document, isDesignModeEvent = false) {
    const animationTriggerElements = $(rootEl).find(`.${TMP_SCROLL_ACTIVATION}`);
    if (animationTriggerElements.length === 0) return;

    if (isDesignModeEvent) {
        animationTriggerElements.each(function() {
            $(this).addClass("tmp-scroll-trigger--design-mode");
        });
        return;
    }

    const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "0px 0px -50px 0px"
    });
    animationTriggerElements.each(function() {
        observer.observe(this);
    });
}

// Initialize zoom-in animation triggers
function initializeScrollZoomAnimationTrigger() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animationTriggerElements = $(`.${TMP_SCROLL_ZOOM_IN_ACTIVATION}`);
    if (animationTriggerElements.length === 0) return;

    const scaleAmount = 0.2 / 100;
    animationTriggerElements.each(function() {
        const element = this;
        let elementIsVisible = false;

        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                elementIsVisible = entry.isIntersecting;
            });
        }).observe(element);

        $(element).css("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
        $(window).on("scroll", throttle(() => {
            if (elementIsVisible) {
                $(element).css("--zoom-in-ratio", 1 + scaleAmount * percentageSeen(element));
            }
        }, 100), {
            passive: true
        });
    });
}

// Calculate the percentage of the element that is visible
function percentageSeen(element) {
    const viewportHeight = window.innerHeight,
        scrollY = window.scrollY,
        elementPositionY = $(element).offset().top,
        elementHeight = $(element).outerHeight();

    if (elementPositionY > scrollY + viewportHeight) return 0;
    if (elementPositionY + elementHeight < scrollY) return 100;

    let percentage = (scrollY + viewportHeight - elementPositionY) / ((viewportHeight + elementHeight) / 100);
    return Math.round(percentage);
}

// Initialize animations and remove initial opacity class from swiper slides
$(document).ready(() => {
    $(".swiper-slide.opacity-0").each(function() {
        $(this).removeClass("opacity-0");
    });
    initializeScrollAnimationTrigger();
    initializeScrollZoomAnimationTrigger();
});

// Throttle the scroll event to improve performance
function throttle(fn, wait) {
    let time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const targetElement = document.querySelector('.text-para-documents');

    if (targetElement) {
        const originalHtmlContent = targetElement.innerHTML; // Lấy toàn bộ HTML gốc của h2
        targetElement.innerHTML = ''; // Xóa nội dung hiện tại để xây dựng lại

        // Tạo một div tạm thời để phân tích HTML gốc thành cấu trúc DOM
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalHtmlContent;

        // Hàm xử lý một đoạn văn bản (một từ hoặc cụm từ)
        // Bọc các ký tự trong .char-span và thiết lập màu/hiệu ứng hover
        function processTextSegment(text, isRedColor) {
            const wordWrapper = document.createElement('span');
            // Rất quan trọng: Ngăn ngắt dòng bên trong từ/phân đoạn này
            wordWrapper.style.whiteSpace = 'nowrap';
            // Đặt màu cơ bản cho wordWrapper để các charSpan con kế thừa (nếu không thiết lập riêng)
            wordWrapper.style.color = isRedColor ? 'var(--color-primary)' : 'var(--color-heading)';

            // Chuẩn hóa nhiều khoảng trắng thành một khoảng trắng không ngắt dòng
            // Điều này áp dụng ở cấp độ từ/phân đoạn
            const cleanedText = text.replace(/\s+/g, '\u00A0'); // Convert all multiple spaces to single non-breaking space

            for (const char of cleanedText) {
                const charSpan = document.createElement('span');
                charSpan.className = 'char-span'; // Để áp dụng hiệu ứng hover
                charSpan.textContent = char; // Ký tự (nếu là khoảng trắng thì đã là &nbsp;)
                
                // Thiết lập màu sắc trực tiếp cho từng ký tự để đảm bảo
                charSpan.style.color = isRedColor ? 'var(--color-primary)' : 'var(--color-heading)';

                // Thêm sự kiện hover
                charSpan.addEventListener('mouseenter', () => {
                    charSpan.style.transform = 'scale(1.2)';
                });
                charSpan.addEventListener('mouseleave', () => {
                    charSpan.style.transform = 'scale(1)';
                });
                wordWrapper.appendChild(charSpan);
            }
            return wordWrapper;
        }

        // Duyệt qua các node con của div tạm thời (đã parse HTML gốc)
        Array.from(tempDiv.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Xử lý các node văn bản thuần túy (ví dụ: "Not for ", "I am, ")
                // Tách theo khoảng trắng để có các "từ" hoặc dấu câu riêng lẻ
                // regex `(\s+)` giúp giữ lại khoảng trắng làm phần tử riêng
                const textParts = node.nodeValue.split(/(\s+)/); 

                textParts.forEach(part => {
                    if (part.length > 0) { // Bỏ qua các chuỗi rỗng có thể sinh ra từ split
                        const isWhitespace = /^\s+$/.test(part); // Kiểm tra nếu chỉ là khoảng trắng

                        if (isWhitespace) {
                            // Tạo một span riêng cho khoảng trắng để nó được bọc và xử lý đúng
                            const whitespaceSpan = document.createElement('span');
                            whitespaceSpan.style.whiteSpace = 'nowrap'; // Ngăn khoảng trắng bị ngắt dòng
                            whitespaceSpan.style.color = 'var(--color-heading)'; // Màu mặc định cho khoảng trắng
                            whitespaceSpan.textContent = '\u00A0'; // Dấu cách không ngắt dòng
                            targetElement.appendChild(whitespaceSpan);
                        } else {
                            // Đây là một từ (hoặc dấu câu liền kề) không phải khoảng trắng
                            targetElement.appendChild(processTextSegment(part, false)); // Màu đen mặc định
                        }
                    }
                });

            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'span') {
                // Xử lý các thẻ <span> gốc của bạn (ví dụ: "<span> jobs</span>")
                // Đây là các từ/cụm từ mà bạn muốn màu đỏ
                const spanContent = node.textContent; // Ví dụ: " jobs"
                targetElement.appendChild(processTextSegment(spanContent, true)); // Màu đỏ
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'br') {
                // Xử lý thẻ <br>
                targetElement.appendChild(node.cloneNode()); // Thêm bản sao của thẻ <br>
            }
            // Bỏ qua các loại node khác nếu có
        });
    }
});