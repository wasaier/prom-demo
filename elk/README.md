### elasticsearch 安装
```shell
docker pull elasticsearch:7.17.0

docker network create elk_network

docker run -d --name elk_es \
--net elk_network \
-p 9200:9200 -p 9300:9300 \
-e "discovery.type=single-node" elasticsearch:7.17.0
```

```shell
docker exec -it elasticsearch bash # 进入docker容器
cd config #进入配置文件路径
vi elasticsearch.yml #修改配置文件

# 增加下面两项，如果不添加以下两项，ElasticSearch-Head连接不了
http.cors.enabled: true
http.cors.allow-origin: "*"
```

### kibana
```shell
docker pull kibana:7.17.0

docker run -d --name elk_kibana \
--net elk_network \
-p 5601:5601 \
-v ~/code/person/prom-demo/elk/volumes/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml \
-e ELASTICSEARCH_URL=http://10.12.118.244:9200 kibana:7.17.0
```

### filebeat
```shell
docker pull elastic/filebeat:7.17.0

docker run -d --name=elk_filebeat \
--net elk_network \
-v ~/code/person/prom-demo/elk/volumes/filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml \
elastic/filebeat:7.17.0
```