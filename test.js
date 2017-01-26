for (var i = 0, m = 1; i < len , m < len ; i++, m++) {
  total += parseInt(get.results[m].marks);
    console.log("Total of marks is: ", total);
    for (var j = 0; i < get.results[i].length; i++) {
      get.results[i][j]

      var regno = get.results[i][j].regno;
      console.log(regno);
      if (search.indexOf(regno) == "" ) {
        get.message = "Enter Your Register Number Please!";
        return false;
      }
      else if((search.toUpperCase().indexOf(regno)!== -1 )&&(search.length === regno.length)) {
        get.result = get.results;
        get.name = get.results[i][j].name;
        get.regno = get.results[i][j].regno;
        get.message = "results are Found OK!";
       }
       else if (search.toUpperCase().indexOf(regno) === -1) {
        get.message = "The results not found!";
        return false;
      }
      else
      {
        get.message = "Enter correct regno!";
        return false;
    }
  }
}
