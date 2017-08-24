<!-- ============= Add Storage - Bill ============= -->
<template>
    <div class="win fr" id="addStorageOrder">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/storage/depotin'"></multi-handle>
        <keep-alive>
            <bill-basic :billInfo="billInfo" v-if="sw"></bill-basic>
        </keep-alive>
    </div>
</template>
<script>
    import {billBasic} from './index';
    export default{
        name: 'addStorageOrder',
        components: {
            billBasic,
        },
        data() {
            return {
                //模板显示开关
                sw: false,
                //库存信息
                billInfo: {
                    routerPush: '/storage/depotin',
                }
            };
        },
        created () {
            /* vuex 中无type值，说明非逻辑访问（刷新或者网址直接访问），故页面没有获取选定单据的数据，从而需要跳回出入库单列表 */
            this.$store.dispatch('depotTypeCarrier', '入');
            //进出库数据载体中有值，则代表为编辑进/出库单
            if (this.$store.state.carrier.depot.type) {
                //进出库数据载体中有值，则代表为编辑进/出库单
                if (this.$store.state.carrier.depot.carrierData) {
                    this.billInfo.tit = '编辑';
                    this.billInfo.data = this.$store.state.carrier.depot.carrierData;
                    this.sw = true;
                }
                //否则为新增进/出库单
                else {
                    this.billInfo.tit = '新增';
                    this.axios.post(this.$store.state.mock.url.DepotAddUrl, {},
                        data => {
                        },
                        r => {
                            this.billInfo.data = r.DepotAdd.data;
                            this.sw = true;
                        }
                    );
                }
            }
            else {
                this.$router.push({path: '/storage/depotin'});
            }
        }
    }
</script>
<style>

</style>

