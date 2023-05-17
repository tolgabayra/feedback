

class Config:
    DEBUG=False


class DevelopmentConfig(Config):
    pass

class ProductionConfig(Config):
    server_port=0
    server_url=""
    