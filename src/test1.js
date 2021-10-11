async function main() {
    const axios = require('axios');
    let list = [];
    // console.log("Hello World");
    // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
    //     .then(response => {list = response.data.results});
    const getId = pokemon =>{
        const splittedUrl = pokemon.pokemon.url.split('/');
        return parseInt(splittedUrl[splittedUrl.length-2]);
    }
    await axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
        .then(response => {
            // console.log(getId(response.data.pokemon[0]));
            console.log(response.data.types);
        });
    // console.log(list[0].name);
}
main();