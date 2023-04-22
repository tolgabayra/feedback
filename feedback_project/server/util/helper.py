import jwt
import hashlib
import os
import time


class Helper:
    @staticmethod
    def generate_access_token(payload):
        return jwt.encode(
            {"some": payload, "exp": int(time.time() + 3000)},
            os.getenv("JWT_SECRET_KEY"), algorithm="HS256")

    @staticmethod
    def generate_refresh_token(payload):
        return jwt.encode({"some": payload}, os.getenv("JWT_SECRET_KEY"), algorithm="HS256")

    @staticmethod
    def generate_hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def decode_token(access_token):
        try:
            decode_token = jwt.decode(access_token, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
            return decode_token.get("some")
        except:
            return None
        

    @staticmethod
    def generate_hash_with_qr(qr_code):
        return hashlib.sha256(qr_code.encode()).digest()