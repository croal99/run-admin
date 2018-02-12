# vue-admin [Live Demo](http://vueadmin.hinplay.com/)

### 安装

***
项目地址: (`git clone`)
```shell
git clone https://github.com/croal99/run-admin.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务: (http://localhost:3000)

```
npm run dev
```
发布代码

```
npm run build
```
***
### 目录结构
<pre>
├── build                            // 项目的 Webpack 配置文件
├── config                           // 项目配置目录
│   ├── index.js                     // 本地配置文件，采用proxyTable解决跨域
├── src                              // 生产目录
│   ├── api                          // *与后端进行通信的接口定义
│   │   ├── game_config.js           // 游戏配置接口
│   ├── assets                       // 一些资源文件
│   ├── common                       // 通用文件、如工具类、状态码
│   │   ├── config                   // 通信配置
│   │   │   ├── index.js             // server_base_url，解决跨域的统一配置
│   │   ├── fetch                    // HTTP通信对象（axios）
│   │   ├── port_uri                 // 后端uri
│   │   │   ├── game_config.js       // 游戏配置接口uri
│   │   ├── storage                  // 本地存储接口
│   │   ├── tools                    // 一些转换工具
│   ├── components                   // 各种组件
│   │   ├── leftSlide                // 左边导航
│   │   ├── mainContent              // 中间数据
│   ├── mock                         // mock（暂时不需要）
│   ├── pages                        // 各种页面
│   │   ├── checkpoint               // 关卡管理
│   │   │   ├── list.vue             // 关卡列表
│   │   │   ├── process.vue          // 关卡中的任务分配情况
│   │   │   ├── edit.vue             // 关卡信息编辑
│   ├── plugins                      // 各种插件
│   ├── router                       // 路由配置及map
│   ├── store                        // Vuex 状态管理器
│   │   ├── mutations                // mutations
│   │   ├── states                   // states
│   ├── App.vue                      // 根组件
│   ├── favicon.ico                  // ico小图标
│   ├── index.html                   // 项目入口文件
│   ├── main.js                      // Webpack 编译入口文件，入口js
├── static                           // 静态资源，一般把不需要处理的文件可以放这里
│   ├── echarts-all.js               // echarts 2.0 (因为3.0无法显示多层Tree)
├── .babelrc                         // babelrc配置文件
├── .editorconfig                    // 代码风格文件，前提是要你的编辑器支持
├── .gitignore                       // 用于Git配置不需要加入版本管理的文件
├── .postcssrc.js                    // autoprefixer的配置文件
├── package.json                     // 项目配置文件
</pre>

![image](https://raw.githubusercontent.com/zzmhot/vue-admin/images/images_1.jpg)

