from model import Feedback
from model import db
from model import FeedbackType
from jsonschema import validate, ValidationError
from validation.feedback_validation import feedbackCreateSchema
import random

class FeedbackService:


    @staticmethod
    def generate_random_feedback():
        feedback_types = [1, 2, 3, 4]
        try:
            for _ in range(100):
                content = "Rasgele bir yorum"  # Burayı istediğiniz gibi özelleştirebilirsiniz
                feedback_type_id = random.choice(feedback_types)
            
                feedback = Feedback(business_id=1 ,content=content, feedback_type_id=feedback_type_id)
                db.session.add(feedback)
            db.session.commit() 
            return True
        except:
            return False

       


    @staticmethod
    def create(data):
        try:
            validate(data, feedbackCreateSchema)
        except ValidationError as e:
            raise ValueError(str(e))

        feedback = Feedback(
            content=data["content"],
            business_id=data["business_id"],
            feedback_type_id=data["feedback_type_id"],
        )
        db.session.add(feedback)
        db.session.commit()

        return feedback

    @staticmethod
    def list(business_id, offset=0, limit=None):
        query = Feedback.query.filter_by(business_id=business_id)

        if offset:
            query = query.offset(offset)

        if limit:
            query = query.limit(limit)

        feedbacks = query.all()

        feedback_list = []
        for feedback in feedbacks:
            feedback_list.append(
                {
                    "id": feedback.id,
                    "content": feedback.content,
                    "created_at": feedback.created_at,
                    "feedback_type_id": feedback.feedback_type_id,
                    "feedback_type_name": feedback.feedback_type.name,
                }
            )
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

    @staticmethod
    def feedback_count():
        total_count = Feedback.query.count()  # Tüm geri bildirimlerin sayısını hesapla
        feedback_types = FeedbackType.query.all()  # Tüm geri bildirim tiplerini al
        result = {
            "Total": total_count
        }  # Toplam geri bildirim sayısını "Total" anahtarında sakla
        for feedback_type in feedback_types:
            count = Feedback.query.filter_by(
                feedback_type_id=feedback_type.id
            ).count()  # Her tipteki geri bildirimlerin sayısını hesapla
            result[
                feedback_type.name
            ] = count  # Geri bildirim tipi adı ve sayısı sözlükte saklanacak
        return result

    @staticmethod
    def feedback_count_with_dates():
        total_count = Feedback.query.count()  # Tüm geri bildirimlerin sayısını hesapla
        feedback_types = FeedbackType.query.all()  # Tüm geri bildirim tiplerini al
        result = {
            "Total": total_count
        }  # Toplam geri bildirim sayısını "Total" anahtarında sakla
        for feedback_type in feedback_types:
            count = Feedback.query.filter_by(
                feedback_type_id=feedback_type.id
            ).count()  # Her tipteki geri bildirimlerin sayısını hesapla
            result[feedback_type.name] = {
                "Count": count,
                "Dates": [
                    feedback.created_at.strftime("%Y-%m-%d")
                    for feedback in Feedback.query.filter_by(
                        feedback_type_id=feedback_type.id
                    ).all()
                ],
            }  # Geri bildirim tipi adı ve sayısı sözlükte saklanacak, aynı zamanda oluşturma tarihlerini de listeye ekliyoruz
        return result
