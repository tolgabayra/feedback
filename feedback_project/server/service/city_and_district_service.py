from model import City, District
from model import db


class CityAndDistrictService:
    @staticmethod
    def list_city():
        cities = City.query.all()
        print(cities)
        return [city.to_dict() for city in cities]

    @staticmethod
    def list_districts_by_city(city_id):
        city = City.query.filter_by(id=city_id).first()
        if not city:
            return None
        return [district.to_dict() for district in city.districts]
