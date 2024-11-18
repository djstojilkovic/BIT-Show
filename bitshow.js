const URL = "https://api.tvmaze.com/shows";
const showContainer = document.querySelector(".shows");
const src = document.querySelector(".search");
const searchDiv = document.querySelector(".src");
const result = document.querySelector(".result");
window.addEventListener("load", getShows);
function getShows() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      showShows(data);
    });
}

function showShows(data) {
  //prvih 50 showova sa najvecim ratingom
  for (let i = 0; i < data.length; i++) {
    for (let j = i; j < data.length; j++) {
      if (data[i].rating.average < data[j].rating.average) {
        let pom = data[i];
        data[i] = data[j];
        data[j] = pom;
      }
    }
  }
  const newShowsArray = data.slice(0, 50);
  newShowsArray.forEach((e) => {
    const showImg = document.createElement("img");
    showImg.setAttribute("src", e.image.medium);
    showImg.addEventListener("click", () => {
      window.localStorage.removeItem("showInfo");
      window.localStorage.setItem("showInfo", JSON.stringify(e));
      window.location.pathname += "info.html";
    });

    const showDiv = document.createElement("div");
    showDiv.append(showImg);
    const showTxt = document.createElement("p");
    showTxt.innerHTML = e.name;
    showDiv.append(showTxt);
    showContainer.append(showDiv);
  });
}
//novi fetch za search(novi url)
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
