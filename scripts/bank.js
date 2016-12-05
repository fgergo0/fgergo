document.addEventListener('deviceready', bank, false);

// afastat();

function bank() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);

        $.ajax({
        type: "POST",
        username: "user4",
        password: "pass4",
        crossDomain: true,
        data: { oldal: "bank" },
        url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
        dataType: "JSON",

        success: function (result) {
            // alert("result");

            if (result == "0") { alert("hibás felhasználó vagy jelszó!"); }
            else { jsondata(result); }

        }
    });

    function jsondata(arr) {

        document.getElementById("bankossz").innerHTML = "<table class='buttontable'><tr><td class='balra'>Összes számla egyenleg:</td><td class='jobbra'>" + localStorage.getItem("bankossz") + " Ft</td></tr></table>";

        for (var t = 0; t < arr.length; t++) {

            var biztable = "<table><tr><td class='tbalra'>Bank neve</td><td class='tjobbra'>" + arr[t].banknev + "</td> \
    <tr><td class='tbalra'>Bankszámla száma</td><td class='tjobbra'>" + arr[t].bankszamla + "</td></tr><tr><td class='tbalra'>Frissítés dátuma</td> \
    <td class='tjobbra'>" + arr[t].bankfdate + "</td></tr><tr> \
    <td class='tbalra' id='icashs'>Egyenleg</td><td class='tjobbra' id='icash'>" + ezer(arr[t].bankegyenleg) + " Ft</td></tr></table><br>";

            divq = document.createElement('div');
            divq.id = "tablah" + t;

            document.getElementById('tablah')
            .appendChild(divq)

            document.getElementById("tablah" + t).innerHTML = biztable;
        }
    }
    function ezer(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}