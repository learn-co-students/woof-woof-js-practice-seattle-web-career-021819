const url = "http://localhost:3000/pups/";
const toggleButton = document.querySelector('#good-dog-filter')
let mainDiv = document.getElementById('dog-bar');
let dogDiv = document.getElementById('dog-info');

fetch(url).then(res => res.json()).then(data => {
  renderPups(data)
})


function renderPups(data){

  data.forEach(dog => {
    let span = document.createElement('span');
    span.textContent = `${dog.name}`;
    const name = dog.name;
    const status = dog.isGoodDog;
    mainDiv.appendChild(span);
    span.addEventListener('click', function (e) {
      e.preventDefault();
      while (dogDiv.hasChildNodes()) {
        dogDiv.removeChild(dogDiv.lastChild);
      }
      let h2 = document.createElement('h2')
      h2.textContent = `${dog.name}`;

      let picture = document.createElement('img')
      picture.src = dog.image

      let button = document.createElement('button')
      button.id = "dog-button"
      if (status) {
        button.textContent = ":) Good Dog!"
      } else {
        button.textContent = ":( Bad Dog!"
      }

      button.addEventListener('click', function (e) {
        e.preventDefault();
        if (button.textContent === ":) Good Dog!"){
          button.textContent = ":( Bad Dog!"
          buttonClick(dog.id, false);
        } else {
          button.textContent = ":) Good Dog!"
          buttonClick(dog.id, true);
        }

      });

      dogDiv.appendChild(h2)
      dogDiv.appendChild(picture)
      dogDiv.appendChild(button)
      });
    });

}

function buttonClick(id, status) {
  config = {method: "PATCH",
            headers: {
            "content-type": "application/json"
          },
            body: JSON.stringify({
              isGoodDog: `${status}`
            })
          }
  fetch(url + `${id}`, config)
}

toggleButton.addEventListener('click', function (e) {
  if (toggleButton.textContent === "Filter good dogs: ON"){
    toggleButton.textContent = "Filter good dogs: OFF"
  } else {
    toggleButton.textContent = "Filter good dogs: ON"
  }
  // Need to add filter functionality
  // if (toggleButton.textContent === "Filter good dogs: ON"){
  //   let parent = mainDiv.children
  //   parent.forEach((child) => {
  //     console.log(child)
  //
  //   });
  // }
});
// When a user clicks on the Filter Good Dogs button, two things should happen:
//
// The button's text should change from "Filter good dogs: OFF" to "Filter good dogs: ON", or vice versa.
// If the button now says "ON" (meaning the filter is on), then the Dog Bar should only show pups whose isGoodDog attribute is true. If the filter is off, the Dog Bar should show all pups (like normal).
