/**
 * Created by zzmhot on 2017/3/21.
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/21 16:04
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import {
  cookieStorage
} from 'common/storage'

const state = {
  userinfo: null, // 用户基础信息
  game_config: null, // 游戏基础配置
  position: { // 当前位置坐标（GPS）
    lng: 0,
    lat: 0,
    acc: 0,
    time: 0,
  },
  task: { // 当前任务记录（需要随时保存）
    status: 0,
    cid: null,
    qid: null,
    answer: '',
    success: false,
    multi_shake_count: 0, // 多人摇一摇进度
  },
  record: { // 游戏完成情况（需要随时保存）
    mark: 0, // 成绩
    time: 0, // 耗时
    begin_time: 0, // 开始时间
    list: [], // 题目完成记录
    tools: [], // 获得的道具
    maps: [], // 地图显示关卡
  },
  checkpoint: null, // 当前关卡
  checkpoint_list: null, // 可以使用关卡列表
  question: null, // 当前题目
  question_list: null, // 待选题库
  load_status: 0, // 加载进度
  weixin_status: false, // 微信授权状态
  ws: null, // WebSocket
};

export default {
    // 游戏邀请码
  game_code: '',
  // 游戏基础配置
  game_config: null,
  // 关卡列表
  checkpoint_list: [],
  // 用户信息和是否登录
  user_info: cookieStorage.get('user_info')
}
