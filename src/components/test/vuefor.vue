<template>
    <div class="main" id="bench">
        <!--nav left-->
        <div class="navLeft">
            <el-menu :default-active="navselected" :active="navselected" class="el-menu-vertical-demo" ref="mybox" @open="handleOpen">
                <el-submenu :index="firstlist.index" v-for="(firstlist,index) in str" :key="firstlist.index" ref="aaa">
                    <template slot="title"><i class="el-icon-edit"></i>{{ index + 1 }} {{firstlist.modulegroup }}</template>
                    <el-menu-item v-for="(secondlist,index) in firstlist.module" :index="firstlist.index+'-'+secondlist.moduleorder" :key="firstlist.index+'-'+secondlist.moduleorder">{{secondlist.display_name }}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>
<script>
//    import '../../assets/css/view/bench/cont/cont.scss'         //front (login / reg / forget /)
//    import '../../assets/css/view/bench/front.scss'         //front (login / reg / forget /)
    export default {
        name: 'bench',
        data() {
            return {
                navindex: "1",
                navselected: "1",
                str: [
                    {modulegroup: "产品企划",index:'1', module: [{id: 5, display_name: "产品企划", moduleorder: 1}]},
                    {
                        modulegroup: "款式研发",
                        index:'2',
                        module: [
                            {id: 6, display_name: "款式初稿", moduleorder: 1},
                            {id: 7, display_name: "初稿审核", moduleorder: 2},
                            {id: 8, display_name: "配面辅料", moduleorder: 3},
                            {id: 9, display_name: "面辅料评审", moduleorder: 4},
                            {id: 10, display_name: "款式制版", moduleorder: 5},
                            {id: 11, display_name: "裁剪面料", moduleorder: 6},
                            {id: 12, display_name: "缝制样衣", moduleorder: 7},
                            {id: 13, display_name: "版型评审", moduleorder: 8}
                        ]
                    },
                    {modulegroup: "流程管理", index:'3',module: [{id: 4, display_name: "流程管理", moduleorder: 1}]},
                    {
                        modulegroup: "系统设置",
                        index:'4',
                        module: [
                            {id: 1, display_name: "账户管理", moduleorder: 1},
                            {id: 2, display_name: "岗位部门", moduleorder: 2},
                            {id: 3, display_name: "仓库管理", moduleorder: 3}
                        ]
                    }
                ],
                str2:'[{ "modulegroup": "产品企划","module": [{"id": 5,"display_name": "产品企划","moduleorder": 1}] },{ "modulegroup": "款式研发","module": [{"id": 6,"display_name": "款式初稿","moduleorder": 1},{"id": 7,"display_name": "初稿审核","moduleorder": 2},{"id": 8,"display_name": "配面辅料","moduleorder": 3},{"id": 9,"display_name": "面辅料评审","moduleorder": 4},{"id": 10,"display_name": "款式制版","moduleorder": 5},{"id": 11,"display_name": "裁剪面料","moduleorder": 6},{"id": 12,"display_name": "缝制样衣","moduleorder": 7},{"id": 13,"display_name": "版型评审","moduleorder": 8}] },{ "modulegroup": "流程管理","module": [{"id": 4,"display_name": "流程管理","moduleorder": 1}] },{ "modulegroup": "系统设置","module": [{"id": 1,"display_name": "账户管理","moduleorder": 1},{"id": 2,"display_name": "岗位部门","moduleorder": 2},{"id": 3,"display_name": "仓库管理","moduleorder": 3}] }]',
                str3: "[{ 'modulegroup': '产品企划','modulegroup_order':1,'module': [{'id': 5,'display_name': '产品企划','iclass': 'el-icon-message','moduleroute': '','moduleorder': 1}] },{ 'modulegroup': '款式研发','modulegroup_order':2,'module': [{'id': 6,'display_name': '款式初稿','iclass': 'el-icon-message','moduleroute': '','moduleorder': 1},{'id': 7,'display_name': '初稿审核','iclass': 'el-icon-message','moduleroute': '','moduleorder': 2},{'id': 8,'display_name': '配面辅料','iclass': 'el-icon-message','moduleroute': '','moduleorder': 3},{'id': 9,'display_name': '面辅料评审','iclass': 'el-icon-message','moduleroute': '','moduleorder': 4},{'id': 10,'display_name': '款式制版','iclass': 'el-icon-message','moduleroute': '','moduleorder': 5},{'id': 11,'display_name': '裁剪面料','iclass': 'el-icon-message','moduleroute': '','moduleorder': 6},{'id': 12,'display_name': '缝制样衣','iclass': 'el-icon-message','moduleroute': '','moduleorder': 7},{'id': 13,'display_name': '版型评审','iclass': 'el-icon-message','moduleroute': '','moduleorder': 8}] },{ 'modulegroup': '流程管理','modulegroup_order':3,'module': [{'id': 4,'display_name': '流程管理','iclass': 'el-icon-message','moduleroute': '','moduleorder': 1}] },{ 'modulegroup': '系统设置','modulegroup_order':4,'module': [{'id': 1,'display_name': '账户管理','iclass': 'el-icon-message','moduleroute': '','moduleorder': 1},{'id': 2,'display_name': '岗位部门','iclass': 'el-icon-message','moduleroute': '','moduleorder': 2},{'id': 3,'display_name': '仓库管理','iclass': 'el-icon-message','moduleroute': '','moduleorder': 3}] }]"

            };
        },
        created () {
//            alert(typeof this.str3)
            console.log(this.str3);
            const str5 = this.str3.replace(/'/g, '"');
            alert(str5);
            let obj =  JSON.parse(str5);
            console.log(obj);
//            this.axios.post('user/login', params,
//                data => {
//                },
//                r => {
//
//                },
//                () => {
//
//                }
//            );
        },
        mounted(){

        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }

</script>
