<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'tableAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link> -->
    </panel-title>
    <div class="panel-body">
      <el-table :data="$store.state.question_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="id" width="70">
        </el-table-column>
        <el-table-column prop="type_name" label="type" width="120">
        </el-table-column>
        <el-table-column prop="memo" label="memo" width="150">
        </el-table-column>
        <el-table-column prop="content" label="content">
        </el-table-column>
        <!-- <el-table-column prop="items" label="items" width="200">
        </el-table-column>
        <el-table-column prop="answer" label="answer" width="200">
        </el-table-column> -->
        <el-table-column label="操作" width="120">
          <template scope="props">
            <router-link :to="{name: 'questionEdit', params: {id: props.row.id}}" tag="span">
              <el-button type="success" size="small" icon="edit">编辑</el-button>
            </router-link>
            <!-- <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row)">删除</el-button> -->
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
    },
  }
};
</script>
