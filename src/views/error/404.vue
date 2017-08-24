<template>
    <div class="errPage404">
        <el-row :gutter="10" class="errPage404-container">
            <el-col :xs="24" :sm="14" :md="14" :lg="14">
                <div class="pic-404">
                    <img class="pic-404__parent" :src="img_404" alt="404">
                    <img class="pic-404__child left" :src="img_404_cloud" alt="404">
                    <img class="pic-404__child mid" :src="img_404_cloud" alt="404">
                    <img class="pic-404__child right" :src="img_404_cloud" alt="404">
                </div>
            </el-col>
            <el-col :xs="24" :sm="10" :md="10" :lg="10">
                <div class="bullshit">
                    <div class="bullshit__oops">404!</div>
                    <div class="bullshit__headline">{{ message }}</div>
                    <div class="bullshit__info">请检查您输入的网址是否正确，您可以点击以下按钮返回主页或者发送错误报告</div>
                    <div class="bullshit__info">
                        版权所有<a class='link-type' href='https://wallstreetcn.com' target='_blank'>MiMo - Broccoli spring( 高仓雄 - gcx )</a>
                    </div>

                    <a :href="routerUrl" class="bullshit__return-home" v-on:mouseenter="mouseEnter()" v-on:mouseleave="mouseLeave()">返回首页</a>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
                <transition leave-active-class="" enter-active-class="animated fadeIn">
                    <div class="epilogue fr" v-if="epilogueShow">
                        <p>
                            你好，很高兴认识你，同为软件开发者的我们，愿为软件开发行业贡献自己微薄之力，期待与你合作。
                            (Hello, nice to meet you, with the software developers, we are willing to contribute our meager efforts to the software development industry and look forward to working with you)
                            <span class="fr">——Broccoli spring</span>
                        </p>
                        <p>联系方式：</p>
                        <p>邮箱：Lensgcx@163.com</p>
                        <p>微信：Lensgcx</p>
                        <p>电话：18768183457</p>
                    </div>
                </transition>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import img_404 from '@/assets/img/web-error/404.png'
    import img_404_cloud from '@/assets/img/web-error/404_cloud.png'
    import Cookies from 'js-cookie';
    export default {
        name: 'errPage404',
        data() {
            return {
                message: '页面丢失，无法跳转',
                routerUrl: '',
                epilogueShow: false,
                img_404,
                img_404_cloud
            }
        },
        created () {
            // store-token，userInfo，and localStorage-token all setted，you can jump to homepage，or you only back to login page
            window.localStorage.getItem('mimo_broccoliSpringGcx_t_s') && this.$store.state.user.info.token && Cookies.get('userInfo') ? this.routerUrl = '/dashboard' : this.routerUrl = '/front/login';
        },
        methods: {
            mouseEnter() {
                this.epilogueShow = !this.epilogueShow;
            },
            mouseLeave(){
                this.epilogueShow = !this.epilogueShow;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../../../src/assets/css/Modular/errorpage';
</style>
