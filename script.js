const menuIcon = document.getElementById('menu-icon');
const dropdown = document.getElementById('dropdown');

// Toggle dropdown when hamburger is clicked
menuIcon.addEventListener('click', (event) => {
  event.stopPropagation(); // prevent triggering the document click
  dropdown.classList.toggle('active');
});

// Close dropdown when clicking anywhere else
document.addEventListener('click', (event) => {
  if (!dropdown.contains(event.target) && !menuIcon.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});

// ========== POPUP MODAL ==========
const viewButtons = document.querySelectorAll('.view-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Open modal
viewButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');
    document.getElementById(target).classList.add('show');
  });
});

// Close modal
closeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('show');
  });
});

// Close modal by clicking outside
window.addEventListener('click', (event) => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.classList.remove('show');
    }
  });
});
// ========== COUNTDOWN TIMER ==========
function startCountdown(elementId, targetDate) {
  const countdownElement = document.getElementById(elementId);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance < 0) {
      countdownElement.innerHTML = "Event Started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Call countdown for each event
// Only run countdown if elements exist
if (document.getElementById("countdown1")) {
  startCountdown("countdown1", "November 20, 2025 00:00:00");
  startCountdown("countdown2", "February 14, 2026 00:00:00");
  startCountdown("countdown3", "May 20, 2026 00:00:00");
  startCountdown("countdown4", "January 10, 2026 00:00:00");
  startCountdown("countdown5", "December 19, 2025 00:00:00");
  startCountdown("countdown6", "December 31, 2025 00:00:00");
}

// MINI COUNTDOWNS FOR HOMEPAGE PREVIEW
document.querySelectorAll('.mini-countdown').forEach(el => {
  const targetIso = el.getAttribute('data-target');
  if (!targetIso) return;

  function updateMini() {
    const now = Date.now();
    const distance = new Date(targetIso).getTime() - now;
    if (distance <= 0) {
      el.textContent = 'Started';
      return;
    }
    const d = Math.floor(distance / (1000*60*60*24));
    const h = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const m = Math.floor((distance % (1000*60*60)) / (1000*60));
    el.textContent = `${d}d ${h}h ${m}m`;
  }

  updateMini();
  setInterval(updateMini, 60_000); // update every minute
});



// LIGHTBOX EFFECT FOR GALLERY
const galleryImages = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

// ===== COLLAPSIBLE GALLERY SECTIONS (Accordion style) =====
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach(button => {
  button.addEventListener("click", () => {
    // Close all other sections
    collapsibles.forEach(otherButton => {
      if (otherButton !== button) {
        otherButton.classList.remove("active");
        const otherContent = otherButton.nextElementSibling;
        otherContent.classList.remove("show");
        otherContent.style.maxHeight = null;
      }
    });

    // Toggle current section
    button.classList.toggle("active");
    const content = button.nextElementSibling;
    content.classList.toggle("show");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
