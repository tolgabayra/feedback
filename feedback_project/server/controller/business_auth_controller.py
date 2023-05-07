from flask import Blueprint, jsonify, request
from service.business_auth_service import BusinessAuthService
from util.helper import Helper
from decorators.jwt_required import jwt_required
import os
import jwt

business_auth_controller = Blueprint("business_auth_controller", __name__)


@business_auth_controller.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    data = BusinessAuthService.login(email, password)
    if data is None:
        return jsonify({"Message": "Invalid email or password"}), 401
    if data["active"] is False:
        return jsonify({"Message": "Your account has not been confirmed"}), 403
    response = jsonify({"access_token": data["access_token"], "refresh_token": data["refresh_token"]})
    response.set_cookie("access_token", data["access_token"], httponly=True)
    response.set_cookie("refresh_token", data["refresh_token"], httponly=True)
    return response, 200


@business_auth_controller.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name = data["name"]
    address = data["address"]
    email = data["email"]
    password = data["password"]
    district_id = data["district_id"]
    city_id = data["province_id"]
    business_type_id = data["business_type_id"]


    if not all([name, address, email, password, district_id, city_id, business_type_id]):
        return jsonify({"Message": "Parameters is not correct"}), 400
    
    BusinessAuthService.register(name, address, email, password, district_id, city_id, business_type_id)
    return jsonify({"Message": "Your restaurant account created is succesfull"}), 201


@business_auth_controller.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"Message": "You are logged out"})
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return response, 200



@business_auth_controller.route("/verify", methods=["POST"])
@jwt_required
def get_information():
    auth_header = request.cookies.get('access_token')
    if auth_header:
        decoded_token = jwt.decode(auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
        return jsonify({"Message": "Okey", "Email": decoded_token["some"]["email"]}), 200
    


@business_auth_controller.route("/refresh_token", methods=["POST"])
def refresh_token():
    refresh_token = request.cookies.get('refresh_token')
    if not refresh_token:
        return jsonify({"message": "Refresh token not found"}), 400
    
    decoded_token = Helper.decode_token(refresh_token)
    print(decoded_token)

    new_access_token = Helper.generate_access_token(decoded_token)

    if not new_access_token:
        return jsonify({"message": "Invalid refresh token"}), 400

    response = jsonify({"access_token": new_access_token})
    response.set_cookie('access_token', new_access_token, httponly=True)

    return response, 200
