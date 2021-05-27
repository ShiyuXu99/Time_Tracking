record = localStorage.getItem('record')
    ? JSON.parse(localStorage.getItem('record'))
    : [];
const collectData = document.getElementById('collectData');
var myJSON = JSON.stringify(record);

collectData.innerHTML = myJSON;
console.log(record);

