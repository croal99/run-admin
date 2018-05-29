/**
 * @file: passphrase.
 * @intro: 媒体文件管理.
 * @author: xpchen.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_passphrase} from 'common/port_uri'

// 获取口令文件列表
export function passphrase_list(game_code) {
  let data;
  return fetch({
    url: port_passphrase.passphrase_list+'?path=game/'+game_code+'/auth',
    method: 'get',
    data
  })
}


export function edit_passphrase(data) {
  return fetch({
    url: port_passphrase.edit_passphrase,
    method: 'post',
    data
  })
}


export function delete_passphrase(data) {
  return fetch({
    url: port_passphrase.delete_passphrase,
    method: 'post',
    data
  })
}
