import redis
import time
import random
import math
import psycopg2

r = redis.Redis(host='localhost', port=6379, db=0)

conn = None
try:
    conn = psycopg2.connect("dbname='random' user='postgres' host='localhost' port='54320' password='my_password'")
except Exception as e:
    print(e)
    print("cannot connect to db")
# Open a cursor to perform database operations
cur = conn.cursor()
# Execute a query
while True:
    ts = time.time()
    ms = math.modf(ts)[0]
    delay = 1 - ms;

    value = random.randint(1,10)
    r.xadd( 'random', { 'ts': time.time(), 'v': value }, maxlen = 10)
    cur.execute("""INSERT INTO random(ts,value) values(%s, %s)""", (time.time(), value))

    # commit the changes to the database
    conn.commit()
    time.sleep(delay)
