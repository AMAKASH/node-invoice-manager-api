const usernameTextField = document.querySelector(".username-input");
const passwordTextField = document.querySelector(".password-input");
const formDOM = document.querySelector(".form");
const formAlertDOM = document.querySelector(".form-alert");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameTextField.value;
  const password = passwordTextField.value;

  try {
    const { data } = await axios.post("/admin/login", { username, password });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = data.msg;
    formAlertDOM.classList.add("text-success");
    localStorage.setItem("token", data.token);
    setTimeout(() => window.location.replace("/admin"), 1500);
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = error.response.data.msg;
    localStorage.removeItem("token");
    formAlertDOM.classList.remove("text-success");
    localStorage.removeItem("token");
    setTimeout(() => {
      formAlertDOM.style.display = "none";
    }, 2000);
  }
});
