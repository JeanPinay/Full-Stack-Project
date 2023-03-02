document.querySelector('.ideasForm');

const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', function(){
    const titleBox = document.querySelector('#title');
    const title = titleBox.value;
    titleBox.value = "";

    const options = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title:  // variable with the value you want to send
        })
    };
    
    (async () => {
        const response = await fetch('http://localhost:4000/create', options);
        const data = await response.json()
        console.log(data)
    })()
})


