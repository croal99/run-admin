<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="16">
          <el-form :model="picture" label-width="150px">
            <el-form-item label="图片" prop="image">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/media/upload_image"
                :data="image_config"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_image0_ok">
                <img v-if="picture.url" :src="picture.url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input v-model="picture.introduction" placeholder="简介" type="textarea" :rows="3" style="width: 100%;"></el-input>
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
      picture: {
        filename: '',
        url: ''
        },
      route_id: this.$route.params.id,
      load_data: false,
      load_message: '',
      on_submit_loading: false,
    };
  },
  created() {
    // 普通图片上传配置信息
    this.image_config = {
        width: 0,
    };

  },
  methods: {
    // get_data(id) {
    //   this.picture = this.$store.state.game_config.checkpoint_list[id];
    // },

    on_progress(res, file) {
      this.load_message = "上传中：" + file.percentage.toFixed(2) + "%";
    },

    upload_image0_ok(res, file) {
      console.log(file);
      this.load_data = false;
      this.picture.url = file.response;
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      this.load_message = "上传中";
      this.load_data = true;
      return isLt2M;
    }
  },
  components: {
    panelTitle
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>