import React, {useState, useEffect} from "react";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

function DetailView() {
    let {id} = useParams();
    console.log(id);
    const [pokemon, setPokemon] = useState({});
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(response =>{
                setPokemon({
                    id: id,
                    name: response.data.name,
                    types: response.data.types.map(obj => obj.type.name),
                    imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                });

                // console.log(pokemon);
            });
    }, []);
    console.log(pokemon.types);
    return (
        <div className="DetailView">
            <header className="View-header">
            </header>
            <h1>{pokemon.name}</h1>
            <h2>ID: {pokemon.id}</h2>
            <h2>Types</h2>
            {/*{*/}
            {/*    pokemon.types.map( type =>(*/}
            {/*        <span>{type}</span>*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    );
}

export default DetailView;
