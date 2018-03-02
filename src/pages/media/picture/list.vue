<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'questionAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加圖片</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="picture_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
        <!-- <el-table-column prop="filename" label="文件名" width="200">
        </el-table-column> -->
        <el-table-column label="image" width="240">
          <template slot-scope="scope">
            <img :src="scope.row.url" width="240">
          </template>
        </el-table-column>
        <el-table-column prop="mtime" label="时间" width="200">
        </el-table-column>
        <el-table-column prop="url" label="URL">
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <!-- <el-button type="danger" icon="delete" size="small" :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
          <span>批量删除</span>
        </el-button> -->
      </bottom-tool-bar>
    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      picture_list: [], // 图片文件列表
      load_data: false, // 请求时的loading效果
      batch_select: [] // 批量选择数组
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.load_data = true;
    this.get_picture_list();
  },
  methods: {
    delete_data(question) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$store.commit("del_question", question.id);
        })
        .catch(() => {});
    },

    //刷新
    on_refresh() {
      this.get_picture_list();
    },

    // 获取文件列表
    get_picture_list() {
      this.$fetch.api_media
        .picture_list()
        .then(({ data }) => {
          this.picture_list = data;
          this.load_data = false;
        });
    }
  }
};
</script>
