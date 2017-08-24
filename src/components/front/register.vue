<!--  registere  -->
<template>
    <div class="front-content" id="regEmail">
        <router-link to="/front/handlemode" class="handle-back">
            <icon-svg icon-class="fanhui2"></icon-svg>
        </router-link>
        <div class="contView">
            <div class="large-tit">Welcome</div>
            <p class="small-tit txtL">{{regInfo.typeshow}}注册</p>
            <div class="fcont">
                <el-form :model="registerForm" :rules="registerRules" ref="registerForm" class="demo-ruleForm">
                    <!--邮箱-->
                    <el-form-item prop="email" v-if="regInfo.type === 'email'">
                        <el-input v-model="registerForm.email" auto-complete="off" :placeholder="regInfo.typeshow"></el-input>
                    </el-form-item>
                    <!--账号-->
                    <el-form-item prop="account" v-if="regInfo.type === 'account'">
                        <el-input v-model="registerForm.account" auto-complete="off" :placeholder="regInfo.typeshow"></el-input>
                    </el-form-item>
                    <!--手机-->
                    <el-form-item prop="mobile" v-if="regInfo.type === 'mobile'">
                        <el-input v-model="registerForm.mobile" auto-complete="off" :placeholder="regInfo.typeshow"></el-input>
                    </el-form-item>
                    <!--密码-->
                    <el-form-item prop="password" v-if="regInfo.type !== 'mobile'">
                        <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <!--确认密码-->
                    <el-form-item prop="checkPass" v-if="regInfo.type !== 'mobile'">
                        <el-input type="password" v-model="registerForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <!--验证码-->
                    <el-form-item prop="vc" v-if="regInfo.type === 'mobile'" class="vcode vcode-ipt">
                        <el-input v-model="registerForm.vc" auto-complete="off" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item v-if="regInfo.type === 'mobile'" class="vcode vcode-btn">
                        <el-button type="primary" v-waves>发送验证码</el-button>
                    </el-form-item>
                    <!--同意协议-->
                    <el-form-item prop="agree" class="handle">
                        <el-checkbox-group v-model="registerForm.agree">
                            <el-checkbox label="同意" name="agree"></el-checkbox>
                            <a @click="serviceAgreement">《墨皇科技服务协议》</a>
                        </el-checkbox-group>
                    </el-form-item>
                    <!--注册 按钮-->
                    <el-form-item>
                        <div :plain="true">
                            <el-button type="primary" v-waves @click="submitForm('registerForm')" class="large-submit clr_mt">注册</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item class="handle clr_mb">
                        <router-link to="/front/login" class="fr">已有账号，立即登陆</router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <dialog-service :temp="temp" v-on:tempChange="tempChange" v-if="temp.dialogVisible"></dialog-service>
    </div>
</template>
<script>
    import dialogService from '../../components/dialog/dialog-service.vue'
    export default {
        name: 'regEmail',
        props: {
            regInfo: Object
        },
        components: {
            dialogService
        },
        data() {
            //----- email  -----
            const email_validator = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(this.regInfo.typeshow + '不能为空'));
                }
                else {
                    if (!this.emailCheck(value)) {
                        callback(new Error('请输入正确的' + this.regInfo.typeshow));
                    } else {
                        setTimeout(() => {
                            this.axios.post(this.$store.state.mock.url.checkRepeatUrl,
                                {checkType: this.regInfo.type, email: this.registerForm.email},
                                () => {
                                },
                                r => {
                                    r.check.check_pass ? callback() : callback(new Error(this.regInfo.typeshow + '已存在，请重新输入'));
                                }
                            );
                        }, 300);
                    }
                }
            };
            //----- account -----
            const account_validator = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                else {
                    if (!this.NumEnCheck(value)) {
                        callback(new Error('账号不能包含特殊字符'));
                    }
                    else {
                        if (!this.lengthCheck(value, 6, 20)) {
                            callback(new Error('请输入6-20位长度的账号'));
                        }
                        else {
                            if (!this.notAllNumCheck(value)) {
                                callback(new Error('账号不能为纯数字'));
                            }
                            else {
                                setTimeout(() => {
                                    this.axios.post(this.$store.state.mock.url.checkRepeatUrl,
                                        {checkType: this.regInfo.type, account: this.registerForm.account},
                                        () => {
                                        },
                                        r => {
                                            r.check.check_pass ? callback() : callback(new Error(this.regInfo.typeshow + '已存在，请重新输入'));
                                        }
                                    );
                                }, 300);
                            }
                        }
                    }
                }
            };
            //----- password -----
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else {
                    if (!this.NumEnCheck(value)) {
                        callback(new Error('密码不能包含特殊字符'));

                    }
                    else {
                        if (!this.lengthCheck(value, 6, 20)) {
                            callback(new Error('请输入6-20位长度的密码'));
                        }
                        else {
                            if (!this.NumEnBothCheck(value)) {
                                callback(new Error('密码必须同时含有数字和英文字母'));
                            }
                            else {
                                if (this.registerForm.checkPass !== '') {
                                    this.$refs.registerForm.validateField('checkPass');
                                }
                                callback();
                            }
                        }
                    }
                }
            };
            //----- check password -----
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.registerForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                subSuccess: '注册成功，页面即将跳转',
                subError: '注册失败，请联系管理员',
                validatorError: '提交失败，请检查填写信息',
                submitSwitch: true,
                registerForm: {
                    email: '',
                    account: '',
                    mobile: '',
                    password: '',
                    checkPass: '',
                    vc: '',
                    agree: []
                },
                registerRules: {
                    email: [
                        {validator: email_validator, trigger: 'blur'}
                    ],
                    account: [
                        {validator: account_validator, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    agree: [
                        {type: 'array', required: true, message: '请仔细阅读《MiMo工作室服务协议》,并勾选', trigger: 'change'}
                    ]
                },
                type: this.regInfo.type,
                typeshow: this.regInfo.regInfo,
                temp: {
                    dialogVisible: false
                },
            };
        },
        methods: {
            tempChange(n){
                this.temp.dialogVisible = n.dialogVisible
            },
            serviceAgreement(){
                this.temp.dialogVisible = true;
            },
            params(type){
                const paramsMap = {
                    email: {
                        registertype: this.regInfo.type,
                        email: this.registerForm.email,
                        password: this.registerForm.password
                    },
                    account: {
                        registertype: this.regInfo.type,
                        account: this.registerForm.account,
                        password: this.registerForm.password
                    },
                    mobile: {
                        registertype: this.regInfo.type,
                        mobile: this.registerForm.mobile,
                        password: this.registerForm.password
                    },
                };
                return paramsMap[type]
            },
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.axios.post(this.$store.state.mock.url.registerUrl, this.params(this.regInfo.type),
                                data => {
                                },
                                r => {
                                    if (r.check.feedback_pass) {
                                        this.$message({message: this.subSuccess, type: 'success', duration: 1200});
                                        const gotoLogin = setTimeout(() => {
                                            this.submitSwitch = true;
                                            this.$router.push({path: '/front/login'});
                                            clearInterval(gotoLogin);
                                        }, 1200);
                                    }
                                    else {
                                        this.unrepeatMsg(this, this.subError, 'error', 2000, () => {
                                            this.submitSwitch = true;
                                        });
                                    }
                                },
                                () => {
                                    this.unrepeatMsg(this, this.subError, 'error', 2000, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            );
                        } else {
                            this.unrepeatMsg(this, this.validatorError, 'error', 2000, () => {
                                this.submitSwitch = true;
                            });
                            return false;
                        }
                    });
                }
            }
        }
    }
</script>

