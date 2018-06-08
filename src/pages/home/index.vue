<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-form :inline="true">
        <el-form-item label="游戏名称">
          <el-select v-model="$store.state.game_code" placeholder="游戏">
            <el-option v-for="game in game_list" :key="game.value" :label="game.label" :value="game.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="set_game">设置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="save_game">保存当前设置</el-button>
        </el-form-item>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="game_config.name" placeholder="名称" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="说明（memo）:" prop="memo">
              <el-input v-model="game_config.memo" placeholder="游戏说明" style="width: 400px;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="历史版本">
          <el-table :data="config_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
            <el-table-column prop="filename" label="文件名" width="200">
            </el-table-column>
            <el-table-column prop="memo" label="说明" width="250">
            </el-table-column>
            <el-table-column prop="mtime" label="时间">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="props">
                <el-button type="success" size="mini" icon="edit" @click="load_config(props.row)">加载</el-button>
                <!-- <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="welcome">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="HTML:">
              <el-input v-model="game_config.welcome.html" placeholder="HTML" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="end">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="HTML:">
              <el-input v-model="game_config.end.html" placeholder="HTML" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="CSS">
          <el-form label-width="150px">
            <el-form-item label="CSS:">
              <el-input v-model="game_css" placeholder="CSS" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="get_css()">加载</el-button>
              <el-button @click="set_css()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
      </el-tabs>

    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      // 游戏列表
      game_list: [
        {
          value: "zjh",
          label: "志交会"
        },
        {
          value: "1234",
          label: "消失的宝藏"
        },
        {
          value: "0112",
          label: "洛帶建字庫"
        },
        {
          value: "ldjzk",
          label: "洛帶建字庫正式版"
        },
        {
          value: "wjl01",
          label: "望江楼"
        },
        {
          value: "wjlxg",
          label: "望江楼正式版"
        },
        {
          value: "shzxt01",
          label: "守护者信条"
        },
        {
          value: "xy01",
          label: "校园答题"
        },
        {
          value: "xy02",
          label: "校园恐爆答题"
        },
        {
          value: "debug",
          label: "测试专用"
        }
      ],
      config_list: [], // 游戏配置
      game_config: null,
      game_css: '',
      load_data: false // 请求时的loading效果
    };
  },
  created() {
    if (this.$store.state.game_code) {
      this.load_data = true;
      this.get_config_list();
    }
  },
  methods: {
    // 加载游戏历史
    load_config(config) {
      this.load_data = true;
      this.$fetch.api_game_config
        .load_config({
          fullname: config.fullname
        })
        .then(({ data }) => {
          this.$message.success("加载历史数据成功");
          this.$store.commit("set_game_config", data);
          this.game_config = this.$store.state.game_config;
          this.load_data = false;
        });
    },

    // 获取游戏配置列表
    get_config_list() {
      this.$fetch.api_game_config
        .config_list({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.config_list = data;
          this.load_data = false;
        });
    },

    // 保存游戏数据
    save_game() {
      this.load_message = "保存数据";
      this.load_data = true;
      this.$fetch.api_game_config
        .set_config(this.$store.state.game_config)
        .then(({ data }) => {
          this.set_game();
        })
        .catch(() => {
          this.load_data = false;
        });
    },

    // 设置游戏数据
    set_game() {
      this.load_data = true;
      this.$fetch.api_game_config
        .get_config({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.$message.success("加载成功");
          this.$store.commit("set_game_config", data);
          this.game_config = this.$store.state.game_config;
          this.get_config_list();
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
        });
    },

    // 设置CSS数据
    get_css() {
      this.load_data = true;
      this.$fetch.api_game_config
        .get_css({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.$message.success("加载成功");
          this.game_css = data;
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
          this.game_css = '';
        });
    },

    // 设置CSS数据
    set_css() {
      this.load_data = true;
      this.$fetch.api_game_config
        .set_css({
          code: this.$store.state.game_code,
          css: this.game_css
        })
        .then(({ data }) => {
          this.$message.success("保存成功");
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
        });
    }
  },
  components: {
    panelTitle
  }
};
</script>
