// Importing the necessary libraries (if needed)
// You can also use importScripts() to include external scripts if required

// Listen for the install event
self.addEventListener('install', function(event) {
    console.log('Service Worker installing...');
    // You can perform setup tasks here, like caching assets
});

// Listen for the activate event
self.addEventListener('activate', function(event) {
    console.log('Service Worker activating...');
    // You can clean up old caches or perform other activation tasks here
});

// Listen for push events
self.addEventListener('push', function(event) {
    const blood_type = "O+"
    const text = `HEY! Gimme your ${blood_type} blood!`;
    let data = { title: 'Server Blood Donation', body: text };

    if (event.data) {
        data = event.data.json(); // Assuming the payload is JSON
    }

    const options = {
        body: data.body,
        icon: 'assets/sad_blood.png', // Path to your notification icon
        badge: 'assets/sad_blood.png' // Path to your notification badge
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Listen for notification click events
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification

    event.waitUntil(
        clients.openWindow('https://sanquin-hackathon-cf6a98623a69.herokuapp.com/') // URL to open when the notification is clicked
    );
});
