from flask import Flask
from flask_cors import CORS
from model import db
from controller.business_auth_controller import business_auth_controller
from controller.city_and_district_controller import city_and_district_controller
from controller.business_controller import business_controller
from controller.feedback_page_controller import feedback_page_controller
from controller.feedback_controller import feedback_controller
from config import RabbitMqConfig

app = Flask(__name__, static_folder="uploads")
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://root:root@localhost/postgres"
app.config["UPLOAD_FOLDER"] = "uploads"
app.config.from_object(RabbitMqConfig)

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)
app.register_blueprint(business_auth_controller, url_prefix="/api/v1/auth")
app.register_blueprint(city_and_district_controller, url_prefix="/api/v1/city_district")
app.register_blueprint(business_controller, url_prefix="/api/v1/businesses")
app.register_blueprint(feedback_page_controller, url_prefix="/api/v1/feedback_pages")
app.register_blueprint(feedback_controller, url_prefix="/api/v1/feedbacks")


if __name__ == "__main__":
    app.run(port=5000)
