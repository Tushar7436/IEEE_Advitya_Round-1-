from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import teams_collection
import datetime

router = APIRouter()

def get_current_time():
    return datetime.datetime.utcnow()

class TeamLogin(BaseModel):
    team_name: str

@router.post("/login")
def login(team: TeamLogin):
    team_data = teams_collection.find_one({"team_name": team.team_name})
    if not team_data:
        raise HTTPException(status_code=400, detail="Team not found")
    
    start_time = get_current_time()
    teams_collection.update_one(
        {"team_name": team.team_name},
        {"$set": {"start_time": start_time}}
    )
    
    return {"success": True, "message": "Game started!"}
