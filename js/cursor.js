function ms_custom_cursor() {
  const ring = document.querySelector(".ms-cursor-ring"),
        dot = document.querySelector(".ms-cursor-dot");
        console.log("ring:", ring, "dot:", dot);
        pointer = { x: innerWidth / 2, y: innerHeight / 2 };

  let trailX = pointer.x, trailY = pointer.y;
  let dotX = pointer.x, dotY = pointer.y;
  let outerX = pointer.x, outerY = pointer.y;
  let scaleX = 1, scaleY = 1, active = false, hover = false, zoom = 0;

  const lerp = (start, end, amt) => start + (end - start) * amt;

  function updatePointer(e) {
    const pos = e.touches ? e.touches[0] : e;
    pointer.x = pos.clientX;
    pointer.y = pos.clientY;

    if (!active) {
      active = true;
      gsap.to([ring, dot], { scale: 1, duration: 0.4, ease: "back.out(1.7)" });
    }
  }

  window.addEventListener("mousemove", updatePointer);
  window.addEventListener("touchmove", updatePointer);
  window.addEventListener("touchstart", updatePointer);

  requestAnimationFrame(function animate() {
    const dx = pointer.x - outerX;
    const dy = pointer.y - outerY;
    const dist = Math.hypot(dx, dy);

    outerX = pointer.x;
    outerY = pointer.y;

    trailX = lerp(trailX, pointer.x, 0.1);
    trailY = lerp(trailY, pointer.y, 0.1);
    dotX = lerp(dotX, pointer.x, 0.2);
    dotY = lerp(dotY, pointer.y, 0.2);

    const squash = 1 - 0.02 * dist;
    scaleX = lerp(scaleX, 1 + 0.02 * dist, 0.15);
    scaleY = lerp(scaleY, squash, 0.15);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    zoom = lerp(zoom, active && !hover ? 1 : 0, 0.08);

    ring.style.transform = `
      translate3d(${trailX}px, ${trailY}px, 0)
      rotate(${angle}deg)
      scale(${scaleX * zoom}, ${scaleY * zoom})
    `;
    dot.style.transform = `
      translate3d(${dotX}px, ${dotY}px, 0)
      scale(${zoom})
    `;

    requestAnimationFrame(animate);
  });
}

ms_custom_cursor();
