//import * as ac from 'aircv4nodejs';
const ac = require('aircv4nodejs')
const sourceImg = ac.imread('112.png'); // 原始图像
const searchImg = ac.imread('12.png'); // 待查找的部分


const resultList = ac.findSift(sourceImg, searchImg);

console.log(resultList);