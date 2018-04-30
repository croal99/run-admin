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
import * as type from 'store/mutations/type'
import {
  cookieStorage
} from 'common/storage'

export default {
  set_game_code(state, code) {
    state.game_code = code;
  },

  // 初始化游戏基础配置
  set_game_config(state, config) {
    state.game_config = config;

    // welcome
    if (!state.game_config.hasOwnProperty('welcome')) {
      state.game_config.welcome   = {'html':'<!-- welcome -->'};
    }

    // end
    if (!state.game_config.hasOwnProperty('end')) {
      state.game_config.end   = {'html':'<!-- end -->'};
    }

    // 关卡列表
    state.checkpoint_list = [];
    for (var key in state.game_config.checkpoint_list) {
      let checkpoint = state.game_config.checkpoint_list[key];
      state.checkpoint_list.push(checkpoint);
    }

    // 题库列表
    state.question_list = [];
    for (var key in state.game_config.question_list) {
      let question = state.game_config.question_list[key];
      state.question_list.push(question);
    }
  },

  // 添加关卡
  add_checkpoint(state, checkpoint) {
    // 查找最大ID号
    let id = 0;
    for (var key in state.game_config.checkpoint_list) {
      let temp_data = state.game_config.checkpoint_list[key];
      if (id < temp_data.id) {
        id = temp_data.id;
      }
    }

    // 修改ID号，添加到配置
    id++;
    checkpoint.id = id;
    state.game_config.checkpoint_list[id] = checkpoint;
    state.checkpoint_list.push(checkpoint);
  },

  // 删除关卡
  del_checkpoint(state, id) {
    // 删除配置信息
    delete state.game_config.checkpoint_list[id];

    // 重新创建关卡列表（用于显示）
    state.checkpoint_list = [];
    for (var key in state.game_config.checkpoint_list) {
      let checkpoint = state.game_config.checkpoint_list[key];
      state.checkpoint_list.push(checkpoint);
    }
  },

  // 添加题目
  add_question(state, question) {
    // 查找最大ID号
    let id = 0;
    for (var key in state.game_config.question_list) {
      let temp_data = state.game_config.question_list[key];
      if (id < temp_data.id) {
        id = temp_data.id;
      }
    }

    // 修改ID号，添加到配置
    id++;
    question.id = id;
    state.game_config.question_list[id] = question;
    state.question_list.push(question);
  },

  // 删除关卡
  del_question(state, id) {
    // 删除配置信息
    delete state.game_config.question_list[id];

    // 重新创建题库列表（用于显示）
    state.question_list = [];
    for (var key in state.game_config.question_list) {
      let question = state.game_config.question_list[key];
      state.question_list.push(question);
    }
  },

  // 设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo) {
    state.user_info = userinfo || {}
    if (userinfo === null) {
      cookieStorage.remove('user_info')
    } else {
      cookieStorage.set('user_info', userinfo)
    }
  }
}
