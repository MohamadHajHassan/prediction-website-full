window.onload = () => {
  // variables
  const dog = document.getElementById("dog");
  const gender = document.getElementById("gender");
  const age = document.getElementById("age");
  const nationality = document.getElementById("nationality");

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

  // fetch the nationality api
  fetch("https://api.nationalize.io/?name=mohamad")
    .then(res => res.json())
    .then(
      data =>
        (nationality.innerHTML =
          data.country.length == 1
            ? `Your predicted nationality is ${data.country[0].country_id}`
            : `Your predicted nationalities are ${data.country[0].country_id} and ${data.country[1].country_id}`)
    )
    .catch(error => console.log(error));
};
