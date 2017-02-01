(function () {
  "use strict";

angular.module("ResultApp")
.controller("ResultController", ResultController)
.service("DataService", DataService)
.constant('Path', "data2.json");

ResultController.$inject = ["DataService"];
function ResultController(DataService, $scope) {
  var get = this;

  var promise = DataService.getData();
  promise.then(function (response) {
    get.results = response.data;
    console.log("get.results is: ", get.results);
  })
  .catch(function (error) {
    console.log("Something is going wrrong!!", error)
  });
  var marksArray = [];
  var labelsArray = [];

  get.getResult = function (search) {
    var total = 0;
    var search = search.toUpperCase();
    var len = get.results.main.length;
    console.log("len : ", len);

    for (var i = 0; i < len; i++) {
      console.log("I's increament", i);
        for (var j = 0; j < get.results.main[i].length; j++) {
            var regno = get.results.main[i][j].regno;

            if((search.indexOf(regno)!== -1 )&&
            (search.length === regno.length)) {

                get.result = get.results.main[i];
                get.name = get.results.main[i][j].name;
                get.regno = get.results.main[i][j].regno;

                for (var m in get.results.main[j]) {
                 marksArray.push(get.results.main[i][m].marks);
                 labelsArray.push(get.results.main[i][m].scode);

                 total += parseInt(get.results.main[i][m].marks);
              }
                console.log("Total of marks is: ", total);
                var ctx = document.getElementById("myChart");
                var data = {
                  showTooltips: false,
                  labels: labelsArray,
                  datasets: [{
                    label: "# of Marks",
                    data: marksArray,
                    backgroundColor: "#ff5233"
                  }]
                };

                var myChar = new Chart(ctx, {
                  type: "bar",
                  data: data,
                  options: {
                    scales: {
                      yAxes: [{
                        ticks: {
                          gridLines: {
                            display: true,
                            color: "rgb(255,255,255)"
                          },
                          beginAtZero: true
                        }
                      }],
                      xAxes : [{
                        gridLines: {
                          display: false
                        }
                      }]
                    }
                  }
                });

                get.total = total;
                var prc = (total/800)*100;
                get.prc = prc;
                var grade = "";
                if (prc >= 75) {
                  grade = "A";
                } else if (prc >= 70) {
                  grade = "B"
                } else if ((prc <= 69) || (prc >= 59)) {
                  grade = "C";
                } else {
                  grade = "F";
                }
                get.grade = grade;

                get.message = "results are Found OK!";
                return true;
            }
            else if (search.indexOf(regno) === "" ) {
                get.message = "Enter Your Register Number Please!";
                return false;

             }
              else
              {
                get.message = "Make sure Register Number is correct, then try again!";
          }
        }
    }

  }
  };
  // Chart.defaults.global.Chart.defaults.global = '#FFF';


function DataService($http, Path) {
  console.log(Path);
  var service = this;

    service.getData = function () {
    var respones = $http({
      method: "GET",
      url: Path
    });
    return respones;
  };

}

})();
