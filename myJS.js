const tasks = document.getElementById("tasks");
const deleteTaskbtn = document.getElementById('deleteTaskbtn');
const taskContainer = document.getElementById('taskContainer');
let colorList = localStorage.getItem('colorList')
    ? JSON.parse(localStorage.getItem('colorList'))
    : ['#c1cbd7', '#b5c4b1', '#e0cdcf', '#8696a7',
        '#7b8b6f', '#c9c0d3','#7a7281','#a27e7e',
        '#939391', '#faead3',
        "#9ca8b8"
    ];

const today = document.getElementById('today');

let record = localStorage.getItem('record')
    ? JSON.parse(localStorage.getItem('record'))
    : [];
let tasksList = localStorage.getItem('tasksList')
    ? JSON.parse(localStorage.getItem('tasksList'))
    : [];
printTasks();
printPlan();
addProgressBar();


function deleteAll() {
    let confirm = prompt("Please confirm deletion by typing yes: ");

    if (confirm.toLowerCase() === "yes") {
        record = [];
        localStorage.setItem("record", JSON.stringify(record));
        addProgressBar();
        updateChart();
        updateTodayChart()
        printPlan();
    }

}


tasks.addEventListener("keyup", addTasksName);
deleteTaskbtn.addEventListener("click", () => {
    let taskVisible = document.getElementsByClassName("deleteBtnClass");
    for (let i = 0; i < taskVisible.length; i++) {
        if (taskVisible[i].style.visibility === "hidden") taskVisible[i].style.visibility = "visible";
        else taskVisible[i].style.visibility = "hidden"
    }

})


function addTasksName() {
    if (event.keyCode === 13) {
        tasksList.push({"btnName": tasks.value, "color": colorList[0]});
        colorList.splice(0, 1);
        localStorage.setItem("colorList", JSON.stringify(colorList));
        localStorage.setItem("tasksList", JSON.stringify(tasksList));
        printTasks();
        tasks.value = '';
    }
}

function printTasks() {
    while (taskContainer.firstChild) {
        taskContainer.removeChild(taskContainer.firstChild);
    }
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].btnName != null) {

            let box = document.createElement('span');
            let btn = document.createElement('button');
            let num = document.createElement('i');
            num.setAttribute('class', 'fas fa-circle fa-2x');
            num.style.color = tasksList[i].color;


            btn.innerText = tasksList[i].btnName;
            btn.setAttribute('class', 'buttonClass');
            btn.setAttribute('id', tasksList[i].btnName);
            btn.setAttribute('textContent', tasksList[i].btnName);
            btn.insertBefore(num, btn.childNodes[0]);
            box.appendChild(btn);
            btn.addEventListener("click", function () {
                addPlan(btn, tasksList[i].color);
            });

            let deletbtn = document.createElement('button');
            let trash = document.createElement('i');
            trash.setAttribute('class', 'fas fa-trash');
            deletbtn.setAttribute('class', 'deleteBtnClass');
            deletbtn.appendChild(trash);

            box.appendChild(deletbtn);

            deletbtn.addEventListener('click', () => {
                taskContainer.removeChild(box);
                colorList.unshift(tasksList[i].color);
                tasksList.splice(i, 1);
                localStorage.setItem("colorList", JSON.stringify(colorList));
                localStorage.setItem("tasksList", JSON.stringify(tasksList));
            })
            taskContainer.appendChild(box);

        }
    }
}


function printPlan() {
    today.innerHTML = '';

    record = localStorage.getItem('record')
        ? JSON.parse(localStorage.getItem('record'))
        : [];

    let temp = [];
    for (let i = 0; i < record.length; i++) {
        if (moment().format("MM-DD-YYYY") === record[i].day) temp = record[i].count;
    }
    for (let i = 0; i < temp.length; i++) {
        let num = Math.floor(temp[i].number);
        let leftOver = temp[i].number % 1;
        if (num === 0 && leftOver !== 0) {
            printPlanLogo('star-half', temp[i].activityColor);
        } else if (num >= 0) {
            for (let j = 0; j < num; j++) {
                printPlanLogo('circle', temp[i].activityColor);
            }
            if (leftOver !== 0) {
                printPlanLogo('star-half', temp[i].activityColor);
            }
        }
    }
}

function printPlanLogo(input, color) {
    let num = document.createElement('i');
    num.setAttribute('class', 'fas fa-' + input + ' fa-1.5x');
    num.style.color = color;
    today.appendChild(num);
    num.addEventListener('dblclick', function (e) {
        let temp = [];
        let recordCount = 0;
        for (let i = 0; i < record.length; i++) {
            if (record[i].day === moment().format("MM-DD-YYYY")) {
                for (let j = 0; j < record[i].count.length; j++) {
                    if (color === record[i].count[j].activityColor) {
                        if (input == 'circle') record[i].count[j].number -= 1;
                        else record[i].count[j].number -= 0.5;
                        localStorage.setItem("record", JSON.stringify(record));
                        break;
                    }
                }
                break;
            }
            recordCount++;
        }

        today.removeChild(num);
        addProgressBar();
        updateChart();
        updateTodayChart()

    });
}


function addPlan(buttonType, color) {
    let whatDay = moment().format("MM-DD-YYYY");
    let activityName = buttonType.getAttribute('id');
    let judge = true;
    if (record.length === 0) record.push({
        'day': whatDay,
        'count': [{'activityColor': color, 'activityName': activityName, 'number': 0.5}]
    });
    else {
        for (let i = 0; i < record.length; i++) {
            if (record[i].day === whatDay) {
                judge = false;
                for (let j = 0; j < record[i].count.length; j++) {
                    if (record[i].count[j].activityColor === color) {
                        record[i].count[j].number = record[i].count[j].number + 0.5;
                        break;
                    } else if (j === record[i].count.length - 1) {
                        record[i].count.push({'activityColor': color, 'activityName': activityName, 'number': 0.5});
                        j++;
                    }
                }
            }
        }
        if (judge) record.unshift({
            'day': whatDay,
            'count': [{'activityColor': color, 'activityName': activityName, 'number': 0.5}]
        });
    }

    localStorage.setItem("record", JSON.stringify(record));
    today.innerHTML = '';
    printPlan();
    addProgressBar();
    updateChart();
    updateTodayChart()
}

function addProgressBar() {
    let progress = document.getElementById('progress');
    progress.innerHTML = "";

    let todayData = [];
    let todayCount = [], todayColor = [], todayActivity = [];

    let temprecord = localStorage.getItem('record')
        ? JSON.parse(localStorage.getItem('record'))
        : [];

    for (let i = 0; i < temprecord.length; i++) {
        if (moment().format("MM-DD-YYYY") === temprecord[i].day) {
            todayData = temprecord[i].count;
        }
    }

    for (let i = 0; i < todayData.length; i++) {
        todayCount.push(todayData[i].number);
        todayColor.push(todayData[i].activityColor);
        todayActivity.push(todayData[i].activityName);
    }


    for (let i = 0; i < todayData.length; i++) {
        let progressElement = document.createElement('div');
        progressElement.setAttribute('class', 'progress-bar');
        let color = "background-color: " + todayData[i].activityColor + " !important;";
        progressElement.setAttribute("role", 'progressbar');
        progressElement.setAttribute("style", "width: " + Math.round(todayData[i].number / 12 * 100) + "%;" + color);
        progressElement.innerHTML = todayData[i].activityName;
        progress.appendChild(progressElement);
    }

}
























