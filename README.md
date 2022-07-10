## 启动服务
关于 docker-compose 的用法，见 https://www.csdn.net/tags/NtTagg2sOTQwMTQtYmxvZwO0O0OO0O0O.html

```shell
# 启动服务
docker-compose -f docker-compose.yml up -d

# 停止服务
docker-compose -f docker-compose.yml stop

# 停止并删除容器，网络，镜像和数据卷
docker-compose -f docker-compose.yml down
```

## 修改 prom 配置后重启
```shell
curl -XPOST http://localhost:9090/-/reload
```