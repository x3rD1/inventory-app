const openBtn = document.getElementById("openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");

openBtn.addEventListener("click", () => {
  modalContainer.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modalContainer.classList.remove("active");
});

// Close modal when clicking outside
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.remove("active");
  }
});
