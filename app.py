import redis
import time
import random
import math

r = redis.Redis(host='localhost', port=6379, db=0)


while True:
    ts = time.time()
    ms = math.modf(ts)[0]
    delay = 1 - ms;

    r.xadd( 'random100', { 'ts': time.time(), 'v': random.randint(1,10) }, maxlen = 10)
    print(time.time())
    time.sleep(delay)
