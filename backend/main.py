import os
from datetime import timedelta
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import mysql.connector
from dotenv import load_dotenv

load_dotenv()
extras = {} if (password := os.getenv("mysql_pass")) is None else {"password": password}
cnx = mysql.connector.connect(
    host="127.0.0.1", port=3306, user="root", database="bmtc", **extras
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


@app.get("/profile")
def age() -> JSONResponse:
    cursor = cnx.cursor()
    cursor.execute("SELECT age_calc(bdate) as age from USERS;")
    age = cursor.fetchone()
    return JSONResponse({"age": age[0]})


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    cursor = cnx.cursor()

    def serialize_row(row):
        ans = {}
        for description, entry in zip(cursor.description, row):
            if isinstance(entry, timedelta):
                entry = entry.total_seconds()
            ans[description[0]] = entry
        return ans

    def exe_query_for(what: str):
        cursor.execute(f'SELECT route_no, distance, origin, destination, time FROM routes WHERE {what} LIKE "%{query}%"')

    match category:
        case "Route No":
            exe_query_for("route_no")
        case "Origin":
            exe_query_for("origin")
        case "Destination":
            exe_query_for("destination")
        case "-":
            return JSONResponse([])

    return JSONResponse(list(serialize_row(row) for row in cursor))
