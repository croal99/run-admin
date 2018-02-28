<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="16">
          <el-form :model="checkpoint" :rules="rules" label-width="150px">
            <el-form-item>
              <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
            <el-form-item label="编号（id）:" prop="id">
              <el-input v-model="checkpoint.id" placeholder="编号" style="width: 120px;"></el-input>
            </el-form-item>
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="checkpoint.name" placeholder="关卡名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="说明（memo）:" prop="memo">
              <el-input v-model="checkpoint.memo" placeholder="关卡说明" type="textarea" :rows="8" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="题目(question):" prop="question">
              <el-select v-model="checkpoint.question" placeholder="题目" style="width: 250px;">
                <el-option label="(0)-未设置" value="0"></el-option>
                <el-option v-for="question in $store.state.question_list" :key="question.id" :label="'('+question.id+')-'+question.memo" :value="question.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="经度（lng）:" prop="lng">
              <el-input v-model="checkpoint.lng" placeholder="经度" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="纬度（lat）:" prop="lat">
              <el-input v-model="checkpoint.lat" placeholder="纬度" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="误差范围（range）:" prop="range">
              <el-input v-model="checkpoint.range" placeholder="误差范围" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="线索图（image）:" prop="image">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image"
                :data="image_config"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_image_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image" :src="checkpoint.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="缩略图（thumb）:" prop="thumb">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image"
                :data="thumb_config"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_thumb_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.thumb" :src="checkpoint.thumb" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="正确反馈（image_true）:" prop="image_true">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image"
                :data="image_config"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_image_true_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image_true" :src="checkpoint.image_true" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="错误反馈（image_false）:" prop="image_false">
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image"
                :data="image_config"
                :show-file-list="false" :on-progress="on_progress" :on-success="upload_image_false_ok"
                :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image_false" :src="checkpoint.image_false" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
      checkpoint: null,
      route_id: this.$route.params.id,
      load_data: false,
      load_message: '',
      on_submit_loading: false,
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {},
  created() {
    // 普通图片上传配置信息
    this.image_config = {
        code: this.$store.state.game_config.game_code,
        width: 480,
    };

    // 缩略图片上传配置信息
    this.thumb_config = {
        code: this.$store.state.game_config.game_code,
        width: 240,
    };

    if (this.$route.params.id) {
      this.get_data(this.$route.params.id);
    } else {
      var checkpoint = {
        id: "9999",
        status: 0,
        code: "96fc5132fd9ced272f5d1d1a784bbc18",
        name: "新关卡",
        title: "title",
        memo: "关卡说明",
        lng: "104.00",
        lat: "30.00",
        question: false,
        show: true
      };
      this.$store.commit('add_checkpoint', checkpoint);
      this.get_data(checkpoint.id);
    }
  },
  methods: {
    get_data(id) {
      this.checkpoint = this.$store.state.game_config.checkpoint_list[id];
    },

    on_progress(res, file) {
      this.load_message = "上传中：" + file.percentage.toFixed(2) + "%";
    },

    upload_image_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image = file.response;
    },

    upload_image_true_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image_true = file.response;
    },

    upload_image_false_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image_false = file.response;
    },

    upload_thumb_ok(res, file) {
      this.load_data = false;
      this.checkpoint.thumb = file.response;
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