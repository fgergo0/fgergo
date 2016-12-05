document.addEventListener('deviceready', biz, false);


function biz() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);





    var xmlhttp = new XMLHttpRequest();
    var url = "http://109.61.66.130/adatok/" + localStorage.getItem("adosz") + "/biz__.txt";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            jsondata(myArr);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    function jsondata(arr) {


        document.getElementById("hbef").innerHTML = "<table class='buttontable'><tr><td class='balra'>Éves biztosítási díj:</td><td class='jobbra'>" + arr[0].hbef + " Ft</td></tr></table>";
        document.getElementById("federt").innerHTML = "<table class='buttontable'><tr><td class='balra'>Fedezeti érték:</td><td class='jobbra'>" + arr[0].federt + " Ft</td></tr></table>";



        for (var t = 1; t < arr.length; t++) {

            var biztable = "<table><tr><td class='tbalra'>Biztosítás megnevezése</td><td class='tjobbra'>"+arr[t].biztmeg+"</td> \
    <tr><td class='tbalra'>Rendszeres díj</td><td class='tjobbra'>" + arr[t].renddij + " Ft</td></tr><tr><td class='tbalra'>Díjrendezettség</td> \
    <td class='tjobbra'>" + arr[t].redate + "</td></tr><tr> \
    <td class='tbalra' id='icashs'>Következő díjfizetés dátuma</td><td class='tjobbra' id='icash'>" + arr[t].kovdij + "</td></tr></table><br>";

            divq = document.createElement('div');
            divq.id = "tablah"+t;

            document.getElementById('tablah')
            .appendChild(divq)
            

            document.getElementById("tablah"+t).innerHTML = biztable;


        }

    }


}