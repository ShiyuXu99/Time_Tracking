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
















