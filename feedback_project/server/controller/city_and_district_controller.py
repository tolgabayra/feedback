from flask import Blueprint, jsonify, request
from service.city_and_district_service import CityAndDistrictService
city_and_district_controller = Blueprint("city_and_district_controller", __name__)


@city_and_district_controller.route("/", methods=["GET"])
def list_city():
    cities = CityAndDistrictService.list_city()
    print(cities)
    return jsonify({"cities":  cities}), 200


@city_and_district_controller.route("/<int:city_id>", methods=["GET"])
def list_district_by_city_id(city_id):
    districts = CityAndDistrictService.list_districts_by_city(city_id)
    return jsonify({"districts": districts}), 200

