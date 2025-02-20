from pydantic import BaseModel

class Riddle(BaseModel):
    question: str
    answer: str

class QRKey(BaseModel):
    key: str
