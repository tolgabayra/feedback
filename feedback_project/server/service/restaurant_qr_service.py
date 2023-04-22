from model import Restaurant
from util.helper import Helper
import qrcode
from io import BytesIO
from model import db


class RestaurantQrService:

    @staticmethod
    def generate_qr_code(data, id):
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        buffer.seek(0)

        restaurant = Restaurant.query.get(id)
        restaurant.qr_code = buffer.getvalue()
        db.session.commit()

        return buffer.getvalue()