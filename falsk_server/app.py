from flask import Flask,send_file ,jsonify, request
import random
import app_pick
import tempfile
import ai

app = Flask(__name__)

@app.route('/sights_detail',methods= ['POST'])
def sights_detail():
    pass

@app.route('/love_del' , methods=['POST'])
def love_del():
    js_web = request.get_json()
    user_id = js_web.get('user_id')
    post_id = js_web.get('post_id')
    print(user_id,post_id)
    sql = "delete from love where  post_id = '{}' and user_id = '{}' ".format(post_id,user_id)
    app_pick.db_exe(sql)
    sql = "select  my_love_post from user where user_id = '{}' ".format(user_id)
    data = app_pick.db_select_one(sql)
    str = data[0].replace("{}".format(post_id) , '')
    sql = "update user set my_love_post= '{}' where user_id = '{}' ".format(str,user_id)
    app_pick.db_exe(sql)
    return jsonify({'success' : 'love is quit'})

@app.route('/love',methods=['POST'])
def love():
    js_web = request.get_json()
    user_id = js_web.get('user_id')
    post_id = js_web.get('post_id')
    print(type(post_id))
    print(type(user_id))
    sql = "select  my_love_post from user where user_id = '{}'".format(user_id)
    data = app_pick.db_select_one(sql)
    str = "{}  ".format(post_id) + data[0]
    print(str)
    sql = "update user set my_love_post='{}' where user_id = '{}'".format(str,user_id)
    app_pick.db_exe(sql)
    sql = "insert into love(post_id, user_id) VALUES ('{}','{}')".format(post_id,user_id)
    app_pick.db_exe(sql)
    return jsonify({'success':'love item is added'})

'''
except post headers
{
    data : {
        post_id_list :['1','2']
    }
}
'''

@app.route('/post_detail',methods=['GET'])
def post_detail():
    post_id = request.args.get('post_id')
    post_id = str(post_id)
    print(post_id)
    post_detail = {}
    sql = "select * from post where id = '{}' ".format(post_id)
    data_post = app_pick.db_select_one(sql)
    print(data_post)
    list_return = ['post_id','user_id','post_title','post_article','post_location','post_private','files','post_love_num','comment']
    for i in range(0,8):
        if i==6 :
            print(data_post[i])
            post_detail[list_return[i]]=data_post[i].split()
        else:
            post_detail[list_return[i]]=data_post[i]
    sql = "select * from comment where post_id = {}".format(post_id)
    data_comment = app_pick.db_select_all(sql)
    comment = []
    comment_msg =['comment_id','post_id','user_id','comment_text','name','comment_image','user_image']
    for i in data_comment:
        cur = 0
        dic = {}
        for j in i:
            if cur==5:
                dic[comment[cur]] = j.split()
            else:
                dic[comment_msg[cur]] = j
        comment.append(dic)
    post_detail[list_return[8]] = comment
    sql = "select username , image_head from user where user_id = '{}' ".format(post_detail.get('user_id'))
    keo = app_pick.db_select_one(sql)
    post_detail['username'] = keo[0]
    post_detail['image_head'] = keo[1]
    print(post_detail)
    return jsonify({'success':post_detail})

'''
:return json
{
    post_id :  '',
    user_id :  '',
    post_title  : '',
    post_article : '',
    post_love_num : '',
    post_location : '',
    post_private  : '',
    files  : ['','']      // len
    comment : [{},{},{}]
}
'''

#  特定请求列表。
@app.route('/post_request',methods = ['POST'])
def post_request():
    msg = request.get_json().get('post_id_list')
    with open('post_open_list.txt','r') as f:
        a = f.read()
    list = a.split()
    list = [x for x in list if x not in msg]
    if (len(list)>20):
        list_select = random.sample(list,20)
    else:
        list_select = list
    print(list_select)
    return jsonify({'list' : list_select})


'''
:return json
{
    'list' : [
        {
                post_id :  '',
                user_id :  '',
                post_title  : '',
                post_article : '',
                post_love_num : '',
                post_location : '',
                post_private  : '',
                file  : ''
        },
        ...
    ]
}
'''

@app.route('/create_post' , methods=['POST'])
def create_post():
    # print(1)
    a = request.get_json()
    title = a.get('title')
    article = a.get('article')
    user_id = a.get('user_id')
    img  = a.get('file')
    # key files --> value array
    private_post = a.get('private')
    post_location = a.get('location')
    # print(article)
    list1 = []
    for k in img:
        list1.append(app_pick.image_save_db(user_id,k))
    post_iamge = ''
    print(list1)
    for i in list1 :
        post_iamge = post_iamge + ' '+'image/'+str(i)+'.png'
    print(post_iamge)
    sql = "insert into post( user_id, post_title, post_article, post_location, post_private,post_image) values ('{}','{}','{}','{}','{}','{}')".format(user_id,title,article,post_location,private_post,post_iamge)
    post_id = app_pick.db_exe(sql)
    sql = "update user set my_post = '{}' where user_id = '{}' ".format(' '+str(post_id),user_id)
    app_pick.db_exe(sql)
    if(private_post==0):
        with open('post_open_list.txt','r') as f:
            a = f.read()
        a = a + ' '+str(post_id)
        with open('post_open_list.txt','w') as f:
            f.write(a)
    return jsonify({'success':'ok'})

