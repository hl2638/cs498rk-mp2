async function main() {
    const axios = require('axios');
    let list = [];
    // console.log("Hello World");
    // axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20`)
    //     .then(response => {list = response.data.results});
    await axios.get(`https://pokeapi.co/api/v2/type/`)
        .then(response => console.log(response.data.results));
    // console.log(list[0].name);
}
main();