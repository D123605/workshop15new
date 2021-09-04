var express = require('express');
var app = express();
var amqp = require('amqplib/callback_api');


const port = 5100;

amqp.connect('amqp://localhost',(err,conn)=>{
    conn.createChannel((err,ch) => {
        var queue = 'First Queue'
        var message = 'Debarishi';
        ch.assertQueue(queue,{durable: true});
        ch.sendToQueue(queue,Buffer.from(message),{
            persistent:true
        });
        console.log("Message was sent");     
    });
    setTimeout(()=>{
        conn.close();
        process.exit(0);
    },500);
});

app.listen(port);