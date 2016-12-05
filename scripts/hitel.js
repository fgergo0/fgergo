document.addEventListener('deviceready', hitel, false);


function hitel() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);



    var xmlhttp = new XMLHttpRequest();
  var url = "http://109.61.66.130/adatok/" + localStorage.getItem("adosz") + "/hitel.txt"; 
  //  var url = "http://" + localStorage.getItem('felh') + ":" + localStorage.getItem('jelsz') + "@109.61.66.130/adatok/" + localStorage.getItem("adosz") + "/hitel.txt";    // php?adoszam=" + localStorage.getItem('adosz');

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            jsondata(myArr);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    function jsondata(arr) {


        document.getElementById("hbef").innerHTML = "<table class='buttontable'><tr><td class='balra'>Tőketartozás összesen:</td><td class='jobbra'>" + arr[0].hitelossz + " Ft</td></tr></table>";
        document.getElementById("federt").innerHTML = "<table class='buttontable'><tr><td class='balra'>Havi törlesztő részletek összesen:</td><td class='jobbra'>" + arr[0].hitelek + " Ft</td></tr></table>";



        for (var t = 1; t < arr.length; t++) {

            var biztable = "<table><tr><td class='tbalra'>Hitelező</td><td class='tjobbra'>" + arr[t].hitelezo + "</td> \
    <tr><td class='tbalra'>Havi törlesztő részlet</td><td class='tjobbra'>" + arr[t].havitorl + " Ft</td></tr><tr><td class='tbalra'>Aktuális tőketartozás</td> \
    <td class='tjobbra'>" + arr[t].felvetth + " Ft</td></tr><tr> \
    <td class='tbalra'>Hitel lejárta</td><td class='tjobbra'>" + arr[t].hitellej + "</td></tr> \
    <tr><td class='tbalra' id='icashs'>Következő díjfizetés dátuma</td><td class='tjobbra' id='icash'>" + arr[t].kovdijfiz + "</td></tr></table><br>";

            divq = document.createElement('div');
            divq.id = "tablah" + t;

            document.getElementById('tablah')
            .appendChild(divq)


            document.getElementById("tablah" + t).innerHTML = biztable;


        }

    }



}