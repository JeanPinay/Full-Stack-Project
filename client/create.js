document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  const form = document.querySelector('.ideasForm');
  const popup = document.querySelector('#popup'); // Get the pop-up element

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const created_at = new Date().toISOString(); // Generate the created_at value
    const data = { title, description, created_at };

    console.log('Title:', title);
    console.log('Description:', description);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch('http://localhost:4000/create', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';

        // Show the pop-up after successfully creating an idea
        popup.style.display = 'block';
        setTimeout(() => {
          // Hide the pop-up after 3 seconds
          popup.style.display = 'none';
        }, 3000);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
