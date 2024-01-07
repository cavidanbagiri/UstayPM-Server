const amqp = require("amqplib");

const { createConnection } = require("./rabbitmqConnection");

const chatMessageSenderProducer = async (message_data) => {
  try {
    const queue_name = "chat_queue";

    const somes = await createConnection().then(async (respond) => {

      // Create a sender
      const ch2 = await respond.createChannel();
      setTimeout(() => {
        ch2.sendToQueue(queue_name, Buffer.from(message_data));
      }, 1000);

      // Create Listener
      const ch1 = await respond.createChannel();
      await ch1.assertQueue(queue_name);
      ch1.consume(queue_name, (msg) => {
        if (msg !== null) {
          console.log("Received:", msg.content.toString());
          ch1.ack(msg);
        } else {
          console.log("Consumer cancelled by server");
        }
      });
    });

    // const somes = await createConnection();

    //   // Create a sender
    //   const ch2 = await somes.createChannel();
    //   setTimeout(() => {
    //     ch2.sendToQueue(queue_name, Buffer.from(message_data));
    //   }, 1000);

    //   // Create Listener
    //   const ch1 = await somes.createChannel();
    //   await ch1.assertQueue(queue_name);
    //   ch1.consume(queue_name, (msg) => {
    //     if (msg !== null) {
    //       console.log("Received:", msg.content.toString());
    //       ch1.ack(msg);
    //     } else {
    //       console.log("Consumer cancelled by server");
    //     }
    //   });


  } catch (err) {
    console.log("raabit mq sender error : ", err);
  }
};


module.exports = {
  chatMessageSenderProducer,
};
