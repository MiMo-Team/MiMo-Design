<!-- ============= basic-info module ============= -->
<template>
    <div id="basic-info">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;{{formItemable.basicInfoTit ? formItemable.basicInfoTit : '基本信息'}}</p>
        <!--用户信息-->
        <el-form :model="basicInfoModify.data" :rules="basicInfoRules"
                 ref="basicInfoModify" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="头像:">
                        <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <!--用户名 -->
                    <el-form-item label="用户名:" prop="account">
                        <el-input v-model="basicInfoModify.data.account" :disabled="basicInfoModify.accountState"></el-input>
                    </el-form-item>
                    <!--姓名-->
                    <el-form-item label="姓名:" prop="name">
                        <el-input v-model="basicInfoModify.data.name"></el-input>
                    </el-form-item>
                    <!--性别-->
                    <el-form-item label="性别：" prop="sex" class="el-item-radio">
                        <el-radio-group v-model="basicInfoModify.data.sex">
                            <el-radio label="男士"></el-radio>
                            <el-radio label="女士"></el-radio>
                            <el-radio label="保密"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--出生日期-->
                    <el-form-item label="出生日期:" prop="birthday">
                        <el-date-picker
                                v-model="basicInfoModify.data.birthday"
                                type="date"
                                default-value="1990-01-01"
                                placeholder="选择日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!--手机号 -->
                    <el-form-item label="手机号:" prop="mobile">
                        <el-input v-model="basicInfoModify.data.mobile" :disabled="basicInfoModify.mobileState"></el-input>
                    </el-form-item>
                    <!--邮箱-->
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="basicInfoModify.data.email" :disabled="basicInfoModify.emailState"></el-input>
                    </el-form-item>
                    <!--微信-->
                    <el-form-item label="微信:">
                        <el-input v-model="basicInfoModify.data.WeChat"></el-input>
                    </el-form-item>
                    <!--备注说明-->
                    <el-form-item label="备注说明">
                        <el-input type="textarea" v-model="basicInfoModify.data.remarks" :style="{width:'75%'}" :rows=8></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--创建角色-->
            <el-form-item>
                <div class="win-submit">
                    <el-button type="primary" @click="submitForm('basicInfoModify')">提交</el-button>
                    <el-button @click="resetForm('basicInfoModify')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        name: 'basic-info',
        props: {
            formItemable: Object || String
        },
        data() {
            //----- 账号验证 -----
            const account = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                } else {
                    if (!this.NumEnCheck(value)) {                               //判断是否有特殊字符
                        callback(new Error('账号不能包含特殊字符'));
                    }
                    else {
                        if (!this.lengthCheck(value, 6, 20)) {                    //判断长度
                            callback(new Error('请输入6-20位长度的账号'));
                        }
                        else {
                            if (!this.notAllNumCheck(value)) {                    //判断是否同时含有数字和英文字母
                                callback(new Error('账号不能为纯数字'));
                            }
                            else {
                                setTimeout(() => {
                                    const params = {registertype: "account", account: this.basicInfoModify.data.account};
                                    this.axios.post(this.$store.state.mock.url.checkRepeatUrl, params,
                                        () => {
                                        },
                                        r => {
                                            if (r.check.check_pass) {
                                                callback()
                                            }
                                            else {
                                                callback(new Error('账号已存在，请重新输入'));
                                            }
                                        }
                                    );
                                }, 200);
                            }
                        }
                    }

                }
            };
            //----- 手机验证 -----
            const mobilecheck = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }
                else {
                    if (!this.mobilCheck(value)) {                               //判断是否有特殊字符
                        callback(new Error('请输入正确的手机'));
                    } else {
                        setTimeout(() => {
                            const params = {registertype: "mobile", mobile: this.basicInfoModify.data.mobile};
                            this.axios.post(this.$store.state.mock.url.checkRepeatUrl, params,
                                () => {
                                },
                                r => {
                                    if (r.check.check_pass) {
                                        callback()
                                    }
                                    else {
                                        callback(new Error('手机号已存在，请重新输入'));
                                    }
                                }
                            );
                        }, 200);
                    }
                }
            };
            //----- 邮箱验证 -----
            const emailcheck = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                }
                else {
                    if (!this.emailCheck(value)) {                               //判断是否有特殊字符
                        callback(new Error('请输入正确的邮箱'));
                    } else {
                        setTimeout(() => {
                            const params = {registertype: "mobile", email: this.basicInfoModify.data.email};
                            this.axios.post(this.$store.state.mock.url.checkRepeatUrl, params,
                                () => {
                                },
                                r => {
                                    if (r.check.check_pass) {
                                        callback()
                                    }
                                    else {
                                        callback(new Error('邮箱已存在，请重新输入'));
                                    }
                                }
                            );
                        }, 200);
                    }
                }
            };
            //----- 时间控件验证 -----
            const birthday = (rule, value, callback) => {
                !value ? callback(new Error('请选择日期')) : callback();
            };
            return {
                subSuccess: '修改成功',
                subError: '修改失败，请重新提交修改',
                validateError: '请仔细检查是否正确填写',
                submitUrl:'',
                //反重复提交开关
                submitSwitch: true,
                imageUrl: '',
                //提交跳转路径
                routerPush: '',
                //表单元素
                basicInfoModify: {
                    data: {},
                    accountState: false,
                    mobileState: false,
                    emailState: false,
                },
                basicInfoRules: {
                    account: [
                        {required: true, validator: account, trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, validator: birthday, trigger: 'change'}
                    ],
                    mobile: [
                        {required: true, validator: mobilecheck, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, validator: emailcheck, trigger: 'blur'}
                    ]
                },
                //sex
                sexOptions: [
                    {key: 'male', val: '男士'},
                    {key: 'female', val: '女士'},
                    {key: 'secrecy', val: '保密'},
                ]
            };
        },
        created () {
            //编辑个人用户
            if (this.$route.name === '编辑个人用户') {
                this.submitUrl = this.$store.state.mock.url.personalInfoEditUrl;
                this.basicInfoModify.data = this.$store.state.user.info;
                //转换性别显示
                this.basicInfoModify.data.sex = this.Display_KeytoVal(this.basicInfoModify.data.sex, this.sexOptions);
                //admin 可以修改自己的全部信息，而普通用户则不能修改email，mobile，account，但可以添加
                if (this.$store.state.user.info.status !== 'admin') {
                    if (this.basicInfoModify.data.email) {
                        this.basicInfoModify.emailState = true;
                        this.basicInfoRules.email.validator = null;
                    }
                    if (this.basicInfoModify.data.mobile) {
                        this.basicInfoModify.mobileState = true;
                        this.basicInfoRules.mobile.validator = null;
                    }
                    if (this.basicInfoModify.data.account) {
                        this.basicInfoModify.accountState = true;
                        this.basicInfoRules.account.validator = null;
                    }
                }
            }
            else if (this.$route.name === '新增用户') {
                this.submitUrl = this.$store.state.mock.url.userInfoAddUrl;
                this.basicInfoModify.data = {
                    account: '',
                    name: '',
                    sex: '',
                    birthday: '',
                    mobile: '',
                    email: '',
                    WeChat: '',
                    remarks: ''
                }
            }
            //管理员编辑当前用户
            else {
                this.submitUrl = this.$store.state.mock.url.userInfoEditUrl;
                //获取用户信息，并显示
                const info = this.$store.state.carrier.userInfoCarrier;
//                console.log('传进来的数据格式参考:' + JSON.stringify(info, null, 4));
                this.basicInfoModify.data = info;
                this.basicInfoModify.data.sex = this.Display_KeytoVal(info.sex, this.sexOptions);
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB');
                }
                return isJPG && isLt2M;
            },
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            const params = {
                                account: this.basicInfoModify.data.account,
                                name: this.basicInfoModify.data.name,
                                sex: this.basicInfoModify.data.sex,
                                birthday: this.basicInfoModify.data.birthday,
                                mobile: this.basicInfoModify.data.mobile,
                                email: this.basicInfoModify.data.email,
                                WeChat: this.basicInfoModify.data.WeChat,
                                remarks: this.basicInfoModify.data.remarks,
                            };
                            this.axios.post(this.submitUrl, params,
                                () => {
                                },
                                r => {
                                    /*---------- submit pass ----------*/
                                    if (r.check.feedback_pass) {
                                        this.unrepeatMsg(this, this.subSuccess, 'success', 800, () => {
                                            this.submitSwitch = true;
                                            if (this.formItemable.routerPush) {
                                                this.$router.push({path: this.formItemable.routerPush});
                                            }
                                        });
                                    }
                                    /*---------- submit not pass ----------*/
                                    else {
                                        this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
                                            this.submitSwitch = true;
                                        });
                                    }
                                },
                                    /*---------- submission failure ----------*/
                                () => {
                                    this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            );
                        }
                        else {
                            this.unrepeatMsg(this, this.validateError, 'error', 2000, () => {
                                this.submitSwitch = true;
                            });
                            return false;
                        }
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    #basic-info {
        .el-input {
            .el-input__inner {
                width: 75%;
            }
        }
        .el-input.el-date-editor {
            width: 75%;
            .el-input__inner {
                width: 100%;
            }
        }
    }
</style>


