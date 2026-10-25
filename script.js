// Moonpetal Kitchen — portfolio demo interactions
// To activate WhatsApp, replace the empty string with the business number
// including country code, digits only. Example for India: "919876543210".
const WHATSAPP_NUMBER = "919626693924";

const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

function sendWhatsApp(message) {
  if (!WHATSAPP_NUMBER.trim()) {
    showToast("Demo mode ✧ Add the business WhatsApp number in script.js to enable messages.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".order-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    sendWhatsApp(`Hello Moonpetal Kitchen! I'm interested in ${item}. Please share the details.`);
  });
});

document.querySelector("#contact-button").addEventListener("click", () => {
  sendWhatsApp("Hello Moonpetal Kitchen! I'd like to enquire about your menu.");
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
