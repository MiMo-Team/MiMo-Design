<template>
    <div class="Multi-handle">
        <svg class="svg-icon multi" aria-hidden="true">
            <use xlink:href="#icon-qrcode"></use>
        </svg>
        <div class="Multi-handle-cont">
            <router-link :to='routerLink' class="Multi-handle-btn" @click.native.prevent="clickhandle">
                <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-undo"></use>
                </svg>
            </router-link>
            <div class="Multi-handle-btn " @click="refresh">
                <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-refresh"></use>
                </svg>
            </div>
            <router-link to="/dashboard" class="Multi-handle-btn">
                <svg class="svg-icon" aria-hidden="true">
                    <use xlink:href="#icon-homepage"></use>
                </svg>
            </router-link>

        </div>
    </div>
</template>
<script>
    export default {
        name: 'Multi-handle',
        props: {
            routerLink: {
                type: String,
                default: "/dashboard"
            },
        },
        data() {
            return {
                sw: false
            }
        },
        created(){
            console.log(this.routerLink)
        },
        methods: {
            refresh(){
                location.reload();
            },
            clickhandle(){
                this.$emit('func', {
                    'switch': !this.sw
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    /*size*/
    $size: 40px;
    $fs: 26px;
    $speed: .32s;
    $deg: -45deg;
    /* font-size color */
    $fc1: rgba(50, 65, 87, 0.62);
    $fc2: rgba(50, 65, 87, 0.76);
    /* background - gradient */
    $col1: rgba(180, 225, 246, 0.98);
    $col2: rgba(255, 255, 255, 0.98);
    @mixin transition($speed) {
        -moz-transition: all $speed linear;
        -webkit-transition: all $speed linear;
        -o-transition: all $speed linear;
        transition: all $speed linear;
    }

    @mixin back-gradient($col1,$col2,$deg) {
        background: -webkit-linear-gradient($deg, $col1 100px, $col2 200px);
        background: -o-linear-gradient($deg, $col1 100px, $col2 200px);
        background: -moz-linear-gradient($deg, $col1 100px, $col2 200px);
        background: linear-gradient($deg, $col1, $col2);
    }

    .Multi-handle {
        position: absolute;
        display: inline-block;
        top: 0px;
        left: 0px;
        width: $size;
        height: $size;
        cursor: pointer;
        text-align: center;
        @include transition($speed);
        .svg-icon {
            font-size: $fs - 4px;
            color: $fc1;
        }
        .svg-icon.multi {
            font-size: $fs;
        }
        .Multi-handle-cont {
            height: 0;
            @include transition($speed);
            .Multi-handle-btn {
                height: 100%;
                svg {
                    height: 100%;
                    &:hover {
                        color: rgba(32, 160, 255, 0.98);
                    }
                }
            }
        }
        &:hover {
            height: 100%;
            @include back-gradient($col1, $col2, $deg);
            .svg-icon {
                color: $fc2;
            }
            .Multi-handle-cont {
                height: $size;
                margin-top: 5px;
                padding-top: 15px;
                border-top: 1px solid $fc1;
            }
        }
    }
</style>