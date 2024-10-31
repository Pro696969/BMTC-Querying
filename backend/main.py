from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    username: str
    password: str

db = {
    "kk": "khushi",
    "hello": "world",
}


@app.post("/login")
def login_user(creds: User):
    return {creds.username: creds.password}
