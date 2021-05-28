/* Global Variables */
// 12345,us&appid=7b9bf49e1531f81b6aee17cd9f06f9a2
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '274ab4fdd1281e77103233007e85bbaf';

// console.log('feelings: '+ feelings);
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// when Generate button is clicked.
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    console.log('clicked');
    const zipCode =  document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    // get temperature from API
    getData(baseURL,zipCode, apiKey)
    // post data to my application
    .then(function(data){
        postData('http://localhost:8000/addData', {temperature: data.main.temp, date: newDate, userResponse: feelings})
    })
    // update UI
    .then(function(data){
        updateUI();
    });
}

const getData = async (baseURL, zipCode, apiKey)=>{
    const res = await fetch(baseURL+zipCode+'&appid='+apiKey);
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error);
      }
}
const postData = async  (url = '', data= {})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log('this is new data');
        console.log(newData);
        return newData
    }catch(error) {
        console.log('error', error)
    }
}
const updateUI = async () =>{
    const request = await fetch('http://localhost:8000/all')
    try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('temp').innerHTML= allData[allData.length-1].temperature;
        document.getElementById('date').innerHTML= allData[allData.length-1].date;
        document.getElementById('content').innerHTML= allData[allData.length-1].userResponse;
    }
    catch(error){
        console.log('error',error);
    }
}