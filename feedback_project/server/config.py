import os


class Config:
    DEBUG = True


class DevelopmentConfig(Config):
    pass


class RabbitMqConfig:
    RABBITMQ_HOST = os.getenv("RABBITMQ_HOST")
    RABBITMQ_PORT = os.getenv("RABBITMQ_PORT")
    RABBITMQ_USERNAME = os.getenv("RABBITMQ_USERNAME")
    RABBITMQ_PASSWORD = os.getenv("RABBITMQ_PASSWORD")
    RABBITMQ_QUEUE = "feedback_notifications"


class ProductionConfig:
    server_port = 0
    server_url = ""
