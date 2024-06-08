document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('listingForm');
    const listingsList = document.getElementById('listingsList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        if (title.trim() === '' || description.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }

        fetch('/submit-listing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                title: title,
                description: description
            })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            fetchListings();
        })
        .catch(error => console.error('Error:', error));
    });

    function fetchListings() {
        fetch('/listings')
        .then(response => response.json())
        .then(data => {
            listingsList.innerHTML = '';
            data.forEach(listing => {
                const li = document.createElement('li');
                li.textContent = `ID: ${listing.id}, Title: ${listing.title}, Description: ${listing.description}`;
                listingsList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Fetch listings on page load
    fetchListings();
});
