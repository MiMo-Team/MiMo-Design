<!-- ============= dialog-accessoriesList ============= -->
<template>
    <!--弹出编辑框-->
    <el-dialog :title="temp.dialogStatus==='send'?'发送信息':'查看信息'"
               id="dialog-accessoriesList" ref="dialog-accessoriesList"
               :visible.sync="temp.dialogFormVisible" :modal-append-to-body="false"
               :top='null' :lock-scroll='true' :close-on-press-escape="true" @close="dialogClose('dialogForm')"
    >
        <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-position="left" label-width="150px" style='padding:0 40px'>
            <!--所属分类-->
            <el-form-item label="所属分类：">
                <span class="Identification" v-if="dialogForm.inIndex === '1'">{{dialogForm.accessories}}</span>
                <span class="Identification" v-if="dialogForm.inIndex=== '2'&&dialogForm.firstindex === customVal">
                    {{dialogForm.firstindex_custom + '-' + dialogForm.accessories}}
                </span>
                <span class="Identification" v-if="dialogForm.inIndex=== '2'&&dialogForm.firstindex !== customVal">
                    {{dialogForm.firstindex + '-' + dialogForm.accessories}}
                </span>
                <span class="Identification" v-if="dialogForm.inIndex=== '3'&&dialogForm.secondindex === customVal">
                    {{dialogForm.firstindex === customVal ?
                    dialogForm.firstindex_custom + '-' + dialogForm.secondindex_custom + '-' + dialogForm.accessories :
                    dialogForm.firstindex + '-' + dialogForm.secondindex_custom + '-' + dialogForm.accessories}}
                </span>
                <span class="Identification primary" v-if="dialogForm.inIndex=== '3'&&dialogForm.secondindex !== customVal">
                    {{dialogForm.firstindex === customVal ?
                    dialogForm.firstindex_custom + '-' + dialogForm.secondindex + '-' + dialogForm.accessories :
                    dialogForm.firstindex + '-' + dialogForm.secondindex + '-' + dialogForm.accessories}}
                </span>
                <span v-if="temp.dialogStatus !== 'view'">( 请根据表单填写形成所属分类 )</span>
            </el-form-item>
            <!--面辅料名称-->
            <el-form-item label="面辅料名称：" prop="accessories">
                <el-input v-model="dialogForm.accessories" placeholder="请输入面辅料名称" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.accessories }}</span>
            </el-form-item>
            <!--所在分类层级-->
            <el-form-item label="所在分类层级:" prop="inIndex">
                <el-select v-model="dialogForm.inIndex" placeholder="请选择" v-if="temp.dialogStatus !== 'view'">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                </el-select>
                <span v-else>{{dialogForm.inIndex}}</span>
            </el-form-item>
            <!--一级分类名称-->
            <el-form-item label="一级分类:" prop="firstindex" v-if="dialogForm.inIndex === '2'|| dialogForm.inIndex === '3'">
                <el-select class="basicSize" v-model="dialogForm.firstindex" placeholder="请选择" v-if="temp.dialogStatus !== 'view'"
                           @change="secondindexOptions = loadSecondOption(dialogForm.firstindex,classifyData)">
                    <el-option v-for="item in  firstindexOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                </el-select>
                <el-input class="smallSize" v-model="dialogForm.firstindex_custom" v-if="dialogForm.firstindex === customVal"
                          placeholder="请输入自定义名称"></el-input>
                <span v-if="temp.dialogStatus === 'view'">{{dialogForm.firstindex }}</span>
            </el-form-item>
            <!--二级大类名称-->
            <el-form-item label="二级分类:" prop="secondindex" v-if="dialogForm.inIndex === '3'">
                <el-select class="basicSize" v-model="dialogForm.secondindex" placeholder="请选择" v-if="temp.dialogStatus !== 'view'">
                    <el-option v-for="item in  secondindexOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                </el-select>
                <el-input class="smallSize" v-model="dialogForm.secondindex_custom" v-if="dialogForm.secondindex === customVal"
                          placeholder="请输入自定义名称"></el-input>
                <span v-if="temp.dialogStatus === 'view'">{{dialogForm.secondindex }}</span>
            </el-form-item>
            <el-form-item label="索引编号：" prop="key">
                <el-input v-model="dialogForm.key" placeholder="请输入索引编号" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.key}}</span>
            </el-form-item>
            <el-form-item label="计量单位：" prop="measureunit">
                <el-select v-model="dialogForm.measureunit" placeholder="请输入计量单位" v-if="temp.dialogStatus !== 'view'">
                    <el-option label="米" value="米"></el-option>
                    <el-option label="码" value="码"></el-option>
                    <el-option label="袋" value="袋"></el-option>
                    <el-option label="盒" value="盒"></el-option>
                    <el-option label="捆" value="捆"></el-option>
                    <el-option label="公斤" value="公斤"></el-option>
                    <el-option label="斤" value="斤"></el-option>
                </el-select>
                <span v-else>{{dialogForm.measureunit}}</span>
            </el-form-item>
            <el-form-item label="库存单价：" prop="unitPrice">
                <el-input v-model="dialogForm.unitPrice" placeholder="请输入库存单价" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.unitPrice}}</span>
            </el-form-item>
            <el-form-item label="库存数量：" prop="stock">
                <el-input v-model="dialogForm.stock" placeholder="请输入库存数量" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.stock}}</span>
            </el-form-item>
            <el-form-item label="库存总额：" prop="sumMoney">
                <el-input v-model="dialogForm.sumMoney" placeholder="请输入库存总额" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.sumMoney}}</span>
            </el-form-item>
            <el-form-item label="备注说明：" prop="remarks">
                <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请按照格式输入备注说明" v-model="dialogForm.remarks" v-if="temp.dialogStatus !== 'view'"></el-input>
                <span v-else>{{dialogForm.remarks }}</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style='padding:0 50px' v-if="temp.dialogStatus !== 'view'">
            <el-button @click="temp.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </div>
        <div slot="footer" class="dialog-footer" style='padding:0 50px' v-if="temp.dialogStatus === 'view'">
            <el-button @click="temp.dialogFormVisible = false">返 回</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default{
        name: 'dialog-accessoriesList',
        props: {
            temp: Object
        },
        data() {
            //----- 字段索引值验证 -----
            const fieldIndex = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('字段索引值不能为空'));
                } else {
                    if (!/^[A-Z]{3,4}[0-9]{1,2}$/.test(value)) {
                        return callback(new Error('请输入正确的字段索引值'));
                    }
                    else {
                        callback();
                    }
                }
            };
            //----- 数字格式验证 -----
            const numCheck = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('输入不能为空'));
                } else {
                    if (!this.numCheck(value)) {
                        return callback(new Error('请输入数字格式'));
                    }
                    else {
                        callback();
                    }
                }
            };
            return {
                submitSwitch: true,
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交',
                validateError: '请仔细检查是否正确填写',
                customVal:'自定义',
                //dialog status
                dialogStatus: this.temp.dialogStatus,
                //data
                dialogForm: {
                    accessories: '',
                    inIndex: '',
                    classification: '',
                    firstindex: '',
                    firstindex_custom: '自定义',
                    secondindex: '',
                    secondindex_custom: '自定义',
                    key: '',
                    measureunit: '',
                    unitPrice: '',
                    stock: '',
                    sumMoney: '',
                    remarks: '',
                },
                classifyData: this.temp.classifyData,
                //first - index - options
                firstindexOptions: [],
                //second - index - options
                secondindexOptions: [],
                rules: {
                    accessories: [
                        {required: true, message: '请输入面辅料名称', trigger: 'blur'},
                    ],
                    key: [
                        {required: true, validator: fieldIndex, trigger: 'blur'},
                    ],
                    measureunit: [
                        {required: true, message: '请输入计量单位', trigger: 'blur'},
                    ],
                    unitPrice: [
                        {required: true, validator: numCheck, trigger: 'blur'},
                    ],
                    stock: [
                        {required: true, validator: numCheck, trigger: 'blur'},
                    ],
                    sumMoney: [
                        {required: true, validator: numCheck, trigger: 'blur'},
                    ],
                    remarks: [
                        {required: true, message: '请输入备注说明', trigger: 'blur'},
                    ]
                }
            };
        },
        created () {
            if (this.temp.dialogStatus !== 'create') {
                this.dialogForm.accessories = this.temp.data.accessories;
                this.dialogForm.classification = this.temp.data.classification;
                this.dialogForm.key = this.temp.data.key;
                this.dialogForm.measureunit = this.temp.data.measureunit;
                this.dialogForm.unitPrice = this.temp.data.unitPrice;
                this.dialogForm.stock = this.temp.data.stock;
                this.dialogForm.sumMoney = this.temp.data.sumMoney;
                this.dialogForm.remarks = this.temp.data.remarks;

                const arr = this.dialogForm.classification.split("-");
                this.dialogForm.inIndex = arr.length.toString();
                this.dialogForm.firstindex = arr[0];
                this.dialogForm.secondindex = arr[1];
            }
            this.firstindexOptions = this.loadFirstOption(this.classifyData);
            this.secondindexOptions = this.loadSecondOption(this.dialogForm.firstindex, this.classifyData);
        },
        methods: {
            /**
             * 生成一级option
             * @param data          被删选数据
             */
            loadFirstOption(data){
                let newOption = [];
                const custom = this.customVal;
                for (let i = 0; i < data.length; i++) {
                    const accessories = data[i].accessories;
                    newOption.push({key: accessories, val: accessories})
                }
                newOption.push({key: custom, val: custom});
                return newOption;
            },

            /**
             * 生成二级option
             * @param val           二级选择值
             * @param data          被删选数据
             */
            loadSecondOption(val, data){
                let newOption = [];
                const custom = this.customVal;
                if (val === custom) {
                    this.dialogForm.secondindex = custom;
                    newOption.push({key: custom, val: custom});
                    return newOption;
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (val === data[i].accessories) {
                            this.dialogForm.secondindex = data[i].children[0].accessories;
                            for (let j = 0; j < data[i].children.length; j++) {
                                const accessories = data[i].children[j].accessories;
                                newOption.push({key: accessories, val: accessories})
                            }
                            newOption.push({key: custom, val: custom});
                        }
                    }
                    return newOption;
                }
            },
            dialogClose(formName){
                //when dialog opening,you need to clear all the data and verify the tooltip
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*---------- submission module ----------*/
                        this.axios.post(this.dialogStatus === 'edit' ? this.$store.state.mock.url.DepotAccessoriesEdit : this.$store.state.mock.url.DepotAccessoriesAdd,
                            this.dialogForm,
                            () => {
                            },
                            r => {
                                /*---------- submit pass ----------*/
                                if (r.check.feedback_pass) {
                                    this.unrepeatMsg(this, this.subSuccess, 'success', 1200, () => {
                                        this.submitSwitch = true;
                                        this.temp.dialogFormVisible = false;
                                        //向父级发送信息
                                        this.$emit('tempChange', {
                                            'changeType': this.temp.dialogStatus,
                                            'tempChange': this.dialogForm,
                                        });
                                    });
                                }
                                /*---------- submit not pass ----------*/
                                else {
                                    this.unrepeatMsg(this, this.subError, 'error', 2000, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            },
                                /*---------- Submission failure ----------*/
                            () => {
                                this.unrepeatMsg(this, this.subError, 'error', 2000, () => {
                                    this.submitSwitch = true;
                                });
                            },
                        );
                    } else {
                        this.unrepeatMsg(this, this.validateError, 'error', 2000, () => {
                            this.submitSwitch = true;
                        });
                        return false;
                    }
                });
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    #dialog-accessoriesList {
        .el-dialog {
            .el-dialog__body {
                padding-bottom: 0;
            }
            .el-dialog__footer {
                padding-top: 0;
                padding-bottom: 20px;
            }
        }
        .Identification {
            font-size: 18px;
            padding-right: 10px;
        }
        .basicSize {
            display: inline-block;
            width: 40%;
        }
        .smallSize {
            display: inline-block;
            width: 58%;
        }
    }
</style>


