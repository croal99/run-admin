### 目录结构

<pre>
├── src                              
│   ├── api                          // *与后端进行通信的接口定义
│   │   ├── index.js                 // 接口定义（统一加载）
│   │   ├── media.js                 // 媒体文件管理接口
│   ├── common                       
│   │   ├── port_uri                 // 后端uri
│   │   │   ├── index.js             // 接口uri（统一加载）
│   │   │   ├── media.js             // 媒体文件管理接口uri
│   ├── components                   
│   │   ├── leftSlide                // 左边导航
│   ├── pages                        // 各种页面
│   │   ├── media                    // 多媒體管理
│   │   │   ├── picture              // 圖片
│   │   │   │   ├── list.vue         // 圖片管理
</pre>