import React from "react";

// import logo from './logo.svg';
// import './App.scss';


function ListView() {
    const axios = require("axios");

    function loadPokemons(){
        console.log('running loadPokemons...');
        // for(let i=1; i<=5; i++){
        //     axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        //         .then(response => {
        //             // console.log(`i = ${i}`);
        //             // console.log(response.data.name);
        //         });
        // }
        axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
            .then(response => {
                console.log("233");
            });
        // TODO: use API to load actual pokemon list
        return [{name: "pokemon1", id:1}, {name: "pokemon2", id:2}];
    }

    function getSearchInput(e){
        const searchInput = e.target.value.trim().toLowerCase();
        let filteredPokemons;
        if(searchInput === "") {
            filteredPokemons = [];
        }else{
            filteredPokemons = pokemonList.filter((pokemon) => {
                // TODO: search filter rule tbd
                return pokemon.name.toLowerCase().includes(searchInput) || pokemon.id === parseInt(searchInput);
            });
        }
        // console.log(filteredPokemons);
        displayPokemons(filteredPokemons);
    }

    function displayPokemons(pokemonList){
        const pokemonDisplayList = document.getElementById("pokemonDisplayList");
        // console.log(pokemonDisplayList);
        const htmlString = pokemonList.map((pokemon) => {
            return `
            <li class="pokemon">
                <h2>${pokemon.name}</h2>
                <p>${pokemon.id} ${pokemon.name}</p>
<!--                <img src="${pokemon.image}"></img>-->
            </li>
            `;
        });
        pokemonDisplayList.innerHTML = htmlString;

    }

    let pokemonList = loadPokemons();
    // let pokemonList = [];

    return (
        <div className="ListView">
            <header className="View-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <div id="searchWrapper">
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="search for a pokemon"
                        onKeyUp={getSearchInput}
                    />
                </div>
                <ul id="pokemonDisplayList"></ul>
            </header>
        </div>
    );
}


export default ListView;
