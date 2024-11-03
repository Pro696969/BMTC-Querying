from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class User(BaseModel):
    inputUsername: str
    password: str

db = {
    "kk": "khushi",
    "hello": "world",
}

bus_routes = json.load(open("bus_routes.json"))

@app.post("/login")
def login_user(creds: User) -> JSONResponse:
    if creds.inputUsername in db and db[creds.inputUsername] == creds.password:
        print("authed")
        return JSONResponse({"logged": "1", "message": "Authenticated!"})
    return JSONResponse({"logged": "0", "message": "Wrong Username or Password"}, status_code=401)

@app.post("/signin")
def signin_user(creds: User) -> JSONResponse:
    db[creds.username] = creds.password
    return JSONResponse({"message": "Successfully registered"})


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    return JSONResponse(bus_routes)
