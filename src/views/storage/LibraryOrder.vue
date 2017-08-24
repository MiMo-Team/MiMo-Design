<!-- ============= Add Library - Bill ============= -->
<template>
    <div class="win fr" id="addLibraryOrder">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/storage/depotout'"></multi-handle>
        <keep-alive>
            <bill-basic :billInfo="billInfo" v-if="sw"></bill-basic>
        </keep-alive>
    </div>
</template>
<script>
    import {billBasic} from './index';
    export default{
        name: 'addLibraryOrder',
        components: {
            billBasic,
        },
        data() {
            return {
                //模板显示开关
                sw: false,
                //库存信息
                billInfo: {
                    routerPush: '/storage/depotout',         //push url
                    supplierarticleNumState: true,          //input disable
                    supplierarticleNumProp: null,           //prop val
                    supplierarticleNumClass: 'textdelete',  //add class style
                }
            };
        },
        created () {
            if (this.$store.state.carrier.depot.type) {
                this.$store.dispatch('depotTypeCarrier', '出');
                if (this.$store.state.carrier.depot.carrierData) {
                    this.billInfo.tit = '编辑';
                    this.billInfo.data = this.$store.state.carrier.depot.carrierData;
                    this.sw = true;
                }
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
                this.$router.push({path: '/storage/depotout'});
            }
        }
    }
</script>
<style>

</style>

