from model import BusinessType
from model import db


class BusinessService:

    @staticmethod
    def list_business_type():
       cities = BusinessType.query.all()
       print(cities)
       return [city.to_dict() for city in cities]
    