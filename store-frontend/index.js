const BASE_URL = "http://localhost:3000"
const STORE_URL = "http://localhost:3000/stores"

// class product
// product methods
// edit
// delete

function getStore() {
  fetch(STORE_URL, {
   method: "GET",
   headers: {
     'Content-Type': "application/json"
   },
 })
 .then(res => res.json())
 .then(json => { 
   json.forEach( store => {
    console.log(store)
    createProductCards(store)
   })
  })
 .catch((e) => console.log(e))
}

function createCard(data) {
  // create card
  const cardElem = document.createElement('div')
  cardElem.className = "card"

  // create card image
  const cardImageElem = document.createElement('img')
  cardImageElem.className = "card-img-top"
  cardImageElem.src = data.image_url

  // create card body
  const cardBodyElem = document.createElement('div')
  cardBodyElem.className = "card-body"

  // create card title
  const cardTitleElem = document.createElement('h5')
  cardTitleElem.className = "card-title"
  cardTitleElem.innerText = data.name

  // create material p
  const cardMaterialElem = document.createElement('p')
  cardMaterialElem.className = 'card-text'
  cardMaterialElem.innerText = data.material

  // create edit button
  const editCardButtonElem = document.createElement('button')
  editCardButtonElem.className = "btn btn-primary"
  editCardButtonElem.innerText = "Edit"
  editCardButtonElem.addEventListener('click', (e) => {
    
    console.log(e.parentNode)
    editProduct(data)
  })
  // create delete button
  const deleteCardButtonElem = document.createElement('button')
  deleteCardButtonElem.className = "btn btn-danger"
  deleteCardButtonElem.innerText = "Delete"
  deleteCardButtonElem.addEventListener('click', (e) => {
    deleteProduct(data)
    e.target.parentNode.parentNode.remove()
  })

  // append child to card
  cardBodyElem.appendChild(cardTitleElem)
  cardBodyElem.appendChild(cardMaterialElem)
  cardBodyElem.appendChild(editCardButtonElem)
  cardBodyElem.appendChild(deleteCardButtonElem)
  cardElem.appendChild(cardImageElem)
  cardElem.appendChild(cardBodyElem)


  return cardElem
}

function createProductCards(data) {
  const root = document.getElementById('root')
  data.items.forEach(item => root.appendChild(createCard(item)))
}

function editProduct(data) {
  console.log('edit', data)
  fetch(`${STORE_URL}/1/items/${data.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch((e) => console.log(e))
}

function deleteProduct(data) {
  console.log('delete', data)
  fetch(`${STORE_URL}/1/items/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch((e) => console.log(e))
 }


getStore()