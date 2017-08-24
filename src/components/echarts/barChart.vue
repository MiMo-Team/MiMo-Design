<template>
    <div class="bar_chart" :class="className" :style="{height:bar_chart_data.size.height,width:bar_chart_data.size.width}"></div>
</template>
<script>
    import echarts from 'echarts';
    require('echarts/theme/macarons');
    import {debounce} from '../../utils/index';
    export default {
        props: {
            bar_chart_data: Object,
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
            return {chart: null};
        },
        mounted() {
            this.initChart();
            if (this.autoResize) {
                this.__resizeHanlder = debounce(() => {
                    this.chart.resize()
                }, 100);
                window.addEventListener('resize', this.__resizeHanlder)
            }
            const sidebarElm = document.getElementsByClassName('sidebar-container')[0];
            sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
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
                        text: this.bar_chart_data.title.text,
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {                          // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'                      // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: this.bar_chart_data.xAxis,
                    yAxis: [{
                        type: 'value'
                    }],
                    series: this.bar_chart_data.series,
                })
            }
        }
    }
</script>
<style scoped="">
    .bar_chart {
        width: 100%;
        height: 400px;
    }
</style>
