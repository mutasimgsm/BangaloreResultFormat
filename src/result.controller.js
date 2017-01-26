(function () {
  "use strict";

angular.module("ResultApp")
.controller("ResultController", ResultController)
.service("DataService", DataService)
.constant('Path', "data2.json");

ResultController.$inject = ["DataService"];
function ResultController(DataService, $scope) {
  var get = this;

  get.parseInt = parseInt;

  var promise = DataService.getData();
  promise.then(function (response) {
    get.results = response.data;
    console.log("get.results is: ", get.results);
  })
  .catch(function (error) {
    console.log("Something is going wrrong!!", error)
  });

  get.getResult = function (search) {
    var total = 0;
    var search = search.toUpperCase();
    var len = get.results.main.length;
    console.log("len : ", len);


    for (var i = 0; i < len; i++) {
      console.log("I's increament", i);
        for (var j = 0; j < get.results.main[i].length; j++) {

          console.log("j's length",get.results.main[i].length);

            var regno = get.results.main[i][j].regno;
            // console.log("Inside j : ",regno);


            if((search.indexOf(regno)!== -1 )&&
            (search.length === regno.length)) {

                // total += parseInt(get.results.main[i][j+1].marks);
                // console.log("Total of marks is: ", total);

                get.result = get.results.main[i];
                // console.log("Index of innerloop", get.result);
                get.name = get.results.main[i][j].name;
                get.regno = get.results.main[i][j].regno;
                get.message = "results are Found OK!";
                return true;

            } else if (search.indexOf(regno) === "" ) {
                get.message = "Enter Your Register Number Please!";
                return false;

             }
            //  else if (search.toUpperCase().indexOf(regno) === -1) {
            //     get.message = "The results not found!";
            //     return true;
            //   }
              else
              {
                get.message = "Make sure Register Number is correct, then try again!";

          }
        }
    }


    // get.total = total;
    // var prc = (total/800)*100;
    // get.prc = prc;
    // var grade = "";
    // if (prc >= 75) {
    //   grade = "A";
    // } else if (prc >= 70) {
    //   grade = "B"
    // } else if ((prc <= 69) || (prc >= 59)) {
    //   grade = "C";
    // } else {
    //   grade = "F";
    // }
    // get.grade = grade;
  }
  };




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
