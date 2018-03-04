<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" :element-loading-text="load_message">
      <el-row>
        <el-col :span="16">
          <el-form :model="question" :rules="rules" label-width="150px">
            <el-form-item>
              <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
            <el-form-item label="类型（type）:" prop="type">
              <el-select v-model="question.type" placeholder="游戏">
                <el-option v-for="question_type in question_type_list" :key="question_type.value" :label="question_type.label" :value="question_type.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="question.name" placeholder="题目名称" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="题目内容（content）:" prop="content">
              <el-input v-model="question.content" placeholder="题目内容" type="textarea" :rows="8" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="选项（items）:" prop="items">
              <el-input v-model="question.items" placeholder="题目选项" type="textarea" :rows="4" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="答案（answer）:" prop="answer">
              <el-input v-model="question.answer" placeholder="题目答案" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="得分（mark）:" prop="mark">
              <el-input v-model="question.mark" placeholder="分数/数量" style="width: 100%;"></el-input>
              <!-- <el-rate v-model="question.mark" show-score score-template="{value}" text-color="#ff9900"></el-rate> -->
            </el-form-item>
            <el-form-item label="正确分支（true_id）:" prop="true_id">
              <el-select v-model="question.true_id" placeholder="正确分支">
                <el-option label="(0)-结束" value="0"></el-option>
                <el-option v-for="question in $store.state.question_list" :key="question.id" :label="'('+question.id+')-'+question.name" :value="question.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="错误分支（true_id）:" prop="false_id">
              <el-select v-model="question.false_id" placeholder="错误分支">
                <el-option label="(0)-结束" value="0"></el-option>
                <el-option v-for="question in $store.state.question_list" :key="question.id" :label="'('+question.id+')-'+question.name" :value="question.id">
                </el-option>
              </el-select>
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
      question: null,
      question_type_list: [
        {
          value: "0",
          label: "分类目录"
        },
        {
          value: "3",
          label: "上传照片"
        },
        {
          value: "5",
          label: "普通道具"
        },
        {
          value: "6",
          label: "单选/多选题"
        },
        {
          value: "7",
          label: "多人摇一摇"
        },
        {
          value: "9",
          label: "任务书"
        },
        {
          value: "11",
          label: "填空题"
        },
        {
          value: "12",
          label: "晋级书"
        },
      ],
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
    if (this.$route.params.id) {
      this.get_data(this.$route.params.id);
    } else {
      var question = {
        id: "9999",
        type: "9",
        code: "96fc5132fd9ced272f5d1d1a784bbc18",
        memo: "新题目",
        content: "题目内容",
        items: "选项",
        answer: "答案",
        mark: "0",
        true_id: "0",
        false_id: "0",
      };
      this.$store.commit('add_question', question);
      this.get_data(question.id);
    }
  },
  methods: {
    get_data(id) {
      console.log("get_data");
      this.question = this.$store.state.game_config.question_list[id];
    },
    
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
