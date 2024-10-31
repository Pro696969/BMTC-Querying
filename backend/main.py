from fastapi import FastAPI
from fastapi.responses import JSONResponse
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
def login_user(creds: User) -> JSONResponse:
    if creds.username in db and db[creds.username] == creds.password:
        return JSONResponse({"message": "Authenticated!"})
    return JSONResponse({"message": "Wrong Username or Password"}, status_code=401)

@app.post("/signin")
def signin_user(creds: User) -> JSONResponse:
    db[creds.username] = creds.password
    return JSONResponse({"message": "Successfully registered"})
