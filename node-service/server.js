const express = require('express');
const amqp = require('amqplib/callback_api');
const app = express();
const port = 3001;

let channel = null;

// Connect to RabbitMQ and set up channels
amqp.connect('amqp://rabbitmq', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, ch) => {
    if (error1) {
      throw error1;
    }
    channel = ch;
    const pythonQueue = 'python_queue';
    const nodeQueue = 'node_queue';

    ch.assertQueue(pythonQueue, { durable: false });
    ch.assertQueue(nodeQueue, { durable: false });

    // Receive messages from the Python service
    ch.consume(nodeQueue, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
      // Here you can add code to handle the message received from Python service
    }, { noAck: true });
  });
});

app.get('/data', (req, res) => {
  res.json({ john: 1 });
});

app.get('/', (req, res) => {
  res.json({ john: 12 });
});

app.get('/starttask', (req, res) => {
  if (channel) {
    const msg = 'Start resource-intensive task';
    console.log(msg,123)
    channel.sendToQueue('python_queue', Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
    res.json({ status: 'Task sent to Python service' });
  } else {
    res.status(500).json({ error: 'RabbitMQ channel is not available' });
  }
});

app.listen(port, () => {
  console.log(`Node.js server is running on http://localhost:${port}`);
});
