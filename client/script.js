document.addEventListener('DOMContentLoaded', () => {
  const ideaList = document.querySelector('#ideaList');

  fetch('http://localhost:4000/show-all')
    .then(response => response.json())
    .then(data => {
      // Iterate over the retrieved ideas and create HTML elements to display them
      data.data.forEach(idea => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const title = document.createElement('h3');
        title.innerText = `Title: ${idea.title}`;
        card.appendChild(title);
        
        const description = document.createElement('p');
        description.innerText = `Description: ${idea.description}`;
        card.appendChild(description);
        
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
          editIdea(idea.id);
        });
        buttonContainer.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
          deleteIdea(idea.id);
        });
        buttonContainer.appendChild(deleteButton);
        
        card.appendChild(buttonContainer);
        ideaList.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error:', error);
  });


    async function deleteIdea(id) {
      try {
        const confirmed = confirm('Are you sure you want to delete this idea?');
        if (!confirmed) {
          return;
        }
        // Send a request to delete the idea
        const response = await fetch(`http://localhost:4000/delete/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Unable to delete the idea.');
        }
    
        // Delete the idea from the database
        const result = await response.json();
        // console.log(`Deleted idea with ID: ${id}`);
    
        alert('Idea deleted successfully.');
    
        // Remove the deleted idea from the DOM
        const deletedCard = document.getElementById(`card-${id}`);
        if (deletedCard) {
          deletedCard.remove();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
});
