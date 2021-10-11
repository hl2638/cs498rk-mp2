import React, {useState, useEffect} from "react";
import {capitalizeFirstLetter} from "../utils";

// import logo from './logo.svg';
// import './App.scss';


import axios from "axios";

function GalleryView({pokemonList}) {

    console.log("pokemonlist ", pokemonList);

    const [typeList, setTypeList] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState("All");
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);

    useEffect(() =>{
        axios.get(`https://pokeapi.co/api/v2/type/`).then(
            response => {
                setTypeList(['All', ...response.data.results.map( type => capitalizeFirstLetter(type.name) )]);
            });
    }, []);
    // console.log("typelist ", typeList);

    useEffect(() =>{
        if(filterKeyword === "All"){
            console.log("=== all");
            setFilteredPokemonList([...pokemonList]);
        }else{
            setFilteredPokemonList(pokemonList.filter( pokemon => pokemon.type === filterKeyword));
        }
    }, [filterKeyword]);
    console.log("filtered ", filteredPokemonList, "filterkeyword", filterKeyword);

    // TODO: list pokemons
    // TODO: filter options
    // TODO: filter

    return (
        <div className="GalleryView">
            <header className="View-header">
                    <div className="buttons">
                        {
                            typeList.map(type => {
                                return <button type="button" onClick={()=> setFilterKeyword(type)} className="btn">{type}</button>
                            })
                        }
                    </div>
                ))
            </header>
            <ul id="pokemonGalleryDisplayList" className="gallery-list">
                {
                    filteredPokemonList.map(pokemon => (
                        <div class="gallery-list-item" key={pokemon.id}>
                            <img src={pokemon.imgUrl} className="pokemon-image"/>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}


export default GalleryView;
