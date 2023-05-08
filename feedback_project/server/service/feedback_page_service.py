from model import BusinessFeedbackPage
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
    def show(feedback_page_id):
        feedback_page = BusinessFeedbackPage.query.get(feedback_page_id)
        if not feedback_page:
            return None

        # Check if the feedback page has expired
        if feedback_page.expire_time < datetime.utcnow():
            return None
        
        return feedback_page
    

    @staticmethod
    def list(business_id):
        feedback_pages = BusinessFeedbackPage.query.filter_by(business_id=business_id).all()
        valid_feedback_pages = []
        for feedback_page in feedback_pages:
            if feedback_page.expire_time >= datetime.utcnow():
                valid_feedback_pages.append(feedback_page)
        return valid_feedback_pages