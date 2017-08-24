<!-- ============= user-state module ============= -->
<template>
    <div id="user-state">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;用户状态</p>
        <!--用户添加-->
        <el-form :model="userStateModify" :rules="userStateRules" ref="userStateModify" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="18">
                    <!-- 用户状态 -->
                    <el-form-item label="用户状态" prop="status" class="el-item-radio">
                        <el-radio-group v-model="userStateModify.status">
                            <el-radio label="管理员"></el-radio>
                            <el-radio label="常规用户"></el-radio>
                            <el-radio label="待审核"></el-radio>
                            <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--创建角色-->
            <el-form-item>
                <div class="win-submit">
                    <el-button type="primary" @click="submitForm('userStateModify')">提交</el-button>
                    <el-button @click="resetForm('userStateModify')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        name: 'user-state',
        data() {
            return {
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交修改',
                validateError: '请仔细检查后再重新提交',
                submitSwitch: true,
                userStateModify: {
                    status: '',
                },
                userStateRules: {
                    status: [
                        {required: true, message: '请选择用户状态', trigger: 'change'}
                    ]
                }
            };
        },
        created () {
            switch (this.$store.state.carrier.userInfoCarrier.status) {
                case "00":
                    this.userStateModify.status = '管理员';
                    break;
                case "01":
                    this.userStateModify.status = '常规用户';
                    break;
                case "02":
                    this.userStateModify.status = '待审核';
                    break;
                default:
                    this.userStateModify.status = '禁用';
            }
            //在basic-info ， user-role 和 user-state 模板数据全部记载完成 ，销毁 vuex 中 userInfoCarrier 数据
            this.$store.dispatch('userInfoCarrier', '');
        },
        methods: {
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            /*---------- submission module ----------*/
                            const params = {
                                status: this.userStateModify.status,
                            };
                            /*---------- axios post ----------*/
                            this.axios.post(this.$store.state.mock.url.userInfoEditUrl, params,
                                () => {
                                },
                                r => {
                                    /*---------- submit pass ----------*/
                                    if (r.check.feedback_pass) {
                                        this.unrepeatMsg(this, this.subSuccess, 'success', 800, () => {
                                            this.submitSwitch = true;
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
                else {
                    return false;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>
<style>

</style>

