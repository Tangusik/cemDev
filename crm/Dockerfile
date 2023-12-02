FROM python:3.12.0-alpine

RUN mkdir code
WORKDIR /code

ADD . /code/

RUN pip install --upgrade pip
RUN pip install -r requriments.txt
