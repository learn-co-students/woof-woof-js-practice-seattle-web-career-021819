const dogUrl = "http://localhost:3000/pups"
let dogBar = document.getElementById('dog-bar');
let dogInfo = document.getElementById('dog-info');
let dogArray = [];

// Fetch all dogs
const fetchDoggoData = () => {
  fetch(dogUrl)
    .then(resp => resp.json())
    .then(data => {
      dogArray = data;
      displayDogs(data);
    })
}

// Display all dogs
const displayDogs = (dogs) => {
  dogBar.innerHTML = ``;
  for (dog in dogs) {
    dogBar.innerHTML += `<span data-id=${dogs[dog].id}>${dogs[dog].name}</span>`
  }
}

// Click router
document.body.addEventListener('click', (ev) => {
  if (ev.target.tagName === "SPAN") {
    showDogDetails(ev)
  } else if (ev.target.id === "toggle") {
    toggleStatus(ev)
  } else if (ev.target.id === "good-dog-filter") {
    toggleFilter(ev)
  }
})

// Show dog details
const showDogDetails = (ev) => {
  const id = ev.target.dataset.id;
  const dog = dogArray[id-1];
  let buttonSays = "Bad Dog!";
  if (dog.isGoodDog) {buttonSays = "Good Dog!";}
  dogInfo.innerHTML = `
  <img src="${dog.image}">
  <h2>${dog.name}</h2>
  <button id="toggle" data-id=${dog.id}>${buttonSays}</button>
  `
}

// Toggle Good/Bad Dog
const toggleStatus = (ev) => {
  const id = ev.target.dataset.id;
  let dog = dogArray[id-1];
  dog.isGoodDog = !dog.isGoodDog;
  let buttonSays = "Bad Dog!";
  if (dog.isGoodDog) {buttonSays = "Good Dog!";}
  dogInfo.innerHTML = `
  <img src="${dog.image}">
  <h2>${dog.name}</h2>
  <button id="toggle" data-id=${dog.id}>${buttonSays}</button>
  `
  sendPatchRequest(dog);
}

// Send Patch Request w/ updated status
const sendPatchRequest = (dog) => {
  fetch(`${dogUrl}/${dog.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"isGoodDog": dog.isGoodDog})
  })
}

// Toggle Filter
const toggleFilter = (ev) => {
  if (ev.target.innerText === "Filter good dogs: OFF") {
    ev.target.innerText = "Filter good dogs: ON";
    filterDogs();
  } else {
    ev.target.innerText = "Filter good dogs: OFF";
    fetchDoggoData();
  }
}

// Filter Dogs
const filterDogs = () => {
  let filteredDogs = [];
  for (dog in dogArray) {
    if (dogArray[dog].isGoodDog) {
      filteredDogs.push(dogArray[dog]);
    }
  }
  displayDogs(filteredDogs);
}

fetchDoggoData();
