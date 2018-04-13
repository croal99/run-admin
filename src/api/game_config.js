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
export function get_config(data) {
  return fetch({
    url: port_game_config.get_config,
    method: 'post',
    data
  })
}

// 保存游戏基础配置
export function set_config(data) {
  return fetch({
    url: port_game_config.set_config,
    method: 'post',
    data
  })
}

// 获取游戏历史配置
export function config_list(data) {
  return fetch({
    url: port_game_config.config_list,
    method: 'post',
    data
  })
}

// 加载游戏历史配置
export function load_config(data) {
  return fetch({
    url: port_game_config.load_config,
    method: 'post',
    data
  })
}

// 保存CSS配置
export function set_css(data) {
  return fetch({
    url: port_game_config.set_css,
    method: 'post',
    data
  })
}

// 保存CSS配置
export function get_css(data) {
  return fetch({
    url: port_game_config.get_css,
    method: 'post',
    data
  })
}

// 获取用户列表
export function get_user_list(data) {
  return fetch({
    url: port_game_config.get_user_list,
    method: 'post',
    data
  })
}
