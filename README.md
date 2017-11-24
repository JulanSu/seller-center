### 该项目为单页应用

## 安装

``` bash
# 安装项目依赖
npm install

# 运行开发环境
npm run dev

# 运行生产环境
npm run build

```

在开发环境下，启动服务后访问`http://localhost:8080/`
在测试服环境下，请使用 `http://shop.dmp.hzjiehun.bid/` 访问，如果未登录请先到 `http://shop.dmp.hzjiehun.bid/login` 登录，测试账号1590000002 密码123456


## 项目目录结构
```
    webpack
      |---build 服务及构建配置
      |---config 启动配置
      |---dist 生产环境
      |---route 路由配置
      |---src
        |---api axios请求
        |---assets 静态资源
        |---common 公共js资源目录
        |---components 共有组件
        |---views 各模板业务/视图
        |---vuex 状态管理
        |---styles 样式管理
        |---util 自定义工具
        |---APP.vue 主要视图
        |---main.js 主要入口

  ```

[MIT](http://opensource.org/licenses/MIT)
