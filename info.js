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
