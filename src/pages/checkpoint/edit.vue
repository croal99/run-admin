<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="20">
          <el-form :model="checkpoint" :rules="rules" label-width="150px">
            <el-form-item :label="'编号（'+checkpoint.id+'）'">
              <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
            <el-form-item label="编码（code）:" prop="code">
              <el-input v-model="checkpoint.code" placeholder="编码" style="width: 100%;">
                <el-button slot="append" icon="el-icon-search" @click="dialog_qrcode = true">二维码</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="说明（memo）:" prop="memo">
              <el-input v-model="checkpoint.memo" placeholder="关卡说明" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="是否显示（show）:" prop="show">
              <el-switch v-model="checkpoint.show" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label="状态（status）:" prop="status">
              <el-radio-group v-model="checkpoint.status" style="width: 100%;">
                <el-radio :label="0">未开启</el-radio>
                <el-radio :label="1">选中目标</el-radio>
                <el-radio :label="2">到达位置</el-radio>
                <el-radio :label="3">完成（成功）</el-radio>
                <el-radio :label="4">完成（失败）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="触发方式（method）:" prop="method">
              <el-radio-group v-model="checkpoint.method">
                <el-radio :label="0">系统设置</el-radio>
                <el-radio :label="1">摇一摇</el-radio>
                <el-radio :label="2">扫一扫</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="checkpoint.name" placeholder="关卡名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="内容（content）:" prop="content">
              <el-input v-model="checkpoint.content" placeholder="内容" type="textarea" :rows="8" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="题目(question):" prop="question">
              <el-select v-model="checkpoint.question" placeholder="题目" style="width: 250px;">
                <el-option label="(0)-未设置" value="0"></el-option>
                <el-option v-for="question in $store.state.question_list" :key="question.id" :label="'('+question.id+')-'+question.name"
                  :value="question.id">
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
            <el-form-item label="显示css（css）:" prop="css">
              <el-input v-model="checkpoint.css" placeholder="css名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="过渡css（css1）:" prop="css1">
              <el-input v-model="checkpoint.css1" placeholder="css名称" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="状态图0（image0）:" prop="image0">
              <el-input v-model="checkpoint.image0" placeholder="URL" style="width: 100%;"></el-input>
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image" :data="thumb_config" :show-file-list="false"
                :on-progress="on_progress" :on-success="upload_image0_ok" :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image0" :src="checkpoint.image0" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态图1（image1）:" prop="image1">
              <el-input v-model="checkpoint.image1" placeholder="URL" style="width: 100%;"></el-input>
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image" :data="thumb_config" :show-file-list="false"
                :on-progress="on_progress" :on-success="upload_image1_ok" :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image1" :src="checkpoint.image1" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态图2（image2）:" prop="image2">
              <el-input v-model="checkpoint.image2" placeholder="URL" style="width: 100%;"></el-input>
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image" :data="thumb_config" :show-file-list="false"
                :on-progress="on_progress" :on-success="upload_image2_ok" :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image2" :src="checkpoint.image2" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态图3（image3）:" prop="image3">
              <el-input v-model="checkpoint.image3" placeholder="URL" style="width: 100%;"></el-input>
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image" :data="thumb_config" :show-file-list="false"
                :on-progress="on_progress" :on-success="upload_image3_ok" :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image3" :src="checkpoint.image3" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="状态图4（image4）:" prop="image4">
              <el-input v-model="checkpoint.image4" placeholder="URL" style="width: 100%;"></el-input>
              <el-upload class="avatar-uploader" action="https://game.591cms.com/api3/upload_image" :data="thumb_config" :show-file-list="false"
                :on-progress="on_progress" :on-success="upload_image4_ok" :before-upload="beforeAvatarUpload">
                <img v-if="checkpoint.image4" :src="checkpoint.image4" class="avatar">
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

    <el-dialog title="提示" :visible.sync="dialog_qrcode" width="30%">
      <el-form :model="checkpoint">
        <el-form-item label="二维码内容" label-width="100px">
          <el-input v-model="checkpoint.qrcode" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_qrcode = false">取 消</el-button>
        <el-button type="primary" @click="make_qrcode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script type="text/javascript">
import { panelTitle } from "components";
import md5 from 'js-md5';

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
      },
      dialog_qrcode: false,
    };
  },
  mounted() {},
  created() {
    if (this.$route.params.id) {
      this.get_data(this.$route.params.id);
    } else {
      var checkpoint = {
        id: "9999",
        status: 0,
        method: 0,
        show: true,
        code: "96fc5132fd9ced272f5d1d1a784bbc18",
        name: "新关卡",
        memo: "关卡说明",
        lng: "104.00",
        lat: "30.00",
        question: "0",
      };
      this.$store.commit('add_checkpoint', checkpoint);
      this.get_data(checkpoint.id);
    }

    // 普通图片上传配置信息
    this.image_config = {
        id: this.checkpoint.id,
        code: this.$store.state.game_config.game_code,
        width: 480,
    };

    // 缩略图片上传配置信息
    this.thumb_config = {
        id: this.checkpoint.id,
        code: this.$store.state.game_config.game_code,
        width: 240,
    };

  },
  methods: {
    make_qrcode() {
      this.checkpoint.code = md5(this.checkpoint.qrcode);
      this.dialog_qrcode = false;
    },

    get_data(id) {
      this.checkpoint = this.$store.state.game_config.checkpoint_list[id];
    },

    on_progress(res, file) {
      this.load_message = "上传中：" + file.percentage.toFixed(2) + "%";
    },

    upload_image0_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image0 = file.response;
    },

    upload_image1_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image1 = file.response;
    },

    upload_image2_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image2 = file.response;
    },

    upload_image3_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image3 = file.response;
    },

    upload_image4_ok(res, file) {
      this.load_data = false;
      this.checkpoint.image4 = file.response;
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
