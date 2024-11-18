const head = document.querySelector(".head>h4");
const src = document.querySelector(".search");
const searchDiv = document.querySelector(".src");
const result = document.querySelector(".result");

function getData(show) {
  const name = document.querySelector(".name");
  name.textContent = show.name;
  const img = document.querySelector("img");
  img.src = show.image.original;

  const id = document.querySelector(".id");
  id.textContent = `ID: ${show.id}`;
  const network = document.querySelector(".network");
  network.textContent = `Network: ${show.network.name}`;
  const type = document.querySelector(".type");
  type.textContent = `Type: ${show.type}`;
  const rating = document.querySelector(".rating");
  rating.textContent = `Rating: ${show.rating.average}`;
  const language = document.querySelector(".language");
  language.textContent = `Language: ${show.language}`;
  const status = document.querySelector(".status");
  status.textContent = `Status: ${show.status}`;
  const runtime = document.querySelector(".runtime");
  runtime.textContent = `Runtime: ${show.runtime} minutes`;

  const summary = document.querySelector(".summary");
  summary.innerHTML = `${show.summary}`;
}
window.addEventListener("load", () => {
  let data = JSON.parse(window.localStorage.getItem("showInfo"));
  getData(data);
});

head.addEventListener("click", () => {
  window.location.pathname = "./index.html";
});

function showShows(data) {
  const newShowsArray = data.slice(0, 50);
  newShowsArray.forEach((e) => {
    const showImg = document.createElement("img");
    showImg.setAttribute("src", e.image.medium);
    showImg.addEventListener("click", () => {
      window.localStorage.removeItem("showInfo");
      window.localStorage.setItem("showInfo", JSON.stringify(e));
      window.location.pathname = "./info.html";
    });
    const showDiv = document.createElement("div");
    showDiv.append(showImg);
    const showTxt = document.createElement("p");
    showTxt.innerHTML = e.name;
    showDiv.append(showTxt);
  });
}
function fetchShows(query) {
  const SRC_URL = `https://api.tvmaze.com/search/shows?q=${query}`;
  fetch(SRC_URL)
    .then((response) => response.json())
    .then((data) => {
      srcShows(data);
    });
}
function srcShows(data) {
  // console.log(data);
  data.forEach((e) => {
    // console.log(e);
    const srcTxt = document.createElement("p");
    srcTxt.innerHTML = e.show.name;
    result.append(srcTxt);
    srcTxt.addEventListener("click", () => {
      window.localStorage.removeItem("showInfo");
      window.localStorage.setItem("showInfo", JSON.stringify(e.show));
      window.location.pathname = "./info.html";
    });
  });
}
src.addEventListener("keyup", (event) => {
  // console.log(event.target.value);
  result.innerHTML = "";
  fetchShows(event.target.value);
});
