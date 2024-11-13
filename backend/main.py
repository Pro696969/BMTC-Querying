import os
from contextlib import closing
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


@app.post("/login")
def login_user(creds: Login_user) -> JSONResponse:
    with closing(cnx.cursor()) as cursor:
        cursor.execute(
            "SELECT username, emailid "
            "FROM users WHERE username = %s AND password = %s",
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
    with closing(cnx.cursor()) as cursor:
        cursor.execute(
            "INSERT INTO users (username, password, emailid, bdate) VALUES (%s, %s, %s, %s)",
            (creds.inputUsername, creds.password, creds.emailid, creds.bdate),
        )
        cnx.commit()

    return JSONResponse({"signed": "1", "message": "Successfully registered"})


@app.get("/profile")
def age(username: str) -> JSONResponse:
    with closing(cnx.cursor(dictionary=True)) as cursor:
        cursor.execute(
            "SELECT age_calc(bdate) as age " f'FROM users WHERE username = "{username}"'
        )
        result = cursor.fetchone()

        cursor.execute(
            "SELECT route_id, route_no, origin, destination "
            "FROM routes WHERE starred=1"
        )
        fav_routes = cursor.fetchmany(4)

    return JSONResponse({"age": result["age"], "favourites": fav_routes})


@app.delete("/profile")
def delete_user(username: str) -> JSONResponse:
    with closing(cnx.cursor()) as cursor:
        cursor.execute(f'DELETE FROM users WHERE username = "{username}"')
        cnx.commit()
    return JSONResponse({"message": f"User '{username}' deleted successfully"})


@app.get("/route/{category}/{query}")
def get_route(category: str, query: str) -> JSONResponse:
    def serialize_row(row):
        row["time"] = row["time"].total_seconds()
        return row

    with closing(cnx.cursor(dictionary=True)) as cursor:

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
    with closing(cnx.cursor(dictionary=True)) as cursor:
        cursor.execute(
            "UPDATE routes "
            f"SET starred = (SELECT NOT starred FROM (SELECT starred FROM routes WHERE route_id = {route_id}) AS temp) "
            f"WHERE route_id = {route_id}"
        )
        cnx.commit()
    return JSONResponse({"success": True})
