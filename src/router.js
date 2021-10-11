import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useState, useEffect} from "react";
import ListView from "./views/ListView"
import GalleryView from "./views/GalleryView";
import DetailView from "./views/DetailView";
import {capitalizeFirstLetter} from "./utils";
import axios from "axios";


function MyRouter() {
    const [pokemonIdMap, setPokemonIdMap] = useState(new Map());
    const [pokemonList, setPokemonList] = useState([]);

    const updatePokemonIdMap = (k,v) =>{
        setPokemonIdMap(new Map(pokemonIdMap.set(k,v)));
    }

    /* Get pokemon list.*/
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then(response => {
                let listWithPics = response.data.results;
                setPokemonList(listWithPics.map( (pokemon) => {
                    const splittedUrl = pokemon.url.split('/');
                    const id = parseInt(splittedUrl[splittedUrl.length-2]);
                    return {
                        id: id,
                        name: capitalizeFirstLetter(pokemon.name),
                        url: pokemon.url,
                        imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    }
                }));
                response.data.results.forEach(pokemon => {
                    const splittedUrl = pokemon.url.split('/');
                    const id = parseInt(splittedUrl[splittedUrl.length-2]);
                    updatePokemonIdMap(id, {
                        id: id,
                        name: capitalizeFirstLetter(pokemon.name),
                        url: pokemon.url,
                        imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                    });
                });
            });
    }, []);

    // console.log("at router: ", pokemonList);


    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/list">List View</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                </ul>

                <hr />


                <Switch>
                    <Route exact path="/">
                        <Redirect to="/list" />
                    </Route>
                    <Route path="/list">
                        <ListView pokemonList={pokemonList} />
                    </Route>
                    <Route path="/gallery">
                        <GalleryView pokemonList={pokemonList} />
                    </Route>
                    <Route path="/detail/:id">
                        <DetailView />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default MyRouter;


