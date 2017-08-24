<!-- ============= user edit ============= -->
<template>
    <div class="win fr" id="userEdit">
        <div class="wm">
            <keep-alive>
                <basic-info :formItemable="formItemable" v-if="sw"></basic-info>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import basicInfo from '../../components/admin/basic-info.vue';
    export default{
        name: 'admin',
        components: {
            basicInfo,
        },
        data() {
            return {
                sw: false,
                formItemable: {
                    basicInfoTit: '个人信息',
                    //提交跳转路径
                    routerPush: '/index'
                }
            };
        },
        created () {
//            const token = this.$store.state.user.info.token;
//            const url = this.$store.state.mock.url.personal_infoUrl + '?token=' + token;
            this.axios.post(this.$store.state.mock.url.personal_infoUrl, {},
                data => {
                },
                r => {
                    this.$store.dispatch('userInfoCarrier', r.user.data);
                    this.sw = true;
                }
            );
        }
    }
</script>

