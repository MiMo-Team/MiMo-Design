<!--login-->
<template>
    <div class="front-content" id="login">
        <div class="contView">
            <div class="large-tit">Welcome</div>
            <div class="fcont">
                <el-form :model="loginForm" :rules="rules_login" ref="loginForm" class="demo-ruleForm">
                    <!--用户名-->
                    <el-form-item prop="account">
                        <el-input type="account" v-model="loginForm.account" auto-complete="off" placeholder="用户名"></el-input>
                    </el-form-item>
                    <!--密码-->
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <!--记住密码/忘记密码/立即注册-->
                    <el-form-item prop="resource" class="handle">
                        <el-checkbox-group v-model="loginForm.remember" class="fl remember">
                            <el-checkbox label="记住密码" name="remember"></el-checkbox>
                        </el-checkbox-group>
                        <div class="fr">
                            <router-link to="/front/fgt" class="el-checkbox__label fs14 clrW98">忘记密码?</router-link>
                            <router-link to="/front/handlemode" class="el-checkbox__label fs14 clrW98">立即注册</router-link>
                        </div>
                    </el-form-item>
                    <!--登陆-->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" v-waves class="large-submit">登录</el-button>
                    </el-form-item>
                </el-form>
                <!--使用社交账号登陆-->
                <div class="thirdlogin clear">
                    <p class="fl">使用社交账号登陆:</p>
                    <div class="thirdlogin_part fr">
                        <router-link to="">
                            <img src="../../assets/img/logo/other/wechat.png">
                        </router-link>
                        <router-link to="">
                            <img src="../../assets/img/logo/other/QQ.png">
                        </router-link>
                        <router-link to="">
                            <img src="../../assets/img/logo/other/weibo.png">
                        </router-link>
                        <router-link to="">
                            <img src="../../assets/img/logo/other/douban.png">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import CryptoJS from 'crypto-js'
    export default {
        data() {
            return {
                loginSuccess: '登录成功，正在跳转...',
                loginInfo: '账号需等待系统管理员审核，审核后方可登录',
                loginWarn: '用户被禁用，请联系系统管理员',
                loginError1: '你输入的密码和账户名不匹配,请重新输入',
                loginError2: '登录错误，请联系系统管理员',
                mockUrl: '',
                //反重复提交开关
                submitSwitch: true,
                loginForm: {
                    account: '',
                    password: '',
                    remember: true,
                },
                rules_login: {
                    account: [
                        {required: true, message: '请输入用户名', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '清输入密码', trigger: 'change'}
                    ]
                }
            };
        },
        created () {
            /**
             * loginAutoHandle
             * @param t
             * @param user
             * @param ps
             * @param bol
             */
            const loginAutoHandle = function (t, user, ps, bol) {
                t.loginForm.account = user;
                t.loginForm.password = ps;
                t.loginForm.remember = bol;
            };
            //alert(this.cookie.get("autologin"));
            /* 在页面加载前，先判断是否cookie中有loginAuto值，没有则去除记住密码功能；若有的话，则获取账户和密码，开启记住密码功能。*/
            this.cookie.get("autologin_account") && this.cookie.get("autologin_account") ?
                loginAutoHandle(this, Cookies.get("autologin_account"), Cookies.get("autologin_password"), true) :
                loginAutoHandle(this, this.loginForm.account, this.loginForm.password, false);
        },
        methods: {
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            //本项目中暂时以账号开头前缀为标识符确认用户属性，实际项目中以后台返回数据为准
                            switch (this.loginForm.account.substring(0, 5)) {
                                case 'first':
                                    this.mockUrl = this.$store.state.mock.url.loginFirstUrl;
                                    break;
                                case 'admin':
                                    this.mockUrl = this.$store.state.mock.url.loginAdminUrl;
                                    break;
                                default:
                                    this.mockUrl = this.$store.state.mock.url.loginNormalUrl;
                            }
                            const params = {account: this.loginForm.account, password: this.loginForm.password};
                            this.axios.post(this.mockUrl, params,
                                //发送前
                                () => {
                                    //determine whether to select remember and, accordingly, perform cookie operations
                                    if (this.loginForm.remember) {
                                        Cookies.set("autologin_account", this.loginForm.account, 7);//设置为24天过期
                                        Cookies.set("autologin_password", this.loginForm.password, 7);
                                    }
                                    else {
                                        Cookies.set("autologin_account", '');
                                        Cookies.set("autologin_password", '');
                                    }
                                },
                                //登录成功
                                r => {
                                    console.log(r);
                                    if (r.flag === "login_success") {
                                        //存入 localStorage 和 $store
                                        window.localStorage.setItem('mimo_broccoliSpringGcx_t_s', r.user.data.token);
                                        //启用vuex中Login方法
                                        this.$store.dispatch('Login', r.user.data);
                                        //信息转换成字符串再加密，以token为解密秘钥
                                        const mi = CryptoJS.AES.encrypt(JSON.stringify(r.user.data), window.localStorage.getItem('mimo_broccoliSpringGcx_t_s'));
                                        //将加密用户信息写入Cookies中，不设置过期时间，则浏览器关闭cookies自动销毁
                                        Cookies.set('userInfo', mi);
//                                        console.log("加密结果:" + mi);
//                                        console.log("localStorage中的token是：" + window.localStorage.getItem('mimo_broccoliSpringGcx_t_s'));
//                                        console.log("store中的token是：" + this.$store.state.user.info.token);
//                                        console.log(this.$store.state.user.info);
                                        //弹出信息：登录成功
                                        this.unrepeatMsg(this, this.loginSuccess, 'success', 800, () => {
                                            this.submitSwitch = true;
                                            this.$router.push({path: '/index'});
                                        });
                                    }
                                    //账号需要审核
                                    else if (r.flag === "user_status_0") {
                                        this.$alert(
                                            this.loginInfo,
                                            '登录提示',
                                            {confirmButtonText: '确定', type: 'info', closeOnClickModal: true, closeOnPressEscape: true}
                                        );
                                    }
                                    //账号禁用
                                    else if (r.flag === "user_status_2") {
                                        this.$alert(
                                            this.loginWarn,
                                            '登录提示',
                                            {confirmButtonText: '确定', type: 'warning', closeOnClickModal: true, closeOnPressEscape: true}
                                        );
                                    }
                                    //登录账号密码错误，其他错误
                                    else {
                                        this.unrepeatMsg(this, this.loginError2, 'error', 2000, () => {
                                            this.submitSwitch = true;
                                        });
                                    }
                                },
                                //请求失败
                                () => {
                                    this.unrepeatMsg(this, this.loginError2, 'error', 2000, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            );
                        } else {
                            return false;
                        }
                    });
                }
                else {
                    return false;
                }
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    $base-size: 24px;
    #login {
        .handle{
            margin-bottom: 10px;
        }
        /* ---- third - login ---- */
        .thirdlogin {
            height: $base-size;
            line-height: $base-size;
            p {
                display: inline-block;
                height: 100%;
                line-height: inherit;
                color: rgba(255, 255, 255, .98);
            }
            /* ---- third - login icon ---- */
            .thirdlogin_part {
                height: 100%;
                line-height: inherit;
                a {
                    display: inline-block;
                    width: $base-size;
                    height: 100%;
                    line-height: inherit;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>