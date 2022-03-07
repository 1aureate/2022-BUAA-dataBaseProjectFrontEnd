<template>
    <el-container>
        <div style="height: 500px;width:500px; float:left;margin-right=20px" ref="pieChart"></div>
        <div style="height: 500px;width:500px; float:left;" ref="histoChart1"></div>
        <div style="height: 500px;width:500px; float:left;" ref="histoChart2"></div>
    </el-container>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            pie:[],
            bar: {

            }
        }
    },
    methods: {
        getData() {
            this.$axios.post('http://127.0.0.1:5000/test/data/round', 
          {
              uid: this.$store.state.uid,
              isLogin: this.$store.state.isLogin,
          }).then(
              res => {
                  console.log(res);
                  if(res.status === 200 && res.data.success == 'true') {
                      this.pie = res.data.pie;
                      this.bar = res.data.bar;
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
        getPie() {
            console.log('?')
            var echarts = require('echarts');
            setTimeout(_=> {
                console.log('!')
                var chartDom = this.$refs['pieChart'];
                var myChart = echarts.init(chartDom);
                var option;

                option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.pie[0], name: '前锋' },
                        { value: this.pie[1], name: '后卫' },
                        { value: this.pie[2], name: '中锋' },
                    ]
                    }
                ]
                };

                option && myChart.setOption(option);

            }, 2000)
        },
        getHisto1() {
            var echarts = require('echarts');
            setTimeout(_ => {
            var app = {};
            var chartDom = this.$refs['histoChart1'];
            var myChart = echarts.init(chartDom);
            var option;
            const posList = [
            'left',
            'right',
            'top',
            'bottom',
            'inside',
            'insideTop',
            'insideLeft',
            'insideRight',
            'insideBottom',
            'insideTopLeft',
            'insideTopRight',
            'insideBottomLeft',
            'insideBottomRight'
            ];
            app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                left: 'left',
                center: 'center',
                right: 'right'
                }
            },
            verticalAlign: {
                options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
                }
            },
            position: {
                options: posList.reduce(function (map, pos) {
                map[pos] = pos;
                return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
            };
            app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                const labelOption = {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
                };
                myChart.setOption({
                series: [
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    }
                ]
                });
            }
            };
            const labelOption = {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c} ',
            fontSize: 16,
            rich: {
                name: {}
            }
            };
            option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {
                data: ['我的成绩', '联盟平均', '最大值']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                type: 'category',
                axisTick: { show: false },
                data: ['平均得分', '平均助攻', '平均篮板'],
                }
            ],
            yAxis: [
                {
                type: 'value',
                show: false,
                }
            ],
            series: [
                {
                name: '我的成绩',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#EE3B3B',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [this.bar.pavgscore, this.bar.pavgassists, this.bar.pavgrebonds]
                },
                {
                name: '联盟平均',
                type: 'bar',
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#00b436',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [this.bar.avgscore, this.bar.avgassists, this.bar.avgrebonds]
                },
                {
                name: '最大值',
                type: 'bar',
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#fdcc74',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [this.bar.maxavgscore, this.bar.maxavgassists, this.bar.maxavgrebonds]
                },
            ]
            };
            option && myChart.setOption(option);
            }, 2000)
        },
        getHisto2() {
            var echarts = require('echarts');
            setTimeout(_ => {
            var app = {};
            var chartDom = this.$refs['histoChart2'];
            var myChart = echarts.init(chartDom);
            var option;
            const posList = [
            'left',
            'right',
            'top',
            'bottom',
            'inside',
            'insideTop',
            'insideLeft',
            'insideRight',
            'insideBottom',
            'insideTopLeft',
            'insideTopRight',
            'insideBottomLeft',
            'insideBottomRight'
            ];
            app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                left: 'left',
                center: 'center',
                right: 'right'
                }
            },
            verticalAlign: {
                options: {
                top: 'top',
                middle: 'middle',
                bottom: 'bottom'
                }
            },
            position: {
                options: posList.reduce(function (map, pos) {
                map[pos] = pos;
                return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
            };
            app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                const labelOption = {
                rotate: app.config.rotate,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                position: app.config.position,
                distance: app.config.distance
                };
                myChart.setOption({
                series: [
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    },
                    {
                    label: labelOption
                    }
                ]
                });
            }
            };
            const labelOption = {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c} ',
            fontSize: 16,
            rich: {
                name: {}
            }
            };
            option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            legend: {
                data: ['我的成绩', '联盟平均', '最大值']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                type: 'category',
                axisTick: { show: false },
                data: ['罚球率', '三分率'],
                }
            ],
            yAxis: [
                {
                type: 'value',
                show: false,
                }
            ],
            series: [
                {
                name: '我的成绩',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#EE3B3B',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [this.bar.pfreethrowrating, this.bar.pthreepointrating]
                },
                {
                name: '联盟平均',
                type: 'bar',
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#00b436',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [this.bar.freethrowrating, this.bar.threepointrating]
                
                },
                {
                name: '最大值',
                type: 'bar',
                label: labelOption,
                itemStyle: {
                    normal: {
                        color:'#fdcc74',
                    }
                },
                emphasis: {
                    focus: 'series'
                },
                data: [ this.bar.maxfreethrowrating, this.bar.maxthreepointrating]
                },
            ]
            };
            option && myChart.setOption(option);
            }, 2000)
        }
    },
    created() {
        this.getData();
        this.getPie();
        this.getHisto1();
        this.getHisto2();
    },
}
</script>

<style>
.s{
    color:'#42d2ff',
}
    
</style>