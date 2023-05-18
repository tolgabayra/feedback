from flask import Blueprint, jsonify, request
from service.business_service import BusinessService
from decorators.request_logger import log_request


business_controller = Blueprint("business_controller", __name__)


@business_controller.route("/", methods=["GET"])
@log_request
def list_businesses():
    businesses = BusinessService.list_business_type()
    return jsonify({"BusinesessTypes": businesses}), 200
