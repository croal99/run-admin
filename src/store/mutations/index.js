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
