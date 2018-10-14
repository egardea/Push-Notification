const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());


const publicVapidKey = 'BDmZ2GOa8VP-yjHouKefoYewgvsxrPDMXDx3i4YSCwB5GAcd2WYd09ivc090RF0h_mphyi9PRN6Fxe7-u6VA7BM';

const privateVapidKey = 'wf3lFhDGVbgPhqa5paWXBqIroV7K982YfS0jvbF1haE';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//Subscribe Route
app.post('/subscribe', (req, res) => {
    //Get pushSubscription object
    const subscription = req.body;

    //send 201 - resource created
    res.status(201).json({});

    //Create payload
    const payload = JSON.stringify({title: 'Push Test'});

    //Pass object into sendNotification
    webPush.sendNotification(subscription, payload).catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log('server started on port ${port}'));