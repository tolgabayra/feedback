from model import BusinessFeedbackPage
from model import FeedbackType
from model import db
from datetime import datetime, timedelta
import uuid

class FeedbackPageService:

    @staticmethod
    def create(id):
        url_token = str(uuid.uuid4())
        expire_time = datetime.utcnow() + timedelta(days=30)

        feedback_page = BusinessFeedbackPage(
            url_token = url_token,
            expire_time = expire_time,
            business_id = id
        )
        db.session.add(feedback_page)
        db.session.commit()
        return feedback_page
    
    @staticmethod
    def delete(id):
        feedback_page = BusinessFeedbackPage.query.get(id)
        
        if feedback_page:
            db.session.delete(feedback_page)
            db.session.commit()
            return True
        else:
            return None
            
     
    @staticmethod
    def show(url_token):
        feedback_page = BusinessFeedbackPage.query.filter_by(url_token=url_token).first()
        if not feedback_page:
            return None
        # Check if the feedback page has expired
        if feedback_page.expire_time < datetime.utcnow():
            return False
        
        return feedback_page.to_dict()
    

    @staticmethod
    def list(business_id):
        feedback_pages = BusinessFeedbackPage.query.filter_by(business_id=business_id).all()
        valid_feedback_pages = []
        for feedback_page in feedback_pages:
            valid_feedback_pages.append(feedback_page.to_dict())
        return valid_feedback_pages
    

    @staticmethod
    def list_types():
        types = FeedbackType.query.all()
        types_list = []
        for type in types:
            types_list.append({
                "id": type.id,
                "name": type.name
            })
        return types_list