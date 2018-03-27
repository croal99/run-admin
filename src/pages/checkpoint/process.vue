<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-row>
        <el-col>
          <el-form :inline="true">
            <el-form-item>
              <el-button @click="$router.back()">返回</el-button>
            </el-form-item>
          </el-form>
            <div id="question_chart" style="overflow-y:scroll;overflow-x:scroll;"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
import { panelTitle } from "components";
import { orgTree } from "components";

export default {
  data() {
    return {
      checkpoint: null,
      question_chart: null,
      question_list: { name: "root", children: [] }
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.checkpoint = this.$store.state.game_config.checkpoint_list[id];

    // 基于准备好的dom，初始化echarts实例
    document.getElementById("question_chart").style.height =
      window.innerHeight - 110 + "px";

    this.question_chart = echarts.init(
      document.getElementById("question_chart")
    );

    this.create_list();
  },
  methods: {
    // 创建题目列表
    create_list() {
      // console.log(this.chartData);
      // console.log(this.tempData);
      // this.chartData = this.tempData;
      // console.log(this.chartData);
      // return;

      let question = this.$store.state.game_config.question_list[
        this.checkpoint.question
      ];
      let detail = this.question_detail(this.question_list, question.id);
      // return;
      let data = {
        name: this.question_info(detail.question),
        children: detail.children
      };

      let option = {
        series: [
          {
            type: "tree",
            data: [data],

            // top: "8%",
            // left: "8%",
            // bottom: "8%",
            // right: "20%",

            // symbolSize: 7,

            // symbol: "emptyCircle",

            // orient: "vertical",

            // expandAndCollapse: true,

            // label: {
            //   normal: {
            //     position: "top",
            //     rotate: -90,
            //     verticalAlign: "middle",
            //     align: "right",
            //     fontSize: 16
            //   }
            // },

            // leaves: {
            //   label: {
            //     normal: {
            //       position: "bottom",
            //       rotate: -90,
            //       verticalAlign: "middle",
            //       align: "left"
            //     }
            //   }
            // },

            rootLocation: { x: "center", y: "10%" }, // 根节点位置  {x: 'center',y: 10}
            nodePadding: 150,
            layerPadding: 80,
            orient: "vertical", // vertical horizontal
            symbol: "rectangle", // 'circle' | 'rectangle' | 'triangle' | 'diamond' | 'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond'
            // borderColor: "black",
            itemStyle: {
              normal: {
                color: "#fff", //节点背景色
                label: {
                  show: true,
                  position: "inside",
                  textStyle: {
                    color: "black",
                    fontSize: 15,
                    fontWeight: "bolder"
                  }
                },
                lineStyle: {
                  color: "#000",
                  width: 1,
                  type: "broken" // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                }
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          }
        ]
      };

      this.question_chart.setOption(option);
    },

    // 题目信息
    question_info(question) {
      let question_name = "未知类型";
      switch (parseInt(question.type)) {
        case 0:
          question_name = "分类目录";
          break;
        case 3:
          question_name = "上传照片";
          break;
        case 5:
          question_name = "普通道具";
          break;
        case 6:
          question_name = "单选/多选题";
          break;
        case 7:
          question_name = "多人摇一摇";
          break;
        case 9:
          question_name = "任务书";
          break;
        case 11:
          question_name = "填空题";
          break;
        case 12:
          question_name = "晋级书";
          break;
      }

      return question_name + "(" + question.id + ")\r\n" + question.name;
    },

    // 递归查询题目关系
    question_detail(data, qid) {
      if (qid == 0) {
        return false;
      }
      let question = this.$store.state.game_config.question_list[qid];
      console.log("question", data, qid, question.type);
      let children_list = [];

      // 正确分支
      let child_item = this.question_detail(data, question.true_id);
      if (child_item) {
        let children = {
          name: "正确：" + this.question_info(child_item.question),
          children: child_item.children
        };
        children_list.push(children);
      } else if(parseInt(question.type) != 0){
        let children = { name: "正确：结束" };
        children_list.push(children);
      }

      // 错误分支
      child_item = this.question_detail(data, question.false_id);
      if (child_item) {
        let children = {
          name: "错误：" + this.question_info(child_item.question),
          children: child_item.children
        };
        children_list.push(children);
      } else if(parseInt(question.type) != 0){
        let children = { name: "错误：结束" };
        children_list.push(children);
      }

      //分类目录
      if (parseInt(question.type) == 0){
        let children_list0 = question.items.split(',');
        console.log('type0',children_list0);
        for(let i = 0; i < children_list0.length; i++){
          child_item = this.question_detail(data, children_list0[i]);
          if (child_item) {
            let children = {
              name: this.question_info(child_item.question),
              children: child_item.children
            };
            children_list.push(children);
          } else {
            let children = { name: children_list0[i] + "错误" };
            children_list.push(children);
          }
        }
      }

      // data.name = this.question_info(question);
      //   data.name = question.id;
      if (parseInt(question.true_id) != 0 || parseInt(question.false_id) != 0 || parseInt(question.type) == 0) {
        // 至少要有一个分支，才显示下一级
        // console.log("child1", question);
        // data.children = children_list;
        return { question: question, children: children_list };
      } else {
        // console.log("child2", question);
        return { question: question, children: [] };
      }
    }
  },
  components: {
    panelTitle
  }
};
</script>