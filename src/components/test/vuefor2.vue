<template>
    <div class="main" id="bench">
        <table class="demo">
            <tr is="my-tr" v-for="(trItem,index) in trItems">
                上一个index：{{index + 1}}
                <td is="my-td" v-for="(tdItem,index) in trItem.tdItems" style="color:#ffffff;">
                    数字：{{tdItem.number }}, 序号：{{ index + 1 }}-{{ index + 1 }}
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
    var aTr = {
            template: ' <tr><slot></slot></tr>'
        },
        aTd = {
            template: '<td><slot></slot></td>'
        };


    export default {
        name: 'bench',
        data() {
            return {
                trItems: [
                    {
                        name: 'a1', tdItems: [{number: 1}, {number: 2}, {number: 3}]
                    },
                    {
                        name: 'a2', tdItems: [{number: 4}, {number: 5}, {number: 6}]
                    },
                    {
                        name: 'a3', tdItems: [{number: 7}, {number: 8}, {number: 9}]
                    }
                ]
            };
        },
        created () {

        },
        mounted(){

        },
        methods: {

        },
        components: {
            'my-tr': aTr,
            'my-td': aTd
        }
    }

</script>
