/* 
Available Spots and Summary:
Total Cases, Active Cases, Deaths, Recovered, Tested, Critical, Change Ratio %, Summary
Historical data:
Day, Week, Month, Year, Change per Day, Difference, Summary
Regions:
World, Regions and Countries

Read documentation for more functionality - https://rapidapi.com/Yatko/api/coronavirus-live
See all available countries - https://api.quarantine.country/api/v1/summary/latest
*/
var dataChart = new Array;
var countryFeedKey = 'pakistan';	//try china, spain, italy, etc.
var countryName = 'Pakistan';		//try 中国, España, Italia, etc.

function ready(cb) {
  if( document.readyState !== 'loading' ) {
    cb();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
        cb();
    });
  }
}

function fetchData(url) {
  return fetch(url)
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
    })
    .then(function(payload) {
      return payload['data'] || {};
    });
}


function fillPlaceholders(data) {
 console.log(data)
  var i;
  var varEl = document.querySelectorAll('[data-var-placeholder]');
 console.log(varEl)
  for(i = 0; i < varEl.length; i++) {
    var placeholder = varEl[i].getAttribute('data-var-placeholder');

    if(placeholder && placeholder != '') {
      switch(placeholder) {
        case 'country':
          varEl[i].innerText = countryName;    
          break;
      }
    }
  }
 dataChart =[];
  var countryPlaceholderEl = document.querySelectorAll('[data-country-placeholder]');

  for(i = 0; i < countryPlaceholderEl.length; i++) {
    var placeholder = countryPlaceholderEl[i].getAttribute('data-country-placeholder');
   
    if(placeholder && placeholder != '' && data['summary'][placeholder]) {
      countryPlaceholderEl[i].innerText = parseInt(data['summary'][placeholder]).toLocaleString();
      dataChart.push
      var dummyNumber = ((data['summary'][placeholder]).toLocaleString());
      var finalNumber = dummyNumber.replace(/,/g, "");
      dataChart.push(finalNumber);
    }
  }
  charmaker();
}

ready(
  function() {
    var url = 'https://api.quarantine.country/api/v1/summary/region?region=' + countryFeedKey;

    fetchData(url)
        .then(fillPlaceholders);

    setInterval(
      function() {
        fetchData(url)
          .then(fillPlaceholders)
      },
      10000
    );
  }
);


function charmaker(){
  var ctx = document.getElementById('Chart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Confirmed', 'Active ', 'Recoveding ', 'Death ', 'Tested ', 'Critical '],
        datasets: [{
            label: 'Types',
            data: [...dataChart],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}