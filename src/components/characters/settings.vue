<template>
    <el-container v-if="this.$store.state.isLogin=='true'">
        <h1 style="text-align:center">交易热度图</h1> 
        <div style="height:800px;width:1000px; center" ref="hotChart"></div>
    </el-container>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            teamList : [],
            tradePower : [],
            max: 0,
            min: 0,
        }
    },
    created() {
        this.getHot();
    },
    methods: {
        requestData() {
            this.$axios.post('http://127.0.0.1:5000/test/data/hot', 
                {
                    isLogin : this.$store.state.isLogin,
                }
            ).then(
                res => {
                    console.log(res);
                    if(res.status === 200 && res.data.success == 'true') {
                        this.teamList = res.data.teamList;
                        this.tradePower = res.data.tradePower;
                        this.max = res.data.max;
                        this.min = res.data.min;
                    }
                    else{
                        console.log('请求失败');
                    }
                    }).catch(error => {
                        alert('接口连接错误');
                        console.log(error);
                    }
            )
        }
        ,
        getHot() {
            this.requestData();
            setTimeout(_ => {
                var chartDom = this.$refs['hotChart'];
                var myChart = echarts.init(chartDom);
                var option;

                // prettier-ignore
                const hours = this.teamList;
                // prettier-ignore
                const days = this.teamList;
                // prettier-ignore
                const data = this.tradePower
                    .map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });
                console.log(this.max);
                option = {
                tooltip: {
                    position: 'top'
                },
                grid: {
                    width:  '80%',
                    height: '70%',
                    top: '5%'
                },
                xAxis: {
                    type: 'category',
                    data: hours,
                    splitArea: {
                    show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: days,
                    splitArea: {
                    show: true
                    }
                },
                
                visualMap: {
                    min: this.min,
                    max: this.max,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    top: '0%'
                },
                series: [
                    {
                    name: 'Punch Card',
                    type: 'heatmap',
                    data: data,
                    label: {
                        show: true
                    },
                    emphasis: {
                        itemStyle: {
                        shadowBlur: 20,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                    }
                ]
                };

                option && myChart.setOption(option);

            }, 8000)
        }
    },
}
</script>

<style>

</style>