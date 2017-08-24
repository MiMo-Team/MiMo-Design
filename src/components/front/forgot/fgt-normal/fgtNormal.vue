<template>
    <div class="front-content" id="fgtNormal">
        <div class="contView">
            <div class="bTit">Welcome</div>
            <p class="small-tit txtL">账号找回</p>
            <div class="fcont">
                <el-form :model="fgtNormalForm" :rules="rules_rn" ref="fgtNormalForm" class="demo-ruleForm">
                    <!--用户名-->
                    <el-form-item prop="account">
                        <el-input type="account" v-model="fgtNormalForm.account" auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <!--密码-->
                    <el-form-item prop="password">
                        <el-input type="password" v-model="fgtNormalForm.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <!--确认密码-->
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="fgtNormalForm.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                    </el-form-item>
                    <!--同意协议-->
                    <el-form-item prop="agree" class="handle">
                        <el-checkbox-group v-model="fgtNormalForm.agree">
                            <el-checkbox label="同意" name="agree"></el-checkbox>
                            <router-link to="/front/reg" class="el-checkbox__label fs14 clrW98">《墨皇科技服务协议》</router-link>
                        </el-checkbox-group>
                    </el-form-item>
                    <!--注册 按钮-->
                    <el-form-item>
                        <div :plain="true">
                            <el-button type="primary" @click="submitForm('fgtNormalForm')" v-waves class="large-submit clr_mt">提交</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item class="handle clr_mb">
                        <router-link to="/front/login" class="el-checkbox__label  clrW98 fr">想起密码了，返回登陆</router-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {checkRepeatUrl, checkRepeat, mockTest_checkRepeat} from '../../../../mock/template/common/checkRepeat';
    import {forgotUrl, forgot, mockTest_forgot} from '../../../../mock/template/front/forgot';
    export default {
        name: 'fgtNormal',
        data() {
            //----- 账号验证 -----
            const userid = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                else {
                    if (!this.NumEnCheck(value)) {                               //判断是否有特殊字符
                        callback(new Error('账号不能包含特殊字符'));
                    }
                    else {
                        if (!this.lengthCheck(value, 6, 20)) {                    //判断长度
                            callback(new Error('请输入6-20位长度的账号'));
                        }
                        else {
                            if (!this.notAllNumCheck(value)) {                                    //判断是否同时含有数字和英文字母
                                callback(new Error('账号不能为纯数字'));
                            }
                            else {
                                setTimeout(() => {
                                    mockTest_checkRepeat(checkRepeatUrl, checkRepeat);
                                    const params = {fgtType: "account", account: this.fgtNormalForm.account};
                                    this.axios.post(checkRepeatUrl, params,
                                        () => {
                                        },
                                        r => {
                                            r.check.check_pass ? callback() : callback(new Error('账号已存在，请重新输入'));
                                        }
                                    );
                                }, 300);
                            }
                        }
                    }
                }
            };
            //----- 密码验证 -----
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else {
                    if (!this.lengthCheck(value, 6, 20)) {                                       //判断长度
                        callback(new Error('请输入6-20位长度的密码'));
                    }
                    else {
                        if (!this.NumEnCheck(value)) {                                           //判断是否有特殊字符
                            callback(new Error('密码不能包含特殊字符'));
                        }
                        else {
                            if (!this.NumEnBothCheck(value)) {                                    //判断是否同时含有数字和英文字母
                                callback(new Error('密码必须同时含有数字和英文字母'));
                            }
                            else {
                                if (this.fgtNormalForm.checkPass !== '') {
                                    this.$refs.fgtNormalForm.validateField('checkPass');    //和确认比较
                                }
                                callback();
                            }
                        }
                    }
                }
            };
            //----- 确认密码验证 -----
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.fgtNormalForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                subSuccess: '提交成功，页面即将跳转',
                subError: '提交失败，请联系管理员',
                msgSwitch1: true,                                         //登录失败，显示消息开闭开关
                msgSwitch2: true,
                msgSwitch3: true,
                fgtNormalForm: {
                    account: '',
                    password: '',
                    checkPass: '',
                    agree: []
                },
                rules_rn: {
                    account: [
                        {validator: userid, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    agree: [
                        {type: 'array', required: true, message: '请仔细阅读《墨皇科技服务协议》,并勾选', trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        mockTest_forgot(forgotUrl, forgot);
                        const params = {
                            fgtType: "account",
                            account: this.fgtNormalForm.account,
                            password: this.fgtNormalForm.password
                        };
                        this.axios.post(forgotUrl, params,
                            data => {
                            },
                            r => {
                                if (r.flag === "forgot_success") {
                                    //注册，顶部弹成功消息框
                                    if (this.msgSwitch1) {
                                        this.msgSwitch1 = false;
                                        this.$message({message: this.subSuccess, type: 'success', duration: 1200});
                                    }
                                    //注册成功后，页面跳转
                                    const gotoLogin = setTimeout(() => {
                                        this.$router.push({path: '/front/login'});
                                        clearInterval(gotoLogin);
                                    }, 1200);
                                }
                                else {
                                    //注册，顶部弹出错误消息框
                                    if (this.msgSwitch2) {
                                        this.msgSwitch2 = false;
                                        const _this = this;
                                        this.$message({
                                            message: this.subError, type: 'error', duration: 2000, showClose: true, onClose: function () {
                                                _this.msgSwitch2 = true;
                                            }
                                        });
                                    }
                                }
                            },
                            //catch 错误捕捉
                            () => {
                                if (this.msgSwitch3) {
                                    this.msgSwitch3 = false;
                                    const _this = this;
                                    this.$message({
                                        message: this.subError, type: 'error', duration: 2000, showClose: true, onClose: function () {
                                            _this.msgSwitch3 = true;
                                        }
                                    });
                                }
                            }
                        );
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>
