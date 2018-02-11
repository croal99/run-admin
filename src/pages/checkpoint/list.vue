<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-form :inline="true">
        <el-form-item label="游戏名称">
          <el-select v-model="$store.state.game_code" placeholder="游戏">
            <el-option
              v-for="game in game_list"
              :key="game.value"
              :label="game.label"
              :value="game.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="get_table_data">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="$store.state.checkpoint_list" v-loading="load_data" element-loading-text="拼命加载中" border @selection-change="on_batch_select"
        style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="80">
        </el-table-column>
        <el-table-column prop="name" label="name" width="200">
        </el-table-column>
        <el-table-column prop="memo" label="memo">
        </el-table-column>
        <el-table-column label="image" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="240">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="props">
            <router-link :to="{name: 'checkpointProcess', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="icon-tickets">任务安排</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button type="danger" icon="delete" size="small" :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
          <span>批量删除</span>
        </el-button>
      </bottom-tool-bar>
    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      // 游戏配置
      game_config: null,
      // 游戏列表
      game_list: [
        {
          value: 'zjh',
          label: '志交会'
        },
        {
          value: '1234',
          label: '消失的宝藏'
        },
      ],
      //当前页码
      currentPage: 1,
      //数据总条目
      total: 0,
      //每页显示多少条数据
      length: 15,
      //请求时的loading效果
      load_data: false,
      //批量选择数组
      batch_select: []
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    // if (this.$store.state.game_code) {
    //   this.get_table_data();
    // }
  },
  methods: {
    //刷新
    on_refresh() {
      this.get_table_data();
    },
    //获取数据
    get_table_data() {
      // 初始化数据
      this.checkpoint_list = [];

      this.load_data = true;
      this.$fetch.api_game_config
        .baseinfo({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.load_data = false;
          this.$store.commit("set_game_config", data);
        })
        .catch(() => {
          this.load_data = false;
        });
    },
    //单个删除
    delete_data(item) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_table
            .del(item)
            .then(({ msg }) => {
              this.get_table_data();
              this.$message.success(msg);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //页码选择
    handleCurrentChange(val) {
      this.currentPage = val;
      this.get_table_data();
    },
    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    //批量删除
    on_batch_del() {
      this.$confirm("此操作将批量删除选择数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.load_data = true;
          this.$fetch.api_table
            .batch_del(this.batch_select)
            .then(({ msg }) => {
              this.get_table_data();
              this.$message.success(msg);
            })
            .catch(() => {});
        })
        .catch(() => {});
    }
  }
};
</script>
