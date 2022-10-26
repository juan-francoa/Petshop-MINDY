const main = document.getElementById('cont_card')

async function api(){
    try {
        var dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    } catch (error) {
        console.log(error);
    }

    let data = dataApi.response
    // console.log(data);
    data.forEach(cartaRemedio)
}
api()

function cartaRemedio(dato){
    if(dato.tipo === 'Medicamento'){
    main.innerHTML += 
                        `<div class="item">
                            <div class="card">
                                <p>$${dato.precio}</p>
                                <img src="${dato.imagen}" alt="...">
                                <div class="card_body">
                                    <p class="card_text">${dato.nombre}</p>
                                </div>
                            </div>
                            <div class="boton_card">
                                <p>Comprar Ahora</p>
                                <a href="#"><img src="./shop-car.png" alt=""></a>
                            </div>
                        </div>`
    }
}



