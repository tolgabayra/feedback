from ...service.feedback_service import FeedbackService
from ...model import db, Feedback

def test_delete_feedback():
    feedback_service = FeedbackService()
    
    # Önceden bir geri bildirim ekleyelim
    feedback = Feedback(content="Test Feedback", business_id=1, feedback_type_id=1)
    db.session.add(feedback)
    db.session.commit()
    
    # Geri bildirimin ID'sini alalım
    feedback_id = feedback.id
    
    # Delete metodu çağrılsın
    result = feedback_service.delete(feedback_id)
    
    # Silme işleminin başarılı olduğunu doğrulayalım
    assert result == True
    
    # Silinen geri bildirimin veritabanında olmadığını doğrulayalım
    deleted_feedback = Feedback.query.get(feedback_id)
    assert deleted_feedback == None