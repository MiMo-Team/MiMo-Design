<!--默认的日期选择器模板-->
<template>
    <div class="block">
        <el-date-picker
                v-model="value"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value: '',
            };
        }
    };
</script>