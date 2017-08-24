
import Vue from 'vue'

import Loading from '../components/loading/loading.vue'        //导入loading js 动画组件
import IconSvg from '../components/Icon-svg/index.vue';        // svg 组件
import Sticky from './Sticky/index.vue';                    // 粘性header组件
import MultiHandle from '../components/Multi-handle/index.vue';             // 多功能操作组件
import BackToTop from '../components/BackToTop/index.vue';                  //返回顶部


// register globally
Vue.component('loading', Loading);
Vue.component('icon-svg', IconSvg);
Vue.component('Sticky', Sticky);
Vue.component('multi-handle', MultiHandle);
Vue.component('back-to-top', BackToTop);

