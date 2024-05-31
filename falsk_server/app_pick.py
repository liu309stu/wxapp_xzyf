import base64
from PIL import Image
from io import BytesIO
import pymysql

# https://www.zhihu.com/question/497872396
# pymsql里面的数据库连接不是线程安全的
def image_load(a):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    db.connect()
    cur = db.cursor()
    sql = "select imagedata from imagedata where id = {}".format(a)
    # sql = "select imagedata from imagedata where id = 3"
    print(sql)
    cur.execute(sql)
    base64_str =str(cur.fetchall()[0][0])[2:-1]
    binary_data = base64.b64decode(base64_str)
    cur.close()
    db.close()
    # image = Image.open(BytesIO(binary_data))
    # image.save('upload/1.jpg')
    return binary_data

# a = imageload(3)
# print(a)

def LogIn(user_id,passwd):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    sql = "select * from user where user_id = '{}'".format(user_id)
    cur.execute(sql)
    cur_data =  cur.fetchone()
    cur.close()
    db.close()
    if(cur_data==None):
        return {'error' : '没有这个账号，请前往注册' ,'success' : ''}
    else:
        if cur_data[3]==passwd:
            result = {}
            list = ['id','name','user_id','passwd','signature','location','notes','imagehead','my_love_post','my_post']
            for i in range(0,10):
                result[list[i]] = cur_data[i]
            # s = list(cur_data)
            # result = {k:v for k,v in zip(list,s)}
            return {'success':result ,'error' :''}
        else:
            return {'error': '密码错误，请重新输入密码','success' : ''}


# 由于wx.uploadfile的局限性,故我们希望在wx.request()直接上传图片流(0b/base64)
def register(name,user_id,passwd,signature,location,notes,image_head_io):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    sql = "insert into imagedata(user_id , imagedata) values ('{0}','{1}');".format(user_id,str(image_head_io))
    cur.execute(sql)
    db.commit()
    generated_id = 'image/' +str(cur.lastrowid)+'.png'
    cur.close()
    cur = db.cursor()
    sql = "insert into user( username ,user_id, passwd, signature, location, notes, image_head) values ('{}','{}','{}','{}','{}','{}','{}') ".format(name, user_id, passwd, signature, location, notes, generated_id)
    cur.execute(sql)
    db.commit()
    cur.close()
    db.close()
    return {'success':"Your register is ok ,please login it now"}

def register_new(sql1,sql2):
    pass


def image_save_db(user_id, base64_str):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    sql = "insert into imagedata (user_id, imagedata) values ('{}','{}')".format(user_id,str(base64_str))
    cur.execute(sql)
    db.commit()
    id = cur.lastrowid
    cur.close()
    db.close()
    return id

def post_save(sql):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    cur.execute(sql)
    db.commit()
    id = cur.lastrowid
    cur.close()
    db.close()
    return id

def db_exe(sql):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    cur.execute(sql)
    a = cur.lastrowid
    db.commit()
    cur.close()
    db.close()
    return a



def db_select_all(sql):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    cur.execute(sql)
    data  = cur.fetchall()
    cur.close()
    db.close()
    return data


def db_select_one(sql):
    db = pymysql.connect(
        host='localhost',
        port=3306,
        user='root',
        password='Liumucer123',
        database='dac'
    )
    cur = db.cursor()
    cur.execute(sql)
    data = cur.fetchone()
    cur.close()
    db.close()
    return data
