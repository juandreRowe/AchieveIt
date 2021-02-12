const table = document.getElementById("goalsTable");

reloadPage();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        if(arr[i].Completed === 1 ){
            out += "<form action=\"https://momentumappliances.000webhostapp.com/goal/update.php\" method=\"post\" class=\"goal green\">";
        }else{
            out += "<form action=\"https://momentumappliances.000webhostapp.com/goal/update.php\" method=\"post\" class=\"goal red\">";
        }
        out += "<h1>" + arr[i].Description + "</h1>" +
                '<input type="hidden" value="' + arr[i].Id +'" id="' + arr[i].Id +'" name="Id"></input>' +
                '<div id="' + arr[i].Id +'"><input type="submit" value="EDIT"></input>' + 
                '<input type="button" value="DELETE" onclick="deleteGoal(\'' + arr[i].Id + '\')"></input></div>' + 
               '</form>';
    }
    document.getElementById("data").innerHTML = out;
}

function deleteGoal(id){
    if (confirm('Are you sure you want to delete goal with id : ' + id)) {
      // Delete it!
        var xmlhttp = new XMLHttpRequest();
        var url = "https://momentumappliances.000webhostapp.com/FirstApi/index.php";
        var params = "action=delete&Id=" + id;
        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                reloadPage();
                console.log('Deleted goal with id : ' + id);
            }else{
                console.log('Something went wrong status : ' + this.status);
            }
        };
        xmlhttp.send(params);
    } else {
      // Do nothing!
      console.log('Not deleted');
    }
}

function reloadPage(){
    var xmlhttp = new XMLHttpRequest();
    var url = "https://momentumappliances.000webhostapp.com/FirstApi/index.php?action=getAllGoals";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}