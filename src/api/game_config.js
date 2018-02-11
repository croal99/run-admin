/**
 * @file: file.
 * @intro: 游戏配置.
 * @author: zzmhot.
 * @email: zzmhot@163.com.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_game_config} from 'common/port_uri'

// 获取游戏基础配置
export function baseinfo(data) {
  console.log('baseinfo', data);
  return fetch({
    url: port_game_config.config,
    method: 'post',
    data
  })
}
