from werkzeug.security import generate_password_hash


deneme = generate_password_hash("1234567890")
print(deneme)