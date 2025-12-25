/* ===============================
   REGISTRATION LINKS
   =============================== */

const CLASSIC_URL = "https://invictusofficial.github.io/registration/";
const TDM_URL = "https://invictusofficial.github.io/registration/";
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/XXXXXXXXXXX";

/* ===============================
   MODALS & ELEMENTS
   =============================== */

const confirmModal = document.getElementById("confirmModal");

const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

const whatsappLink = document.getElementById("whatsappLink");

let redirectTarget = null;
let whatsappJoined = false;

/* ===============================
   REGISTER CLICK
   =============================== */

document.querySelectorAll(".register-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const badge = card.querySelector(".badge")?.innerText || "";

    if (badge.includes("CLASSIC")) {
      redirectTarget = CLASSIC_URL;
      modalTitle.innerText = "Classic Tournament Registration";
    } else {
      redirectTarget = TDM_URL;
      modalTitle.innerText = "TDM Tournament Registration";
    }

    modalText.innerHTML = `
      You will be redirected to the registration Portal.<br><br>
      <strong>Important Note:</strong><br>
      Match updates, room IDs, schedules, and results are mainly shared via our WhatsApp group.<br>
      Joining is mandatory for the team leader/captain for smooth coordination.<br><br>
      If you’ve already joined, click the link once and continue.
    `;

    // RESET ENFORCEMENT STATE
    whatsappJoined = localStorage.getItem("whatsappJoined") === "true";
confirmBtn.disabled = !whatsappJoined;

// Update message if already joined
if (whatsappJoined) {
  modalText.innerHTML += "<br><br><strong>✓ WhatsApp group already joined.</strong>";
}

    openModal(confirmModal);
  });
});

/* ===============================
   WHATSAPP ENFORCEMENT
   =============================== */

if (whatsappLink) {
  whatsappLink.addEventListener("click", () => {
    whatsappJoined = true;
    localStorage.setItem("whatsappJoined", "true");
    confirmBtn.disabled = false;
  });
}


/* ===============================
   CONFIRMATION FLOW
   =============================== */

confirmBtn.addEventListener("click", () => {
  if (!whatsappJoined) return;

  closeModal(confirmModal);
  window.open(redirectTarget, "_blank");
});

cancelBtn.addEventListener("click", () => {
  closeModal(confirmModal);
});

/* ===============================
   MODAL HELPERS
   =============================== */

function openModal(modal) {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

/* Close modal on background click */
confirmModal.addEventListener("click", e => {
  if (e.target === confirmModal) closeModal(confirmModal);
});

/* ===============================
   ACTIVE NAV LINK
   =============================== */

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let fromTop = window.scrollY + 160;

  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
