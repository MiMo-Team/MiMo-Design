<!-- ============= modify-password module ============= -->
<template>
    <div class="win fr" id="modify-password">
        <div class="wm">
            <!--Multi-handle fixed -->
            <multi-handle :routerLink="'/dashboard'"></multi-handle>
            <!--tit-->
            <p class="win-tit"><span>▌</span>&nbsp;修改密码</p>
            <el-form :model="passwordModify" :rules="rules" ref="passwordModify"
                     label-width="120px" class="passwordModify" style="padding: 30px 10px">
                <el-row>
                    <el-col :xs="24" :sm="20" :md="14" :lg="12">
                        <!--旧密码-->
                        <el-form-item label="旧密码:" prop="oldPass">
                            <el-input type="password" v-model="passwordModify.oldPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <!--新密码-->
                        <el-form-item label="新密码:" prop="newPass">
                            <el-input type="password" v-model="passwordModify.newPass"></el-input>
                        </el-form-item>
                        <!--确认新密码-->
                        <el-form-item label="确认新密码:" prop="checkNewPass">
                            <el-input type="password" v-model="passwordModify.checkNewPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <!--备注说明-->
                        <el-form-item label="备注说明">
                            <el-input type="textarea" v-model="passwordModify.remarks" :rows=8></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="win-submit">
                                <el-button type="primary" @click="submitForm('passwordModify')">提交</el-button>
                                <el-button @click="resetForm('passwordModify')">重置</el-button>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'modify-password',
        props: {
            formItemable: Object || String
        },
        data() {
            //----- 新密码验证 -----
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
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
                                if (this.passwordModify.checkNewPass !== '') {
                                    this.$refs.passwordModify.validateField('checkNewPass');    //和确认密码比较
                                }
                                callback();
                            }
                        }
                    }
                }
            };
            //----- 密码确认验证 -----
            const validateCheckPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.passwordModify.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                //反重复提交开关
                submitSwitch: true,
                //表单元素
                passwordModify: {
                    oldPass: '',
                    newPass: '',
                    checkNewPass: '',
                    remarks: '',
                },
                rules: {
                    oldPass: [
                        {required: true, message: '请输入原密码', trigger: 'blur'}
                    ],
                    newPass: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    checkNewPass: [
                        {required: true, validator: validateCheckPass, trigger: 'blur'}
                    ]
                },
            };
        },
        methods: {
            init(){
                this.passwordModify = {
                    oldPass: '',
                    newPass: '',
                    checkNewPass: '',
                    remarks: '',
                }
            },
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.axios.post(this.$store.state.mock.url.checkOldPassUrl,
                                {account: this.$store.state.user.info.account, password: this.passwordModify.oldPass},
                                () => {
                                },
                                r => {
                                    if (r.check.feedback_pass) {
                                        this.axios.post(this.$store.state.mock.url.passwordModifyUrl, this.passwordModify, () => {
                                            },
                                            r => {
                                                r.check.feedback_pass ?
                                                    this.unrepeatMsg(this, '密码修改成功', 'success', 1200, () => {
                                                        this.submitSwitch = true;
                                                        this.init();
                                                    }) :
                                                    this.unrepeatMsg(this, '密码修改失败，请联系管理员', 'error', 2000, () => {
                                                        this.submitSwitch = true;
                                                    });
                                            },
                                            () => {
                                                this.unrepeatMsg(this, '提交失败，请重新提交', 'error', 2000, () => {
                                                    this.submitSwitch = true;
                                                });
                                            }
                                        );
                                    }
                                    else {
                                        this.unrepeatMsg(this, '旧密码输入有误，请重新输入', 'error', 2000, () => {
                                            this.submitSwitch = true;
                                        });
                                    }
                                },
                                () => {
                                    this.unrepeatMsg(this, '提交失败，请重新提交', 'error', 2000, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            );
                        }
                        else {
                            this.unrepeatMsg(this, '请仔细检查是否正确填写', 'error', 2000, () => {
                                this.submitSwitch = true;
                            });
                            return false;
                        }
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        }
    }
</script>



