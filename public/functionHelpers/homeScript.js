const openBtn = document.getElementById("openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");
const animeForm = document.querySelector(".anime-form");

const title = document.querySelector("#title");

openBtn.addEventListener("click", () => {
  title.value = "";
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
