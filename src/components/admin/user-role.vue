<!-- ============= user-role module ============= -->
<template>
    <div id="user-role">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;角色权限</p>
        <!--用户添加-->
        <el-form :model="userRoleModify" :rules="userRoleRules" ref="userRoleModify" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="18">
                    <!--角色选择-->
                    <el-form-item label="角色选择" prop="role">
                        <el-checkbox-group v-model="userRoleModify.role">
                            <el-checkbox label="总监" name="role"></el-checkbox>
                            <el-checkbox label="设计师" name="role"></el-checkbox>
                            <el-checkbox label="设计师助理" name="role"></el-checkbox>
                            <el-checkbox label="运营经理" name="role"></el-checkbox>
                            <el-checkbox label="制版师" name="role"></el-checkbox>
                            <el-checkbox label="行政财务" name="role"></el-checkbox>
                            <el-checkbox label="客服" name="role"></el-checkbox>
                            <el-checkbox label="裁缝师" name="role"></el-checkbox>
                            <el-checkbox label="纺织工" name="role"></el-checkbox>
                            <el-checkbox label="物料管理" name="role"></el-checkbox>
                            <el-checkbox label="仓管" name="role"></el-checkbox>
                            <el-checkbox label="物料裁定" name="role"></el-checkbox>
                            <el-checkbox label="其他" name="role"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <!--备注说明-->
                    <el-form-item label="备注说明">
                        <el-input type="textarea" v-model="userRoleModify.remarks" :rows=8></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--创建角色-->
            <el-form-item>
                <div class="win-submit">
                    <el-button type="primary" @click="submitForm('userRoleModify')">提交</el-button>
                    <el-button @click="resetForm('userRoleModify')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default{
        name: 'user-role',
        data() {
            return {
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交修改',
                validateError: '请仔细检查后再重新提交',
                submitSwitch: true,
                userRoleModify: {
                    role: [],
                    remarks: ''
                },
                userRoleRules: {
                    role: [
                        {type: 'array', required: true, message: '请至少选择一个用户角色', trigger: 'change'}
                    ]
                }
            };
        },
        created () {
            let info = this.$store.state.carrier.userInfoCarrier;
            this.userRoleModify.role = [];
            this.userRoleModify.role.push(info.role);
            this.userRoleModify.remarks = info.remarks;
        },
        methods: {
            submitForm(formName) {
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            /*---------- submission module ----------*/
                            const params = {
                                role: this.userRoleModify.role,
                                remarks: this.userRoleModify.remarks,
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


