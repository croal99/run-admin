<template>
  <div class="panel">
    <el-dialog title="二維碼" :visible.sync="showFlag">
      <div style="text-align: center" >
        <canvas id="qrcode">二维码位置</canvas>
      </div>
    </el-dialog>
    <el-dialog title="新建游戏" :visible.sync="showFlag2">
      <el-form :model="form" :rules="rules" ref="form" :inline="false">
        <el-form-item label="游戏名:" prop="name">
            <el-input type="text" v-model="form.name" placeholder="新游戏的名称"></el-input>
        </el-form-item>
        <el-form-item label="code:" prop="code">
            <el-input type="text" v-model="form.code" placeholder="新游戏的code"></el-input>
        </el-form-item>
        <el-button type="submit" @click="onSubmit()">确定</el-button>
      </el-form>
    </el-dialog>
    <el-form :inline="true" style="float:right;">
      <el-form-item>
        <el-button type="primary" icon="plus" size="small" @click="showFlag2 = true">新建游戏</el-button>
      </el-form-item>
    </el-form>  
    <panel-title :title="$route.meta.title"></panel-title>
      <el-form :inline="true" style="position:absolute;top:2px;left:120px;">
        <el-form-item>
          <el-input :value="game_link" style="width:350px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="jsCopy" type="default" size="small">复制</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="default" size="small" @click="showFlag = true;qrcode(game_link)">游戏二維碼</el-button>
        </el-form-item>
      </el-form>
    <div class="panel-body">
      <el-form :inline="true">
        <el-form-item label="游戏名称">
          <el-select v-model="$store.state.game_code" placeholder="游戏">
            <el-option v-for="game in game_list" :key="game.value" :label="game.label" :value="game.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="set_game">设置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="save_game">保存</el-button>
        </el-form-item>
        <el-form-item>
          <a :href="ob_link"><el-button type="default" size="small" style="margin-left:30px;">OB</el-button></a>
        </el-form-item>
        <el-form-item>
          <el-button type="default" size="small" @click="showFlag = true;qrcode(ob_link)">OB码</el-button>
        </el-form-item>
        <el-form-item>
          <a :href="rank_link"><el-button type="default" size="small">RANK</el-button></a>
        </el-form-item>
        <el-form-item>
          <el-button type="default" size="small" @click="showFlag = true;qrcode(rank_link)">RANK码</el-button>
        </el-form-item>
        <el-form-item>
          <a :href="news_link"><el-button type="default" size="small">消息</el-button></a>
        </el-form-item>
        <el-form-item>
          <el-button type="default" size="small" @click="showFlag = true;qrcode(news_link)">消息码</el-button>
        </el-form-item>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="基本设置">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="名称（name）:" prop="name">
              <el-input v-model="game_config.name" placeholder="名称" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="说明（memo）:" prop="memo">
              <el-input v-model="game_config.memo" placeholder="游戏说明" style="width: 400px;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="历史版本">
          <el-table :data="config_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
            <el-table-column prop="filename" label="文件名" width="200">
            </el-table-column>
            <el-table-column prop="memo" label="说明" width="250">
            </el-table-column>
            <el-table-column prop="mtime" label="时间">
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="props">
                <el-button type="success" size="mini" icon="edit" @click="load_config(props.row)">加载</el-button>
                <!-- <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row)">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="welcome">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="HTML:">
              <el-input v-model="game_config.welcome.html" placeholder="HTML" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="end">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="HTML:">
              <el-input v-model="game_config.end.html" placeholder="HTML" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="CSS">
          <el-form label-width="150px">
            <el-form-item label="CSS:">
              <el-input v-model="game_css" placeholder="CSS" type="textarea" :rows="20" style="width: 90%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="get_css()">加载</el-button>
              <el-button @click="set_css()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="media">
          <el-form v-if="game_config" label-width="150px">
            <el-form-item label="全局背景音乐:" prop="audio">
              <el-input v-model="game_config.audio" placeholder="audio" style="width: 400px;"></el-input>
              <i @click="play_audio" :class="{'fa-spin': media.audio}" class="fa fa-play-circle fa-2x fa-fw" style="vertical-align:middle;"></i>
              <audio :src="game_config.audio" controls="controls" preload id="music1" hidden></audio>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
      </el-tabs>

    </div>
  </div>
</template>

