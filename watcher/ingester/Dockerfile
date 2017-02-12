FROM python:2.7-alpine

WORKDIR /root
COPY Ingester.py /root/Ingester.py

RUN pip install flask
EXPOSE 5000

CMD ["python", "Ingester.py"]
