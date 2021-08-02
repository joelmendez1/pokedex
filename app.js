//Número random

function numeroEntero(max, min) {

    return (Math.floor(Math.random() * (max - min) + min))

}

//Lógica

const conteiner = $('#conteiner')

const enviar = $('#enviar')

/// GENERAR UNA CARTA RANDOM

let tarjeta = document.addEventListener('DOMContentLoaded', () => {

    let URLGET = `https://pokeapi.co/api/v2/pokemon/${numeroEntero(1, 151)}`

    getPokemon(URLGET)

})

function getPokemon(url) {

    $.get(url, function (respuesta, estado){

        if(estado === 'success') {

            let misDatos = respuesta;

            const _altura = misDatos.height / 10

            const _peso = Math.round(misDatos.weight / 35.274).toFixed()   

            //Segunda llamada a la api

            let urlFormn = misDatos.forms[0].url

            $.get(urlFormn, function(respuesta, estado) {

                if(estado === 'success') {

                    const _imgPokemon = respuesta.sprites.front_default

                    const _name = misDatos.forms[0].name

                    const _base_experience = misDatos.base_experience

                    const _abilities = misDatos.abilities

                    pokemonRender({_imgPokemon, _name, _base_experience, _peso, _altura, _abilities})

                }
            })
        }
    })

}

function pokemonRender({_imgPokemon, _name, _base_experience, _peso, _altura, _abilities}) {

    conteiner.append(`
        <div class='pokimon'> 
            <div id='datos'>
                <img src="${_imgPokemon}" alt="pokemon">
                <h1>${_name}</h1>
            </div> 
            <div id='estadisticas'>
            <h2>Estadisticas</h2>
                <ul id='datos1'>
                    <li>Experiencia base: <span>${_base_experience}</span></li>
                    <li>Peso: <span>${_peso}</span> kg</li>
                    <li>Altura: <span>${_altura}</span> metros</li>
                </ul>
            </div>
        </div>
    `)

    _abilities.forEach(abilityObject => {
        $('#datos1').append(`
            <li>Habilidad: <span>${abilityObject.ability.name}</span></li>
        `)
    })
}

function buscarPokemon() {

    const buscador = $('#buscador').val().toLowerCase()

    const arrayUrl = []

    for(let i =0; i <= 1120; i = i+20) {

        let urls = `https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`

        arrayUrl.push(urls)

    } 

    let arrayVacio = []

    arrayUrl.forEach(element => {

        $.get(element, function(respuesta, estado) {

            if(estado === 'success') {

                for(const e of respuesta.results) {

                    arrayVacio.push(e)

                }
            }
        })
    })

    setTimeout(() => { 
        
        for(const e of arrayVacio) {

            if(e.name.includes(buscador)) {

                const url = e.url

                borrarPokemon()

                getPokemon(url)

                break;

            }
        }
    }, 150)
}

function borrarPokemon() {

    $('.pokimon').remove()

}

enviar.click(buscarPokemon)
