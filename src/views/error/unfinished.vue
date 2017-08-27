<template>
    <div class="win" id="unfinished">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/dashboard'"></multi-handle>
        <div class="errPage404">
            <el-row :gutter="10" class="errPage404-container">
                <el-col :xs="24" :sm="16" :md="14" :lg="12">
                    <div class="pic-404">
                        <img class="pic-404__parent" :src="unfinished" alt="404">
                    </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="12">
                    <div class="bullshit">
                        <div class="bullshit__oops">页面未完工</div>
                        <div class="bullshit__headline">程序员正在抓紧建设中</div>
                        <div class="bullshit__info">如果您急切期待页面内容，请联系我们：Lensgcx@163.com</div>
                        <div class="bullshit__info">
                            版权所有<a class='link-type' href='https://github.com/MiMo-Team/MiMo-Design' target='_blank'>MiMo - Broccoli spring( 高仓雄 - gcx )</a>
                        </div>
                        <a @click="back" class="bullshit__return-home" v-on:mouseenter="mouseEnter()" v-on:mouseleave="mouseLeave()">返回上页</a>
                    </div>
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
    </div>
</template>
<script>
    import unfinished from '@/assets/img/web-error/unfinished.png'
    import Cookies from 'js-cookie';
    export default {
        name: 'errPage404',
        data() {
            return {
                epilogueShow: false,
                unfinished,
            }
        },
        methods: {
            mouseEnter() {
                this.epilogueShow = !this.epilogueShow;
            },
            mouseLeave(){
                this.epilogueShow = !this.epilogueShow;
            },
            back() {
                if (this.$route.query.noGoBack) {
                    this.$router.push({path: '/front/login'});
                } else {
                    this.$router.go(-1);
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../../../src/assets/css/Modular/errorpage';
    $back:rgba(255, 255, 255, 1);
    #unfinished{
        background-color: $back;
        .errPage404{
            background-color: $back;
            .errPage404-container{
                padding: 20px 50px;
                .pic-404{
                    padding-top: 0;
                }
                .bullshit__oops{
                    font-size: 48px;
                }
                .bullshit__headline{
                    font-size: 26px;
                }
                .epilogue {
                    width: 100%;
                }
            }
        }
    }
</style>
