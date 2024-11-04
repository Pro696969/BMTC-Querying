from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import json
import sqlite3
from contextlib import asynccontextmanager


# @asynccontextmanager I DONT GET THIS 
# async def lifespan(app: FastAPI):
#     startup_db()
#     yield
# app = FastAPI(lifespan=lifespan)

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


# dummy db
# db = {
#     "kk": "khushi",
#     "hello": "world",
# }


def startup_db():

    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """CREATE TABLE IF NOT EXISTS USERS
        (loginid INTEGER PRIMARY KEY AUTOINCREMENT, 
        username TEXT UNIQUE, 
        password TEXT)"""
    )

    # cursor.execute("""SELECT COUNT(*) FROM USERS""")
    # if cursor.fetchone()[0] == 0:
    #     cursor.executemany(
    #         """INSERT INTO USERS (username, password) VALUES (?. ?)""",
    #         [("kk", "khushi"), ("hello", "world")],
    #     )
    conn.commit()
    conn.close()


# deprecated on_event WORKS!
@app.on_event("startup")
def on_startup():
    startup_db()


bus_routes = json.load(open("bus_routes.json"))


@app.post("/login")
def login_user(creds: User) -> JSONResponse:
    conn = sqlite3.connect("project.db")
    cursor = conn.cursor()

    cursor.execute(
        """SELECT * FROM USERS WHERE username = ? AND Password = ?""",
        (creds.inputUsername, creds.password),
    )
    user = cursor.fetchone()

    conn.close()
    if user:
        return JSONResponse({"logged": "1", "message": "Authenticated!"})
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
            "INSERT INTO USERS (username, password) VALUES (?, ?)",
            (creds.inputUsername, creds.password),
        )
        conn.commit()
        conn.close()
        return JSONResponse({"signed": "1", "message": "Successfully registered"})
    except sqlite3.IntegrityError:
        conn.close()
        return JSONResponse(
            {"signed": "0", "message": "username is already taken"}, status_code=401
        )


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    return JSONResponse(bus_routes)