<script type="text/javascript">
import { panelTitle } from "components";
import QRCode from 'qrcode';
export default {
  data() {
    var validateCode = (rule, value, callback) => {
      for(let game of this.game_list){
        if(game.value == value){
          callback(new Error('code已经存在！'));
        }
      }
      callback();
    };
    return {
      // 游戏列表
      game_list: '',
      form: {
        name: '',
        code: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入游戏名称', trigger: 'blur, change' },
        ],
        code: [
          { required: true, message: '请输入游戏code', trigger: 'blur, change' },
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      config_list: [], // 游戏配置
      game_config: null,
      game_css: '',
      load_data: false, // 请求时的loading效果
      showFlag: false,
      showFlag2: false,
      canvas:document.getElementById('qrcode'),
      media: {
        audio:false,
      }
    };
  },
  created() {
    if (this.$store.state.game_code) {
      this.load_data = true;
      this.get_config_list();
    };
    
    this.get_game_code_list()
  },
  methods: {    
    qrcode (link) {
        var canvas = document.getElementById('qrcode')
 
        QRCode.toCanvas(canvas, link, function (error) {
          if (error) console.error(error)
        })
    },

    // 加载游戏历史
    load_config(config) {
      this.load_data = true;
      this.$fetch.api_game_config
        .load_config({
          fullname: config.fullname
        })
        .then(({ data }) => {
          this.$message.success("加载历史数据成功");
          this.$store.commit("set_game_config", data);
          this.game_config = this.$store.state.game_config;
          this.load_data = false;
        });
    },

    // 获取游戏配置列表
    get_config_list() {
      this.$fetch.api_game_config
        .config_list({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.config_list = data;
          this.load_data = false;
        });
    },

    // 保存游戏数据
    save_game() {
      this.load_message = "保存数据";
      this.load_data = true;
      this.$fetch.api_game_config
        .set_config(this.$store.state.game_config)
        .then(({ data }) => {
          this.set_game();
        })
        .catch(() => {
          this.load_data = false;
        });
    },

    // 设置游戏数据
    set_game() {
      this.load_data = true;
      this.$fetch.api_game_config
        .get_config({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.$message.success("加载成功");
          this.$store.commit("set_game_config", data);
          this.game_config = this.$store.state.game_config;
          this.get_config_list();
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
        });
    },

    // 设置CSS数据
    get_css() {
      this.load_data = true;
      this.$fetch.api_game_config
        .get_css({
          code: this.$store.state.game_code
        })
        .then(({ data }) => {
          this.$message.success("加载成功");
          this.game_css = data;
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
          this.game_css = '';
        });
    },

    // 设置CSS数据
    set_css() {
      this.load_data = true;
      this.$fetch.api_game_config
        .set_css({
          code: this.$store.state.game_code,
          css: this.game_css
        })
        .then(({ data }) => {
          this.$message.success("保存成功");
        })
        .catch(() => {
          this.$notify.info({
            title: "提示",
            message: "发生错误了"
          });
        });
    },

    // 获取游戏code列表
    get_game_code_list(){
      this.$fetch.api_game_config
        .get_game_code_list()
        .then(({ data }) => {
          this.game_list = data
      });
    },

    // 新建游戏提交
    onSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.showFlag2 = false
          this.$fetch.api_game_config
            .set_game_code_list({
              name: this.form.name,
              code: this.form.code
            })
            .then(({ data }) => {
              this.$message.success("保存成功");
              this.get_game_code_list()
            })
            .catch(() => {
              this.$notify.info({
                title: "提示",
                message: msg
              })
            });
        } else {
          console.log('error submit!!')
          return false
        }
      });
    },
    
    jsCopy(){ 
      // 创建'虚拟'DOM
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', this.game_link)
      input.select()
      let ret = document.execCommand('copy')
      if (ret) {
        this.$message({
          type: 'success',
          message: '复制成功!'
        })
      }else{
        this.$message({
          type: 'warning',
          message: '复制失败!强烈要求换一个浏览器！！'
        })
      }
      // 删除'虚拟'DOM
      document.body.removeChild(input)
    },

    play_audio(){
      var audio = document.getElementById('music1'); 
      if(audio!==null){             
          //检测播放是否已暂停.audio.paused 在播放器播放时返回false.
          this.media.audio = audio.paused;
        if(audio.paused){                 
          audio.play();//audio.play();// 这个就是播放  
        }else{
          audio.pause();// 这个就是暂停
        }
      }
    }
  },
  computed: {
      ob_link : function(){
        return 'https://game.591cms.com/game/ob?game_code='+this.$store.state.game_code;
      },
      rank_link : function(){
        return 'https://game.591cms.com/api3/pre_rank?code='+this.$store.state.game_code;
      },
      game_link : function(){
        return 'https://game.591cms.com/play/index.html?'+this.$store.state.game_code;
      },
      news_link : function(){
        return 'https://game.591cms.com/game/news?game_code='+this.$store.state.game_code;
      }
  },
  components: {
    panelTitle,
    QRCode: QRCode
  },
};
</script>