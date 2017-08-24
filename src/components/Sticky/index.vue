<template>
    <div :style="{'min-height':stickyHeight+'px',zIndex:zIndex}">
        <div :class="className" :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px',background:background}">
            <slot>
                <div>sticky</div>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sticky',
        props: {
            stickyHeight: {
                type: Number,
                default: 0
            },
            stickyTop: {
                type: Number,
                default: 0
            },
            zIndex: {
                type: Number,
                default: 1999
            },
            className: {
                type: String
            }
        },
        data() {
            return {
                active: false,
                position: '',
                currentTop: '',
                width: undefined,
                height: undefined,
                background: undefined,
                child: null
            };
        },
        methods: {
            sticky() {
                if (this.active) {
                    return
                }
                this.position = 'fixed';
                this.active = true;
                this.width = this.width + 'px';
                this.background = 'rgba(238, 241, 246, 0.98)';
            },
            reset() {
                if (!this.active) {
                    return
                }
                this.background = undefined;
                this.position = '';
                this.width = 'auto';
                this.active = false
            },
            handleScroll() {
                this.width = this.$el.getBoundingClientRect().width;
                const offsetTop = this.$el.getBoundingClientRect().top;
                if (offsetTop <= this.stickyTop) {
                    this.sticky();
                    return
                }
                this.reset()
            }
        },
        mounted() {
//            this.height = this.$el.getBoundingClientRect().height;
            const appMain = document.querySelector('.app-main');
            if(appMain){
                appMain.addEventListener('onresize', this.handleScroll);
                appMain.addEventListener('scroll', this.handleScroll);
            }
        },
        destroyed() {
            const appMain = document.querySelector('.app-main');
            if(appMain){
                appMain.addEventListener('onresize', this.handleScroll);
                appMain.removeEventListener('scroll', this.handleScroll);
            }
        }
    };
</script>
