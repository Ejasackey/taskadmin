#!/bin/sh
setsid darkhttpd /home/taskadmin --port 8080 --log /tmp/darkhttpd.log < /dev/null > /dev/null 2>&1 &
echo "darkhttpd running on http://localhost:8080"
