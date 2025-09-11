var notificationBtn = document.getElementById("enable") 

function askNotificationPermission() {
  // Check if the browser supports notifications
  console.log("Asking permission!")
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
    return;
  }
    Notification.requestPermission().then((permission) => {
        console.log(permission);
        notificationBtn.style.display = permission === "granted" ? "none" : "block";
        if (permission === "granted") {
            console.log("1 - Granted");
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('scripts/service-worker.js', { scope: '/' })
                .then(function(registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                    return navigator.serviceWorker.ready;
                })
                .then(function(registration) {
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlB64ToUint8Array('BGDatyq4EYbXYvEwYe8Hsfm7yA1LS8BUcFzwqwmG5fOAL6bsoia32SXcGMnmxqkfIH2ALWUtreWTgRYDaQRl6zk')
                    });
                })
                .then(function(subscription) {
                    console.log('User is subscribed:', subscription);
                    // Send subscription to your server
                })
                .catch(function(err) {
                    console.log('Failed to subscribe the user: ', err);
                });
            }
            sendNotification(0);
        }
    });

}

var notif_zero = document.getElementById("sendNotification0") 
var notif_one = document.getElementById("sendNotification1") 
var notif_two = document.getElementById("sendNotification2") 


function sendNotification(urgency) {
    if (urgency > 0) {
        var img = "assets/sad_blood.png";
    } else {
        var img = "assets/happy_blood.png";
    }
    const blood_type = "O+"
    switch(urgency){
        case 0: // Control
            var text = `${blood_type} blood needed! Donate today and help save lives. Schedule now!`;
            break;
        case 1: // Shortage
            var text = `Critical shortage of ${blood_type} blood! Your help is urgently needed. Donate now to save lives!`;
            break
        case 2: // Prediction
            var text = `Upcoming drop in ${blood_type} blood supply expected! Donate today to ensure we're prepared!`;
            break
    }
    const notification = new Notification("Blood Donation Center", { body: text, icon: img });
}


