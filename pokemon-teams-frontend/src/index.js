const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    const main = document.querySelector('main')

    fetchTrainers()

    function fetchTrainers() {
        fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(function(trainers){
            for (const trainer of trainers) {
                renderTrainer(trainer)
            }
        })
    }

    function renderTrainer(trainer) {
        const trainerCard = document.createElement('div')
        const myPokemon = trainer.pokemons
        trainerCard.className = "card"
        trainerCard.dataset.id = trainer.id
        trainerCard.innerHTML = `<p>${trainer.name}</p>
        <button class="addpoke" data-trainer-id=${trainer.id}>Add Pokemon</button>
        <ul></ul>`
        for (const pokemon of myPokemon) {
            const listItem = document.createElement('li')
            listItem.innerHTML = `${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id=${pokemon.id}>Release</button>`
            trainerCard.lastElementChild.appendChild(listItem)
        }
        main.appendChild(trainerCard)
    }

    main.addEventListener('click', (event) => {
        event.preventDefault();
        if (event.target.className === 'addpoke' && event.target.nextElementSibling.childElementCount < 6){
            addPokemon(event)            
        }
        if (event.target.className === 'release') {
            event.target.parentElement.remove()
            releasePokemon(parseInt(event.target.dataset.pokemonId))
        }
    }) 


    function addPokemon(event) {
        let trainer_id = event.target.dataset.trainerId
        const configObj = {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "trainer_id": trainer_id
            })
        }
      fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(newPoke => {
            let newLi = document.createElement('li')
            event.target.nextElementSibling.appendChild(newLi)
            newLi.innerHTML = `${newPoke.nickname} (${newPoke.species})<button class="release" data-pokemon-id=${newPoke.id}>Release</button>`

        }) 
        .catch(error => console.log(error.message))
    }

    function releasePokemon(id) {
        fetch(POKEMONS_URL + '/' + id, {
            method: 'DELETE'
        })
        .then(resp => resp.json())
        .catch(error => console.log(error.message))

    }

})