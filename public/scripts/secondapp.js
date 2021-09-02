const btn = document.getElementById("click-able");
const h1 = document.getElementById("testing");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  h1.innerText = "Redirecting to Index Page ";
  h1.style.color = "white";
  setTimeout(() => window.location.replace("/"), 1000);
});
