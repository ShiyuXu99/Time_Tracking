let weekData = [];
let weekActivity = new Map();
let weekColor = new Map();
let activity = [], color = [], num = [];

for(let i = 0; i < record.length; i++){
    if(moment().subtract(7,'days').isBefore(record[i].day,'days')){
        weekData.push(record[i].count) ;
    }
}
console.log(weekData);



for(let i = 0; i < weekData.length; i++){
    for(let j = 0; j < weekData[i].length; j++){
        if(weekActivity.has(weekData[i][j].activityName)){
            let num = weekData[i][j].number + weekActivity.get(weekData[i][j].activityName);
            weekActivity.set(weekData[i][j].activityName,num);
            continue;
        }
        else{
            weekActivity.set(weekData[i][j].activityName,weekData[i][j].number);
        }
    }
}

for(let i = 0; i < weekData.length; i++){
    for(let j = 0; j < weekData[i].length; j++){
        if(weekColor.has(weekData[i][j].activityName)){
            continue;
        }
        else{
            weekColor.set(weekData[i][j].activityName,weekData[i][j].activityColor);
        }
    }
}

activity = Array.from( weekColor.keys() );
for(let i = 0; i < activity.length; i++){
    color.push(weekColor.get(activity[i]));
}
console.log(color);

for(let i = 0; i < activity.length; i++){
    num.push(weekActivity.get(activity[i]));
}


const dataSet = {
    labels: activity,
    datasets: [{
        label: 'Past Week',
        data: num,
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1
    }]
};

const configBar = {
    type: 'bar',
    data: dataSet,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

let barChart = document.getElementById('weekChart');

const weekChart = new Chart(barChart,configBar)














