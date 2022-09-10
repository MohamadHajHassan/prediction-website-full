window.onload = () => {
  
  // variables
  const dog = document.getElementById("dog");

  // fetch the api to display a radom dog picture
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((res) => {return res.json();})
    .then((data) =>(dog.innerHTML = `<img src=${data.message} alt="image of a cute dog">`))
    .catch((error) => console.log(error));
};
