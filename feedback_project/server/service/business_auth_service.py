from model import Business
from util.helper import Helper
from typing import Optional, Dict, Any
from werkzeug.security import generate_password_hash
from model import db


class BusinessAuthService:

    @staticmethod
    def login(email: str, password: str) -> dict[str, Any] | None:
        business = Business.query.filter_by(email=email).first()
        if business is None or not business.check_password(password):
            return None
        access_token = Helper.generate_access_token({"business_id": business.id, "email": business.email})
        refresh_token = Helper.generate_refresh_token({"business_id": business.id, "email": business.email})
        return {"access_token": access_token,"refresh_token": refresh_token, "active": business.activate}
    
    @staticmethod
    def register(name, address, email, password, district_id, city_id, business_type_id):
        hashed_password = generate_password_hash(password)
        business = Business(name=name, address=address, email=email, password = hashed_password, district_id=district_id, province_id=city_id, business_type_id=business_type_id)
        db.session.add(business)
        db.session.commit()
        return business