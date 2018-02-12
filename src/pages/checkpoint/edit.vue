<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="16">
          <el-form :model="checkpoint" :rules="rules" label-width="150px">
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="checkpoint.name" placeholder="关卡名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="说明（memo）:" prop="memo">
              <el-input v-model="checkpoint.memo" placeholder="关卡说明" type="textarea" :rows="8" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="原始图（image）:" prop="image">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_image_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image" :src="checkpoint.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="缩略图（thumb）:" prop="thumb">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_thumb"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_thumb_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.thumb" :src="checkpoint.thumb" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">保存</el-button>
              <el-button @click="$router.back()">取消</el-button>
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
      checkpoint: null,
      route_id: this.$route.params.id,
      load_data: false,
      load_message: "",
      on_submit_loading: false,
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  created() {
    let id = this.$route.params.id;
    this.checkpoint = this.$store.state.game_config.checkpoint_list[id];
    // this.route_id && this.get_form_data();
  },
  methods: {
    on_progress(res, file) {
      this.load_message = "上传中：" + file.percentage.toFixed(2) + "%";
    },

    upload_image_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image = file.response;
    },

    upload_thumb_ok(res, file) {
      this.load_data = false;
      this.checkpoint.thumb = file.response;
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.load_message = "上传中";
      this.load_data = true;
      return isJPG && isLt2M;
    },

    //提交
    on_submit_form() {
      this.load_message = "保存数据";
      this.load_data = true;
      this.$fetch.api_game_config
        .set_config(this.$store.state.game_config)
        .then(({ data }) => {
          this.load_data = false;
        })
        .catch(() => {
          this.load_data = false;
        });
    }
  },
  components: {
    panelTitle
  }
};
</script>
