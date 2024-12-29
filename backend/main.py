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
    with closing(cnx.cursor(dictionary=True, buffered=True)) as cursor:
        cursor.execute(
            f'SELECT age_calc(bdate) as age FROM users WHERE username = "{username}" LIMIT 1'
        )
        result = cursor.fetchone()

        cursor.execute(
            "SELECT r.route_id, r.route_no, r.origin, r.destination "
            "FROM users u "
            "JOIN user_starred_routes usr ON u.user_id = usr.user_id "
            "JOIN routes r ON r.route_id = usr.route_id "
            "ORDER BY u.username; "
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

@app.get("/star/{username}/{route_id}")
def star_route(username: str, route_id: int) -> JSONResponse:
    with closing(cnx.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT user_id FROM users WHERE username = %s", (username, ))
        user = cursor.fetchone()
        if not user:
            return JSONResponse({"success": False, "message": "User not found"}, status_code=404)
        user_id = user["user_id"]
        
        cursor.execute(
            "SELECT 1 FROM user_starred_routes WHERE user_id = %s AND route_id = %s",
            (user_id, route_id),
        )
        is_starred = cursor.fetchone()
        
        if is_starred:
            cursor.execute("DELETE FROM user_starred_routes WHERE user_id = %s AND route_id = %s",
                (user_id, route_id),
            )
            action = "removed"
        else:
            cursor.execute(
                "INSERT INTO user_starred_routes (user_id, route_id) VALUES (%s, %s)",
                (user_id, route_id),
            )
            action = "added"

        cnx.commit()
    return JSONResponse({"success": True, "action": action})

@app.get("/starred/{username}")
def get_starred_routes(username: str) -> JSONResponse:
    with closing(cnx.cursor(dictionary=True)) as cursor:
        cursor.execute("SELECT user_id FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        if not user:
            return JSONResponse({"success": False, "message": "User not found"}, status_code=404)

        user_id = user["user_id"]

        cursor.execute(
            "SELECT r.route_id, r.route_no, r.origin, r.destination, r.distance, r.time "
            "FROM routes r "
            "JOIN user_starred_routes usr ON r.route_id = usr.route_id "
            "WHERE usr.user_id = %s",
            (user_id,),
        )
        starred_routes = cursor.fetchall()

    return JSONResponse({"success": True, "starred_routes": starred_routes})
