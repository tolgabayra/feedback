from flask import Blueprint, jsonify, request
from service.feedback_service import FeedbackService
import jwt
import os

feedback_controller = Blueprint("feedback_controller", __name__)

@feedback_controller.route("/", methods=["POST"])
def create_feedback():
    data = request.get_json()
    if data is None:
        return jsonify({"Data is not valid"}), 400
    
    FeedbackService.create(data)
    return jsonify({"Message": "Feedback sended."}), 200


@feedback_controller.route("/<int:id>", methods=["DELETE"])
def delete_feedback(id):
    result = FeedbackService.delete(id)
    if result:
        return jsonify({"Message": "Feedback deleted."}), 200
    else:
        return jsonify({"Message": "Feedback not found"}), 404
    

@feedback_controller.route("/", methods=["GET"])
def list_feedback():
    auth_header = request.cookies.get('access_token')
    decoded_token = jwt.decode(auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
    id = decoded_token["some"]["business_id"]
    feedbacks = FeedbackService.list(business_id=id)
    return jsonify({"Feedbacks":  feedbacks}), 200



@feedback_controller.route("/count", methods=["GET"])
def feedback_count_list():
    count = FeedbackService.feedback_count()
    if count:
        return jsonify({"counts": count, "total": count["Total"]}), 200
    else:
        return jsonify({"Message": "Not found"}), 404
    

@feedback_controller.route("/count_with_date", methods=["GET"])
def feedback_count_date_list():
    count_result = FeedbackService.feedback_count_with_dates()
    return jsonify(count_result), 200
