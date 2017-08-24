<template>
    <div class="win" id="dashboard">
        <div class="dashboard-container wm">
            <component v-bind:is="currentRole"></component>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import AdminDashboard from './admin/index.vue';
    import DefaultDashboard from './default/index.vue';
    export default {
        name: 'dashboard',
        components: {
            AdminDashboard,
            DefaultDashboard
        },
        data() {
            return {
                currentRole: 'DefaultDashboard'
            }
        },
        computed: {
            ...mapGetters([
//                'name',
//                'avatar',
//                'email',
//                'introduction',
                'status'
            ])
        },
        created() {
            if (this.status === 'normalUser') {
                this.currentRole = 'DefaultDashboard';
            }
            else if (this.status === 'admin') {
                this.currentRole = 'AdminDashboard';
            }
            else {
                this.currentRole = '';
            }
        },
    }
</script>
