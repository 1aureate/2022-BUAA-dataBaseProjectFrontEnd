<template>
    <el-container v-if="this.$store.state.isLogin=='true'">
        <el-container>
        <el-main v-if="this.show">
            <div class="user-icon" align = "center">
                <el-avatar
                :size="100"
                :src="'http://qqpublic.qpic.cn/qq_public/0/0-3695928799-9204FD3992DD3ABA15A80E9AE5E099CC/0?fmt=jpg&size=34&h=400&w=400&ppv=1.jpg'"
                align="center">
                </el-avatar>
            </div>
            <div class="user-name">
                <span style="text-align: center;display:block;">{{uname}}</span> 
            </div>
            <div v-if="identity=='gm'">
            <el-descriptions
                class="margin-top"
                :column="4"
                border
            >
                <el-descriptions-item label="用户名称">{{uname}}</el-descriptions-item>
                <el-descriptions-item label="用户身份">
                    <el-tag>{{identity}}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="所属球队">
                    {{userInfo.tname}}
                </el-descriptions-item> 
            </el-descriptions>
            </div>
             <div v-else-if="identity=='player'">
                 <el-descriptions
                class="margin-top"
                :column="4"
                >
            <el-descriptions-item label="用户名称">{{uname}}</el-descriptions-item>
                <el-descriptions-item label="用户身份">
                    <el-tag>{{identity}}</el-tag>
                </el-descriptions-item>
                    <el-descriptions-item label="球衣号码">
                        {{userInfo.pnum}}
                    </el-descriptions-item>
                    <el-descriptions-item label="年薪">
                        {{userInfo.psalary}}
                    </el-descriptions-item>
                    <el-descriptions-item label="所属球队">
                        {{userInfo.tname}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余年限">
                        {{userInfo.pyear}}
                    </el-descriptions-item>
                </el-descriptions>
                    <div style="height: 500px;width:500px; float:left" ref="histoChart1"></div>
                    <div style="height: 500px;width:500px; float:left" ref="histoChart2"></div>
                </div>
            <div v-else-if="identity=='coach'">
                <el-descriptions
                class="margin-top"
                :column="4"
            >
            <el-descriptions-item label="用户名称">{{uname}}</el-descriptions-item>
                <el-descriptions-item label="用户身份">
                    <el-tag>{{identity}}</el-tag>
                </el-descriptions-item>
                    <el-descriptions-item label="年薪">
                        {{userInfo.csalary}}
                    </el-descriptions-item>
                    <el-descriptions-item label="所属球队">
                        {{userInfo.tname}}
                    </el-descriptions-item>
                    <el-descriptions-item label="剩余年限">
                        {{userInfo.cyear}}
                    </el-descriptions-item>
                </el-descriptions>
                </div>
        </el-main>

        </el-container>
    </el-container>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            show: false,
            info: {},
        };
    },
    methods: {
        goBack() {
            this.$router.push('/home')
        },
        getInfo() {
            this.$axios.post('http://127.0.0.1:5000/test/data/userInfo', {uid: this.$store.state.uid, identity: this.$store.state.identity, isLogin:this.$store.state.isLogin}).then(
            res => {
              console.log(res);
              if(res.status===200 && res.data.success == 'true') {    //若code=1则验证成功
                this.show = true;
                this.info = res.data.info;
              } 
            }).catch(error => {
            console.log(error);
          });
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
                data: [this.info.data.pavgscore, this.info.data.pavgassists, this.info.data.pavgrebonds]
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
                data: [this.info.data.avgscore, this.info.data.avgassists, this.info.data.avgrebonds]
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
                data: [this.info.data.maxavgscore, this.info.data.maxavgassists, this.info.data.maxavgrebonds]
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
                data: [this.info.data.pfreethrowrating, this.info.data.pthreepointrating]
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
                data: [ this.info.data.freethrowrating, this.info.data.threepointrating]
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
                data: [this.info.data.maxfreethrowrating, this.info.data.maxthreepointrating]
                },
            ]
            };
            option && myChart.setOption(option);
            }, 2000)
        }
    },
    computed: {
        uid() {
            return localStorage.getItem('uid');
        },
        uname() {
            return localStorage.getItem('username');
        },
        identity() {
            return localStorage.getItem('identity');
        },
        userInfo() {
            return this.info;
        }

    },
    components: {
    },
    created() {
        this.getInfo();
        
    },
    mounted() {
        if(this.$store.state.identity == 'player') {
            this.getHisto1();
            this.getHisto2();
        }  
    }
};
</script>


<style>
</style>