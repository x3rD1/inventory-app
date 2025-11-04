const openBtn = document.getElementById("openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");
const animeForm = document.querySelector(".anime-form");
const updateBtn = document.querySelectorAll(".update-btn");
const titleError = document.querySelector(".title-error");
const genreError = document.querySelector(".genre-error");
const titleInput = document.querySelector("#title");
const genres = document.querySelectorAll('input[name="genre"]');

openBtn.addEventListener("click", () => {
  titleInput.value = "";
  modalContainer.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  titleError.style.display = "none";
  genreError.style.display = "none";
  genres.forEach((genre) => (genre.checked = false));
  modalContainer.classList.remove("active");
});

updateBtn.forEach((button) => {
  button.addEventListener("click", () => {
    const animeId = button.dataset.id;
    title.value = button.dataset.title;
    animeForm.action = `/admin/room/update/${animeId}`;
    titleError.style.display = "none";
    genreError.style.display = "none";
    genres.forEach((genre) => (genre.checked = false));
    modalContainer.classList.add("active");
  });
});

animeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const checkedGenres = document.querySelectorAll(
    'input[name="genre"]:checked'
  );

  if (!title) {
    titleError.style.display = "block";
    return;
  }

  if (checkedGenres.length === 0) {
    genreError.style.display = "block";
    return;
  }

  [titleError, genreError].style.display = "none";
  animeForm.submit();
});

// Close modal when clicking outside
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    titleError.style.display = "none";
    genreError.style.display = "none";
    genres.forEach((genre) => (genre.checked = false));
    modalContainer.classList.remove("active");
  }
});
