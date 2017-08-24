import Cookies from 'js-cookie';
// 从 type 中引入注册的方法
import {
    TOGGLE_SIDEBAR,
} from '../types'

//操作处理
export default {
    //转换sidebar 状态值
    [TOGGLE_SIDEBAR](state){
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1);
        } else {
            Cookies.set('sidebarStatus', 0);
        }
        state.sidebar.opened = !state.sidebar.opened;

    }
}
