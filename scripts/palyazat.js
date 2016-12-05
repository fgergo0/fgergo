document.addEventListener('deviceready', paly, false);


function paly() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);



    var xmlhttp = new XMLHttpRequest();
    var url = "http://109.61.66.130/adatok/" + localStorage.getItem("adosz") + "/palyazat.txt";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            jsondata(myArr);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    function jsondata(arr) {


        document.getElementById("hbef").innerHTML = "<table class='buttontable'><tr><td class='balra'>Elérhető pályázatok száma:</td><td class='jobbra'>" + arr[0].elerhdb + "</td></tr></table>";
        document.getElementById("federt").innerHTML = "<table class='buttontable'><tr><td class='balra'>Pályázatok összértéke:</td><td class='jobbra'>" + arr[0].pertek + "</td></tr></table>";



        for (var t = 1; t < arr.length; t++) {

            var biztable = "<table><tr><td class='tbalra'>Pályázat megnevezése</td><td class='tjobbra'><a href='palyazatreszl.html'>" + arr[t].pmegn + "</a></td> \
    </tr><tr><td class='tbalra'>Pályázat megnyitása</td><td class='tjobbra'>" + arr[t].pmegny + "</td></tr><tr><td class='tbalra'>Beadási határidő</td> \
    <td class='tjobbra'>" + arr[t].behat + "</td></tr><tr> \
    <td class='tbalra' id='icashs'>Elnyerhető összeg</td><td class='tjobbra' id='icash'>" + arr[t].eosszeg + "</td></tr></table><br>";

            divq = document.createElement('div');
            divq.id = "tablah" + t;

            document.getElementById('tablah')
            .appendChild(divq)


            document.getElementById("tablah" + t).innerHTML = biztable;


        }

    }



}