from flask import Blueprint, jsonify, request
from service.feedback_page_service import FeedbackPageService
from decorators.jwt_required import jwt_required
import jwt
import os

feedback_page_controller = Blueprint("feedback_page_controller", __name__)


@feedback_page_controller.route("/", methods=["POST"])
@jwt_required
def generate_feedback_page():
    auth_header = request.cookies.get('access_token')
    decoded_token = jwt.decode(auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
    id = decoded_token["some"]["business_id"]
    FeedbackPageService.create(id)
    return jsonify({"Message": "Created"}), 201


@feedback_page_controller.route("/:id", methods=["POST"])
def delete_feedback_page(id):
    try:
        FeedbackPageService.delete(id)
        return jsonify({"Deleted!"})
    except:
        return jsonify({"Error"}), 500
        
