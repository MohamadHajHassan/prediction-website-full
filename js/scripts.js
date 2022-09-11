window.onload = () => {
  // Declare Variables
  const dog = document.getElementById("dog");
  const gender = document.getElementById("gender");
  const age = document.getElementById("age");
  const nationality = document.getElementById("nationality");
  const button = document.getElementById("submit");
  const nameInput = document.getElementById("name");
  const displayName = document.getElementById("display-name");
  let name;
  const registerPopup = document.getElementById("register-popup");
  const register = document.getElementById("register");
  const registerSubmit = document.getElementById("register-submit");
  const loginPopup = document.getElementById("login-popup");
  const login = document.getElementById("login");
  const loginSubmit = document.getElementById("login-submit");
  const register2 = document.getElementById("register2");
  const login2 = document.getElementById("login2");

  // Functions
  // fetch the api to display a random dog picture function
  let fetchDog = () => {
    return fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(data => (dog.innerHTML = `<img src=${data.message} alt="image of a cute dog">`))
      .catch(error => console.log(error));
  };

  // fetch the gender api function for input name
  let fetchGender = name => {
    return fetch(`https://api.genderize.io?name=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.gender) {
          return (gender.innerHTML = `Your predicted gender is: ${data.gender}`);
        }
      })
      .catch(error => console.log(error));
  };

  // fetch the age api function for input name
  let fetchAge = name => {
    return fetch(`https://api.agify.io/?name=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.age) {
          return (age.innerHTML = `Your predicted age is: ${data.age}`);
        } else {
          return (
            (displayName.innerHTML = `Name: ${name}: This is not a valid name.`),
            (age.innerHTML = ""),
            (nationality.innerHTML = ""),
            (gender.innerHTML = "")
          );
        }
      })
      .catch(error => console.log(error));
  };

  // fetch the nationality api function for input name
  let fetchNationality = name => {
    return fetch(`https://api.nationalize.io/?name=${name}`)
      .then(res => res.json())
      .then(data => {
        if (data.country[0]) {
          return (nationality.innerHTML =
            data.country.length == 1
              ? `Your predicted nationality is ${data.country[0].country_id}`
              : `Your predicted nationalities are ${data.country[0].country_id} and ${data.country[1].country_id}`);
        }
      })
      .catch(error => console.log(error));
  };

  // open register popup
  let openRegisterPopup = () => {
    registerPopup.classList.add("popup-visible");
  };

  // Store data
  let store = () => {
    let registerName = document.getElementById("register-name");
    let registerEmail = document.getElementById("register-email");
    let registerPassword = document.getElementById("register-password");
    if (registerName.value.length == 0) {
      alert("Please enter you name!");
    } else if (registerEmail.value.length == 0) {
      alert("Please enter your email!");
    } else if (registerPassword == 0) {
      alert("Please enter a password!");
    } else {
      localStorage.setItem("rname", registerName.value);
      localStorage.setItem("remail", registerEmail.value);
      localStorage.setItem("rpassword", registerPassword.value);
    }
  };

  // open login popup
  let openLoginPopup = () => {
    loginPopup.classList.add("popup-visible");
  };

  // check login data
  let check = () => {
    let rname = localStorage.getItem("rname");
    let remail = localStorage.getItem("remail");
    let rpassword = localStorage.getItem("rpassword");
    let loginEmail = document.getElementById("login-email");
    let loginPassword = document.getElementById("login-password");
    if (loginEmail.value == remail && loginPassword.value == rpassword) {
      name = rname;
    } else {
      alert("Wrong login details");
    }
  };

  // Switch popup
  let switchPopup = () => {
    if (registerPopup.classList.contains("popup-visible")) {
      registerPopup.classList.remove("popup-visible");
      loginPopup.classList.add("popup-visible");
    } else {
      loginPopup.classList.remove("popup-visible");
      registerPopup.classList.add("popup-visible");
    }
  };

  //
  //
  fetchDog();
  nameInput.addEventListener("click", () => {
    age.innerHTML = ``;
    nationality.innerHTML = ``;
    gender.innerHTML = ``;
    displayName.innerHTML = ``;
    name = undefined;
  });
  nameInput.addEventListener("input", event => (name = event.target.value));
  button.addEventListener("click", () => {
    if (name) {
      displayName.innerHTML = `Name: ${name}`;
      fetchAge(name);
      fetchGender(name);
      fetchNationality(name);
    } else {
      alert("The name is required to proceed, please enter your name!");
    }
  });
  register.addEventListener("click", openRegisterPopup);
  registerSubmit.addEventListener("click", store);
  login.addEventListener("click", openLoginPopup);
  loginSubmit.addEventListener("click", check);
  register2.addEventListener("click", switchPopup);
  login2.addEventListener("click", switchPopup);
};
