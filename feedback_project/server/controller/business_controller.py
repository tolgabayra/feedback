from flask import Blueprint, jsonify, request
from service.business_service import BusinessService

business_controller = Blueprint("business_controller", __name__)


@business_controller.route("/", methods=["GET"])
def list_businesses():
    businesses = BusinessService.list_business_type()
    return jsonify({"BusinesessTypes":  businesses}), 200



