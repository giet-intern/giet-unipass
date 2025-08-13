import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

try:
    client = MongoClient(os.getenv("MONGO_URI"))
    client.admin.command("ping")
    print("MongoDB connection successful")
except Exception as e:
    print("MongoDB connection failed:", e)

db = client["hallticket_db"]
students_collection = db["students"]
