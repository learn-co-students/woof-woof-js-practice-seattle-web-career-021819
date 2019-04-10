const DOG_URL = "http://localhost:3000/pups"
const dogList = document.getElementById("dog-bar")
// get div of where pup should be displayed
const pupShowDiv = document.getElementById("dog-info")
const likeBtn = document.getElementById("")
const filterBtn = document.getElementById("good-dog-filter")

function fetchDogInfo() {
   fetch(DOG_URL)
  .then(response => response.json())
  .then(info => displayDogBar(info))
}

function displayDogBar(pups) {
  // get each puppy into a span for the dog-bar
  for (let pup of pups) {
    let span = document.createElement("span")
    span.textContent = pup.name
    // add event listener for click on each dog
    span.addEventListener('click', () => {
      displayPupInfo(pup)
    })
    dogList.appendChild(span)
  }
  return dogList
}

function displayPupInfo(pup) {
  // clear screen for each new pup
  clearDisplay()

  // get pup image
  let img = document.createElement("img")
  img.src = pup.image
  pupShowDiv.appendChild(img)

  // get pup name
  let h2 = document.createElement("h2")
  h2.textContent = pup.name
  pupShowDiv. appendChild(h2)

  // display 'good/bad dog' button
  let button = document.createElement("button")
  // console.log(pup.isGoodDog)
  if (pup.isGoodDog === true) {
    button.textContent = "Good Dog!"
  } else {
    button.textContent = "Bad Dog!"
  }
  // add event listener to button to update the button text and patch the dog's
  // info in database
  button.addEventListener("click", () => {
    updateIsGoodDog(pup, button)
  })
  pupShowDiv.appendChild(button)
}

function clearDisplay() {
  while (pupShowDiv.firstChild) {
    pupShowDiv.firstChild.remove()
  }
}

function updateIsGoodDog(pup, button) {
  if (button.textContent === "Good Dog!") {
    button.textContent = "Bad Dog!"
  } else {
    button.textContent = "Good Dog!"
  }

  let change = !pup.isGoodDog

  return fetch(DOG_URL + `/${pup.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({isGoodDog: change})
  })
  .then(response => response.json())
}

filterBtn.addEventListener('click', () => {
  fetch(DOG_URL)
  .then(response => response.json())
  .then(pups => filterPups(pups))
})

function filterPups(pups) {
  clearBar()
  let gdBtn = document.getElementById("good-dog-filter")
  if (gdBtn.textContent === "Filter good dogs: OFF") {
    gdBtn.textContent = "Filter good dogs: ON"
    const goodPups = pups.filter(pup => pup.isGoodDog === true)
    displayDogBar(goodPups)
  } else {
    gdBtn.textContent = "Filter good dogs: OFF"
    displayDogBar(pups)
  }
}

function clearBar() {
  let dogBar = document.getElementById("dog-bar")
  while(dogBar.firstChild) {
    dogBar.firstChild.remove()
  }
}

fetchDogInfo()
