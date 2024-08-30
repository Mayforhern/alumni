document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const industry = document.getElementById('industry').value;
    const interests = document.getElementById('interests').value;

    // Send data to the backend
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, industry, interests }),
    })
    .then(response => response.json())
    .then(data => {
        alert('User signed up successfully!');
        // Optionally reset the form
        document.getElementById('signup-form').reset();
    })
    .catch(error => console.error('Error:', error));
});