@app.route('/post_delete',methods=['GET'])
def post_delete():
    message = request.args
    post_id = message.get('post_id')
    user_id = message.get('user_id')
    sql = "delete from post where id = {}".format(post_id)
    app_pick.db_exe(sql)
    sql = "delete from comment where post_id = {}".format(post_id)
    app_pick.db_exe(sql)
    sql = "select my_post from user where user_id = '{}' ".format(user_id)
    k = app_pick.db_select_one(sql)
    r = k[0].repalce('{}'.format(post_id) , '')
    sql = "update user set my_post = '{}' where user_id = '{}' ".format(r,user_id)
    app_pick.db_exe(sql)
    with open('post_open_list.txt', 'r') as f:
        a = f.read()
    a = a.replace(post_id, '')
    with open('post_open_list.txt', 'w') as f:
        f.write(a)
    return  jsonify({'success': 'delete is success'})

@app.route('/post_reset',methods=['POST'])
def post_reset():
    a = request.get_json()
    post_id = a.get('post_id')
    title = a.get('title')
    article = a.get('article')
    user_id = a.get('user_id')
    img = a.get('file')
    private_post = a.get('private')
    post_location = a.get('location')
    priv_re = a.get('private_reset')
    imgdel = a.get('imgdel')
    sql = "select post_image from post where id = '{}' ".format(post_id)
    oldimg = app_pick.db_select_one(sql)[0].split()
    imgthen = [ x for x in oldimg if x not in imgdel ]
    list1 = []
    for k in img:
        list1.append(app_pick.image_save_db(user_id, k))
    post_iamge = ''
    for i in list1:
        post_iamge = ' ' + 'image/' + str(i) +'.png'
    post_iamge  = ' '.join(imgthen) + post_iamge
    #     must update?comment
    sql = "update post set post_title ='{}',post_article='{}',post_location='{}',post_private='{}',post_image='{}' where id = '{}' ".format(title,article,post_location,private_post,post_iamge,post_id)
    app_pick.db_exe(sql)
    if(priv_re == 1):
        if (private_post == 1):
            with open('post_open_list.txt', 'r') as f:
                a = f.read()
            a = a.replace(str(post_id),'')
            with open('post_open_list.txt', 'w') as f:
                f.write(a)
        if (private_post == 0):
            with open('post_open_list.txt', 'r') as f:
                a = f.read()
            a = a + ' ' + post_id
            with open('post_open_list.txt', 'w') as f:
                f.write(a)
    return jsonify({'success' : 'ok'})

@app.route('/image/<int:i>.png',methods=['GET'])
def image(i):
    # 将base64编码解码为二进制数据
    binary_data = app_pick.image_load(i)
    # print(binary_data)
    # 创建一个临时文件
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    # 将二进制数据写入临时文件
    with open(temp_file.name, 'wb') as f:
        f.write(binary_data)
    # 使用send_file发送临时文件
    return send_file(temp_file.name, mimetype='image/png')

@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user_id = data.get('user_id')
    passwd  = data.get('passwd')
    dic = app_pick.LogIn(user_id,passwd)
    return jsonify(dic)

@app.route('/register',methods=['POST'])
def register():
    data = request.get_json()
    image = data.get('image')
    name  = data.get('username')
    user_id = data.get('user_id')
    passwd  = data.get('passwd')
    signature = data.get('signature')
    notes = data.get('notes')
    location = data.get('location')
    return_json = app_pick.register(name, user_id, passwd, signature, location, notes, image)
    return  jsonify(return_json)

'''
前端需要执行以下操作
'''
@app.route('/register_reset',methods=['POST'])
def register_reset():
    pass

@app.route('/AI_retouch',methods = ['POST'])
def AI_retouch():
    data = request.get_json()
    title = data.get('titledata')
    text  = data.get('textdata')
    Myaijson = ai.AI_retouching(title,text)
    return jsonify(Myaijson)

@app.route('/sight_db_update',methods = ['POST'])
def sight_db_update():
    data = request.get_json()
    sight_name = data.get('sight_name')
    location = data.get('sight_location')
    sight_culture = data.get('sight_culture')
    sight_hot = data.get('sight_hot')
    sights_image = data.get('sights_image')
    sights_detail = data.get('sights_detail')
    files   = ' '
    for i in sights_image:
        files = files + ' '+ str(app_pick.image_save_db('admin',i))+'.png'
    print(sight_name,files,sight_culture,sight_hot,sights_detail,location)
    print(type(sight_name))
    print(sight_name)
    sql = "insert into sightsdb( sight_name, files, sight_culture, sight_hot, sight_detail,sight_location) values ('{}','{}','{}','{}','{}','{}')".format(sight_name.get('value'),files,sight_culture.get('value'),sight_hot.get('value'),sights_detail.get('value'),location.get('value'))
    id_sight = app_pick.db_exe(sql)
    with open('sight_id.txt', 'r') as f:
        a = f.read()
    a = a + str(id_sight)+' '
    with open('sight_id.txt', 'w') as f:
        f.write(a)
    return jsonify({'success' : 'sights data is overflow !!!'})

@app.route('/sight_detail' , methods = ['GET'])
def sight_detail():
    id = request.args.get('sights_id')
    print(id)
    sql = "select * from sightsdb where id = '{}'".format(id)
    out = app_pick.db_select_one(sql)
    List = ['id','sight_name', 'files', 'sight_culture', 'sight_hot', 'sight_detail','sight_location']
    out_json = {}
    for i in range(7):
        if (i==2):
            out_json[List[i]] = out[i].split()
        else:
            out_json[List[i]] = out[i]
    return jsonify({'success': out_json})



@app.route('/sight_request',methods = ['GET'])
def sight_request():
    data = request.args
    num = data.get('num')
    list_over = data.get('list_over')
    with open('sight_id.txt' , 'r') as f:
        a = f.read()
    list1 = a.split()
    list_send_1 = [x for x in list1 if x not in list_over]
    if (len(list_send_1)>int(num)):
        list_select = random.sample(list_send_1,int(num))
    else:
        list_select = list_send_1
    data = {'list_send' : list_select}
    return jsonify({'success' :data})

if __name__ == '__main__':

    app.run()
