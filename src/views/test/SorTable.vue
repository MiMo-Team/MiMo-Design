<template>
    <div class="win fr" ref="SorTable" id="SorTable-Father1">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/dashboard'"></multi-handle>
        <p class="win-tit"><span>▌</span>&nbsp;拖动 - 父组件中换位</p>

        <div class="sortbox">
            <sort-child :childName="'新视窗'" :childNumber="'0'"></sort-child>
            <sort-child :childName="'新视窗'" :childNumber="'1'"></sort-child>
            <sort-child :childName="'新视窗'" :childNumber="'2'"></sort-child>
            <sort-child :childName="'新视窗'" :childNumber="'3'"></sort-child>
            <sort-child :childName="'新视窗'" :childNumber="'4'"></sort-child>
        </div>


    </div>

</template>

<script>
    import sortChild from '../../components/test/sort-child.vue';
    import Sortable from '../../../node_modules/sortable/index'

    export default {
        name: 'SorTable',
        components: {
            sortChild
        },
        data() {
            return {
                list: null,
                total: null,
                sortable: null,
                olderList: [],
                newList: []
            }
        },
        created() {
//            this.olderList = this.list.map(v => v.id);
            this.newList = this.olderList.slice();
            this.$nextTick(() => {
                this.setSort()
            })
        },
        methods: {
            setSort() {
                const el = document.querySelectorAll('.sortbox')[0];
                console.log(1111);
                console.log(el);
                this.sortable = Sortable.create(el, {
                    // handle: '.drag-handler',
                    onEnd: evt => {
                        const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
                        this.newList.splice(evt.newIndex, 0, tempIndex);
                    }
                });
            }
        }
    }
</script>

<style>
    .drag-handler {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .show-d {
        margin-top: 15px;
    }
</style>
