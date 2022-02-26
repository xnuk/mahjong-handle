FROM python:3.10-alpine
RUN apk add --no-cache git \
    && git clone https://github.com/MahjongRepository/phoenix-logs.git /phoenix-logs
WORKDIR /phoenix-logs
RUN pip install -r requirements.txt && pip install git+git://github.com/mthrok/tenhou-log-utils.git