//Número random

function numeroEntero(max, min) {

    return (Math.floor(Math.random() * (max - min) + min))

}

// console.log(numeroEntero(1, 151))

//Lógica

const conteiner = $('#conteiner')

document.addEventListener('DOMContentLoaded', () => {

    let URLGET = `https://pokeapi.co/api/v2/pokemon/${numeroEntero(1, 151)}`


        $.get(URLGET, function (respuesta, estado){

        if(estado === 'success') {

            let misDatos = respuesta;

            //URL DEL POKEMON

            let urlFormn = misDatos.forms[0].url

            $.get(urlFormn, function(respuesta, estado) {

                const altura = misDatos.height / 10

                const peso = Math.round(misDatos.weight / 35.274).toFixed()   

                if(estado === 'success') {

                    let imgPokemon = respuesta.sprites.front_default

                    conteiner.append(`
                        <div> 
                            <div id='datos'>
                                <img src="${imgPokemon}" alt="pokemon">
                                <h1>${misDatos.forms[0].name}</h1>
                            </div> 
                            <div id='estadisticas'>
                            <h2>Estadisticas</h2>
                                <ul id='datos1'>
                                    <li>Experiencia base: <span>${misDatos.base_experience}</span></li>
                                    <li>Peso: <span>${peso}</span> kg</li>
                                    <li>Altura: <span>${altura}</span> metros</li>
                                </ul>
                            </div>
                        </div>
                    `)

                    misDatos.abilities.forEach(element => {
                        $('#datos1').append(`
                            <li>Habilidad: <span>${element.ability.name}</span></li>
                        `)
                    })
                }
            })
        }
    })
})

