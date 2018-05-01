<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'audioEdit'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加音频</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="audio_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
        <!-- <el-table-column prop="filename" label="文件名" width="200">
        </el-table-column> -->
        <el-table-column label="image" width="240" height="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isdir" size="mini" @click="get_audio_list(scope.row.fullname)">{{scope.row.filename}}</el-button>
            <audio v-else :src="scope.row.url" width="240"></audio>
          </template>
        </el-table-column>
        <el-table-column prop="mtime" label="时间" width="170">
        </el-table-column>
        <el-table-column prop="url" label="URL">
        </el-table-column>        
        <el-table-column label="操作" width="90">
          <template slot-scope="props">
            <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row.fullname)">删除</el-button>
          </template>
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
      audio_list: [], // 图片文件列表
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
    this.get_audio_list();
  },
  methods: {
    delete_data(fullname) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(fullname);
          this.$fetch.api_media
            .delete_media(fullname)
            .then(({ data }) => {
              console.log(data);
              if(data){
                this.$message.success("删除成功");
              }else{
                this.$notify.info({
                  title: "提示",
                  message: "发生错误了"
                });
              }
            })
            .catch(() => {console.log('asdsda')});
        })
        .catch(() => {});
    },

    //刷新
    on_refresh() {
      this.get_audio_list();
    },

    // 获取文件列表
    get_audio_list(path = '') {
      console.log(path);
      this.$fetch.api_media
        .audio_list(path)
        .then(({ data }) => {
          console.log(data[0]);
          this.audio_list = data;
          this.load_data = false;
        });
    }
  }
};
</script>
