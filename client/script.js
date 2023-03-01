const body = document.querySelector('.container')
const api = ('http://localhost:4000/show-all');

//fetch the data from your server link
const getIdeas = async (api) => {
    try {
        const response = await fetch (api)
        const data = await response.json();
        //console.log(data) to check your console
        return data;        
    } catch(err) {
        console.log('ERROR');
    }
}


