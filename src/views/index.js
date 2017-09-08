/*
 * Created by Broccoli spring( gcx ) on 2017/6/5.
 * Routing configuration for the UI interface, this project selects element-ui as the UI framework.
 */

/* ============================== css / less /sass ==============================*/
//引入全局的animate     css文件
require('../assets/css/animate/animate.css');
//css- reset   样式css文件
import '../assets/css/reset.css'
//引入全局的element-ui     css文件
import 'element-ui/lib/theme-default/index.css'
//引入自定义修改 element-ui
// import '../assets/css/theme/index.css'
// 换肤版本element-ui css
import '../assets/css/skin/custom-theme-changeself.scss';
import '../assets/css/skin/custom-theme-pinktemptation.scss';
import '../assets/css/skin/custom-theme-goldenyear.scss';
import '../assets/css/skin/custom-theme-blackhole.scss';
import '../assets/css/skin/custom-theme-spring.scss';
//public css
import '../assets/css/public.scss'
//bench index style
import '../assets/css/view/layout.scss'
//front
import '../assets/css/view/front.scss'



// ----- Modular css -----
//Modular - button
import '../assets/css/Modular/btn.scss'
//Modular - form
import '../assets/css/Modular/form.less'
//Modular - table
import '../assets/css/Modular/table.scss'
//Modular - pagination
import '../assets/css/Modular/pagination.scss'
//Modular - upload
import '../assets/css/Modular/upload.scss'
//Modular - upload
import '../assets/css/Modular/dialog.scss'

/* ============================== js ( Framework or auxiliary function ) ============================== */
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueLazyload from 'vue-lazyload'                                  //vue 懒加载组件
import iconfont from '../assets/iconfont/iconfont';                   // iconfont svg 图标

/* ======== 懒加载模块 默认 设置 ======== */
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('../../src/assets/img/lazyload/error/error2.jpg'),
    loading: require('../../src/assets/img/lazyload/loading/lazyloading4.png'),
    attempt: 1,
    listenEvents: ['scroll']  // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
});

//auxiliary plus function
import assistant from '../../src/assets/js/assistant/assistant';
//notice - auxiliary plus function
import notice from '../../src/assets/js/assistant/notice';
//tableDateHandle - auxiliary plus function
import tableDateHandle from '../../src/assets/js/assistant/tableDateHandle';
//Filter data
import filter from '../../src/assets/js/assistant/filter';
//validate plug-in unit
import validate from '../../src/assets/js/validate/validate';
//localStorage
import echart from '../assets/js/assistant/echart';
// waves command
import vueWaves from '../directive/waves';
// 粘性header组件
import Sticky from '../directive/sticky';





//localStorage
import localStorage from '../assets/js/localStorage.js';


Vue.use(ElementUI);

Vue.use(assistant);
Vue.use(notice);
Vue.use(tableDateHandle);
Vue.use(filter);

Vue.use(validate);
Vue.use(echart);
Vue.use(vueWaves);
Vue.use(Sticky);
Vue.use(VueLazyload);
Vue.use(iconfont);
Vue.use(localStorage);

new Vue({
    ElementUI,
});