from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["advitya"]

teams_collection = db["teams"]
riddles_collection = db["riddles"]
keys_collection = db["keys"]
