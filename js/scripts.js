window.onload = () => {
  // variables
  const dog = document.getElementById("dog");
  const gender = document.getElementById("gender");
  const age = document.getElementById("age");

  // fetch the api to display a random dog picture
  fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(data => (dog.innerHTML = `<img src=${data.message} alt="image of a cute dog">`))
    .catch(error => console.log(error));

  // fetch the gender api
  fetch("https://api.genderize.io?name=rio")
    .then(res => res.json())
    .then(data => (gender.innerHTML = `${data.gender}`))
    .catch(error => console.log(error));

  // fetch the age api
  fetch("https://api.agify.io/?name=nour")
    .then(res => res.json())
    .then(data => (age.innerHTML = `${data.age}`))
    .catch(error => console.log(error));
};
