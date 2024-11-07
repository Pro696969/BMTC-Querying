from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlite3
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(_app: FastAPI):
    startup_db()
    yield


app = FastAPI(lifespan=lifespan)

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
    busstart: str
    busstop: str
    bdate: str


class Login_user(BaseModel):
    inputUsername: str
    password: str


def startup_db():
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS USERS
        (loginid INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE, 
        password TEXT,
        emailid TEXT,
        busstart TEXT,
        busstop TEXT,
        bdate TEXT)
        """
    )

    cursor.execute(
        """
        CREATE VIEW IF NOT EXISTS user_age AS
        SELECT username, password, emailid, busstart, busstop, bdate,
        (strftime('%Y', 'now') - CAST(bdate AS INTEGER)) AS age
        FROM USERS
        """
    )

    conn.commit()
    conn.close()


bus_routes = json.load(open("bus_routes.json"))


@app.post("/login")
def login_user(creds: Login_user) -> JSONResponse:
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """SELECT username, emailid, busstart, busstop, bdate, age
        FROM user_age WHERE username = ? AND password = ?""",
        (creds.inputUsername, creds.password),
    )
    user = cursor.fetchone()
    print(user)
    # (2, 'Kiran', 'Kiran', 'kiran@gmail.com', 'Whitefield', 'KR Market')
    # bdate = user[6][:10]
    # print(bdate)
    conn.close()
    if user:
        return JSONResponse(
            {
                "logged": "1",
                "message": "Authenticated!",
                "emailid": user[1],
                "busstart": user[2],
                "busstop": user[3],
                "bdate": user[4][:10],
                "age": user[5],
            }
        )
    else:
        return JSONResponse(
            {"logged": "0", "message": "Wrong Username or Password"}, status_code=401
        )


@app.post("/signup")
def signin_user(creds: User) -> JSONResponse:
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO USERS (username, password, emailid, busstart, busstop, bdate) VALUES (?, ?, ?, ?, ?, ?)",
            (
                creds.inputUsername,
                creds.password,
                creds.emailid,
                creds.busstart,
                creds.busstop,
                creds.bdate,
            ),
        )
        conn.commit()
        conn.close()
        return JSONResponse({"signed": "1", "message": "Successfully registered"})
    except sqlite3.IntegrityError:
        conn.close()
        return JSONResponse(
            {"signed": "0", "message": "username is already taken"}, status_code=401
        )


@app.post("/profile")
def profile(creds: User) -> JSONResponse:
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()
    cursor.execute(
        """
                   SELECT username, emailid, busstart, busstop, bdate, age
                   FROM user_age
                   WHERE username = ?
                   """,
        (creds.inputUsername,),
    )
    user = cursor.fetchone()
    conn.commit()
    conn.close()
    if user:
        return JSONResponse(
            {
                # "username": user[0],
                # "emailid": user[1],
                # "busstart": user[2],
                # "busstop": user[3],
                # "bdate": user[4],
                "age": user[5],
            }
        )
    else:
        return JSONResponse(
            {"message": "User not found"}, status_code=404
        )


@app.get("/route/{category}/{query}")
def get_route(_category: str, _query: str) -> JSONResponse:
    return JSONResponse(bus_routes)
