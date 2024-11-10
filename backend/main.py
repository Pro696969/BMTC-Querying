import os
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import mysql.connector
from dotenv import load_dotenv

load_dotenv()

if os.getenv("mysql_pass") is None:
    cnx = mysql.connector.connect(
        host="127.0.0.1", port=3306, user="root", database="bmtc"
    )

else:
    cnx = mysql.connector.connect(
        host="127.0.0.1",
        port=3306,
        user="root",
        database="bmtc",
        password=os.getenv("mysql_pass"),
    )

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

    cursor = cnx.cursor()
    cursor.execute(
        """SELECT username, emailid
        FROM USERS WHERE username = %s AND password = %s""",
        (creds.inputUsername, creds.password),
    )
    user = cursor.fetchone()
    if user:
        return JSONResponse(
            {
                "logged": "1",
                "message": "Authenticated!",
                "emailid": user[1],
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


@app.post("/profile")
def age() -> JSONResponse:
    cursor = cnx.cursor()
    # cursor.execute("SELECT * FROM USERS;")
    cursor.execute("SELECT username, age_calc(bdate) as age from USERS;")
    age = cursor.fetchone()
    print("hhiii")
    return JSONResponse({"data": age})


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
