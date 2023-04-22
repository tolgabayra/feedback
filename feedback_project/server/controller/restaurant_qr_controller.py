from flask import Blueprint, jsonify, request
from service.restaurant_qr_service import RestaurantQrService
from model import Restaurant
from util.helper import Helper
from decorators.jwt_required import jwt_required
from io import BytesIO
import qrcode
from flask import send_file

restaurant_qr_controller = Blueprint("restaurant_qr_controller", __name__)


@restaurant_qr_controller.route("/<int:id>", methods=["POST"])
def generate_qr_code(id):
    # Restoranı veritabanından getirin
    restaurant = Restaurant.query.filter_by(id=id).first()
    if not restaurant:
        return 'Restoran bulunamadı', 404
    
    # QR kodunu oluşturun
    data = f'https://example.com/restaurants/{id}'
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Görüntüyü bir BytesIO objesine kaydedin
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    
    # Görüntüyü bir HTTP yanıtı olarak döndürün
    return send_file(img_io, mimetype='image/png')
