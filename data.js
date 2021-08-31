let todayData = [];
let todayCount = [], todayColor = [],todayActivity = [];
let tempCount = new Map(), tempColor = new Map()

getTodayData()

function getTodayData(){

    todayCount = []
    todayColor = []
    for(let i = 0; i < record.length; i++){
        if(moment().format("MM-DD-YYYY") === record[i].day){
            todayData = record[i].count;
        }
    }


    for(let i = 0; i < todayData.length; i++){
        tempCount.set(todayData[i].activityName, todayData[i].number)
        tempColor.set(todayData[i].activityName,todayData[i].activityColor);
        if(!todayActivity.includes(todayData[i].activityName)){
            todayActivity.push(todayData[i].activityName)
        }
    }

    for(let i = 0; i < todayData.length; i++){
        todayCount.push(tempCount.get(todayActivity[i]))
        todayColor.push(tempColor.get(todayActivity[i]))
    }

    console.log(tempCount)
    console.log(todayActivity)
    // console.log(todayActivity)


}



let tData = {
    labels: todayActivity,
    datasets: [{
        label: 'Today Dataset',
        data: todayCount,
        backgroundColor: todayColor,
        hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: tData,
    options: {
        cutout: 90,
        radius:90
    }
};




let pirChart = document.getElementById('myChart');

const myChart = new Chart(pirChart, config)

function updateTodayChart() {
    getTodayData();
    tData = {
        labels: todayActivity,
        datasets: [{
            label: 'Today Dataset',
            data: todayCount,
            backgroundColor: todayColor,
            hoverOffset: 4
        }]
    };
    myChart.data = tData;

    myChart.update();
}












