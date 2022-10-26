const contCard = document.getElementById('cont_card')
const title = document.getElementById('title')

async function api(){
    try {
        var dataApi = await (await fetch('https://apipetshop.herokuapp.com/api/articulos ')).json()
    } catch (error) {
        console.log(error);
    }

    let data = dataApi.response
    data.filter(() => title.textContent.includes('Remedios')).filter(dato => dato.tipo === 'Medicamento').forEach(imprProducto)
    data.filter(() => title.textContent.includes('Juguetes')).filter(dato => dato.tipo === 'Juguete').forEach(imprProducto)
    
}
api()

function imprProducto(arreglo){
        contCard.innerHTML += 
                        `<div class="item">
                            <div class="card">
                                <p>$${arreglo.precio}</p>
                                <img src="${arreglo.imagen}" alt="...">
                                <div class="card_body">
                                    <p class="card_text">${arreglo.nombre}</p>
                                </div>
                            </div>
                            <div class="boton_card">
                                <p>Comprar Ahora</p>
                                <a href="#"><img src="../images/shop-car.png" alt=""></a>
                            </div>
                        </div>`
}


