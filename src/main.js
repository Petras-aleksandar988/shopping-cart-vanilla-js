let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

function generateShop() {
  return (shop.innerHTML = shopData
    .map((item) => {
      const { id, name, desc, price, img } = item;
      let search = basket.find((x) => x.id === id);
      return `
       
        <div id="product-id-${id}" class="item">
        <img width="230" src="${img}" alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>
           ${desc}
          </p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id="${id}" class="quantity">
              ${search === undefined ? 0 : search.item}</div>
              <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>

            </div>
          </div>
        </div>
      </div>
        `;
    })
    .join(""));
}

generateShop();

function decrement(id) {
  let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined) return
 else  if (search.item === 0) return;
  else {
    search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter(x => x.item !== 0)
  localStorage.setItem("data", JSON.stringify(basket));
}

function increment(id) {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
}
function update(id) {
  let search = basket.find((x) => x.id === id);
  document.querySelector(`#${id}`).innerHTML = search.item;
  calculation();
}

 function calculation() {
  let calc = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  console.log(calc);
  document.querySelector("#cartAmount").innerHTML = calc;
}
  calculation();
