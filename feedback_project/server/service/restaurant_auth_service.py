from model import Restaurant
from util.helper import Helper
from typing import Optional, Dict, Any
from werkzeug.security import generate_password_hash
from model import db


class RestaurantAuthService:

    @staticmethod
    def login(email: str, password: str) -> dict[str, Any] | None:
        restaurant = Restaurant.query.filter_by(email=email).first()
        if restaurant is None or not restaurant.check_password(password):
            return None
        access_token = Helper.generate_access_token({"restaurant_id": restaurant.id, "email": restaurant.email})
        refresh_token = Helper.generate_refresh_token({"restaurant_id": restaurant.id, "email": restaurant.email})
        restaurant_id = restaurant.id
        return {"access_token": access_token,"refresh_token": refresh_token, "restaurant_id": restaurant_id}
    
    @staticmethod
    def register(name, address, email, password, district_id, city_id):
        hashed_password = generate_password_hash(password)
        restaurant = Restaurant(name=name, address=address, email=email, password = hashed_password, district_id=district_id, province_id=city_id)
        db.session.add(restaurant)
        db.session.commit()
        return restaurant