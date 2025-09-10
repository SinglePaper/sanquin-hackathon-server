var notificationBtn = document.getElementById("enable") 

function askNotificationPermission() {
  // Check if the browser supports notifications
  console.log("Asking permission!")
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  }
  Notification.requestPermission().then((permission) => {
    // set the button to shown or hidden, depending on what the user answers
    console.log(permission)
    notificationBtn.style.display = permission === "granted" ? "none" : "block";
    if (permission === "granted") {
        console.log("1 - Granted")
        if ('serviceWorker' in navigator) {
            console.log("2 - Navigator")
            navigator.serviceWorker.ready.then(function(registration) {
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlB64ToUint8Array('BGDatyq4EYbXYvEwYe8Hsfm7yA1LS8BUcFzwqwmG5fOAL6bsoia32SXcGMnmxqkfIH2ALWUtreWTgRYDaQRl6zk')
                }).then(function(subscription) {
                    console.log('User is subscribed:', subscription);
                    // Send subscription to your server
                }).catch(function(err) {
                    console.log('Failed to subscribe the user: ', err);
                });
            });
        }
        sendNotification()
    }
  });
}

function sendNotification() {
    const img = "assets/sad_blood.png";
    const blood_type = "O+"
    const text = `HEY! Gimme your ${blood_type} blood!`;
    const notification = new Notification("Blood Donation Center", { body: text, icon: img });
}


