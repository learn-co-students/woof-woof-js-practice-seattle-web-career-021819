const URL = 'http://localhost:3000/pups'
const showDiv = document.getElementById("dog-info")
const dogBar = document.getElementById("dog-bar")
const filterButton = document.getElementById("good-dog-filter")
/////// Fetch dog info and iterate to populate
fetch(URL)
.then(response => response.json())
.then(json => {
    makeDogInBar(json)
})
/////// Make spans for dogs to appear in the dog list div //////
function makeDogInBar (dogs) {
  filterButton.addEventListener('click', () => {
    filterButton.innerText = "Filter good dogs: ON"
    makeDogInBarWithFilter(dogs)
  })
  dogs.forEach(dog => {
    let span = document.createElement("span")
    span.textContent = dog.name
    span.addEventListener('click', () => {
      showDog(dog)
    })
    dogBar.appendChild(span)
  })
}
/////// Show the clicked dog in the info div ////////
function showDog(dog){
  showDiv.innerHTML = ''
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let button = document.createElement("button")
  h2.textContent = dog.name
  img.src = dog.image
  let isGood = dog.isGoodDog
  setButtonText(button, isGood)
  button.addEventListener('click', () => {
    isGood = !isGood
    switchGood(dog, button, isGood)
    setButtonText(button, isGood)
  });
  showDiv.appendChild(img)
  showDiv.appendChild(h2)
  showDiv.appendChild(button)
}
///// Set button text when clicked /////////
function setButtonText(button, isGood){
  if(isGood){
     button.innerText = "Good Dog!"
  }
  else {
    button.innerText = "Bad Dog!"
  }
}
////// Update dog in the database /////////
function switchGood(dog, button, isGood) {
  let patchConfig = {
    method: "PATCH",
    headers: {"Content-Type": "application/json",
             "Accept": "application/json"},
    body: JSON.stringify({"isGoodDog": isGood})
  }
  fetch(URL + `/${dog.id}`, patchConfig)
}
///////// Filter the dog list by good dogs /////////
function makeDogInBarWithFilter (dogs) {
  showDiv.innerHTML = ''
  dogs.forEach(dog => {
    if (dog.isGoodDog){let span = document.createElement("span")
    span.textContent = dog.name
    span.addEventListener('click', () => {
      showDog(dog)
    })
    dogBar.appendChild(span)}
  })
}
