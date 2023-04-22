from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash

db = SQLAlchemy()


class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    address = db.Column(db.String(100))
    province_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    district_id = db.Column(db.Integer, db.ForeignKey('districts.id'))
    activate = db.Column(db.Boolean, default=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    feedbacks = db.relationship('Feedback', backref='restaurant_feedbacks', lazy=True)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def check_password(self, password):
        return check_password_hash(self.password, password)
    

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'province': self.province,
            'activate': self.activate,
            'district': self.district,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }




class FeedbackCategory(db.Model):
    __tablename__ = 'feedback_categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }



class Feedback(db.Model):
    __tablename__ = 'feedbacks'
    id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(50))
    content = db.Column(db.String(200))
    is_proved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    category_id = db.Column(db.Integer, db.ForeignKey('feedback_categories.id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'))
    category = db.relationship('FeedbackCategory', backref='feedbacks')
    restaurant = db.relationship('Restaurant', backref='restaurant_feedbacks')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_name': self.customer_name,
            'content': self.content,
            'is_proved': self.is_proved,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'category_id': self.category_id,
            'restaurant_id': self.restaurant_id
        }
    


class City(db.Model):
    __tablename__ = 'cities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    districts = db.relationship('District', backref='city', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class District(db.Model):
    __tablename__ = 'districts'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=False)
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'city_id': self.city_id
        }
