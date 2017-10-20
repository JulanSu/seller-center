### 该项目为多页面应用
* 如果需要使用多页面，请在modules里创建，

## Install

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8088
npm run dev

# build for production with minification
npm run build

```

启动服务后请使用如此路径访问`http://localhost:8088/modules/`路径访问html资源
PC端 [http://localhost:8088/modules/index.html][1]


## 多页面配置
vue2.0版本多页面入口,是由webpack配置来完成的，我的项目文件结构如下
```
    webpack
      |---build 构建配置
      |---config 启动配置
      |---dist 生产环境
      |---route 路由配置，如果是多页，也请在这里配置路由
      |---src
        |---api axios请求
        |---assets 静态资源
        |---common 公共js资源目录
        |---components 共有组件
        |---modules各个模块
          |---index    index模块
            |---views 组件
            |---index.html
            |---index.js
            |---index.vue
  ```


### Browser Support

Modern browsers and Internet Explorer 10+.

### License
[MIT](http://opensource.org/licenses/MIT)
