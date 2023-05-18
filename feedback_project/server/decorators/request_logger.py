from flask import request
import os

LOG_DIR = 'log'  # Kayıtların kaydedileceği klasör

if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

def log_request(func):
    def wrapper(*args, **kwargs):
        log_file = os.path.join(LOG_DIR, 'request.log')
        with open(log_file, 'a') as file:
            file.write(f'Method: {request.method}\n')
            file.write(f'URL: {request.url}\n')
        return func(*args, **kwargs)

    return wrapper
