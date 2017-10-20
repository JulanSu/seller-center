import Mock from 'mockjs';

const GoodsCategory = [];

for (let i = 0; i < 20; i++) {
  GoodsCategory.push(Mock.mock({
    id: Mock.Random.guid(),
    //name: Mock.Random.cname(),
    name: Mock.Random.city(),
    lat: Mock.mock({
      "number|3-53.5-6": 1
    }),
    lon: Mock.mock({
      "number|73-153.5-6": 1
    }),
    telephone: Mock.Random.string('number', 11),
    address: Mock.mock('@county(true)'),
    description: Mock.mock('@csentence'),
  }));
}

export  { GoodsCategory };
