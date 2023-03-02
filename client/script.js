

document.addEventListener('DOMContentLoaded', function(landingPage){
    const getIdeas = async () => {
    try {
        const response = await fetch ('http://localhost:4000/show-all')//fetch the data from your server link
        const data = await response.json(landingPage(data));
        // console.log(data)
        //to check your console
        return data;        
    } catch(err) {
        console.log('ERROR');
    }
}
    // landingPage();
})




// const card = document.createElement('p');
//     card.classList.add("contentBx");
//     card.innerHTML = data.title.description;
//     body.appendChild(card);

//function
function landingPage(data) {
    const body = document.querySelector('.container');
    body.innerHTML = data;

}
