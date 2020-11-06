const { resUrl } = require('./constant');
const { category } = require('./constant');
function randomArray(n, l) {
  let rnd = [];
  for (let i = 0; i < n; i++) {
    rnd.push(Math.floor(Math.random() * l));
  }
  return rnd;
}
function createData(results, key) {
  const data = results[key];
  return handleData(data);
}
function handleData(data) {
  if (!data.cover.startsWith('http://')) {
    data['cover'] = `${resUrl}/img/${data.cover}`;
  }
  data['selected'] = false;
  data['private'] = false;
  data['cache'] = false;
  data['haveRead'] = false;
  return data;
}
function createGuessLike(data) {
  const n = parseInt(randomArray(1, 3)) + 1;
  data['type'] = n;
  switch (n) {
    case 1:
      data['result'] = data.id % 2 === 0 ? '《Executing Magic》' : '《Elements Of Robotics》';
      break;
    case 2:
      data['result'] =
        data.id % 2 === 0 ? '《Improving Psychiatric Care》' : '《Programming Languages》';
      break;
    case 3:
      data['result'] = '《Living with Disfigurement》';
      data['percent'] = data.id % 2 === 0 ? '92%' : '97%';
      break;
  }
  return data;
}

function createRecommendData(data) {
  data['readers'] = Math.floor((data.id / 2) * randomArray(1, 100));
  return data;
}
function createCategoryData(data) {
  const categoryIds = createCategoryIds(6);
  const result = [];
  categoryIds.forEach(id => {
    const subList = data.filter(item => item.category === id).slice(0, 4);
    subList.map(item => handleData(item));
    result.push({
      category: id,
      list: subList
    });
  });
  return result.filter(item => item.list.length === 4);
}
function createCategoryIds(n) {
  const arr = [];
  category.forEach((item, index) => {
    arr.push(index + 1);
  });
  console.log(arr);
  const result = [];
  for (let i = 0; i < n; i++) {
    // 获取的随机数不能重复
    let ran = Math.floor(Math.random() * (arr.length - 1));
    // 胡哦去分类对应的序号
    result.push(arr[ran]);
    // 将已经获取到的随机数  用最后一个取代
    arr[ran] = arr[arr.length - i - 1];
  }
  return result;
}
module.exports = {
  randomArray,
  createData,
  createGuessLike,
  createRecommendData,
  createCategoryData,
  handleData
};
