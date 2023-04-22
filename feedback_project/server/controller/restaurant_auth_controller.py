from flask import Blueprint, jsonify, request
from service.restaurant_auth_service import RestaurantAuthService
from util.helper import Helper
from decorators.jwt_required import jwt_required


restaurant_auth_controller = Blueprint("restaurant_auth_controller", __name__)


@restaurant_auth_controller.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    data = RestaurantAuthService.login(email, password)
    if data is None:
        return jsonify({"Message": "Invalid email or password"})
    
    response = jsonify({"access_token": data["access_token"], "refresh_token": data["refresh_token"], "restaurant_id": data["restaurant_id"]})
    response.set_cookie("access_token", data["access_token"], httponly=True)
    response.set_cookie("refresh_token", data["refresh_token"], httponly=True)
    return response, 200


@restaurant_auth_controller.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data["name"]
    address = data["address"]
    email = data["email"]
    password = data["password"]
    district_id = data["district_id"]
    city_id = data["province_id"]

    if not all([name, address, email, password, district_id, city_id]):
        return jsonify({"Message": "Parameters is not correct"}), 400
    
    restaurant = RestaurantAuthService.register(name, address, email, password, district_id, city_id)
    return jsonify({"Message": "Your restaurant account created is succesfull"}), 201

@restaurant_auth_controller.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"Message": "You are logged out"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response, 200