/**
 * Created by wuming on 2017/4/5.
 */
layui.use(['element'],function () {
    //区域统计
    var eChart_rangeStatistic = echarts.init(document.getElementById('rangeStatistic'));
    function randomData() {
        return Math.round(Math.random()*1000);
    }
    var option_rangeStatistic = {
        title: {
            text: '注册人数统计',
            subtext: '时间：2017年04月08日',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '注册人数',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#fff',
                        borderColor: '#404a59',
                    },
                    emphasis: {
                        areaColor: '#009688',
                    }
                },
                data: [
                    {name: '北京', value: randomData()},
                    {name: '天津', value: randomData()},
                    {name: '上海', value: randomData()},
                    {name: '重庆', value: randomData()},
                    {name: '河北', value: randomData()},
                    {name: '河南', value: randomData()},
                    {name: '云南', value: randomData()},
                    {name: '辽宁', value: randomData()},
                    {name: '黑龙江', value: randomData()},
                    {name: '湖南', value: randomData()},
                    {name: '安徽', value: randomData()},
                    {name: '山东', value: randomData()},
                    {name: '新疆', value: randomData()},
                    {name: '江苏', value: randomData()},
                    {name: '浙江', value: randomData()},
                    {name: '江西', value: randomData()},
                    {name: '湖北', value: randomData()},
                    {name: '广西', value: randomData()},
                    {name: '甘肃', value: randomData()},
                    {name: '山西', value: randomData()},
                    {name: '内蒙古', value: randomData()},
                    {name: '陕西', value: randomData()},
                    {name: '吉林', value: randomData()},
                    {name: '福建', value: randomData()},
                    {name: '贵州', value: randomData()},
                    {name: '广东', value: randomData()},
                    {name: '青海', value: randomData()},
                    {name: '西藏', value: randomData()},
                    {name: '四川', value: randomData()},
                    {name: '宁夏', value: randomData()},
                    {name: '海南', value: randomData()},
                    {name: '台湾', value: randomData()},
                    {name: '香港', value: randomData()},
                    {name: '澳门', value: randomData()}
                ]
            }
        ],
    };
    eChart_rangeStatistic.setOption(option_rangeStatistic);
    //功能使用情况分析
    var eChart_functionUseAnalysis = echarts.init(document.getElementById('functionUseAnalysis'));
    var option_functionUseAnalysis={
        title : {
            text: '功能使用情况分析',
            subtext: '时间：2017年04月08日',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    eChart_functionUseAnalysis.setOption(option_functionUseAnalysis);
});