const express = require('express')
const path = require('path')
const webPush = require('web-push');
const bodyParser = require('body-parser');

webPush.setVapidDetails(
    'mailto:sanquinhackathon@sjhmail.nl', // Your contact email
    process.env.vapidPublic,
    process.env.vapidPrivate
);



console.log(process.env.vapidPublic, process.env.vapidPrivate)

const port = process.env.PORT || 5006

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log(`Rendering 'pages/index' for route '/'`)
  res.render('pages/index')
})

app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
    const subscription = req.body;

    // Store subscription in your database or in-memory storage
    console.log('User subscribed:', subscription);

    res.status(201).json({});
});

// Endpoint to send a push notification
app.post('/sendNotification', (req, res) => {
    const subscription = req.body.subscription;
    const payload = JSON.stringify({ title: 'Hello!', body: 'This is a push notification.' });

    webPush.sendNotification(subscription, payload)
        .then(response => {
            console.log('Notification sent successfully:', response);
            res.status(200).json({ success: true });
        })
        .catch(error => {
            console.error('Error sending notification:', error);
            res.sendStatus(500);
        });
});

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

// The number of seconds an idle Keep-Alive connection is kept open. This should be greater than the Heroku Router's
// Keep-Alive idle timeout of 90 seconds:
// - to ensure that the closing of idle connections is always initiated by the router and not the Node.js server
// - to prevent a race condition if the router sends a request to the app just as Node.js is closing the connection
// https://devcenter.heroku.com/articles/http-routing#keepalives
// https://nodejs.org/api/http.html#serverkeepalivetimeout
server.keepAliveTimeout = 95 * 1000

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down')
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }
})
