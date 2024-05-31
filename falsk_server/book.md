# flask


```python

# 导入类
from flask import Flask

# 使用flask创建一个app对象
app = Flask(__name__)

# 创建一个路由和函数映射
# https://www.baidu.com
# app.route() 是这个app对象的一个配置文件.
@app.route('/')
def hello_world():  # put application's code here
    return 'HelloWcqd!'

# 1. debug 模式
# 1.1. 开启debug模式,专业版编辑配置,社区版本加上debug= True ,会自动重复加载
# 1.2.

# 2. 修改host
# 让其他电脑可以访问我的网站
# --host=0.0.0.0

# 3. 修改port
# --port = 8000



if __name__ == '__main__':
    app.run()

```

### url : http[80]://https[443] : //www.qq.com:443//path

### url 和 视图 

```
    @setupmethod
    def route(self, rule: str, **options: t.Any) -> t.Callable[[T_route], T_route]:
        """Decorate a view function to register it with the given URL
        rule and options. Calls :meth:`add_url_rule`, which has more
        details about the implementation.

        .. code-block:: python

            @app.route("/")
            def index():
                return "Hello, World!"

        See :ref:`url-route-registrations`.

        The endpoint name for the route defaults to the name of the view
        function if the ``endpoint`` parameter isn't passed.

        The ``methods`` parameter defaults to ``["GET"]``. ``HEAD`` and
        ``OPTIONS`` are added automatically.

        :param rule: The URL rule string.
        :param options: Extra options passed to the
            :class:`~werkzeug.routing.Rule` object.
        """

        def decorator(f: T_route) -> T_route:
            endpoint = options.pop("endpoint", None)
            self.add_url_rule(rule, endpoint, f, **options)
            return f

        return decorator

```


### 注意访问的模式，该flask服务器访问在开始时仅支持http协议的访问


```python

from flask import Flask


app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'HelloWcqd!'

@app.route('/root/<int:blog_id>')
def blog_root(blog_id):
    return  "%s的主页"%blog_id



@app.route('/one')
def one():
    return 'hello'

if __name__ == '__main__':
    app.run()


```