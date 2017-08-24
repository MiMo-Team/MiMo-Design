
// 从 type 中引入注册的方法
import {
    LOGIN,
    LOGOUT,

    USERINFOCARRIER,
    TOKENCARRIER,
    CURRENTDATA,


    INCREMENT,
    DECREMENT,
    CLICKODD
} from '../types'


// Vuex 中对 state 的修改只能在 mutation 的回调函数里
//操作处理
export default {
    //登录，在state 中保存 token
    [LOGIN](state, data){
        localStorage.mimo_broccoliSpringGcx_t_s = data;
        state.token = data;
    },
    //登出，在state 中删除 token
    [LOGOUT](state){
        localStorage.removeItem('mimo_broccoliSpringGcx_t_s');
        state.token = null
    },

    //赋值 给 user-info-Carrier 载体，方便传递 user-info 值
    [USERINFOCARRIER](state, data){
        state.user.userinfo.userInfoCarrier = data
    },
    //赋值 给 token-Carrier 载体，方便传递token值
    [TOKENCARRIER](state, data){
        state.user.userinfo.tokenCarrier = data
    },
    //赋值 给 current-data 载体，方便传递当前选中项的所有数据
    [CURRENTDATA](state, data){
        state.data.current = data
    },


    //增加，每次加一
    [INCREMENT](state){
        state.count++;
    },
    //减小，每次减一
    [DECREMENT](state){
        state.count--;
    },
    //翻三倍
    [CLICKODD](state){
        state.count *= 3;
    }

    // increment(state){state.count++;},		increment => [INCREMENT]
}
