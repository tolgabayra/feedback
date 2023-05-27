import pika


class RabbitMQ:
    def __init__(self, host, port, username, password):
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host=host,
                port=port,
                credentials=pika.PlainCredentials(username, password),
            )
        )
        self.channel = self.connection.channel()

    def create_queue(self, queue_name):
        self.channel.queue_declare(queue=queue_name)

    def publish_message(self, exchange, routing_key, message):
        self.channel.basic_publish(
            exchange=exchange, routing_key=routing_key, body=message
        )

    def consume_messages(self, queue_name, callback):
        self.channel.basic_consume(
            queue=queue_name, on_message_callback=callback, auto_ack=True
        )
        self.channel.start_consuming()
