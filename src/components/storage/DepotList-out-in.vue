<!-- ============= Depot List admin ============= -->
<template>
    <!--出入库管理列表-->
    <div id="Depotlist-out-in" class="">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;{{depot.type}}库单管理</p>
        <!--按钮操作模块-->
        <el-row>
            <!--   按钮操作模块   -->
            <el-row :gutter="10" class="filter-container">
                <!--增加出/入库单-->
                <el-col :xs="12" :sm="6" :md="6" :lg="4">
                    <router-link :to="DepotOutInList.routerPush" style="margin-right: 10px">
                        <el-button type="primary" icon="plus" v-waves class="filter-item-btn">新增{{depot.type}}库单</el-button>
                    </router-link>
                </el-col>
                <!--查找出/入库单-->
                <el-col :xs="12" :sm="6" :md="6" :lg="4">
                    <el-dropdown @command="searchBill" class="filter-item-btn">
                        <el-button type="primary" style="width: 100%">
                            查找{{depot.type}}库单<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="accessories">面辅料名称</el-dropdown-item>
                            <el-dropdown-item :command="depot.type ===  '入'? 'supplierarticleNum':'localarticleNum'">
                                {{ depot.type === '入' ? '供应商货号' : '本地货号'}}
                            </el-dropdown-item>
                            <el-dropdown-item command="signer">入库签收人</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <!--导出-->
                <el-col :xs="12" :sm="6" :md="6" :lg="3">
                    <el-button class="filter-item-btn" type="primary" icon="document" v-waves @click="handleDownload">导出</el-button>
                </el-col>
                <!--刷新-->
                <el-col :xs="12" :sm="6" :md="6" :lg="3">
                    <el-button class="filter-item-btn" v-waves type="primary" icon="" v-on:click.native="refreshList">
                        <icon-svg icon-class="refresh"></icon-svg>
                        刷新
                    </el-button>
                </el-col>
            </el-row>
            <!--  删选模块  -->
            <el-row :gutter="10" class="filter-container">
                <el-col :xs="19" :sm="24" :md="8" :lg="4">
                    <h5 class="filter-item" style="width: 100%;text-align: center">删选</h5>
                </el-col>
                <!--显示红单-->
                <el-col :xs="5" :sm="6" :md="4" :lg="3">
                    <el-checkbox class="filter-item" v-model="Filter.filterRedbill">显示红单</el-checkbox>
                </el-col>
                <!--选择日期范围-->
                <el-col :xs="24" :sm="18" :md="12" :lg="5">
                    <div class="date-picker filter-item" style="width: 100%">
                        <el-date-picker
                                v-model="Filter.filterHandledate"
                                type="daterange"
                                align="right"
                                placeholder="选择日期范围"
                                :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                    </div>
                </el-col>
                <!--面辅料筛选-->
                <el-col :xs="24" :sm="12" :md="6" :lg="3">
                    <el-select clearable class="filter-item" placeholder="面辅料" v-model="Filter.filterAccessories" @change='accessoriesFilter'>
                        <el-option v-for="item in  accessoriesOption" :key="item.key" :label="item.val" :value="item.val"></el-option>
                    </el-select>
                </el-col>
                <!--单价筛选-->
                <el-col :xs="24" :sm="12" :md="6" :lg="3">
                    <el-select clearable class="filter-item" placeholder="单价" v-model="Filter.filterUnitPrice" @change='unitpriceFilter'>
                        <el-option v-for="item in  unitpriceOption" :key="item.key" :label="item.val+ '(单价)'" :value="item.val"></el-option>
                    </el-select>
                </el-col>
                <!--数量筛选-->
                <el-col :xs="24" :sm="12" :md="6" :lg="3">
                    <el-select clearable class="filter-item" placeholder="数量" v-model="Filter.filterHandleNum" @change='handlenumFilter'>
                        <el-option v-for="item in  handlenumOption" :key="item.key" :label="item.val + '(数量)'" :value="item.val"></el-option>
                    </el-select>
                </el-col>
                <!--总额筛选-->
                <el-col :xs="24" :sm="12" :md="6" :lg="3">
                    <el-select clearable class="filter-item" placeholder="总额" v-model="Filter.filterSumMoney" @change='summoneyFilter'>
                        <el-option v-for="item in  summoneyOption" :key="item.key" :label="item.val+ '(总额)'" :value="item.val"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-row>
        <!--列表-->
        <el-table ref="userListTable" :data="currentPageData" v-loading.body="listLoading">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form inline class="demo-table-expand">
                        <div style="width: 92%">
                            <el-form-item label="单号:">
                                <span>{{ props.row.storageNum }}</span>
                            </el-form-item>
                            <el-form-item :label="depot.type+'库时间:'">
                                <span>{{ props.row.handledate | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                            </el-form-item>
                            <el-form-item :label="depot.type ===  '入'? '供应商货号:' : '本地货号:'">
                                <span>{{ depot.type === '入' ? props.row.supplierarticleNum : props.row.localarticleNum }}</span>
                            </el-form-item>
                            <el-form-item label="签收人:">
                                <span>{{ props.row.signer }}</span>
                            </el-form-item>
                            <el-form-item label="面辅料名称:">
                                <span>{{ props.row.accessories }}</span>
                            </el-form-item>
                            <el-form-item label="计量单位:">
                                <span>{{ props.row.measureunit }}</span>
                            </el-form-item>
                            <el-form-item :label="depot.type+'库数量:'">
                                <span>{{ props.row.handleNum }}</span>
                            </el-form-item>
                            <el-form-item label="单价(元):">
                                <span>{{ props.row.unitPrice }}</span>
                            </el-form-item>
                            <el-form-item label="总额(元):">
                                <span>{{ props.row.sumMoney }}</span>
                            </el-form-item>
                            <el-form-item label="红单:" style="color: #ff4949">
                                <span>{{ props.row.redbill | booleanTo}}</span>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="备注:" class="el-form-item-remarks">
                                <span>{{ props.row.remarks }}</span>
                            </el-form-item>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <!--单号-->
            <el-table-column align="center" :label="depot.type+'库单号'" min-width="180px">
                <template scope="scope">
                    <span>{{scope.row.storageNum}}</span>
                </template>
            </el-table-column>
            <!--时间-->
            <el-table-column align="center" :label="depot.type+'库时间:'" min-width="180px">
                <template scope="scope">
                    <span>{{scope.row.handledate | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <!--供应商货号 / 本地货号-->
            <el-table-column align="center" :label="depot.type ===  '入'? '供应商货号:' : '本地货号:'" min-width="180px">
                <template scope="scope">
                    <span>{{depot.type === '入' ? scope.row.supplierarticleNum : scope.row.localarticleNum}}</span>
                </template>
            </el-table-column>
            <!--面辅料名称-->
            <el-table-column align="center" label="面辅料名称" min-width="120px">
                <template scope="scope">
                    <span>{{scope.row.accessories}}</span>
                </template>
            </el-table-column>
            <!--计量单位-->
            <el-table-column align="center" label="计量单位" min-width="100px">
                <template scope="scope">
                    <span>{{scope.row.measureunit}}</span>
                </template>
            </el-table-column>
            <!--单价(元)-->
            <el-table-column align="center" label="单价(元)" min-width="100px">
                <template scope="scope">
                    <span>{{scope.row.unitPrice}}</span>
                </template>
            </el-table-column>
            <!-- 入/出库数量-->
            <el-table-column align="center" :label="depot.type+'库数量:'" min-width="120px">
                <template scope="scope">
                    <span>{{scope.row.handleNum}}</span>
                </template>
            </el-table-column>
            <!-- 总额(元)-->
            <el-table-column align="center" label="总额(元)" min-width="100px">
                <template scope="scope">
                    <span>{{scope.row.sumMoney}}</span>
                </template>
            </el-table-column>
            <!--管理员 - 固定栏-->
            <el-table-column prop="handle" label="操作" min-width="150" fixed="right" v-if="this.$store.state.user.info.status === 'admin'">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="primary" size="small" icon="delete" @click.native.prevent="deleteDepot(scope.$index, currentPageData)"></el-button>
                </template>
            </el-table-column>
            <!--普通用户 - 固定栏-->
            <el-table-column prop="handle" label="操作" min-width="80" fixed="right" v-if="this.$store.state.user.info.status !== 'admin'">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="view" @click="handleEdit(scope.$index, scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block" v-show="!listLoading" style="text-align: center">
            <el-pagination
                    @size-change="DepotList_SizeChange"
                    @current-change="DepotList_CurrentChange"
                    :current-page="Filter.listpage.currentPage"
                    :page-sizes="[10, 20, 40, 60]"
                    :page-size="Filter.listpage.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {pickerOptions} from '../../utils/index';
    import {mapGetters} from 'vuex';
    export default{
        name: 'Depotlist-out-in',
        props: {
            DepotOutInList: Object
        },
        computed: {
            ...mapGetters(['depot']),
        },
        data: function () {
            return {
                //列表是否正在正在加载
                listLoading: true,
                deleteDepotWarn: '确定要删除该出/入库信息吗？',
                //accessories - option
                accessoriesOption: [
                    {key: '毛', val: '毛'},
                    {key: '麻', val: '麻'},
                    {key: '棉', val: '棉'},
                    {key: '丝', val: '丝'},
                    {key: '合成材料', val: '合成材料'},
                    {key: '其他', val: '其他'},
                    {key: 'All', val: '所有'},
                ],
                //unitprice - option
                unitpriceOption: [
                    {key: '1-20', val: '1-20'},
                    {key: '21-40', val: '21-40'},
                    {key: '41-60', val: '41-60'},
                    {key: '61-80', val: '61-80'},
                    {key: '81-100', val: '81-100'},
                    {key: '100-99999', val: '100以上'},
                    {key: 'All', val: '所有'},
                ],
                //handlenum - option
                handlenumOption: [
                    {key: '1-50', val: '1-50'},
                    {key: '51-100', val: '51-100'},
                    {key: '101-150', val: '101-150'},
                    {key: '151-99999', val: '150以上'},
                    {key: 'All', val: '所有'},
                ],
                //summoney - option
                summoneyOption: [
                    {key: '1-1000', val: '1-1000'},
                    {key: '1001-2000', val: '1001-2000'},
                    {key: '2001-3000', val: '2001-3000'},
                    {key: '3001-4000', val: '3001-4000'},
                    {key: '4001-5000', val: '4001-5000'},
                    {key: '5000-999999', val: '5000以上'},
                    {key: 'All', val: '所有'},
                ],
                //表格当前页显示数据
                currentPageData: [],
                //中转存储数据
                storageData: [],
                //过滤下拉菜单选择信号数据
                Filter: {
                    filterRedbill: false,
                    filterAccessories: undefined,
                    filterUnitPrice: undefined,
                    filterHandleNum: undefined,
                    filterSumMoney: undefined,
                    filterHandledate: undefined,
                    //分页
                    listpage: {
                        currentPage: 1,
                        pageSize: 10,
                        dataTotal: null
                    }
                },
                //data picker
                pickerOptions: pickerOptions,
            }
        },
        created () {
            /*无删选状态加载所有数据*/
            this.getList(this, this.DepotOutInList.url, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                this.storageData = r.DepotList;
            }, () => {
                this.listLoading = false;
            });
        },
        watch: {
            'Filter.filterRedbill': {
                handler(curVal, oldVal){
                    this.loadingList();
                }
            },
            'Filter.filterHandledate': {
                handler(curVal, oldVal){
                    this.loadingList();
                }
            }
        },
        methods: {
            //基础加载函数
            loadingList(){
                this.listLoading = true;
                this.getList(this, this.DepotOutInList.url, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                    this.storageData = r.DepotList
                        .filter_Data_section('handledate', this.Filter.filterHandledate)
                        .filter_section('unitPrice', this.Filter.filterUnitPrice)
                        .filter_section('handleNum', this.Filter.filterHandleNum)
                        .filter_section('sumMoney', this.Filter.filterSumMoney)
                        .filter_fixedVal('redbill', this.Filter.filterRedbill)
                        .filter_arrValue_accs('accessories', this.Filter.filterAccessories);
                }, () => {
                    this.listLoading = false;
                });
            },
            unitpriceFilter(){
                this.loadingList();
            },
            handlenumFilter(){
                this.loadingList();
            },
            summoneyFilter(){
                this.loadingList();
            },
            accessoriesFilter(){
                this.loadingList();
            },
            //表格当前页显示条数回调
            DepotList_SizeChange(val) {
                this.Filter.listpage.pageSize = val;
                this.loadingList();
            },
            //表格翻页回调
            DepotList_CurrentChange(val) {
                this.Filter.listpage.currentPage = val;
                this.loadingList();
            },
            //输入搜索回调
            cb(val, tit){
                //向父级发送信息，切换用户列表和搜索结果列表
                this.$emit('depotList', {
                    'depotListShow': false,
                    'depotSearchShow': true
                });
                this.$store.dispatch('toDepotSearch', {
                    val: val,
                    tit: tit,
                    url: ''
                });
            },
            //搜索用户
            searchBill(command) {
                const t = this.depot.type;
                const tit = '搜索' + t + '库单';
                const rule = /^[A-Za-z0-9-]+$/;
                //面辅料搜索单据
                if (command === "accessories") {
                    this.promptInput(this, '请输入面辅料名称搜索', tit, rule, '面辅料名称格式不正确', (val) => {
                        this.cb(val, '面辅料查找' + t + '库单：');
                    }, () => {
                    })
                }
                //本地货号搜索单据
                else if (command === "localarticleNum") {
                    this.promptInput(this, '请输入本地货号搜索', tit, rule, '本地货号格式不正确', (val) => {
                        this.cb(val, '本地货号查找' + t + '库单：');
                    }, () => {
                    })
                }
                //面辅料搜索单据
                else if (command === "supplierarticleNum") {
                    this.promptInput(this, '请输入供应商货号搜索', tit, rule, '供应商货号格式不正确', (val) => {
                        this.cb(val, '供应商货号查找' + t + '库单：');
                    }, () => {
                    })
                }
                //面辅料搜索单据
                else {
                    this.promptInput(this, '请输入' + t + '库签收人搜索', tit, rule, '' + t + '库签收人格式不正确', (val) => {
                        this.cb(val, '' + t + '库签收人查找' + t + '库单：');
                    }, () => {
                    })
                }
            },
            //刷新用户列表
            refreshList: function () {
                const Filterinit = {
                    filterRedbill: false,
                    filterAccessories: undefined,
                    filterUnitPrice: undefined,
                    filterHandleNum: undefined,
                    filterSumMoney: undefined,
                    filterHandledate: undefined,
                    listpage: {
                        currentPage: 1,
                        pageSize: 10,
                        dataTotal: null
                    }
                };
                //无选择删选的情况下，强制性执行loadingList 刷新，在已选定删选条件的情况下，初始化数据即可同步刷新
                JSON.stringify(this.Filter) === JSON.stringify(Filterinit) ? this.loadingList() : this.Filter = Filterinit;
            },
            //编辑用户
            handleEdit(index, row) {
                this.$store.dispatch('depotDataCarrier', this.currentPageData[index]);
                this.$router.push({path: this.DepotOutInList.routerPush});
            },
            //删除用户
            deleteDepot(index, rows) {
                this.$confirm(this.deleteDepotWarn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                }).catch(() => {
                    return false;
                });
            },
            //excel 下载
            handleDownload(){
                require.ensure([], () => {
                    const {export_json_to_excel} = require('../../vendor/Export2Excel');
                    let tHeader, filterVal;
                    if (this.$store.state.carrier.depot.type === '入') {
                        tHeader = ['入库单号', '入库时间', '供应商货号', '面辅料名称', '计量单位', '单价(元)', '数量', '总额(元)', '备注'];
                        filterVal = [
                            'storageNum', 'handledate', 'supplierarticleNum', 'accessories',
                            'measureunit', 'unitPrice', 'handleNum', 'sumMoney', 'remarks'
                        ];
                    }
                    else {
                        tHeader = ['出库单号', '出库时间', '本地货号', '面辅料名称', '计量单位', '单价', '数量', '总额', '备注'];
                        filterVal = [
                            'storageNum', 'handledate', 'localarticleNum', 'accessories',
                            'measureunit', 'unitPrice', 'handleNum', 'sumMoney', 'remarks'
                        ];
                    }
                    const data = this.formatJson(filterVal, this.currentPageData);
                    export_json_to_excel(tHeader, data, 'MiMo服装设计后台管理系统 - 入库数据');
                })
            },
            //excel 转换显示形式
            formatJson(filterVal, jsonData){
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'handledate') {
                        return this.parseTime(v[j], '{y}-{m}-{d} {h}:{i}')
                    }
                    return v[j]
                }))
            },
        }
    }
</script>



