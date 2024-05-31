import base64
from PIL import Image
from io import BytesIO
import pymysql

db = pymysql.connect(
    host='localhost',
    port=3306       ,
    user='root'     ,
    password='Liumucer123' ,
    database='dac'
)

cursor = db.cursor()
sql =  sql = "select imagedata from imagedata  where id = 3"
cursor.execute(
    # 'select * from imagedata'
    # 'insert into imagedata (user_id, imagedata) values(1,)'
    sql
)
# print(cursor.fetchall())
base64_str =str(cursor.fetchall()[0][0])
cursor.close()

db.close()
#
print(base64_str)
# 解码Base64字符串为二进制数据
# binary_data = base64.b64decode(base64_str)
#
# # 从字节流中加载图像
# image = Image.open(BytesIO(binary_data))
#
# # 保存图像到本地文件
# image.save("output.jpg")


# import base64
# with open('uploads/tmp_f600a54d0698ea07fd01d426191e753f4d2423ce7860f70a.jpg','rb') as f:
#     image_base64 = base64.b64encode(f.read())
#
# # print(image_base64)
# print(image_base64==base64_str)
#
binary_data = base64.b64decode(base64_str[2:-1])
# [2:-1] is re ,so we can get the data {} in b'{}'
# 从字节流中加载图像
image = Image.open(BytesIO(binary_data))

# 保存图像到本地文件
image.save("output.jpg")