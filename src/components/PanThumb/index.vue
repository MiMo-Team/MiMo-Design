<template>
    <div class="pan-item" :style="{zIndex:panThumbSize.zIndex,height:panThumbSize.height,width:panThumbSize.width}">
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot></slot>
            </div>
        </div>
        <img class="pan-thumb" :src="image">
    </div>
</template>
<script>
    export default {
        name: 'PanThumb',
        props: {
            panThumbSize: Object,
            image: {
                type: String,
                required: true
            }
        }
    };
</script>
<style rel="stylesheet/less" lang="less" scoped>
    /*权限字体显示 默认字体颜色*/
    @pan-info-roles-color1: rgba(50, 65, 87, 0.48);
    /*权限字体显示 hover字体颜色*/
    @pan-info-roles-color2: rgba(50, 65, 87, 0.98);
    .dashboard-admin-container .pan-item {
        margin: auto;
        top: 10px;
        left: 0;
        right: 0;
    }

    .dashboard-dafault-container .pan-item {
        margin: 0;
    }

    .pan-item {
        position: absolute;
        display: inline-block;
        z-index: 100;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 1px 3px @pan-info-roles-color1;
    }

    .pan-item .pan-info {
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0 0 0 3px @pan-info-roles-color1;
        -moz-transition: all .38s linear;
        -webkit-transition: all .38s linear;
        -o-transition: all .38s linear;
        transition: all .48s linear;
    }

    .pan-item:hover .pan-info {
        box-shadow: inset 3px 2px 20px 8px @pan-info-roles-color2;
    }

    .pan-item .pan-info-roles-container {
        padding: 20px;
        text-align: center;
    }

    .pan-item .pan-info-roles-container .pan-info-roles.roles-tit {
        font-weight: 600;
        font-size: 16px;
    }

    .pan-item .pan-info-roles-container .pan-info-roles {
        display: block;
        font-size: 14px;
        font-weight: normal;
        padding: 2px 0;
        color: @pan-info-roles-color1;
        -moz-transition: all .38s ease-out;
        -webkit-transition: all .38s ease-out;
        -o-transition: all .38s ease-out;
        transition: all .38s ease-in;
    }

    .pan-item:hover .pan-info-roles {
        color: @pan-info-roles-color2;
    }

    /*旋转图片*/
    .pan-item .pan-thumb {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: 100%;
        border-radius: 50%;
        overflow: hidden;
        transform-origin: 95% 40%;
        transition: all 0.3s ease-in-out;
    }

    .pan-item .pan-thumb:after {
        position: absolute;
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        top: 40%;
        left: 95%;
        margin: -4px 0 0 -4px;
        background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
        box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
    }

    .pan-item:hover .pan-thumb {
        transform: rotate(-110deg);
    }
</style>
