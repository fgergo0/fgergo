document.addEventListener('deviceready', szla, false);

function szla() {

    var queryString = window.location.search.substring(1);
    var varArray = queryString.split("="); //eg. index.html?msg=1

    var param1 = varArray[0];
    var param2 = varArray[1];

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);

    $.ajax({
        type: "POST",
        username: "user4",
        password: "pass4",
        crossDomain: true,
        data: { oldal: "image", szamlaid: param2 },
        url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
        dataType: "JSON",
        success: function (result) {
            jsondata(result);
        }
    });

    function jsondata(arr) {

        var i = 0;

        document.getElementById("szsz").innerHTML = "<table class='buttontable'><tr><td class='balra'>Számlaszám:</td><td class='jobbra'>" + arr[i].szszam + "</td></tr></table>";
        document.getElementById("partn").innerHTML = "<table class='buttontable'><tr><td class='balra'>Partner név:</td><td class='jobbra'>" + arr[i].partnern + "</td></tr></table>";
        document.getElementById("brutto").innerHTML = ezer(arr[i].brutto);

        document.getElementById("netto").innerHTML = ezer(arr[i].netto);
        document.getElementById("afa").innerHTML = ezer(arr[i].szafa);
        document.getElementById("telj").innerHTML = arr[i].teljdate;


        document.getElementById("kiall").innerHTML = arr[i].kidate;
        document.getElementById("fizhat").innerHTML = arr[i].fizdate;
        document.getElementById("vesza").innerHTML = arr[i].tipus;
        document.getElementById("kiegyenlit").innerHTML = arr[i].kiegyinf;

    }
    function ezer(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

}
