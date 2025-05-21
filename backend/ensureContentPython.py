import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Conexión a MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_default_database()
collection = db["portfoliocontents"]

initial_data = {
    "professionSummary": "Desarrollo experiencias web modernas animadas y con un diseño centrado en el impacto visual y la usabilidad.",
    "aboutParagraph1": "Soy un desarrollador web full stack enfocado en construir interfaces intuitivas y visualmente impactantes. Me apasiona la fusión entre diseño y tecnología, y disfruto creando experiencias digitales que marquen diferencia. Trabajo con React, Tailwind, animaciones avanzadas y me gusta cuidar cada detalle visual.",
    "aboutParagraph2": "Además, me involucro en cada parte del proceso: desde la planificación visual hasta la implementación técnica. Siempre busco aprender nuevas herramientas y mejorar la experiencia del usuario, manteniéndome al día con las tendencias en diseño y desarrollo web.",
    "technologies": [],
    "projects": []
}

# Verifica si ya existe algún documento
existing = collection.find_one()
if existing:
    collection.update_one({"_id": existing["_id"]}, {"$set": initial_data})
    print("Contenido actualizado correctamente")
else:
    collection.insert_one(initial_data)
    print("Contenido inicial creado")

client.close()
