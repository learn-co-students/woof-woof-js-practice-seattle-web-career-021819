

  //span should be clickable and show the
//   an img tag with the pup's image url
// an h2 with the pup's name
// a button that says "Good Dog!" or "Bad Dog!" based on whether isGoodDog is true or false. Ex: <img src=dog_image_url> <h2>Mr. Bonkers</h2> <button>Good Dog!</button>

//constants to find key elements in doc
let dogBar = document.querySelector('#dog-bar')
let dogSummary = document.querySelector('#dog-summary-container')
let statusFilter = document.querySelector('#good-dog-filter')




//helper function to create each dog Span
function createDogSpan(dog) {
  let newDogSpan = document.createElement('span')
  newDogSpan.id = dog.id
  newDogSpan.innerText = dog.name
  newDogSpan.setAttribute('good-dog-status', dog.isGoodDog)
  dogBar.appendChild(newDogSpan)

  //hidden div with dog deatils
  let dogDetailPara = document.createElement('p')
  dogDetailPara.id = dog.id
  let dogHeader = document.createElement('h2')
  dogHeader.innerText = dog.name
  let dogImage = document.createElement('img')
  dogImage.src = dog.image
  let dogStatusButton = document.createElement('button')
  dogStatusButton.id = dog.id
  dogStatusButton.innerText = dog.isGoodDog ? 'Good Dog!' : 'Bad Dog'
  dogStatusButton.addEventListener('click',(event)=>{
    //insert dog helper function here
    if (dogStatusButton.innerText === 'Good Dog!') {
        dogStatusButton.innerText = 'Bad Dog!'
        dogStatusPatchRequest(dog.id,false)
    } else{
      dogStatusButton.innerText = 'Good Dog!'
      dogStatusPatchRequest(dog.id,true)
    }
  })
  dogDetailPara.appendChild(dogHeader)
  dogDetailPara.appendChild(dogImage)
  dogDetailPara.appendChild(dogStatusButton)
  dogSummary.appendChild(dogDetailPara)
  dogDetailPara.style.display = 'none'
}

// event listener for click of dog on dog bar -- shows the corresponding dog details in the th esummary
dogBar.addEventListener('click',(event)=>{
  if (event.target.tagName === 'SPAN'){

    //turns all display values off for dog
    [].slice.call(dogSummary.children).forEach((element)=>{
      console.dir(element)
      element.style.display = 'none'
    })

    let dogDetailToShow = dogSummary.querySelector(`p[id='${event.target.id}']`)
    console.dir(dogDetailToShow);
    if (dogDetailToShow.style.display === 'none'){
      dogDetailToShow.style.display = 'block'
    }else{
      dogDetailToShow.style.display = 'none'
    }
  }
})

//dog like status patch Request
function dogStatusPatchRequest(dogId,status){
  fetch(`http://localhost:3000/pups/${dogId}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      isGoodDog: `${status}`
    })
  })
}

//**FIX THIS IN THE MORNING** Event listener for click on status bar to toggle showing good dogs
statusFilter.addEventListener('click',(event)=>{
  console.log(event.target.innerText);
  let currentFilterStatus = event.target.innerText
  if (event.target.innerText === 'Filter good dogs: ON'){
      event.target.innerText ='Filter good dogs: OFF'
  } else{
     event.target.innerText = 'Filter good dogs: ON'
  }

  if (event.target.innerText === 'Filter good dogs: ON'){
    [].slice.call(dogBar.children).forEach((element)=>{
      // let elementDetails = dogBar.querySelector(`span[id='${element.id}']`)
      console.dir(element);
        if (element.getAttribute('good-dog-status') === 'true') {
          element.style.display = ''
      } else{
      element.style.display = 'none'
      }
    })
  } else {
    [].slice.call(dogBar.children).forEach((element)=>{
      // let elementDetails = dogBar.querySelector(`span[id='${element.id}']`)
      // console.dir(element);
      //   if (element.getAttribute('good-dog-status') === "true") {
      //     element.style.display = ''
      // } else{
      element.style.display = ''
    })
  }
  })


////RUNNER function

//function to fetch dogs
fetch('http://localhost:3000/pups')
.then(resp=>resp.json())
.then((data)=>{
  data.map(createDogSpan)
})
