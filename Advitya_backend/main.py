from fastapi import FastAPI
from routes.auth import router as auth_router
from routes.game import router as game_router
from fastapi.middleware.cors import CORSMiddleware
from routes.game import router as game_router 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(game_router)

@app.get("/")
def root():
    return {"message": "FastAPI backend is running"}

# Include routes
app.include_router(game_router, prefix="/game", tags=["Game"])  