// 引入mockjs
import Mock from 'mockjs';
// 把JSON数据格式引入进来
import banner from './banner';
import floor from './floor';

// mock数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })
