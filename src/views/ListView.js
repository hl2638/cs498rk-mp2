import React, {useState, useEffect} from "react";
import {capitalizeFirstLetter} from "../utils";
// import logo from './logo.svg';
// import './App.scss';
import axios from "axios";

function ListView({pokemonList, pokemonIdMap}) {
    // const [pokemonList, setPokemonList] = useState([]);
    const sortByValues = {
        ID: "id",
        NAME: "name"
    };
    const sortOrderValues = {
        ASC: "asc",
        DESC: "desc"
    };
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState("");
    const [sortBy, setSortBy] = useState(sortByValues.ID);
    const [sortOrder, setSortOrder] = useState(sortOrderValues.ASC);

    function calcCompFunc(){
        let compfunc;
        if(sortBy === sortByValues.ID){
            if(sortOrder === sortOrderValues.ASC){
                compfunc = (a, b) => (a.id < b.id ? -1:1);
            }else{
                compfunc = (a, b) => (a.id > b.id ? -1:1);
            }
        }else if(sortBy === sortByValues.NAME){
            if(sortOrder === sortOrderValues.ASC){
                compfunc = (a, b) => (a.name < b.name ? -1:1);
            }else{
                compfunc = (a, b) => (a.name > b.name ? -1:1);
            }
        }
        return compfunc;
    }

    useEffect(() => {
        const compfunc = calcCompFunc();
        setFilteredPokemonList(pokemonList.filter( pokemon =>
            pokemon.name.toLowerCase().includes(filterKeyword) || pokemon.id === parseInt(filterKeyword)
        ).sort(compfunc));
        console.log(filteredPokemonList);
    }, [filterKeyword]);

    useEffect(() =>{
        const compfunc = calcCompFunc();
        setFilteredPokemonList([...filteredPokemonList].sort(compfunc));
        console.log(filteredPokemonList);
    }, [sortBy, sortOrder]);

    function getSearchInput(e){
        const searchInput = e.target.value.trim().toLowerCase();
        setFilterKeyword(searchInput);
    }

    function changeSortBy(e){
        const by = e.target.value;
        setSortBy(by);
    }
    function changeSortOrder(e){
        const by = e.target.value;
        setSortOrder(by);
    }

    return (
        <div className="ListView">
            <header className="View-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <div id="searchWrapper">
                    <input
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        placeholder="search pokemons by id(number) or name"
                        onKeyUp={getSearchInput}
                    />
                    <label htmlFor="sortBy">Sort by:</label>
                    <select id="sortBy" onChange={changeSortBy}>
                        <option value={sortByValues.ID}>ID</option>
                        <option value={sortByValues.NAME}>Name</option>
                    </select>
                    <div onChange={changeSortOrder}>
                        <input type="radio" id="asc" name="sort-order" value={sortOrderValues.ASC} defaultChecked></input>
                        <label htmlFor="asc">Ascending</label>
                        <input type="radio" id="desc" name="sort-order" value={sortOrderValues.DESC}></input>
                        <label htmlFor="desc">Descending</label>
                    </div>

                </div>
            </header>
            <ul id="pokemonDisplayList" className="vertical-list">
                {
                    filteredPokemonList.map(pokemon => (
                            <li key={pokemon.id}>
                                <p>{pokemon.id} {pokemon.name}</p>
                                <img src={pokemon.imgUrl} className="pokemon-image"/>
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}


export default ListView;
