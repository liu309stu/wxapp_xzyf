from sparkai.llm.llm import ChatSparkLLM, ChunkPrintHandler
from sparkai.core.messages import ChatMessage
import  re
#星火认知大模型Spark3.5 Max的URL值，其他版本大模型URL值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_URL = 'wss://spark-api.xf-yun.com/v3.5/chat'
#星火认知大模型调用秘钥信息，请前往讯飞开放平台控制台（https://console.xfyun.cn/services/bm35）查看
# 你自己的API秘钥
SPARKAI_APP_ID = ''
SPARKAI_API_SECRET = ''
SPARKAI_API_KEY = ''
#星火认知大模型Spark3.5 Max的domain值，其他版本大模型domain值请前往文档（https://www.xfyun.cn/doc/spark/Web.html）查看
SPARKAI_DOMAIN = 'generalv3.5'

def AI_retouching(title , text):
    content = '假设你是一个有深厚文学功底的文学家并且有丰富的旅行经历，请修饰一下游记，题目：' + (title if title else '') + '，内容：' + (text if text else '') + '，其中题目修饰后长度不能超过40个字符，内容修改后不能超过2048个字符'
    spark = ChatSparkLLM(
        spark_api_url=SPARKAI_URL,
        spark_app_id=SPARKAI_APP_ID,
        spark_api_key=SPARKAI_API_KEY,
        spark_api_secret=SPARKAI_API_SECRET,
        spark_llm_domain=SPARKAI_DOMAIN,
        streaming=False,
    )
    messages = [ChatMessage(
        role="user",
        content=content
    )]
    handler = ChunkPrintHandler()
    a = spark.generate([messages], callbacks=[handler])
    print(type(a))
    # print(a)
    chat_generation = a.generations[0][0]
    print(chat_generation)

     # 确保 chat_generation 是包含生成文本的对象，并且有 text 属性
    chat_generation_text = chat_generation.text

    # 提取题目
    pattern = re.compile(r'题目：(.*?)\n\n内容：\n(.*)', re.S)
    match = pattern.search(chat_generation_text)

    if match:
        title = match.group(1).strip()
        content = match.group(2).strip()
        print(f"题目：{title}")
        print(f"内容：{content}")
    else:
        print("未能找到题目和内容。")

    # 输出标题和内容
    Myaijson = {'title' : title , 'content' : content}
    return Myaijson

