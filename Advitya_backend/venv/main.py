import os
import uvicorn
from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["advitya"]
teams_collection = db["teams"]
riddles_collection = db["riddles"]
keys_collection = db["keys"]

@app.get("/")
def read_root():
    return {"message": "FastAPI backend connected with MongoDB"}

# Ensure FastAPI starts on correct port for Railway
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
