import json
import pymysql

# 连接一个数据库
conn = pymysql.connect(
    host='localhost',  # mysql服务器地址
    port=3306,  # 端口号
    user='dms',  # 用户名
    password='5201314Xc!',  # 密码
    database='auchi'#,  # 数据库名称
)

# 创建一个游标
cursor = conn.cursor()

with open('data.json', 'rb') as json_file:
  data = json.load(json_file)
  categories = data['categories']
  products = data['products']

# sql = "INSERT INTO products_gallery (id, img_url, img_desc, sort_order) VALUES (%s,%s,%s,%s)"
sql = "INSERT INTO auchi_goods (goods_id,name,price,cost, retail_price,brand,category,sold,net_weight,unit,thumb_url,image_url, detail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"

count = 1
for i in products:
  id = i['id']
  name = i['name']
  price = i['price']
  cost = i['cost']
  sellPrice = i['sellPrice']
  brand = i['brand']
  category = i['category']
  sales = i['sales']
  netWeight = i['netWeight']
  unit = i['unit'] 
  thumbUrl = i['thumbUrl'].replace('\/','/').replace('aumake','yadexpress')
  imageUrl = i['imageUrl'].replace('\/','/').replace('aumake','yadexpress')  
  detail = ",".join(i['detailUrl']).replace('aumake','yadexpress')
  singleVal = (int(id), str(name), float(price), float(cost), float(sellPrice), str(brand), str(category), int(sales), int(netWeight), str(unit), str(thumbUrl), str(imageUrl), str(detail))
  try:
      # 执行sql语句
      cursor.execute(sql, singleVal)

      # 取一行结果
      result = cursor.fetchone()

      # 提交事务
      conn.autocommit(True)

      # 打印
      print(result)

  # 出现错误
  except pymysql.Error as e:
      # 打印错误
      print(e)

      # 回滚
      conn.rollback()

conn.close()