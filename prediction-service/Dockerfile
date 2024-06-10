FROM python:3.9-slim

WORKDIR /usr/src/app

# Install netcat-openbsd for wait-for-it script
RUN apt-get update && apt-get install -y netcat-openbsd

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY wait-for-it.sh /usr/src/app/
RUN chmod +x /usr/src/app/wait-for-it.sh

CMD ["./wait-for-it.sh", "rabbitmq", "5672", "--", "python", "prediction.py"]
