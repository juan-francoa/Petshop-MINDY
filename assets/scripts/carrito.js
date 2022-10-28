
let contenedorCarrito = document.getElementById("bodyTable")
let productos;
let carrito = (JSON.parse(localStorage.getItem('carrito')));
let total = document.getElementById("totalProductos")

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

async function getId() {
  try {
    var dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    console.log(dataApi);
  } catch (error) {
    console.log(error);
  }
  let api = dataApi.response

  productos = api.filter(producto => carrito.includes(producto._id))
  console.log(productos);

  productos.forEach(imprProducto)
  let a = productos.reduce((a,b) => a+=b.precio,0)
  total.innerHTML = `Total : $ ${a} `
}

getId()


function imprProducto(product) {
  contenedorCarrito.innerHTML += `
    <td scope="row" id="${product._id}">🟢</td>
    <td class="table__productos fw-bold " style="color:#24a9e2;"> ${product.nombre}</td> 
    <td> <img class="rounded-3" src = "${product.imagen}" alt = "" style = "width: 8rem; "></img>  </td>
    <td class="table__precio fw-bold" style="color:#24a9e2;">$${product.precio}</td>
        <td class="table__cantidad">
        
        <input type="number" min="1" max="${product.stock}" value="1" onclick = "agregarMasCarrito('${product._id}',value)">
            <botton class="delete btn btn-danger"  onclick = "agregarCarrito('${product._id}')">x</botton> 
        </td>
      </tr> 
      `
}

async function agregarMasCarrito(id, value){
  try {
    let dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    let ab = await JSON.parse(localStorage.getItem("carrito"))
    let c = dataApi.response.filter(value => ab.includes(value._id))
    let cd = 0
    c.find(function(a){
      if(a._id.includes(id))
      {
      cd +=  a.precio*Number(value)
      }
      else{
       
        cd += a.precio
      }} )
    total.innerHTML = `Total : $ ${cd} `
    
  } catch (error) {
    console.log(error);
  }
  
}

function impresora(carrito) {
  contenedorCarrito.innerHTML = ''
  let a = carrito.reduce((a,b) => a+=b.precio,0)
  total.innerHTML = `Total : $ ${a} `
  if (carrito.length > 0){
    carrito.forEach(imprProducto)
  } else {
    contenedorCarrito.innerHTML = `<div class= "d-flex justify-content-end">
    <img src="../images/error404.png" style = " width: 50rem; heigth = 50rem">
    </div>`
  }
}



function agregarCarrito(id) {
  if (carrito.includes(id)) {
    let a = JSON.parse(localStorage.getItem("carrito"))
    carrito = a.filter(element => element !== id)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito);
    productos = productos.filter(producto => carrito.includes(producto._id))
    impresora(productos)
  } else {
    let a = JSON.parse(localStorage.getItem("carrito"))
    if (a) {
      a.push(id)
      localStorage.setItem('carrito', JSON.stringify(a))
      productos = productos.filter(producto => carrito.includes(producto._id))
      console.log(carrito);
      impresora(productos)
    }
    else {
      carrito.push(id)
      localStorage.setItem('carrito', JSON.stringify(carrito))
      console.log(carrito);
      productos = productos.filter(producto => carrito.includes(producto._id))
      console.log(carrito);
      impresora(productos)
    }
  }
}











