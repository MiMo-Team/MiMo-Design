<!-- select type to registrate -->
<template>
    <register :regInfo="regInfo"></register>
</template>
<script>
    import Register from '../../components/front/register.vue'
    export default {
        components: {
            Register,
        },
        data(){
            return{
                regInfo:{
                    type:'',
                    typeshow:''
                }
            }
        },
        created (){
            this.regInfo.type = this.$route.query.type;
            this.regInfo.typeshow = this.regType(this.$route.query.type);
        },
        methods: {
            regType(type) {
                const regMap = {
                    email: '邮箱',
                    mobile: '手机',
                    account:'账号'
                };
                return regMap[type]
            }
        }
    }
</script>

