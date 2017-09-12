
var Labels = []
var dataSet = []

//Identifies what room we're in
var room = '1B1'

$('.innerBox').click(function(){
  if($(this).parent().attr('id') == 'Level2'){
    var level = '2'
  }
  if($(this).parent().attr('id') == 'Level1'){
    var level = '1'
  }

  room = String((level + $(this).attr('id')))
})

var options = {
  scales: {
    xAxes: [{
      gridLines: {
        display:false
      }
    }],
    yAxes: [{
      gridLines: {
        display:false
      }
    }]
  },

  legend: {
    display: false
  },
  tooltips: {
      callbacks: {
         label: function(tooltipItem) {
                return tooltipItem.yLabel;
         }
      }
  }
}

var p = new Chart(document.getElementById("myChart"), {
  type: 'line',
  data: {
    labels: Labels,
    datasets: [{
        data: dataSet,
        label: "Africa",
        borderColor: "#FFFFFF",
        radius: 0,
        fill: false,
        lineTension: 0.5,
      },
    ]
  },
  options: options,
});



function addData(data) {
  dataSet.push(data)
  Labels.push('')
  p.update()
}

function removeData(){
  dataSet.shift()
  Labels.shift()
  p.update()
}

socket.on('update', function(data){
  if(data[0] == room){
    addData(data[1])
  }
  if(dataSet.length > 100){
    removeData()
  }
})
