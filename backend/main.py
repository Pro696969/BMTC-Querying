import os
from datetime import timedelta
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
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


class UserName(BaseModel):
    username: str


@app.post("/login")
def login_user(creds: Login_user) -> JSONResponse:
    cursor = cnx.cursor()
    print("executingg")
    cursor.execute(
        """SELECT username, emailid
        FROM users WHERE username = %s AND password = %s""",
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
        "INSERT INTO users (username, password, emailid, bdate) VALUES (%s, %s, %s, %s)",
        (creds.inputUsername, creds.password, creds.emailid, creds.bdate),
    )
    cnx.commit()
    return JSONResponse({"signed": "1", "message": "Successfully registered"})


@app.get("/profile")
def age(username: str) -> JSONResponse:
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(
        f'SELECT age_calc(bdate) as age FROM users WHERE username = "{username}"'
    )
    output = cursor.fetchone()
    return JSONResponse({"age": output["age"]})


@app.delete("/profile")
def delete_user(username: str) -> JSONResponse:
    cursor = cnx.cursor()
    cursor.execute(f'DELETE FROM users WHERE username = "{username}"')
    cnx.commit()

    return JSONResponse({"message": f"User '{username}' deleted successfully"})


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    cursor = cnx.cursor(dictionary=True)

    def serialize_row(row):
        row["time"] = row["time"].total_seconds()
        return row

    def exe_query_for(what: str):
        cursor.execute(f'SELECT * FROM routes WHERE {what} LIKE "%{query}%"')

    match category:
        case "Route No":
            exe_query_for("route_no")
        case "Origin":
            exe_query_for("origin")
        case "Destination":
            exe_query_for("destination")
        case "-":
            return JSONResponse([])

    return JSONResponse(list(map(serialize_row, cursor.fetchall())))


@app.get("/star/{route_id}")
def star_route(route_id: int) -> JSONResponse:
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(
        "UPDATE routes "
        f"SET starred = (SELECT NOT starred FROM (SELECT starred FROM routes WHERE route_id = {route_id}) AS temp) "
        f"WHERE route_id = {route_id}"
    )
    cnx.commit()
    return JSONResponse({"success": True})
