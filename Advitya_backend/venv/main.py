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
client = MongoClient("mongodb+srv://tusharagarwal2022:kYosBraTqEunyAXb@cluster0.kgsmhop.mongodb.net/advitya?retryWrites=true&w=majority")
db = client["advitya"]
teams_collection = db["teams"]
riddles_collection = db["riddles"]
keys_collection = db["keys"]

@app.get("/")
def read_root():
    return {"message": "FastAPI backend connected with MongoDB"}
