let weekData = [];
let weekActivity = new Map();
let weekColor = new Map();
let activity = [], color = [], num = [];

getDatas();

function getDatas() {
    weekData = [];
    weekActivity = new Map();
    weekColor = new Map();
    activity = [], color = [], num = [];

    let tempRec = localStorage.getItem('record')
        ? JSON.parse(localStorage.getItem('record'))
        : [];

    for (let i = 0; i < tempRec.length; i++) {
        var res = tempRec[i].day.split("-");
        let current = moment([res[2], res[0], res[1]])

        if (moment().isBefore(current, 'day')) {
            weekData.push(tempRec[i].count);
        }
    }


    for (let i = 0; i < weekData.length; i++) {
        for (let j = 0; j < weekData[i].length; j++) {
            if (weekActivity.has(weekData[i][j].activityName)) {
                let num = weekData[i][j].number + weekActivity.get(weekData[i][j].activityName);
                weekActivity.set(weekData[i][j].activityName, num);
                continue;
            } else {
                weekActivity.set(weekData[i][j].activityName, weekData[i][j].number);
            }
        }
    }

    for (let i = 0; i < weekData.length; i++) {
        for (let j = 0; j < weekData[i].length; j++) {
            if (weekColor.has(weekData[i][j].activityName)) {
                continue;
            } else {
                weekColor.set(weekData[i][j].activityName, weekData[i][j].activityColor);
            }
        }
    }

    activity = Array.from(weekColor.keys());
    for (let i = 0; i < activity.length; i++) {
        color.push(weekColor.get(activity[i]));
    }

    for (let i = 0; i < activity.length; i++) {
        num.push(weekActivity.get(activity[i]));
    }

}

let dataSet = {
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
                beginAtZero: true,
                ticks: {
                    min: 0,
                    stepSize: 0.5,
                }
            }
        }
    },
};

let barChart = document.getElementById('weekChart');


const weekChart = new Chart(barChart, configBar)


function updateChart() {
    getDatas();
    dataSet = {
        labels: activity,
        datasets: [{
            label: 'Past Week',
            data: num,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1
        }]
    };
    weekChart.data = dataSet;

    weekChart.update();
}














