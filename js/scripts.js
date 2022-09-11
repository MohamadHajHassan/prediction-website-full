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
};
