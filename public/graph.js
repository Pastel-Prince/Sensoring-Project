var graphData = [];
var graphDataIndex = []
var ctx = document.getElementById("myChart");

var initGraph = function(){
    //Remove last data from graph
    graphData = [];
    graphDataIndex = []

    // Get the id of the currently selected room without spaces or andersands
    thisRoom = currentRoom.replace(/[\s&]/g, '')
    // Get the json file containing the data for the currently selected room and data type (Temperature, Sound et.) and push the last days worth of data into a list
    $.getJSON( ip +"/api/query?rooms="+ thisRoom +"&metrics="+ currentData +"&from=r-0.25d&to=rnow", function(data){
        for(i=0;i<data[thisRoom].length;i++){
            graphData.push(data[thisRoom][i]["metrics"][currentData])
            graphDataIndex.push(data[thisRoom][i]["timestamp"])
        }
    })

    //Set up new graphs data and options
    var chartThings = {
        type: 'line',
        data: {
            labels: graphDataIndex,
            datasets: [{
                label: currentData,
                data: graphData,
                backgroundColor: '#FFFFFF',
                fill: false,
                lineTension: 0.5,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{display: false}]
            },
            legend: {display: false }
        }
    }

    //Create the new graph with the new data
    myChart = new Chart(ctx, chartThings)

}

//Create initial graph when page loads
initGraph()
