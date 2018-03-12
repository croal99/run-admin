/**
 * @file: media.
 * @intro: 媒体文件管理.
 * @author: xpchen.
 * @Date: 2017/5/8 15:31.
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import fetch from 'common/fetch'
import {port_media} from 'common/port_uri'

// 获取图片文件列表
export function picture_list(path) {
  let data;
  return fetch({
    url: port_media.picture_list+'?path='+path,
    method: 'get',
    data
  })
}


export function delete_picture(path) {
  let data;
  return fetch({
    url: port_media.delete_picture+'?path='+path,
    method: 'get',
    data
  })
}
