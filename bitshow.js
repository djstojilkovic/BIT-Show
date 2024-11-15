const URL = "https://api.tvmaze.com/shows";
const showContainer = document.querySelector(".shows");
window.addEventListener("load", getShows);
function getShows() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      showShows(data);
    });
}

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
    showContainer.append(showDiv);
  });
}
