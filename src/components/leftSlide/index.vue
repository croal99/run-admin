<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./logo.png" alt="AdminX">
      </router-link>
      <el-menu
        class="menu-box"
        theme="dark"
        router
        :default-active="$route.path">
        <div
          v-for="(item, index) in nav_menu_data"
          :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path">
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu
            :index="item.path"
            v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index">
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "slide",
  data() {
    return {
      nav_menu_data: [
        {
          title: "主页",
          path: "/home",
          icon: "fa-home"
        },
        {
          title: "游戏剧本",
          path: "/table",
          icon: "fa-table",
          child: [
            {
              title: "关卡",
              path: "/checkpoint/list"
            },
            {
              title: "题目",
              path: "/question/list"
            }
          ]
        },
        {
          title: "多媒体管理",
          path: "/media",
          icon: "fa-area-chart",
          child: [
            {
              title: "图片管理",
              path: "/media/picture/list"
            },
            {
              title: "音频管理",
              path: "/media/audio/list"
            },
          ]
        },
        {
          title: "玩家管理",
          path: "/player",
          icon: "fa-child",
          child: [
            {
              title: "玩家列表",
              path: "/player/list"
            }
          ]
        },
        {
          title: "口令",
          path: "/passphrase",
          icon: "fa-flickr",
          child: [
            {
              title: "口令列表",
              path: "/passphrase/list"
            }
          ]
        }
      ]
    };
  }
};
</script>
