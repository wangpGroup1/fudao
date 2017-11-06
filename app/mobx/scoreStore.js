import {observable, asMap, action, reaction, runInAction} from "mobx";

class ScoreStore {
    @observable weekScore =[0, 0, 0, 0, 0, 0, 0]
    @observable weekActNum =[0, 0, 0, 0, 0, 0, 0]
    @observable option ={}

    @action
    getWeekScore() {
        request.getJson(urls.apis.ACTIVITY_GETTHISWEEKSCORES)
            .then(res => {
                if (res.ok) {
                    let arr1 = [],arr2=[]
                    res.obj.planList.map((item, i) => {
                        arr1.push(item.score)
                        arr2.push(item.actnum)
                    })
                    this.weekScore = arr1
                    this.weekActNum = arr2
                    this.option = {
                        tooltip: {
                            trigger: 'axis',
                            formatter: function (params) {
                                params = params[0];
                                return params.name + ' : ' + params.value;
                            }
                        },
                        xAxis: {
                            boundaryGap: false,
                            type: 'category',
                            data: ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value',
                            name: '组数',
                        },
                        series: {
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                normal: {
                                    color: '#7B1F82',
                                    width: 4,
                                }
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 4,
                                    borderColor: '#949AAA',
                                    color: '#949AAA',

                                }
                            },
                            data: arr2
                        }
                    };
                }
            })
    }
}

const scoreStore = new ScoreStore()
export default scoreStore