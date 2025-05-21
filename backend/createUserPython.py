import os
import bcrypt
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Conexión a MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_default_database()
users = db["users"]

# Credenciales del usuario
email = "leo@example.com"
plain_password = "hola1234"
hashed_password = bcrypt.hashpw(plain_password.encode("utf-8"), bcrypt.gensalt())

# Buscar usuario existente
existing_user = users.find_one({"email": email})

if existing_user:
    users.update_one({"_id": existing_user["_id"]}, {"$set": {"password": hashed_password}})
    print("Contraseña actualizada para el usuario existente")
else:
    users.insert_one({"email": email, "password": hashed_password})
    print("Usuario nuevo creado correctamente")

client.close()
