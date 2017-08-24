<!-- ============= search-list module ============= -->
<template>
    <!--search resault-->
    <div class="user-search" id="bill-search">
        <!--搜索显示栏目顶部操作模块-->
        <div class="searchTit">
            <!--<el-button type="text" size="large" v-on:click.native="backTable"><i class="el-icon-arrow-left"></i>返回</el-button>-->
            <h5>{{searchTit}}<span>共显示{{searchlength}}条</span></h5>
        </div>
        <!--列表-->
        <el-table ref="userListTable" border fit :data="currentPageData" v-loading.body="listLoading"
                  highlight-current-row style="width: 100%">
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
            <el-table-column align="center" label="时间" min-width="180px">
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
                    <!--编辑-->
                    <el-button type="primary" size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <!--删除-->
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
        <div class="block txtC" v-show="!listLoading">
            <el-pagination
                    :current-page="Filter.listpage.currentPage"
                    :page-sizes="[15,25,35,45]"
                    :page-size="Filter.listpage.pageSize"
                    layout=" total, sizes, prev, pager, next, jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default{
        name: 'bill-search',
        props: {
            DepotSearch: Object
        },
        computed: {
            ...mapGetters(['depot'])
        },
        data() {
            return {
                listLoading: true,
                deleteUserWarn: '确定要删除该用户吗？',
                searchTit: '',
                //search - length is show
                searchlength: '',
                currentPageData: [],
                storageData: [],
                Filter: {
                    listpage: {
                        currentPage: 1,
                        pageSize: 10,
                        dataTotal: null
                    },
                }
            };
        },
        created () {
            this.searchTit = this.$store.state.carrier.depot.searchTit;
            this.getList(this, this.$store.state.carrier.depot.type === '入' ? this.$store.state.mock.url.DepotList_In_SearchUrl : this.$store.state.mock.url.DepotList_Out_SearchUrl,
                {'searchVal': this.$store.state.carrier.depot.searchVal}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                    this.storageData = r.Depotdata;
                    this.searchlength = this.storageData.length;
                    console.log(this.storageData);
                }, () => {
                    this.listLoading = false;
                });
        },
        methods: {
            //back
            backTable: function () {
                //向父级发送信息，切换用户列表和搜索结果列表,过滤下拉菜单选项 和 刷新用户列表按钮 启用
                this.$emit('depotSearch', {
                    'depotListShow': true,
                    'depotSearchShow': false
                });
            },
            deleteUser(index, rows) {
                this.$confirm(this.deleteUserWarn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                }).catch(() => {
                    return false;
                });
            },
            handleEdit(index, row) {
                this.$store.dispatch('depotDataCarrier', row);
                this.$router.push({path: this.DepotSearch.routerPush});
            },
        }
    }
</script>


