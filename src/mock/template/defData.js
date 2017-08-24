import Mock from 'mockjs';
import $store from '../../store/index'

// console.log($store)
/* ================= Define url params ================= */
const baseUrl = $store.state.mock.url.baseUrl;

const branchUrl = '/test/defData';
const mockUrl = baseUrl + branchUrl;

/* ================= Data generation template（you can custom）================= */
const obj = {'aa':'11', 'bb':'22', 'cc':'33', 'dd':'44'};
const defData = {
    'success': true,
    "id|+1": 1,
    'first': '@FIRST',
    'middle': '@FIRST',
    'last': '@LAST',
    'full': '@first @middle @last',
    '随机5-10位数字': /\d{5,10}/,
    '随机生成6位 数字+英文': /^[a-zA-Z0-9]{6,10}$/,
    'url': '@url',
    'email': '@EMAIL',                                      //随机生成一个邮箱
    'username': '[@username](/user/name)()',
    'age|1-100': 100,
    'color': '@color',
    'name': Mock.Random.cname(),                                                //随机产生一个中文的姓名
    'addr': Mock.mock('@county(true)'),                                         //随机生成一个地址
    'age|18-60': 2,                                                             //随机生成 2 个数字 大小在18到60
    'birth': Mock.Random.date(),                                                //随机生成一个日期
    'sex': Mock.Random.integer(0, 1),                                           //随机生成一个整数，0/1 ，根据这个来给“男” “女”
    'moblie|1': ['13531544954', '13632250649', '15820292420', '15999905612'],   //在数组中随机找一个
    'num1|1-100.2': 1,                                                          //1-100 中随机生成一个保留两位小数点
    'num2|100-300.2': 1,
    'classroom|1': ['精品语文班', '精品作业A班', '英语班', '语文班'],
    'from|2': ['到店咨询', '微店', '壹家教', '学习服务平台'],
    'status|1': ['意识强烈', '预报名', '意向一般', '暂无意向'],
    'time1': Mock.Random.date("yyyy - MM - dd"),
    'mobile': /^1[0-9]{10}$/,                                                   //用正则匹配1开头的11位数字的手机号
    'date': '@DATE',                                                            //随即生成一段日期字符串,默认格式为 yyyy-MM-dd
    'time2': '@TIME',//随机生成一段时间字符串,默认格式为 HH:mm:bench
    'datetime': '@DATETIME', //随机生成一段时间字符串，默认格式为 yyyy-MM-dd HH:mm:bench
    'constellation': '@CONSTELLATION',
    //属性 guid 是唯一机器码
    'guid': '@guid',
    //属性 id 是随机id
    'id': '@id',
    //属性 title 是一个随机长度的标题
    'title': '@title()',
    //属性 paragraph 是一个随机长度的段落
    'paragraph': '@cparagraph',
    //属性 image 是一个随机图片 参数分别为size, background, text
    'image': "@image('200x100', '#4A7BF7', 'Hello')",
    //属性 address 是一个随机地址
    'address': '@county(true)',
    //属性 date 是一个yyyy-MM-dd 的随机日期
    'date': '@date("yyyy-MM-dd")',
    //属性 time 是一个 size, background, text 的随机时间
    'time': '@time("HH:mm:ss")',
    //属性 url 是一个随机的url
    'url': '@url',
    //属性 ip 是一个随机ip
    'ip': '@ip',
    //属性 regexp 是一个正则表达式匹配到的值 如aA1
    'regexp': /[a-z][A-Z][0-9]/,
    'name': '@cname',  // 中文名称
    'id|+1': 88,    // 属性值自动加 1，初始值为88
    'age|18-28': 0,   // 18至28以内随机整数, 0只是用来确定类型
    'birthday': '@date("yyyy-MM-dd")',  // 日期
    'city': '@city(true)',   // 中国城市
    'color': '@color',  // 16进制颜色
    'isMale|1': true,  // 布尔值
    'isFat|1-2': true,  // true的概率是1/3
    'fromObj|2': obj,  // 从obj对象中随机获取2个属性
    'fromObj2|1-3': obj,  // 从obj对象中随机获取1至3个属性
    'brother|1': ['jack', 'jim'], // 随机选取 1 个元素
    'sister|+1': ['jack', 'jim', 'lily'], // array中顺序选取元素作为结果
    'friends|2': ['jack', 'jim'] // 重复2次属性值生成一个新数组

};

// 设置4秒后再响应
// Mock.setup({ timeout: 4000 });

// 设置1秒至4秒间响应
// Mock.setup({ timeout: '1000-4000' });


/**
 * mock-Test  模拟数据加载
 * @param tem             数据定义模板
 */
const mockTest = function (tem) {
    Mock.mock(mockUrl, tem);
};
//将对应变量值以 mockUrl、defData、mockTest 变量标识符形式暴露给其他文件而被读取到
export {defData, mockTest}



