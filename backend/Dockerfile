FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV MYSQL_HOST=db
ENV MYSQL_PORT=3306
ENV MYSQL_USER=fastapi_user
ENV MYSQL_PASSWORD=fastapi_password
ENV MYSQL_DB=bmtc

EXPOSE 8000

CMD [ "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

