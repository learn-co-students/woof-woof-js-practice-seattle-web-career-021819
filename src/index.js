document.addEventListener('DOMContentLoaded', () => {
  const PUPS_URL = 'http://localhost:3000/pups'
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  const filterButton = document.getElementById('good-dog-filter')

  fetch(PUPS_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data) // array of objects(dogs)
      data.forEach(dog => {

        // create span for each object(dog) in array
        let span = document.createElement('span')
        dogBar.appendChild(span)
        span.textContent = dog.name
        span.dataset.isGood = dog.isGoodDog
        span.id = "dog-" + dog.id
        span.addEventListener('click', () => {

          // remove currently-displayed dog
          if (dogInfo.childNodes) {
            dogInfo.firstChild.remove()
          }

          // create new div as firstChild
          let div = document.createElement('div')
          dogInfo.appendChild(div)

          // add image (img)
          let img = document.createElement('img')
          div.appendChild(img)
          img.src = dog.image

          // add name (h2)
          let h2 = document.createElement('h2')
          div.appendChild(h2)
          h2.textContent = dog.name

          // add isGood (button)
          let button = document.createElement('button')
          div.appendChild(button)
          button.textContent = buttonText(dog.isGoodDog)

          // update isGoodDog on server & button text
          button.addEventListener('click', () => {
            dog.isGoodDog = !dog.isGoodDog
            fetch(PUPS_URL + '/' + dog.id, {
              method: "PATCH",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({isGoodDog: `${dog.isGoodDog}`})
            })
            // update button text
            button.textContent = buttonText(dog.isGoodDog)

            // update span's data-is-good attribute
            let dogSpan = document.getElementById('dog-' + dog.id)
            dogSpan.dataset.isGood = dog.isGoodDog
          })


        })

      })

    })

  function buttonText(boolean) {
    if (boolean) {
      return "Good Dog!"
    } else {
      return "Bad Dog!"
    }
  }

  filterButton.addEventListener('click', () => {
    if (filterButton.textContent === "Filter good dogs: OFF") {
      filterButton.textContent = "Filter good dogs: ON"
      applyHidden()
    } else {
      filterButton.textContent = "Filter good dogs: OFF"
      removeHidden()
    }
  })

  function applyHidden() {
    let spans = document.getElementsByTagName('span')
    let array = Array.from(spans)
    array.forEach(span => {
      if (span.dataset.isGood == "false") {
        span.classList.add('hidden')
      }
    })
  }

  function removeHidden() {
    let spans = document.getElementsByTagName('span')
    let array = Array.from(spans)
    array.forEach(span => {
      span.classList.remove('hidden')
    })
  }



})
