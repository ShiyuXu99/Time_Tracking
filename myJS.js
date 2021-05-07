const tasks = document.getElementById("tasks");
const deleteTaskbtn = document.getElementById('deleteTaskbtn');
const taskContainer = document.getElementById('taskContainer');
let colorList = [ '#B1BEC4','#F4A9A8','#80959A', '#CE97B0', '#AF9CB8', '#86C0D9', '#E0DAFC', '#62A4EC','#8EACCD','#FCD8DF',];

const today = document.getElementById('Mon');

let record = localStorage.getItem('record')
    ? JSON.parse(localStorage.getItem('record'))
    : [];
let tasksList = localStorage.getItem('tasksList')
    ? JSON.parse(localStorage.getItem('tasksList'))
    : [];
printTasks();
printPlan();



tasks.addEventListener("keyup", addTasksName);
deleteTaskbtn.addEventListener("click",()=>{
    let taskVisible = document.getElementsByClassName("deleteBtnClass");
    for(let i = 0; i < taskVisible.length; i++){
        if(taskVisible[i].style.visibility === "hidden") taskVisible[i].style.visibility="visible";
        else taskVisible[i].style.visibility="hidden"
    }

})
printTasks();

for (let i = 0; i < tasksList.length; i++) {
    let btnName = document.getElementById(tasksList[i].btnName);
    let color = tasksList[i].color;
    // btnName.removeAttribute("disabled");
    console.log();
    btnName.addEventListener("click", function () {
        addPlan(btnName, color);
    });
}


function addTasksName() {
    if (event.keyCode === 13) {
        tasksList.push({"btnName": tasks.value, "color": colorList[0]});
        colorList.splice(0, 1);
        localStorage.setItem("tasksList", JSON.stringify(tasksList));
        printTasks();
    }
}

function printTasks() {
    taskContainer.innerHTML = '';
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

            let deletbtn = document.createElement('button');
            let trash = document.createElement('i');
            trash.setAttribute('class', 'fas fa-trash');
            deletbtn.setAttribute('class', 'deleteBtnClass');
            deletbtn.appendChild(trash);

            box.appendChild(deletbtn);

            deletbtn.addEventListener('click', () => {
                taskContainer.removeChild(box);
                tasksList.splice(i,1);
                console.log(tasksList);
                localStorage.setItem("tasksList", JSON.stringify(tasksList));
            })
            taskContainer.appendChild(box);

        }
    }
}




// function disablebtn(){
//     for(let i = 0; i < tasksList.length; i++) {
//         let btnName = document.getElementById(tasksList[i].btnName);
//         let color = tasksList[i].color;
//         btnName.setAttribute("disabled", true);
//         btnName.replaceWith(btnName.cloneNode(true));
//     }
// }

function printPlan() {
    if (record.length !== 0) {
        let temp = [];
        for (let i = 0; i < record.length; i++) {
            if (moment().format("MM-DD-YYYY") == record[i].day) temp = record[i].count;
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
}

function printPlanLogo(input, color) {
    let num = document.createElement('i');
    num.setAttribute('class', 'fas fa-' + input + ' fa-2x');
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
}
























