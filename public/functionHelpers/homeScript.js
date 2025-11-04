const openBtn = document.getElementById("openModalBtn");
const modalContainer = document.getElementById("modalContainer");
const closeBtn = document.getElementById("closeModalBtn");
const animeForm = document.querySelector(".anime-form");
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

  titleError.style.display = "none";
  genreError.style.display = "none";
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
