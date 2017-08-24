// 引入type
import * as types from './types'

//处理,在actions 中导入方法，处理你要干什么，异步请求，判断，流程控制
export default {
    //转换sidebar
    ToggleSideBar: ({commit}) => {
        commit('TOGGLE_SIDEBAR')
    },
    //添加访问过页面的标签
    addVisitedViews: ({commit, view}) => {
        commit('ADD_VISITED_VIEWS', view)
    },
    //删除访问过页面的标签
    delVisitedViews: ({commit, view}) => {
        commit('DEL_VISITED_VIEWS', view)
    },


    //页面中标签，加操作函数，引入，若页面直接语句操作加入store中，建议直接 this.$store.commit(types.LOGIN, token);，跳过actions，到mutations
    increment: ({commit, state}) => {
        console.log("点击增加，当前数字：" + state.count);
        commit(types.INCREMENT)				//使用 type 中注册的方法
    },
    decrement: ({commit, state}) => {
        console.log("点击减少，当前数字：" + state.count);
        commit(types.DECREMENT)
    },
    clickOdd: ({commit, state}) => {
        if (state.count % 2 == 0) {
            console.log("count为偶数：" + state.count);
            commit(types.CLICKODD)
        }
    },
    clickAsync: ({commit, state}) => {
        new Promise((resolve) => {
                setTimeout(function () {
                    console.log("点击后1秒钟加一次，当前数字：" + state.count);
                    commit(types.INCREMENT);
                    resolve();
                }, 1000)
            }
        );
    }
    //所谓 Promise，就是一个对象，用来传递异步操作的消息。它代表了某个未来才会知道结果
    // 的事件（通常是一个异步操作），并且这个事件提供统一的 API，可供进一步处理。
}
