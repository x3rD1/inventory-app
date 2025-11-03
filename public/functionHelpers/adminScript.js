const openBtn = document.getElementById("openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");
const animeForm = document.querySelector(".anime-form");
const updateBtn = document.querySelectorAll(".update-btn");

const title = document.querySelector("#title");

openBtn.addEventListener("click", () => {
  title.value = "";
  animeForm.action = "/admin/room/add";
  modalContainer.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modalContainer.classList.remove("active");
});

updateBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const animeId = button.dataset.id;
    title.value = button.dataset.title;
    animeForm.action = `/admin/room/update/${animeId}`;
    modalContainer.classList.add("active");
  });
});

// Close modal when clicking outside
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.remove("active");
  }
});
