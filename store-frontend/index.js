const BASE_URL = "http://localhost:3000";
const STORE_URL = "http://localhost:3000/stores";

// class product
// product methods
// edit
// delete
class Product {
  constructor(data) {
    this.data = data;
    this.html = this.createCard();
  }

  static getStore() {
    return (
      fetch(STORE_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => json)
        .catch((e) => console.log(e))
    );
  }

  ceateCardViewState() {
    // create card body
    const cardBodyElem = document.createElement("div");
    cardBodyElem.className = "card-body card-body-view";

    // create card title
    const cardTitleElem = document.createElement("h5");
    cardTitleElem.className = "card-title";
    cardTitleElem.innerText = this.data.name;

    // create material p
    const cardMaterialElem = document.createElement("p");
    cardMaterialElem.className = "card-text";
    cardMaterialElem.innerText = this.data.material;

    // create edit button
    const editCardButtonElem = document.createElement("button");
    editCardButtonElem.className = "btn btn-primary";
    editCardButtonElem.innerText = "Edit";
    editCardButtonElem.addEventListener("click", (e) => {
      this.showEditState(e);
    });

    // create delete button
    const deleteCardButtonElem = document.createElement("button");
    deleteCardButtonElem.className = "btn btn-danger";
    deleteCardButtonElem.innerText = "Delete";
    deleteCardButtonElem.addEventListener("click", (e) => {
      this.deleteProduct(this.data);
      e.target.parentNode.parentNode.remove();
    });

    cardBodyElem.appendChild(cardTitleElem);
    cardBodyElem.appendChild(cardMaterialElem);
    cardBodyElem.appendChild(editCardButtonElem);
    cardBodyElem.appendChild(deleteCardButtonElem);

    return cardBodyElem;
  }

  ceateCardEditState() {
    // create card body
    const cardBodyElem = document.createElement("div");
    cardBodyElem.className = "card-body card-body-edit d-none";

    // create card title input
    const cardTitleElem = document.createElement("input");
    cardTitleElem.value = this.data.name;

    // create material input
    const cardMaterialElem = document.createElement("input");
    cardMaterialElem.value = this.data.material;

    // create edit button
    const editCardButtonElem = document.createElement("button");
    editCardButtonElem.className = "btn btn-primary";
    editCardButtonElem.innerText = "Save";
    editCardButtonElem.addEventListener("click", async (e) => {
      // some logic to change in DB and in client
      // call the api, pass the values in body
      const newData = await this.editProduct({
        ...this.data,
        material: cardMaterialElem.value,
        name: cardTitleElem.value,
      });

      // send new data to client (view)
      // get body elem by class card-body-view
      // get both h5 and p
      // update h5 and p

      const elem = e.target.parentNode.previousSibling;
      elem.querySelector("h5").innerText = newData.name;
      elem.querySelector("p").innerText = newData.material;

      this.showViewState(e);
    });

    // create delete button
    const deleteCardButtonElem = document.createElement("button");
    deleteCardButtonElem.className = "btn btn-danger";
    deleteCardButtonElem.innerText = "Cancel";
    deleteCardButtonElem.addEventListener("click", (e) => {
      this.showViewState(e);
    });

    cardBodyElem.appendChild(cardTitleElem);
    cardBodyElem.appendChild(cardMaterialElem);
    cardBodyElem.appendChild(editCardButtonElem);
    cardBodyElem.appendChild(deleteCardButtonElem);

    return cardBodyElem;
  }

  createCard() {
    // create card
    const cardElem = document.createElement("div");
    cardElem.className = "card";
    cardElem.id = this.data.id;

    // create card image
    const cardImageElem = document.createElement("img");
    cardImageElem.className = "card-img-top";
    cardImageElem.src = this.data.image_url;

    const cardBodyView = this.ceateCardViewState(this.data);
    const cardBodyEdit = this.ceateCardEditState(this.data);

    // append child to card
    cardElem.appendChild(cardImageElem);
    cardElem.appendChild(cardBodyView);
    cardElem.appendChild(cardBodyEdit);

    return cardElem;
  }

  showEditState(e) {
    const viewBox = e.target.parentNode;
    const editBox = viewBox.nextSibling;

    viewBox.classList.add("d-none");
    editBox.classList.remove("d-none");
  }

  showViewState(e) {
    const editBox = e.target.parentNode;
    const viewBox = editBox.previousSibling;

    editBox.classList.add("d-none");
    viewBox.classList.remove("d-none");
  }

  editProduct(data) {
    const results = fetch(`${STORE_URL}/1/items/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => json);

    return results;
  }

  deleteProduct(data) {
    console.log("delete", data);
    fetch(`${STORE_URL}/1/items/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((e) => console.log(e));
  }

  static newProductCard() {
    return fetch(`${STORE_URL}/1/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => json)
      .catch((e) => console.log(e));
  }
}

document.getElementById("new").addEventListener("click", async () => {
  const newItem = await Product.newProductCard();
  const product = new Product(newItem);
  createProductCards([product]);
});

function createProductCards(products) {
  const root = document.getElementById("root");
  products.forEach((product) => root.appendChild(product.html));
}

const store = Product.getStore();

store.then((res) => {
  const products = res[0].items.map((itemData) => new Product(itemData));
  console.log(products[0]);
  createProductCards(products);
});

console.log(store);
