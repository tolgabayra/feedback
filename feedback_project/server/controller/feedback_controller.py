from flask import Blueprint, jsonify, request
from service.feedback_service import FeedbackService


feedback_controller = Blueprint("feedback_controller", __name__)

@feedback_controller.route("/", methods=["POST"])
def create_feedback():
    data = request.get_json()
    if data is None:
        return jsonify({"Data is not valid"}), 400
    
    FeedbackService.create(data)
    return jsonify({"Message": "Feedback sended."}), 200