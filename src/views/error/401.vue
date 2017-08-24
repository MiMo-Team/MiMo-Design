<template>
    <div class="errPage401">
        <div class="errPage401-container">
            <el-row>
                <el-col :xs="0" :sm="4" :md="4" :lg="4" style="height: 100px"></el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8">
                    <img :src="errGif" width="80%" alt="Girl has dropped her ice cream.">
                </el-col>
                <el-col :xs="11" :sm="8" :md="8" :lg="8">
                    <el-button @click="back" icon='arrow-left' class="pan-back-btn">
                        <span v-on:mouseenter="mouseEnter()" v-on:mouseleave="mouseLeave()">返回</span>
                    </el-button>
                    <h1 class="text-oops">401!</h1>
                    <h2 class="text-subtit">你没有权限访问该页面</h2>
                    <h5 class="text-info">请检查您是否已经正常登录，如有其他错误请联系管理员</h5>
                    <div class="text-info" style="margin-bottom: 30px;">
                        版权所有<a class='link-type' href='https://wallstreetcn.com' target='_blank'>MiMo - Broccoli spring( 高仓雄 - gcx )</a>
                    </div>
                    <ul class="list-unstyled">
                        <li>或者你可以去:</li>
                        <li>
                            <a :href="routerUrl" v-on:mouseenter="mouseEnter()" v-on:mouseleave="mouseLeave()">返回登录</a>
                        </li>
                        <li><a @click.prevent="dialogVisible=true" href="#">娱乐一下</a></li>
                    </ul>
                </el-col>
                <el-col :xs="0" :sm="12" :md="12" :lg="4" style="height: 100px"></el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
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
            <el-dialog title="随便看" :visible.sync="dialogVisible" size="large">
                <img class="pan-img" :src="ewizardClap">
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import errGif from '@/assets/img/web-error/401.gif'
    export default {
        name: 'errPage401',
        data() {
            return {
                epilogueShow: false,
                routerUrl: '/front/login',
                errGif: errGif + '?' + +new Date(),
                ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
                dialogVisible: false
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
                console.log('是否返回登录界面：' + this.$route.query.noGoBack);
                if (this.$route.query.noGoBack) {
                    this.$router.push({path: '/front/login'});
                } else {
                    this.$router.go(-1);
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../../../src/assets/css/Modular/errorpage';
</style>
