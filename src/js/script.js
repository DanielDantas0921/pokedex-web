const pokeContainer = document.querySelector("#pokeContainer")
const pokemonCount = 150

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

let bancoDeDados = [

]

const mainTypes = Object.keys(colors)

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + id
    const resp = await fetch(url)
    const data = await resp.json()
    createPokemonCard(data)
}

const createPokemonCard = (poke) => {
    const card = document.createElement("div")
    card.classList.add("pokemon")

    const name = poke.name.toUpperCase()
    const id = poke.id.toString().padStart(3, "0")

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHtml = `
    <div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
</div>

<div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
</div>`

    card.innerHTML = pokemonInnerHtml

    pokeContainer.appendChild(card)

    // bancoDeDados.push({id: poke.id, name: poke.name.toUpperCase(), type: type, color: color })

}

fetchPokemons()


const requisicaoTodosPokemons = async () => {

    for (let i = 1; i <= 1000; i++) {

        const url = "https://pokeapi.co/api/v2/pokemon/" + i
        const resp = await fetch(url)
        const data = await resp.json()

        const id = data.id
        const name = data.name.toUpperCase()
        const pokeTypes = data.types.map(type => type.type.name)
        const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
        const color = colors[type]

        bancoDeDados.push({ id: id, name: name, type: type, color: color })



    }


}

requisicaoTodosPokemons()



const inputSearch = document.querySelector("#searchInput")

inputSearch.addEventListener("input", () => {




    const pesquisaInput = inputSearch.value.toUpperCase()


    if (pesquisaInput == "") {

        fetchPokemons()


    } else {


        pokeContainer.innerHTML = ``



        const resultado = bancoDeDados.filter((obj) => {
            return obj.name.toUpperCase().includes(pesquisaInput)
        })




        resultado.forEach((obj) => {
            const card = document.createElement("div")
            card.classList.add("pokemon")
            const pokemonInnerHtml = `
            <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${obj.id}.png" alt="${obj.name}">
        </div>
        
        <div class="info">
            <span class="number">#${obj.id}</span>
            <h3 class="name">${obj.name}</h3>
            <small class="type">Type: <span>${obj.type}</span></small>
        </div>`

            card.innerHTML = pokemonInnerHtml
            card.style.backgroundColor = obj.color

            pokeContainer.appendChild(card)


        })

    }



})

console.log(bancoDeDados)
