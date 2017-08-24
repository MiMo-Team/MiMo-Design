<!-- ============= admin index ============= -->
<template>
    <div class="win" id="Depot-out-in">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="depotListShow?'/dashboard':routerLink" v-on:func="sw"></multi-handle>
        <!--bill list-->
        <depot-list-out-in v-if="depotListShow" :DepotOutInList="DepotOutInList" v-on:depotList="recieveDepotList1"></depot-list-out-in>
        <!--search resault-->
        <bill-search v-if="depotSearchShow" :DepotSearch="DepotSearch" v-on:depotSearch="recieveDepotList2"></bill-search>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import DepotListOutIn  from '../../components/storage/DepotList-out-in.vue';
    import BillSearch from "../../components/storage/bill-search.vue";
    export default{
        name: 'Depot-out-in',
        components: {
            BillSearch,
            DepotListOutIn
        },
        data: function () {
            return {
                //向 user - list 传递信号
                DepotOutInList: {},
                DepotSearch: {},
                depotListShow: true,
                depotSearchShow: false,
                routerLink: '',
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index':2002
                }
            }
        },
        created () {
            if (this.$route.name === '入库单') {
                this.$store.dispatch('depotTypeCarrier', '入');
                this.routerLink = '/storage/depotin';
                this.DepotOutInList.routerPush = this.DepotSearch.routerPush = '/storage/addso';
                this.DepotOutInList.url = this.$store.state.mock.url.DepotList_InUrl;
            }
            else {
                this.$store.dispatch('depotTypeCarrier', '出');
                this.routerLink = '/storage/depotout';
                this.DepotOutInList.routerPush = this.DepotSearch.routerPush = '/storage/addlo';
                this.DepotOutInList.url = this.$store.state.mock.url.DepotList_OutUrl;
            }
        },
        methods: {
            sw: function (n) {
                console.log('bianhuaelelellee');
                this.depotListShow = n.switch;
                this.depotSearchShow = !n.switch;
            },
            recieveDepotList1: function (n) {
                this.depotListShow = n.depotListShow;
                this.depotSearchShow = n.depotSearchShow;
            },
            recieveDepotList2: function (n) {
                this.depotListShow = n.depotListShow;
                this.depotSearchShow = n.depotSearchShow;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    $label_width: 120px;
    #Depot-out-in {
        .el-date-editor i.el-input__icon {
            right: 0;
        }
        .demo-table-expand {
            .el-form-item {
                width: 25%;
                /*展开行内容各部分 - lable */
                label.el-form-item__label {
                    width: $label_width;
                }
            }
            .el-form-item.el-form-item-remarks {
                width: calc(100% - #{$label_width});
            }
        }
    }
</style>

