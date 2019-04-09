const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
const url = "http://localhost:3000"
let goodOnly = false

const filter = document.getElementById('good-dog-filter')
filter.addEventListener('click', () => {
  goodOnly = !goodOnly
  filter.textContent = !goodOnly ? 'Filter good dogs: OFF' : 'Filter good dogs: ON'
  
  while (dogBar.firstChild)
    dogBar.firstChild.remove()

  fetchDogs()
})

function fetchDogs() {
  fetch (url + '/pups')
    .then(res => res.json())
    .then(data => data.map(dog => {
      if (!goodOnly || (goodOnly && dog.isGoodDog))
        renderDog(dog)
    }))
}

function fetchDog(id) {
  fetch (url + '/pups/' + id)
    .then(res => res.json())
    .then(data => renderDogInfo(data))
}

function getGood(dog) {
  dog.isGoodDog = !dog.isGoodDog
  const toggleGood = dog.isGoodDog

  fetch (url + '/pups/' + dog.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isGoodDog: toggleGood
    })
  })
    .then(res => res.json())
    .then(data => updateDogGood(data))
}

function renderDog(dog) {
  const {name, id} = dog
  const span = document.createElement('span')
  span.textContent = name
  span.addEventListener('click', () => {
    fetchDog(id)
  })

  dogBar.appendChild(span)
}

function renderDogInfo(dog) {
  dogInfo.firstChild && dogInfo.firstChild.remove()

  const {id, name, isGoodDog, image} = dog
  
  const container = document.createElement('div')
  container.id = 'dog' + id

  const heading = document.createElement('h2')
  heading.textContent = name

  const img = document.createElement('img')
  img.src = image

  const isGood = document.createElement('button')
  isGood.textContent = isGoodDog ? 'GOOD DOG' : 'LESS GOOD DOG'
  isGood.addEventListener('click', () => {
    getGood(dog)
  })

  container.appendChild(heading)
  container.appendChild(img)
  container.appendChild(document.createElement('br'))
  container.appendChild(isGood)
  dogInfo.appendChild(container)
}

function updateDogGood(dog) {
  const {id, isGoodDog} = dog
  const good = document.querySelector(`#${'dog'+id} button`)
  good.textContent = isGoodDog ? 'GOOD DOG' : 'LESS GOOD DOG'

  while (dogBar.firstChild) 
    dogBar.firstChild.remove()

  if (!isGoodDog) 
    dogInfo.firstChild && dogInfo.firstChild.remove()

  fetchDogs()
}

fetchDogs()