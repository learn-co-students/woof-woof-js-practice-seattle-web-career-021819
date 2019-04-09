const PUPURL = 'http://localhost:3000/pups'

fetch(PUPURL)
.then(resp => resp.json())
.then(data => {
  console.log(data)
  renderDogNames(data)
  addFilterListener(data)
})

const addFilterListener = (dogs) => {
let filter = document.getElementById('good-dog-filter')
filter.addEventListener('click', () => {
  console.log("filter button clicked")
  changeFilter(dogs)
})
}

const renderDogNames = (dogs) => {
  let div = document.getElementById('dog-bar')
  while(div.firstChild){
    div.firstChild.remove()
  }
  dogs.forEach(function(dog){
  let span = document.createElement('span')
  span.textContent = dog.name
  span.addEventListener('click', () => {
    console.log("clicked!")
    dogInfo(dog)
  })
  div.appendChild(span)
  })
}

const dogInfo = (dog) => {
  let div = document.getElementById('dog-info')

  while (div.firstChild){
    div.firstChild.remove()
  }

  let header = document.createElement('h2')
  header.textContent = dog.name
  div.appendChild(header)

  let img = document.createElement('img')
  img.src = dog.image
  div.appendChild(img)

  let button = document.createElement('button')
  button.id = "doggy-status"
  button.addEventListener('click', () => {
    changeDoggyStatus(dog)
  })

  if(dog.isGoodDog === true){
    button.textContent = "Good Doggy"
  } else {
    button.textContent = "Bad Doggy"
  }

  div.appendChild(button)
}

const changeDoggyStatus = (dog) => {
  let div = document.getElementById('dog-info')
  let button = document.getElementById('doggy-status')
  if(dog.isGoodDog === true){
    dog.isGoodDog = false
    button.textContent = "Bad Doggy"

  } else {
    dog.isGoodDog = true
    button.textContent = "Good Doggy"
  }
  div.appendChild(button)

 let config = {
   method: 'PATCH',
   headers: {"Content-Type": "application/json"},
   body: JSON.stringify({isGoodDog: dog.isGoodDog})
 }

 let url = PUPURL + '/' + dog.id

 fetch(url, config)
   .then(resp => resp.json())
   .then(data => {
     console.log(data)
   })
}



const changeFilter = (dogs) => {
  let div = document.getElementById('filter-div')
  let button = document.getElementById('good-dog-filter')
  if(button.innerText === "Filter good dogs: ON"){
    button.innerText = "Filter good dogs: OFF"
    renderDogNames(dogs)
  } else {
    button.innerText = "Filter good dogs: ON"
    let goodDogs = []
    dogs.forEach(function (dog){
      if (dog.isGoodDog === true) {
        goodDogs.push(dog)
      }
    })
    renderDogNames(goodDogs)
  }
  div.appendChild(button)



}
