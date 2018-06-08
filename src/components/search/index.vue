<template>
  <div>
    <el-select v-model="$store.state.game_code" placeholder="游戏">
      <el-option v-for="game in game_list" :key="game.value" :label="game.label" :value="game.value">
      </el-option>
    </el-select>
  </div>
</template>

<script type="text/javascript">
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search here..."
    }
  },
  data() {
    return {
      // 游戏列表
      game_list: [
        {
          value: "zjh",
          label: "志交会"
        },
        {
          value: "1234",
          label: "消失的宝藏"
        },
        {
          value: "0112",
          label: "洛帶建字庫"
        },
        {
          value: "ldjzk",
          label: "洛帶建字庫正式版"
        },
        {
          value: "wjl01",
          label: "望江楼"
        },
        {
          value: "wjlxg",
          label: "望江楼正式版"
        },
        {
          value: "shzxt01",
          label: "守护者信条"
        },
        {
          value: "xy01",
          label: "校园答题"
        },
        {
          value: "xy02",
          label: "校园恐爆答题"
        },
        {
          value: "debug",
          label: "测试专用"
        }
      ],
      formValue: ""
    };
  },
  computed: {
    valueIsNull() {
      return this.formValue.trim() === "";
    }
  },
  methods: {
    submit_form() {
      !this.valueIsNull && this.$emit("search", this.formValue);
      return false;
    }
  }
};
</script>
