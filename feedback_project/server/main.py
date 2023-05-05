from flask import Flask
from flask_cors import CORS
from model import db
from controller.restaurant_auth_controller import restaurant_auth_controller
from controller.city_and_district_controller import city_and_district_controller

app = Flask(__name__, static_folder="uploads")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost/postgres'
app.config['UPLOAD_FOLDER'] = 'uploads'

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)
app.register_blueprint(restaurant_auth_controller, url_prefix="/api/v1/auth")
app.register_blueprint(city_and_district_controller, url_prefix="/api/v1/city_district")


if __name__ == '__main__':
    app.run(port=5000)
