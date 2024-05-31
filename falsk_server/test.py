import base64
import pymysql
def file_to_base64(file_path):
    with open(file_path, 'rb') as f:
        file_data = f.read()
        return base64.b64encode(file_data)

file_path = 'uploads/tmp_f600a54d0698ea07fd01d426191e753f4d2423ce7860f70a.jpg'
result = file_to_base64(file_path)

# print(result[:6])
# print(type(result))

# print(str(result)[2:-1])
db = pymysql.connect(
    host='localhost',
    port=3306       ,
    user='root'     ,
    password='Liumucer123' ,
    database='dac'
)

cursor = db.cursor()
sql = "insert into imagedata(user_id , imagedata) values ({},'{}');".format(1,str(result)[2:-1])
cursor.execute(
    # 'select * from imagedata'
    # 'insert into imagedata (user_id, imagedata) values(1,)'
    sql
)
db.commit()
cursor.close()

db.close()
