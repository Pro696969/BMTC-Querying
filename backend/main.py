from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlite3

import mysql.connector

cnx = mysql.connector.connect(host="127.0.0.1", port=3306, user="root", database="bmtc")
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
    emailid: str
    bdate: str


class Login_user(BaseModel):
    inputUsername: str
    password: str


bus_routes = json.load(open("bus_routes.json"))


@app.post("/login")
def login_user(creds: Login_user) -> JSONResponse:
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """SELECT username, emailid, bdate
        FROM users WHERE username = ? AND password = ?""",
        (creds.inputUsername, creds.password),
    )
    user = cursor.fetchone()
    conn.close()
    if user:
        return JSONResponse(
            {
                "logged": "1",
                "message": "Authenticated!",
                "emailid": user[2],
            }
        )
    else:
        return JSONResponse(
            {"logged": "0", "message": "Wrong Username or Password"}, status_code=401
        )


@app.post("/signup")
def signin_user(creds: User) -> JSONResponse:
    cursor = cnx.cursor()
    cursor.execute(
        "INSERT INTO USERS VALUES (%s, %s, %s, %s)",
        (creds.inputUsername, creds.password, creds.emailid, creds.bdate),
    )
    cnx.commit()
    return JSONResponse({"signed": "1", "message": "Successfully registered"})


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    cursor = cnx.cursor()
    match category:
        case "Route No":
            return JSONResponse(bus_routes)
            pass
        case "Initial":
            pass
        case "Final":
            pass
