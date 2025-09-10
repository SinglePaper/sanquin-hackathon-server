document.getElementById('sendNotification').addEventListener('click', function() {
    // Fetch the subscription from your storage (e.g., local storage or a variable)
    const subscription = /* Retrieve the subscription object here */;

    fetch('/sendNotification', {
        method: 'POST',
        body: JSON.stringify({ subscription: subscription }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Notification sent successfully!');
        } else {
            console.error('Failed to send notification.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
