let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.05;

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("magic-cursor");

  if (!cursor) {
    console.error("❌ Không tìm thấy #magic-cursor trong DOM!");
    return;
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    cursor.style.top = `${currentY}px`;
    cursor.style.left = `${currentX}px`;

    requestAnimationFrame(animateCursor);
  }

  requestAnimationFrame(animateCursor);
});

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  if (!dot) {
    console.warn("Không tìm thấy #cursor-dot");
    return;
  }

  document.addEventListener("mousemove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("magic-cursor");

  let inactivityTimer;

  function resetInactivityTimer() {
    // Khôi phục trạng thái
    dot?.classList.remove("inactive");
    ring?.classList.remove("inactive");

    // Xóa timer cũ nếu có
    clearTimeout(inactivityTimer);

    // Đặt lại timer 5 giây
    inactivityTimer = setTimeout(() => {
      dot?.classList.add("inactive");
      ring?.classList.add("inactive");
    }, 3000);
  }

  // Bắt sự kiện di chuyển chuột
  document.addEventListener("mousemove", resetInactivityTimer);

  // Bắt đầu lần đầu
  resetInactivityTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("magic-cursor");

  let inactivityTimer;

  function resetInactivityTimer() {
    dot?.classList.remove("inactive");
    ring?.classList.remove("inactive");
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      dot?.classList.add("inactive");
      ring?.classList.add("inactive");
    }, 5000);
  }

  // Rê chuột vào vùng ảnh/logo sẽ làm mờ thêm
  const dimTargets = document.querySelectorAll("img, .logo, .brand, .image-hover"); // 👉 bạn có thể mở rộng thêm class khác

  dimTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      dot?.classList.add("dimmed");
      ring?.classList.add("dimmed");
    });
    el.addEventListener("mouseleave", () => {
      dot?.classList.remove("dimmed");
      ring?.classList.remove("dimmed");
    });
  });

  // Di chuyển chuột sẽ reset mờ do không hoạt động
  document.addEventListener("mousemove", resetInactivityTimer);
  resetInactivityTimer(); // chạy lần đầu
});

document.addEventListener("DOMContentLoaded", () => {
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("magic-cursor");

  let inactivityTimer;

  function resetInactivityTimer() {
    dot?.classList.remove("inactive");
    ring?.classList.remove("inactive");
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      dot?.classList.add("inactive");
      ring?.classList.add("inactive");
    }, 5000);
  }

  // ✅ Kiểm tra phần tử dưới chuột để ẩn con trỏ
  document.addEventListener("mousemove", (e) => {
    resetInactivityTimer();

    // Di chuyển dot
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;

    // Lấy phần tử đang dưới chuột
    const hoveredEl = document.elementFromPoint(e.clientX, e.clientY);

    if (
      hoveredEl &&
      (
        hoveredEl.tagName === "A" ||
        hoveredEl.closest("a") ||                         // trong thẻ a
        getComputedStyle(hoveredEl).cursor === "pointer" // có CSS pointer
      )
    ) {
      dot.classList.add("hide-cursor");
      ring.classList.add("hide-cursor");
    } else {
      dot.classList.remove("hide-cursor");
      ring.classList.remove("hide-cursor");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ring = document.getElementById("magic-cursor");

  if (!ring) {
    console.warn("Không tìm thấy #magic-cursor trong DOM");
    return;
  }

  document.addEventListener("click", () => {
    ring.classList.add("clicking");
    setTimeout(() => {
      ring.classList.remove("clicking");
    }, 400); // thời gian trùng với animation CSS
  });
});

document.addEventListener("click", (e) => {
  const ripple = document.createElement("span");
  ripple.classList.add("magic-click-effect");
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600); // đúng thời gian animation
});


