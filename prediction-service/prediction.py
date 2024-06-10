import pika
import time

def callback(ch, method, properties, body):
    print(f"Received {body}")
    # Simulate a resource-intensive task
    time.sleep(10)
    print("Task completed")

    # Send a message back to Node service
    connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
    channel = connection.channel()
    channel.queue_declare(queue='node_queue')
    channel.basic_publish(exchange='', routing_key='node_queue', body='Task completed')
    connection.close()

# Function to connect to RabbitMQ
def connect_to_rabbitmq():
    while True:
        try:
            connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("Waiting for RabbitMQ to be ready...")
            time.sleep(5)

# Connect to RabbitMQ
connection = connect_to_rabbitmq()
channel = connection.channel()
channel.queue_declare(queue='python_queue')

channel.basic_consume(queue='python_queue', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
