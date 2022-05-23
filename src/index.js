//console.log('%c HI', 'color: firebrick')

window.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed');
    loadImages();
    loadBreeds();
});

function loadImages(){
    const imageUrl = 'https://dog.ceo/api/breeds/image/random/4';
    fetch(imageUrl)
    .then(response => response.json())
    .then(data => {
        data.message.forEach(image => addImage(image))
    });
}

function addImage(imageUrl){
    let image = document.createElement('img');
    image.src  = imageUrl;
    document.getElementById("dog-image-container").appendChild(image);
}

function loadBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        breeds = Object.keys(data.message);
        //console.log(breeds)
        addBreedToList(breeds)
        updateBreedList(breeds)
        dropDownListener()
    }); 
}

//adds the selected breeds to the list
//also removes all breeds we do not want
function updateBreedList(breeds){
    let ul = document.getElementById('dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

//function to read the dropdown event - using change
function dropDownListener(){
    let breedDropdown = document.getElementById('breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

//function to remove all the elements from the list
//clears out the entire list from bottom to top
function removeChildren(element){
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}

//filters the array to show breeds with selected letter
function selectBreedsStartingWith(letter){
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedToList(breeds){
    breeds.forEach(breed => addBreed(breed));
}

//takes in an array 
//then adds this array of infomration to a list 
//add a click that changes the list color on click 
function addBreed(breed){
    let list = document.getElementById("dog-breeds");
    let newList = document.createElement("li");
    newList.innerText = breed;
    list.addEventListener("click", changeColor)
    list.appendChild(newList);
}

function changeColor(list){
    list.target.style.color = 'blue';
}

