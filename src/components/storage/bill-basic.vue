<!-- ============= bencuserEditdmin => add new user ============= -->
<template>
    <div class="wm" id="storeOrder">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;{{billInfo.tit}}{{depot.type}}库单</p>
        <!--用户添加-->
        <el-form :model="billdata" :rules="billdataRules" ref="billdata" label-width="120px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <!--出/入库单号 -->
                    <el-form-item :label="depot.type+'库单号:'" prop="storageNum">
                        <el-input v-model="billdata.storageNum" :disabled="true"></el-input>
                    </el-form-item>
                    <!--出/入库时间-->
                    <el-form-item :label="depot.type+'库时间:'" prop="handledate" class="bd">
                        <el-date-picker v-model="billdata.handledate" type="date" default-value="2017-01-01" placeholder="选择日期" :disabled="canEdit"></el-date-picker>
                    </el-form-item>
                    <!--出/入库签收人-->
                    <el-form-item :label="depot.type+'库签收人:'" prop="signer">
                        <el-input v-model="billdata.signer" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--本地货号-->
                    <el-form-item label="本地货号:" prop="localarticleNum">
                        <el-input v-model="billdata.localarticleNum" :disabled="canEdit"></el-input>
                        <el-button type="primary" style="margin-top:10px;" size="small" :disabled="canEdit">选择本地货号</el-button>
                    </el-form-item>
                    <!--供应商货号-->
                    <el-form-item label="供应商货号:"
                                  :prop="billInfo.supplierarticleNumProp?billInfo.supplierarticleNumProp:null"
                                  :class="billInfo.supplierarticleNumClass?billInfo.supplierarticleNumClass:''">
                        <el-input v-model="billdata.supplierarticleNum"
                                  :disabled="billInfo.supplierarticleNumState||canEdit"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!--面辅料名称 -->
                    <el-form-item label="面辅料名称:" prop="accessories">
                        <el-input v-model="billdata.accessories" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--计量单位-->
                    <el-form-item label="计量单位:" prop="measureunit">
                        <el-input v-model="billdata.measureunit" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--出/入库单价-->
                    <el-form-item :label="depot.type+'库单价:'" prop="unitPrice">
                        <el-input v-model="billdata.unitPrice" placeholder="0.00" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--出/入库数量-->
                    <el-form-item :label="depot.type+'库数量:'" prop="handleNum">
                        <el-input v-model="billdata.handleNum" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--出/入库总金额-->
                    <el-form-item :label="depot.type+'库总金额:'" prop="sumMoney">
                        <el-input v-model="billdata.sumMoney" placeholder="￥0.00" :disabled="canEdit"></el-input>
                    </el-form-item>
                    <!--是否红单-->
                    <el-form-item label="是否为红单:" prop="redbill">
                        <el-switch on-text="" off-text="" v-model="billdata.redbill" :disabled="canEdit"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <!--备注说明-->
                    <el-form-item label="备注说明:" prop="remarks">
                        <el-input type="textarea" v-model="billdata.remarks" :style="{width:'80%'}" :rows=6 placeholder="出/入库单相关备注说明" :disabled="canEdit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <!--提交入库单-->
            <el-form-item >
                <div class="win-submit">
                    <el-button type="primary" @click="submitForm('billdata')">提交</el-button>
                    <el-button @click="resetForm('billdata')">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default{
        name: 'storeOrder',
        props: {
            billInfo: Object || String
        },
        computed: {
            ...mapGetters([
                'depot',
            ])
        },
        data() {
            //----- 单价验证 -----
            const unitPrice = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('入库单价不能为空'));
                } else {
                    if (!this.numCheck(value)) {
                        return callback(new Error('请输入正确的单价'));
                    }
                    else {
                        callback();
                    }
                }
            };
            //----- 入库数量验证 -----
            const handleNum = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('入库数量不能为空'));
                } else {
                    if (!this.numCheck(value)) {
                        return callback(new Error('请输入正确的入库数量'));
                    }
                    else {
                        callback();
                    }
                }
            };
            return {
                //是否不可编辑
                canEdit: false,
                modifyWarn: "确认提交吗？",
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交',
                validateError: '请仔细检查是否正确填写',
                submitSwitch: true,
                imageUrl: '',
                //发送的参数
                params: '',
                billdata: {},
                billdataRules: {
                    storageNum: [
                        {required: true, message: '请输入入库单单号', trigger: 'blur'}
                    ],
                    handledate: [
                        {type: 'date', required: true, message: '请选择入库日期', trigger: 'change'}
                    ],
                    signer: [
                        {required: true, message: '请输入签收人', trigger: 'blur'}
                    ],
                    localarticleNum: [
                        {required: true, message: '请输入本地货号', trigger: 'blur'}
                    ],
                    supplierarticleNum: [
                        {required: true, message: '请输入供应商货号', trigger: 'blur'}
                    ],
                    accessories: [
                        {required: true, message: '请输入面辅料名称', trigger: 'blur'}
                    ],
                    measureunit: [
                        {required: true, message: '请输入计量单位', trigger: 'blur'}
                    ],
                    unitPrice: [
                        {required: true, validator: unitPrice, trigger: 'blur'}
                    ],
                    handleNum: [
                        {required: true, validator: handleNum, trigger: 'blur'}
                    ]
                }
            };
        },
        created(){
            if (this.billInfo.tit === '编辑') {
                //普通用户进入时，只能查看，不能对表单修改
                this.$store.state.user.info.status !== 'admin' ? this.canEdit = true : this.canEdit = false;
            }
            this.billdata = this.billInfo.data;
            this.billdata.handledate = this.parseTime(this.billInfo.data.handledate, '{y}-{m}-{d} {h}:{i}:{s}');
            this.$store.dispatch('depotDataCarrier', null);                             //empty
            if (this.searchTit = this.$store.state.carrier.depot.type === '出') {
                this.billdata.supplierarticleNum = '出库单无须填写供应商货号';
                this.billdataRules.supplierarticleNum.validator = null;
            }
        },
        methods: {
            submitForm(formName){
                console.log(this.billdata.handledate);
                if (this.submitSwitch) {
                    this.submitSwitch = false;
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            /*---------- After the validation is passed, the transmission parameters are established ----------*/
                            let params = {
                                storageNum: this.billdata.storageNum, handledate: this.billdata.handledate,
                                signer: this.billdata.signer, localarticleNum: this.billdata.localarticleNum,
                                accessories: this.billdata.accessories, measureunit: this.billdata.measureunit,
                                unitPrice: this.billdata.unitPrice, handleNum: this.billdata.handleNum,
                                sumMoney: this.billdata.sumMoney, redbill: this.billdata.redbill, remarks: this.billdata.remarks,
                            };
                            if (this.$store.state.carrier.depot.type === "入")
                                params.supplierarticleNum = this.billdata.supplierarticleNum;
                            /*---------- Reminder message ----------*/
                            this.$confirm(this.modifyWarn, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '返回',
                                type: 'warning'
                            }).then(() => {
                                /*---------- submission module ----------*/
                                this.axios.post(this.$store.state.mock.url.bolbackUrl, params,
                                    () => {
                                    },
                                    r => {
                                        /*---------- submit pass ----------*/
                                        if (r.check.feedback_pass) {
                                            this.unrepeatMsg(this, this.subSuccess, 'success', 800, () => {
                                                this.submitSwitch = true;
                                            });
                                            //success  web jump
                                            const modifyBack = setTimeout(() => {
                                                this.$router.push({path: this.billInfo.routerPush});
                                                clearInterval(modifyBack);
                                            }, 800);
                                        }
                                        /*---------- submit not pass ----------*/
                                        else {
                                            this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
                                                this.submitSwitch = true;
                                            });
                                        }
                                    },
                                        /*---------- Submission failure ----------*/
                                    () => {
                                        this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
                                            this.submitSwitch = true;
                                        });
                                    },
                                );
                            }).catch(() => {
                                this.submitSwitch = true;
                                return false;

                            });
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
            resetForm(formName)
            {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>


