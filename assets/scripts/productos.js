const contCardRe = document.getElementById('cont_card_remedios')
const contCardJu = document.getElementById('cont_card_juguetes')
const checkbox = document.getElementById("cont_checkbox")
const search = document.getElementById("cont_search")
const title = document.getElementById('title')


let carrito = []

async function api(){
    try {
        var dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    } catch (error) {
        console.log(error);
    }

    let data = dataApi.response
    imprimirCheckbox(checkbox)
    if(contCardRe){
        data.filter(dato => dato.tipo === 'Medicamento').forEach(val => imprProducto(val,contCardRe))
        checkbox.addEventListener("change",value => filters("filterRadio", value.target.id, data, contCardRe).forEach(val => imprProducto(val,contCardRe)))
        search.addEventListener("input", values => filters("filterSearch", values.target.value, data, contCardRe).forEach(val => imprProducto(val,contCardRe)))
    }
    if(contCardJu){
        data.filter(dato => dato.tipo === 'Juguete').forEach(val => imprProducto(val,contCardJu))
        checkbox.addEventListener("change",value => filters("filterRadio", value.target.id, data, contCardJu).forEach(val => imprProducto(val,contCardJu)))
        search.addEventListener("input", values => filters("filterSearch", values.target.value, data, contCardJu).forEach(val => imprProducto(val,contCardJu)))
    }
    imprimirCheckbox(checkbox)
    
    
}
api()


function agregarCarrito(id){
    let a = JSON.parse(localStorage.getItem("carrito"))
    //console.log(a.includes(id), id, a)
    let agregarQuitar = document.getElementById(id)
    if(!a){
        a = []
    }

    if(a.includes(id)){
     carrito = a.filter(element => element !== id)
     agregarQuitar.textContent = `Agregar carrito`
     localStorage.setItem('carrito', JSON.stringify(carrito))
     console.log(carrito);
    } else{
        let a = JSON.parse(localStorage.getItem("carrito"))
        if(a){
            if(a.includes(id)){
                a = a.filter(value => value._id !== id)
                agregarQuitar.textContent = `Agregar carrito`
            }
            else{
                a.push(id)
                agregarQuitar.textContent= `Quitar carrito`
            }
            localStorage.setItem('carrito', JSON.stringify(a))
        } 
        else{
        carrito.push(id)
        agregarQuitar.textContent = `Quitar carrito`
        localStorage.setItem('carrito', JSON.stringify(carrito))
        console.log(carrito);
        }
    }
  }  

function filterRadio(value, data, main){
    if(value == "flexRadioDefault1"){
        main.innerHTML = "" 
        return [...data.sort((a,b) => b.precio - a.precio)]
    }
    if(value == "flexRadioDefault2"){
        main.innerHTML = "" 
        return [...data.sort((a,b) => a.precio - b.precio)]
    }
}

function filterSearch(values, data, main){
    main.innerHTML = "" 
    return data.filter(element => element.nombre.toLowerCase().includes(values.toLowerCase()))
}

function imprProducto(arreglo, contCard){
        let a = localStorage.getItem("carrito")
        let c
        if(!a){
            a = []
        }
        if(a.includes(arreglo._id)){
            c = "Quitar carrito"
        }
        else{
            c = "Agregar carrito"
        }
        contCard.innerHTML += 
        `<div class="item">
        <div class="card">
            <p>$${arreglo.precio}</p>
            <img src="${arreglo.imagen}" alt="...">
            <div class="card_body">
                <p class="card_text">${arreglo.nombre}</p>
            </div>
        </div>
        <button class ="btn " onclick = "agregarCarrito('${arreglo._id}')">

         <div class="boton_card">
               <p id="${arreglo._id}">${c}</p>
               </div>
               </button>
               </div>`
}

function imprimirCheckbox(main){
    main.innerHTML =
        `
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
        <label class="form-check-label" for="flexRadioDefault1">
            De mayor a menor precio
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
        <label class="form-check-label" for="flexRadioDefault2">
            De menor a mayor precio
        </label>
        </div>
        `

}

let applied = {}
function filters (fn, value, data, idImpresionCard){
    let arrayBusqueda = data
    applied[fn] = value
    for(let name in applied){
        console.log(name)
        if( name === "filterRadio"){
            arrayBusqueda = filterRadio(applied[name] , arrayBusqueda, idImpresionCard)
        }
        if( name === "filterSearch"){
            arrayBusqueda = filterSearch(applied[name] , arrayBusqueda, idImpresionCard)
        }
    }
    return arrayBusqueda
}

