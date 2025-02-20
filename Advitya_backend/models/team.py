from pydantic import BaseModel
from bson import ObjectId

class Team(BaseModel):
    team_name: str
    current_riddle_id: str  # Will store the Riddle's ObjectId as a string
    completed: bool = False
    score: int = 0
    riddle_count: int = 1
