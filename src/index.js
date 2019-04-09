const PUPS_URL = "http://localhost:3000/pups"

const indexBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-summary-container')
const filterBtn = document.getElementById('good-dog-filter')

function fetchPups(url){
  fetch(url)
  .then(res => res.json())
  .then(json => renderPups(json))
}

function fetchGoodPups(url){
  fetch(url)
  .then(res => res.json())
  .then(json => renderGoodPups(json))
}
function filterBtnFunction(){
filterBtn.addEventListener('click', () => {
    if (filterBtn.textContent === "Filter good dogs: ON"){
      filterBtn.textContent = "Filter good dogs: OFF";
      fetchPups(PUPS_URL)}
    if (filterBtn.textContent === "Filter good dogs: OFF"){
      filterBtn.textContent = "Filter good dogs: ON"
      fetchGoodPups(PUPS_URL)
    }
})}

function renderGoodPups(data){

  while(indexBar.firstChild){
    indexBar.firstChild.remove()
  }
  if (filterBtn.textContent === "Filter good dogs: ON"){
  data.forEach(pup => {
    if (pup.isGoodDog === true){
      let dogDiv = document.createElement('span')
      //might not need
      dogDiv.id = pup.id
      dogDiv.textContent = pup.name
      dogDiv.classList.add("dog-bar")
      dogDiv.addEventListener('click', () => {
      fetch(`${PUPS_URL}/${pup.id}`).then(res => res.json()).then(json => renderPupInfo(json))
      })
      indexBar.appendChild(dogDiv)
      }
      })
      filterBtn.addEventListener('click', () => {
      filterBtn.textContent = "Filter good dogs: OFF";
      fetchPups(PUPS_URL)})
    }
  }
function renderPups(data){
  while(indexBar.firstChild){
    indexBar.firstChild.remove()
  }
  data.forEach(pup => {
    let dogDiv = document.createElement('span')
    //might not need
    dogDiv.id = pup.id
    dogDiv.textContent = pup.name
    dogDiv.classList.add("dog-bar")
    dogDiv.addEventListener('click', () => {
    fetch(`${PUPS_URL}/${pup.id}`)
      .then(res => res.json()).then(json => renderPupInfo(json))
    })
    indexBar.appendChild(dogDiv)
    })
    filterBtn.addEventListener('click', () => {
    filterBtn.textContent = "Filter good dogs: ON"
          fetchGoodPups(PUPS_URL)})
}

function renderPupInfo(pup){
  while(dogInfo.firstChild){
    dogInfo.firstChild.remove()
  }

  let dogInfoDiv = document.createElement('div')
  let h2 = document.createElement('h2')
  let goodDogeBtn = document.createElement('button')
  let img = document.createElement('img')

  h2.textContent = pup.name
  img.src = pup.image

  if (pup.isGoodDog === true){
    goodDogeBtn.textContent = "Bad Dog!"
  }else if (pup.isGoodDog === false){
    goodDogeBtn.textContent = "Good Dog!"
  }

  goodDogeBtn.addEventListener('click', ()=> {
    if(goodDogeBtn.textContent === "Good Dog!"){
      goodDogeBtn.textContent = "Bad Dog!"
      fetchPostBadDog(pup)
    }else if (goodDogeBtn.textContent === "Bad Dog!"){
      goodDogeBtn.textContent = "Good Dog!"
      fetchPostGoodDog(pup)
    }
  })

  dogInfoDiv.appendChild(img)
  dogInfoDiv.appendChild(h2)
  dogInfoDiv.appendChild(goodDogeBtn)
  dogInfo.appendChild(dogInfoDiv)
}

function fetchPostBadDog(pup){
  fetch(`${PUPS_URL}/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: false})
  })
  fetchPups(PUPS_URL)
}

function fetchPostGoodDog(pup){
  fetch(`${PUPS_URL}/${pup.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({isGoodDog: true})
  })
  fetchPups(PUPS_URL)
}

fetchPups(PUPS_URL)
