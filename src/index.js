const URL= 'http://localhost:3000/pups'
const DOGBAR=document.body.querySelector("#dog-bar")
const DOGINFO=document.body.querySelector("#dog-info")
const GOOD=document.body.querySelector('#good-dog-filter')
const DOGS=[]

fetch(URL)
.then(response=>response.json())
.then(json => {
    json.forEach(dog=>DOGS.push(dog))
    json.map(dogSpan)
})

function dogSpan (dog){
    // DOGS.push(dog)
    let span=document.createElement('span')
    span.textContent=dog.name
    span.addEventListener('click', renderInfo)
    DOGBAR.appendChild(span)
}

function renderInfo(e){
    let selected=DOGS.find(dog=>dog.name===e.target.textContent)
    DOGINFO.innerHTML=''
    DOGINFO.innerHTML+=`
    <img src=${selected.image}> 
    <h2>${selected.name}</h2> 
    `
    DOGINFO.append(makeButton(selected))
}

function makeButton(dog){
    let button=document.createElement('button')
    button.id=dog.id
    button.innerText=buttonText(dog.isGoodDog)
    button.addEventListener('click', clicked)
    return button;
}

function buttonText(good){
    if (good){
        return "Good Dog!";
    }else{
        return "Bad Dog!";
    }
}

function filterButtonText(text){
    if (text==='Filter good dogs: OFF'){
        return 'Filter good dogs: ON';
    }else{
        return 'Filter good dogs: OFF'
    }
}

function switchBehavior(good){
    return !good;
}

function clicked(e){
    let selected=DOGS.find(dog=>dog.id===parseInt(e.target.id))
    selected.isGoodDog=switchBehavior(selected.isGoodDog)
    e.target.innerText=buttonText(selected.isGoodDog)
    let config={
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "isGoodDog": selected.isGoodDog
        })
    }
    fetch(URL+'/'+selected.id, config)
}

GOOD.addEventListener('click', filterDogs)


function filterDogs(e){
    if(e.target.innerText==='Filter good dogs: OFF'){
        //console.log('test')
        let filtered=DOGS.filter(dog=>dog.isGoodDog)
        e.target.innerText=filterButtonText(e.target.innerText)
        DOGBAR.innerHTML=""
        filtered.map(dogSpan)
    }else{
        DOGBAR.innerHTML=""
        e.target.innerText=filterButtonText(e.target.innerText)
        DOGS.map(dogSpan)
    }
}



