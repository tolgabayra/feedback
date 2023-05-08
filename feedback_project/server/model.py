from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash

db = SQLAlchemy()

""" İşletme ve işletme tipi """
class Business(db.Model):
    __tablename__ = 'businesses'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(500), nullable=False)
    website = db.Column(db.String(100))
    activate = db.Column(db.Boolean, default=False)
    province_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    district_id = db.Column(db.Integer, db.ForeignKey('districts.id'))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    business_type_id = db.Column(db.Integer, db.ForeignKey('business_types.id'), nullable=False)
    feedbacks = db.relationship('Feedback', backref='business_feedbacks', lazy=True)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'email': self.email,
            'activate': self.activate,
            'website': self.website,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'business_type': self.business_type.to_dict()
        }
    

class BusinessType(db.Model):
    __tablename__ = 'business_types'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    businesses = db.relationship('Business', backref='business_type', lazy=True)

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
    content = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    feedback_type_id = db.Column(db.Integer, db.ForeignKey('feedback_types.id'))
    business = db.relationship('Business', backref='business_feedbacks')
    feedback_type = db.relationship('FeedbackType', backref='feedback_type_feedbacks')
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'business_id': self.business_id,
            'feedback_type_id': self.feedback_type_id
        }


class FeedbackType(db.Model):
    __tablename__ = 'feedback_types'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    feedbacks = db.relationship('Feedback', backref='feedback_type_feedbacks', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


""" Şehir ilçe modelleri """

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
