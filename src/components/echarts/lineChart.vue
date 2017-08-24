<template>
    <div class="line_chart" :class="className" :style="{height:line_chart_data.size.height,width:line_chart_data.size.width}"></div>
</template>
<script>
    import echarts from 'echarts';
    require('echarts/theme/macarons');
    import {debounce} from '../../utils/index';
    export default {
        props: {
            line_chart_data: Object,
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
                        text: this.line_chart_data.title.text,
                        x: 'center'
                    },
                    xAxis: {
                        data: this.line_chart_data.xAxis.data,
                        boundaryGap: false
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 20,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    yAxis: {},
                    series: this.line_chart_data.series,
                })
            }
        }
    }
</script>
<style scoped="">
    .line_chart {
        width: 100%;
        height: 400px;
    }
</style>