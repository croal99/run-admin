<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="16">
          <el-form :model="passphrase" label-width="150px">
            <el-form-item label="口令:" prop="memo">
              <el-input v-model="passphrase.id" placeholder=1234 style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="数量:" prop="memo">
              <el-input v-model="passphrase.count" placeholder=1 style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="commit()">提交</el-button>
            </el-form-item>

            <el-form-item>
              <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle } from "components";

export default {
  data() {
    return {
      passphrase: {
        id: '',
        count: ''
        },
      route_id: this.$route.params.id,
      load_data: false,
      load_message: '',
    };
  },
  created() {
    console.log(this.$route.params.id);
    if(this.route_id != undefined){
      this.get_passphrase()
    }
  },
  methods: {
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
          this.passphrase = data[this.route_id];
          this.load_data = false;
          console.log(data[this.route_id]);
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "参数错误！"
          });
        });
    },
    commit() {
      let passphrase = this.passphrase;
      passphrase.code = this.$store.state.game_code;
      this.$fetch.api_passphrase
        .edit_passphrase(passphrase)
        .then(({ data }) => {
          this.$message.success("编辑成功");
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "参数错误！"
          });
        });
      console.log(this.passphrase);
    }
  },
  components: {
    panelTitle
  }
};
</script>