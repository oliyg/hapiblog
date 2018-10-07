# 📕 hapiblog 博客 api

基于 `hapi` 框架的博客系统，使用 jwt 鉴权，支持用户注册和登录，获取文章列表和文章详情。以 `redis` 作为缓存解决方案，使用 `mysql` 数据库和 `sequelize` 处理数据持久化。

## 🌈 支持的功能

- 分页获取博客文章列表
- 增查改删博客文章
- 根据标签、标题和作者 `ID` 筛选文章
- 获取文章排行列表支持 30 天以内的文章阅读量排行
- 使用 `redis` 缓存请求的数据
- 用户的注册和登录以及 `JSON WebToken` 的鉴权
- 通过 `swagger` 创建 `API` 文档
- 使用 `hapi-good` 日志工具
- 使用 `sequelize` 创建数据迁移

![screencapture-127-0-0-1-8000-documentation-2018-10-07-21_48_37.png](https://i.loli.net/2018/10/07/5bba0ecc2e7a7.png)

## 🎉 使用方法

### 🍎 clone

```sh
git clone https://github.com/oliyg/hapiblog.git
```

### 🚨 配置环境变量

根目录新增 `.env` 文件，仿照 `.env.example` 配置环境变量：

```
# server
HOST = HOST
PORT = PORT

# mysql
MYSQL_USERNAME = MYSQL_USERNAME
MYSQL_PASSWORD = MYSQL_PASSWORD
MYSQL_DB_NAME = MYSQL_DB_NAME
MYSQL_HOST = MYSQL_HOST
MYSQL_PORT = MYSQL_PORT

# redis
REDIS_HOST = REDIS_HOST
REDIS_PORT = REDIS_PORT

# jwt
JWT_SECRET = JWT_SECRET

# passwd encrypt secret
PASSWD_SECRET = PASSWD_SECRET
```

### 📖 数据迁移

开启 mysql 服务，并执行命令:

- `npm run createdb:dev` 创建数据库
- `npm run createtable` 创建数据库表
- `npm run initdata` 创建示例数据
- `npm run start` 开启服务

### ✈️ 启动服务

访问 `http://127.0.0.1:8000/documentation#/` 查看 `API` 文档
