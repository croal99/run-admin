<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'passphraseEdit'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加口令</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        style="width: 100%;">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="count"
          label="count">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="props">
            <router-link :to="{name: 'passphraseEdit', params: {id: props.row.id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'

  export default{
    data(){
      return {
        table_data: null,
        //请求时的loading效果
        load_data: true,
      }
    },
    components: {
      panelTitle,
      bottomToolBar
    },
    created(){
      this.get_passphrase()
    },
    methods: {
      //刷新
      on_refresh(){
        this.get_passphrase()
      },
      // 获取口令数据
      get_passphrase() {
        this.load_data = true;
        if (this.$store.state.game_code == '') {
            this.$notify.info({
              title: "提示",
              message: "请先选择游戏！"
            });
            this.load_data = false;
            return;
        }
        this.$fetch.api_passphrase
          .passphrase_list(this.$store.state.game_code)
          .then(({ data }) => {
            this.$message.success("加载成功");
            this.table_data = data;
            this.load_data = false;
            console.log(data);
          })
          .catch(() => {
            this.$notify.info({
              title: "提示",
              message: "参数错误！"
            });
          });
      },
      //单个删除
      delete_data(item){
        item.code = this.$store.state.game_code;
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.load_data = true
          this.$fetch.api_passphrase.delete_passphrase(item)
            .then(({msg}) => {
              this.get_passphrase()
              this.$message.success(msg)
            })
            .catch(() => {
            })
        })
        .catch(() => {
        })
      }
    }
  }
</script>
