<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'checkpointAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table :data="$store.state.checkpoint_list" :default-sort="{prop: 'sort', order: 'ascending'}" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
        <!--<el-table-column type="selection" width="55">
        </el-table-column>-->
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="sort" sortable label="排序" width="100">
          <template slot-scope="props">
            <el-input v-model="props.row.sort"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="memo" label="说明">
        </el-table-column>
        <el-table-column prop="question" label="题库" width="80">
        </el-table-column>
        <el-table-column label="显示" width="80">
          <template slot-scope="props">
            <span v-if="props.row.show">是</span>
          </template>
        </el-table-column>    
        <el-table-column label="状态" width="100">
          <template slot-scope="props">
            {{status_name[props.row.status]}}
          </template>
        </el-table-column>
        <el-table-column label="触发方式" width="100">
          <template slot-scope="props">
            {{method_name[props.row.method]}}
          </template>
        </el-table-column>      
        <el-table-column label="操作" width="220">
          <template slot-scope="props">
            <router-link :to="{name: 'checkpointEdit', params: {id: props.row.id}}" tag="span">
              <el-button type="success" size="mini" icon="edit">编辑</el-button>
            </router-link>
            <router-link :to="{name: 'checkpointProcess', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="mini" icon="edit">任务</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <!-- <el-button type="danger" icon="delete" size="small" :disabled="batch_select.length === 0" @click="on_batch_del" slot="handler">
          <span>批量删除</span>
        </el-button> -->
      </bottom-tool-bar>
    </div>
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'checkpointAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      //请求时的loading效果
      load_data: false,
      // 类型定义
      status_name: [
        "未开启",
        "选中目标",
        "到达位置",
        "完成（成功）",
        "完成（失败）",
      ],
      method_name: [
        '系统设置',
        '摇一摇',
        '扫一扫'
      ],
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
    delete_data(checkpoint) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit('del_checkpoint', checkpoint.id);
        })
        .catch(() => {});
    },
    //刷新
    on_refresh() {
      this.get_table_data();
    },
    //获取数据
    get_table_data() {},
    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    on_batch_del() {}
  }
};
</script>
