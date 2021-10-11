import React, {useState, useEffect} from "react";
import {capitalizeFirstLetter} from "../utils";

// import logo from './logo.svg';
// import './App.scss';


import axios from "axios";

function GalleryView({pokemonList}) {
    const [typeList, setTypeList] = useState([]);
    const [filterKeyword, setFilterKeyword] = useState("all");
    const [filteredPokemonList, setFilteredPokemonList] = useState(pokemonList);
    const [pokemonListByType, setPokemonListByType] = useState(new Map());

    const updatePokemonListByType = (k, v) =>{
        setPokemonListByType(new Map(pokemonListByType.set(k,v)));
    }

    const getId = pokemon =>{
        const splittedUrl = pokemon.pokemon.url.split('/');
        return parseInt(splittedUrl[splittedUrl.length-2]);
    }

    useEffect(() =>{
        axios.get(`https://pokeapi.co/api/v2/type/`).then(
            response => {
                setTypeList(['All', ...response.data.results.map( type => capitalizeFirstLetter(type.name) )]);
            });
    }, []);
    // console.log("typelist ", typeList);

    useEffect(() =>{
        if(filterKeyword === "all"){
            setFilteredPokemonList(pokemonList);
        }else{
            if(pokemonListByType.has(filterKeyword)){
                console.log("has ", filterKeyword);
                setFilteredPokemonList(pokemonListByType);
            }else{
                axios.get(`https://pokeapi.co/api/v2/type/${filterKeyword}`)
                    .then(response => {
                        console.log(response.data.pokemon);
                        const filteredListByType = response.data.pokemon.filter(pokemon => {
                            return pokemonIdMap.has(getId(pokemon));
                        }).map(pokemon =>{
                            return pokemonIdMap.get(getId(pokemon));
                        });
                        setFilteredPokemonList(filteredListByType);
                        updatePokemonListByType(filterKeyword, filteredListByType);
                        console.log("filterkeyword ", filterKeyword, "filteredtypebytype", filteredListByType);
                    })
            }
        }
    }, [filterKeyword, pokemonList, pokemonIdMap]);
    // console.log("filtered ", filteredPokemonList, "filterkeyword", filterKeyword);

    // TODO: list pokemons
    // TODO: filter options
    // TODO: filter

    return (
        <div className="GalleryView">
            <header className="View-header">
                    <div className="buttons">
                        {
                            typeList.map(type => {
                                return <button type="button" onClick={()=> setFilterKeyword(type.toLowerCase())} className="btn">{type}</button>
                            })
                        }
                    </div>

            </header>
            <ul id="pokemonGalleryDisplayList" className="gallery-list">
                {
                    filteredPokemonList.map(pokemon => (
                        <div className="gallery-list-item" key={pokemon.id}>
                            <img src={pokemon.imgUrl} className="pokemon-image"/>
                        </div>
                    ))
                }
            </ul>
        </div>
    );
}


export default GalleryView;
