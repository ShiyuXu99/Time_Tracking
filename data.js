let todayData = [];
let todayCount = [], todayColor = [],todayActivity = [];


for(let i = 0; i < record.length; i++){
    if(moment().subtract(1, "days").format("MM-DD-YYYY") === record[i].day){
        todayData = record[i].count;
    }
}


for(let i = 0; i < todayData.length; i++){
    todayCount.push(todayData[i].number);
    todayColor.push(todayData[i].activityColor);
    todayActivity.push(todayData[i].activityName);
}



const data = {
    labels: todayActivity,
    datasets: [{
        label: 'My First Dataset',
        data: todayCount,
        backgroundColor: todayColor,
        hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: data,
    options: {
        cutout: 90,
        radius:90
    }
};

let pirChart = document.getElementById('myChart');


var myChart = new Chart(pirChart, config)

    [
    {
        "day":"05-25-2021",
        "count":[
            {
                "activityColor":"#8EACCD",
                "activityName":"工作",
                "number":1
            }
        ]
    },
        {
            "day":"05-23-2021",
            "count":[
                {
                    "activityColor":"#80959A",
                    "activityName":"DS+算法",
                    "number":2
                },
                {
                    "activityColor":"#F4A9A8",
                    "activityName":"画画",
                    "number":2
                }
            ]
        },
        {
            "day":"05-22-2021",
            "count":[
                {
                    "activityColor":"#80959A",
                    "activityName":"DS+算法",
                    "number":1.5
                },
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":1
                }
            ]
        },
        {
            "day":"05-21-2021",
            "count":[
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":0.5
                }
            ]
        },
        {
            "day":"05-20-2021",
            "count":[
                {
                    "activityColor":"#E0DAFC",
                    "activityName":"其他（学习）",
                    "number":2.5
                },
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":1
                }
            ]
        },
        {
            "day":"05-19-2021",
            "count":[
                {
                    "activityColor":"#80959A",
                    "activityName":"DS+算法",
                    "number":2
                },
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":3
                }
            ]
        },
        {
            "day":"05-12-2021",
            "count":[
                {
                    "activityColor":"#8EACCD",
                    "activityName":"Cooking",
                    "number":0
                },
                {
                    "activityColor":"#B1BEC4",
                    "activityName":"python",
                    "number":0
                },
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":0
                }
            ]
        },
        {
            "day":"05-11-2021",
            "count":[
                {
                    "activityColor":"#F4A9A8",
                    "activityName":"画画",
                    "number":1
                },
                {
                    "activityColor":"#E0DAFC",
                    "activityName":"其他（学习）",
                    "number":2
                },
                {
                    "activityColor":"#62A4EC",
                    "activityName":"其他（玩耍）",
                    "number":0.5
                }
            ]
        },
        {
            "day":"05-10-2021",
            "count":[
                {
                    "activityColor":"#B1BEC4",
                    "activityName":"python",
                    "number":2
                },
                {
                    "activityColor":"#CE97B0",
                    "activityName":"做饭+吃饭",
                    "number":1.5
                },
                {
                    "activityColor":"#62A4EC",
                    "activityName":"其他（玩耍）",
                    "number":2
                },
                {
                    "activityColor":"#80959A",
                    "activityName":"DS+算法",
                    "number":2.5
                }
            ]
        }
    ]

















