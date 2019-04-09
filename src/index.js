//constance used throughout code
const dogHeader = document.getElementById('dog-bar')
const dogBody = document.getElementById('dog-info')
const dogUrl = 'http://localhost:3000/pups'

//get all the dogs data from site
fetch(dogUrl)
.then(response => response.json())
.then(data => allDogs(data))

//populate the dog bar/header
function allDogs(dogs){
  dogs.forEach(dog =>{
    let span = document.createElement('span')
    span.textContent = dog.name
    dogHeader.append(span)
    span.addEventListener('click', ()=> {
      listDogInfo(dog)
    })
  })
}

//clears the pop-up window when clicking on a dog name
function clearDog(){
  while (dogBody.firstChild){
      dogBody.firstChild.remove()
  }
}

//populates the pop-up windown in the body of the page with dog info
function listDogInfo(dog) {
  clearDog()
  let {id, name, isGoodDog, image} = dog
  let img = document.createElement('img')
  let h2 = document.createElement('h2')
  let goodDogButton = document.createElement('button')
  img.src = image
  h2.textContent = name
  goodDogButton.id = 'dog-button'
  dogBody.append(img, h2, goodDogButton)
  dogButtonStuff(isGoodDog, id)
}

//adds the details to the good or bad dog button on each dog pop-up
function dogButtonStuff(isGoodDog, id){
  let dogButton = document.getElementById('dog-button')
  if (isGoodDog === true) {
    dogButton.innerText = 'Good Dog!'
  } else {
    dogButton.innerText = 'Bad Dog!'
  }
  dogButton.addEventListener('click', (ev) =>{
    ev.preventDefault;
    if (isGoodDog === true) {
      isGoodDog = false
      toggleGoodBad(id, isGoodDog)
    } else {
      isGoodDog = true
      toggleGoodBad(id, isGoodDog)
    }
  })
}

//makes a patch request to toggle between good and bad dog
//also calls back on the button stuff to update the page
function toggleGoodBad(id, isGoodDog) {
  let button = document.getElementById('dog-button')
  let config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({"isGoodDog": isGoodDog})
  }
  fetch(dogUrl + `/${id}`, config)
  .then(response => response.json())
  .then(data => {dogButtonStuff(data.isGoodDog, data.id)})
}
