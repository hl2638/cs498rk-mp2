function main(){
    const axios = require('axios');
    // console.log("Hello World");
    axios.get(`https://pokeapi.co/api/v2/pokemon/1`)
        .then(response => {
            console.log(response.data.name);
        });
}
main();