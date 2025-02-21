from fastapi import FastAPI, HTTPException, APIRouter
from pymongo import MongoClient
from pydantic import BaseModel
import os
import datetime
import random
from bson import ObjectId

app = FastAPI()
router = APIRouter()


# MongoDB Connection
MONGO_URI = os.getenv("MONGO_URI", "your_mongodb_connection_string_here")
client = MongoClient(MONGO_URI)
db = client["advitya"]
teams_collection = db["teams"]
riddles_collection = db["riddles"]

class TeamStart(BaseModel):
    team_name: str

@router.post("/start-game")
def start_game(data: TeamStart):
    first_riddle = riddles_collection.find_one({})
    if not first_riddle:
        raise HTTPException(status_code=404, detail="No riddles available")

    team_data = {
        "team_name": data.team_name,
        "current_riddle_id": str(first_riddle["_id"]),
        "completed": False,
        "score": 0,
        "riddle_count": 1
    }
    
    teams_collection.insert_one(team_data)
    
    return {
        "team_name": data.team_name,
        "riddle_id": str(first_riddle["_id"]),
        "question": first_riddle["question"]
    }  

class AnswerSubmission(BaseModel):
    team_name: str
    riddle_id: str
    answer: str

@router.post("/submit-answer")
def submit_answer(data: AnswerSubmission):
    team = teams_collection.find_one({"team_name": data.team_name})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    riddle = riddles_collection.find_one({"_id": ObjectId(data.riddle_id)})
    if not riddle:
        raise HTTPException(status_code=404, detail="Riddle not found")

    is_correct = riddle["answer"].lower() == data.answer.lower()
    new_score = team["score"] + (10 if is_correct else 0)
    teams_collection.update_one({"team_name": data.team_name}, {"$set": {"score": new_score}})
    
    if team["riddle_count"] < 3:
        next_location = random.choice(["Library", "Sports Complex", "Cafeteria", "Main Gate", "Garden"])
        teams_collection.update_one({"team_name": data.team_name}, {"$inc": {"riddle_count": 1}})
        return {"correct": is_correct, "score": new_score, "next_location": next_location}
    else:
        teams_collection.update_one({"team_name": data.team_name}, {"$set": {"completed": True}})
        return {"correct": is_correct, "score": new_score, "redirect": "thank_you"}


MONGO_URI = os.getenv("MONGO_URI", "your_mongodb_connection_string_here")
client = MongoClient(MONGO_URI)
db = client["advitya"]
teams_collection = db["teams"]
riddles_collection = db["riddles"]

class QRScan(BaseModel):
    team_name: str
    riddle_id: str

@router.post("/unlock-next-riddle")
def unlock_next_riddle(data: QRScan):
    team = teams_collection.find_one({"team_name": data.team_name})
    if not team:
        raise HTTPException(status_code=404, detail="Team not found")

    next_riddle = riddles_collection.find_one({"_id": ObjectId(data.riddle_id)})
    if not next_riddle:
        raise HTTPException(status_code=404, detail="Invalid riddle ID")

    teams_collection.update_one({"team_name": data.team_name}, {"$set": {"current_riddle_id": ObjectId(data.riddle_id)}})

    return {"riddle_id": str(next_riddle["_id"]), "question": next_riddle["question"]}

@router.get("/scoreboard")
def get_scoreboard():
    teams = teams_collection.find({}, {"_id": 0, "team_name": 1, "score": 1}).sort("score", -1)
    return list(teams)