import random
import psycopg2

# PostgreSQL veritabanına bağlanma
conn = psycopg2.connect(host="localhost", user="root", password="root")

# Cursor oluşturma
cursor = conn.cursor()

# Geri bildirim türleri
feedback_types = [1, 2, 3, 4]

# Rasgele geri bildirim oluşturma
for _ in range(100):
    content = "Rasgele bir yorum"  # Burayı istediğiniz gibi özelleştirebilirsiniz
    feedback_type_id = random.choice(feedback_types)

    # Geri bildirimi veritabanına ekleme
    cursor.execute(
        "INSERT INTO feedbacks (content, created_at, business_id, feedback_type_id) "
        "VALUES (%s, NOW(), 0, %s)",
        (content, feedback_type_id),
    )

# Değişiklikleri kaydetme
conn.commit()

# Bağlantıyı kapatma
cursor.close()
conn.close()

print("Geri bildirimler başarıyla oluşturuldu.")
