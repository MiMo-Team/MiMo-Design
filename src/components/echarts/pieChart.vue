<template>
    <div class="pie_chart" :class="className" :style="{height:pie_chart_data.size.height,width:pie_chart_data.size.width}"></div>
</template>
<script>
    import echarts from 'echarts';
    require('echarts/theme/macarons');
    import {debounce} from '../../utils/index';
    export default {
        props: {
            pie_chart_data: Object,
            className: {
                type: String,
                default: 'chart'
            },
            autoResize: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                chart: null
            };
        },
        mounted() {
            this.initChart();
            if (this.autoResize) {
                this.__resizeHanlder = debounce(() => {
                    this.chart.resize()
                }, 100);
                // 监听窗口变化
                window.addEventListener('resize', this.__resizeHanlder)
            }
            // 监听侧边栏的变化
            const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
            if (sidebarElm) {
                sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            if (this.autoResize) {
                window.removeEventListener('resize', this.__resizeHanlder)
            }
            const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
            if (sidebarElm) {
                sidebarElm.removeEventListener('transitionend', this.__resizeHanlder);
            }
            this.chart.dispose();
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons');
                this.chart.setOption({
                    title: {
                        text: this.pie_chart_data.title.text,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: this.pie_chart_data.legend.data,
                    },
                    calculable: true,
                    series: this.pie_chart_data.series
                })
            }
        }
    }
</script>
<style scoped="">
    .pie_chart {
        width: 100%;
        height: 400px;
    }
</style>