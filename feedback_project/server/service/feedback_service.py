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
