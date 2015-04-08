import json,httplib
connection = httplib.HTTPSConnection('api.parse.com', 443)
connection.connect()
connection.request('POST', '/1/functions/getDepart', json.dumps({
            "destAddress": "O'Hare Airport"
     }), {
       "X-Parse-Application-Id": "WFsSSvySr1S355oaYLShMo4V9UWthJBi6LVYYTNZ",
       "X-Parse-REST-API-Key": "8zgf1pPTxRUkk1qKido6C0xGzhSMIwsf3kPfo80t",
       "Content-Type": "application/json"
     })
result = json.loads(connection.getresponse().read())
print result