from flask import Blueprint, jsonify, request
from service.feedback_page_service import FeedbackPageService
from decorators.jwt_required import jwt_required
from model import BusinessFeedbackPage
import jwt
import os

feedback_page_controller = Blueprint("feedback_page_controller", __name__)


@feedback_page_controller.route("/", methods=["POST"])
@jwt_required
def generate_feedback_page():
    auth_header = request.cookies.get("access_token")
    decoded_token = jwt.decode(
        auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"]
    )
    id = decoded_token["some"]["business_id"]

    if not BusinessFeedbackPage.can_create_feeback_page(id):
        return ({"Message": "You can not create page anymore"}), 400

    FeedbackPageService.create(id)
    return jsonify({"Message": "Created"}), 201


@feedback_page_controller.route("/<int:id>", methods=["DELETE"])
@jwt_required
def delete_feedback_page(id):
    try:
        FeedbackPageService.delete(id)
        return jsonify({"Message": "Deleted!"})
    except:
        return jsonify({"Message": "Error"}), 500


@feedback_page_controller.route("/", methods=["GET"])
@jwt_required
def list_feedbacks():
    auth_header = request.cookies.get("access_token")
    try:
        decoded_token = jwt.decode(
            auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"]
        )
        business_id = decoded_token["some"]["business_id"]
        feedback_list = FeedbackPageService.list(business_id)
        return jsonify({"Feedbacks": feedback_list}), 200
    except:
        return jsonify({"Message": "Token has expired"}), 401


@feedback_page_controller.route("/<string:url_token>", methods=["GET"])
def show_feedback(url_token: str):
    feedback = FeedbackPageService.show(url_token)
    if feedback:
        return jsonify({"Feedback": feedback}), 200
    if feedback == False:
        return jsonify({"Message": "Invalid Url"}), 400
    else:
        return jsonify({"Message": "Feedback not found"}), 404


@feedback_page_controller.route("/list_types", methods=["GET"])
def list_feedbacktypes():
    type_list = FeedbackPageService.list_types()
    return jsonify({"type_list": type_list})
