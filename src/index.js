
import API from "./apiService";
import imageCard from "./templates/image-card.hbs";

const api = new API();
const debounce = require("lodash.debounce");
const refs = {
  imageContainer: document.querySelector(".gallery"),
  imageInput: document.querySelector('input[name="query"]'),
  imageSentinel: document.querySelector("#sentinel"),
};

refs.imageInput.addEventListener("input", debounce(onSearch, 1000));

function onSearch(e) {
  e.preventDefault();
  clearImageContainer();
  api.query = e.target.value;
  if (api.query.length === 0) {
    clearImageContainer();
    return;
  }
  api.resetPage();
  fetchImage();
}

function fetchImage() {
  api.fetchImage().then((image) => {
    markupImageCard(image);
  });
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = "";
}

function markupImageCard(image) {
  refs.imageContainer.insertAdjacentHTML("beforeend", imageCard(image));
}

const onEntry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && api.query !== "") {
      fetchImage();
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: "200px",
});
observer.observe(refs.imageSentinel);
