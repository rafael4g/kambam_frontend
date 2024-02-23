/** help */
function log(message){
  console.log(message)
}

/** app */
const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')

/**Increment to database */

/**Count Cards in dropzones */
let dropzoneCounts = [];

dropzones.forEach(dropzone => {
    const [,dropzoneClass] = dropzone.classList.value.split(' ') 
    const dropzoneSpan = dropzone.parentElement.children[0].children[1] 
    const cardsInDropzone = dropzone.querySelectorAll('.card').length;

    dropzoneSpan.innerText = cardsInDropzone

    const dropzoneObject = {};
    dropzoneObject[dropzoneClass] = cardsInDropzone;
    dropzoneCounts.push(dropzoneObject);
});



/**our cards */
cards.forEach( card => {
  card.addEventListener('dragstart', dragstart)
  card.addEventListener('drag', drag)
  card.addEventListener('dragend', dragend)
})

function dragstart() {
  //log('CARD: Start dragging')
  dropzones.forEach( dropzone => dropzone.classList.add('highlight'))
  this.classList.add('is-dragging') 

  const cardSpan = this.parentElement.parentElement.children[0].children[1]

  const result = Number(cardSpan.innerText) - 1

  cardSpan.innerText = result

  if(result <=0){
    cardSpan.classList.add('low-cards')
  }
}

function drag() {
  //log('CARD: Is dragging')
}

function dragend() {
  //log('CARD: Stop drag')
  dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))
  this.classList.remove('is-dragging')

  const elementDad = this.parentElement.classList
  const elementChildren = this.children[0].classList  
  
  handle_add_class(elementDad, elementChildren)

  const cardSpan = this.parentElement.parentElement.children[0].children[1]

  const result = Number(cardSpan.innerText) + 1

  cardSpan.innerText = result

  if(result >0){
    cardSpan.classList.remove('low-cards')
  }
  
}

/**our dropzones */
dropzones.forEach( dropzone => {
  dropzone.addEventListener('dragenter', dragenter)
  dropzone.addEventListener('dragover', dragover)
  dropzone.addEventListener('dragleave', dragleave)
  dropzone.addEventListener('drop', drop)
})

function dragenter() {
  //log('DROPZONE: Enter in zone!')
}

function dragover() {
  //log('DROPZONE: Over')
  //log(this.classList)

  this.classList.add('over')

  // get dragging card
  const cardBeingDragged = document.querySelector('.is-dragging')
  
  this.appendChild(cardBeingDragged)
}

function dragleave() {
  //log('DROPZONE: Leave')
  this.classList.remove('over')
}

function drop() {
  //log('DROPZONE: dropped')
  this.classList.remove('over')
}

function handle_add_class(eleDad, eleChildren) {  

  
  if(eleDad.contains('todo')){
    eleChildren.add('green')  
    eleChildren.remove('blue')
    eleChildren.remove('red')
  }

  if(eleDad.contains('in-progress')){
    eleChildren.add('blue')  
    eleChildren.remove('green')
    eleChildren.remove('red')
  }

  if(eleDad.contains('done')){
    eleChildren.add('red')  
    eleChildren.remove('green')
    eleChildren.remove('blue')
  }
  
}