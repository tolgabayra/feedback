from model import Feedback
from model import db


class FeedbackService:

    @staticmethod
    def create(data):
        feedback = Feedback(
            content=data["content"],
            business_id=data["business_id"],
            feedback_type_id=data["feedback_type_id"]
        )
        db.session.add(feedback)
        db.session.commit()

        return feedback
    
    @staticmethod
    def list(business_id):
        feedbacks = Feedback.query.filter_by(business_id=business_id)
        feedback_list = []
        for feedback in feedbacks:
            feedback_list.append({
                "id": feedback.id,
                "content": feedback.content,
                "created_at": feedback.created_at,
                "feedback_type_id": feedback.feedback_type_id,
                "feedback_type_name": feedback.feedback_type.name
            })
        return feedback_list
    
    @staticmethod
    def delete(id):
        feedback = Feedback.query.get(id)
        if feedback:
            db.session.delete(feedback)
            db.session.commit()
            return True
        else:
            return False