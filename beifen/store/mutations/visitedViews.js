
// 从 type 中引入注册的方法
import {
    ADD_VISITED_VIEWS,
    DEL_VISITED_VIEWS
} from '../types'

//操作处理
export default {
    ADD_VISITED_VIEWS: (state, view) => {
        if (state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
        let index;
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                index = i;
                break
            }
        }
        state.visitedViews.splice(index, 1)
    }
}
