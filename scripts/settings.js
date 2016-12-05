document.addEventListener('deviceready', settings, false);




function settings() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);

    var runButton = document.getElementById('run');
    runButton.addEventListener("click", ertek, false);

    var clearButton = document.getElementById('clear');
    clearButton.addEventListener("click", clearsetting, false);

    var evButton = document.getElementById('ev');
    evButton.addEventListener("change", evvalaszt, false);

    function evvalaszt() {

        var myDate = new Date();
        var x = document.getElementById("ev").value;
        myDate.setFullYear(myDate.getFullYear() + Number(x));
        document.getElementById("erveny").value = yyyymmdd(myDate);
        function yyyymmdd(dateIn) {
            var yyyy = dateIn.getFullYear() + "-";
            var mm = dateIn.getMonth() + 1 + "-";
            var dd = dateIn.getDate();
            return yyyy + mm + dd;
        }
    }

    function clearsetting() {
        var r = confirm("Biztos törölsz minden beállítást?");
        if (r == true) {
        localStorage.clear();
        alert("Adatok törölve!");
        location.reload();
        } 
    }

    var text = [];

    var key = ["felh", "jelsz", "meret", "mszabalyzat", "imegnevezes", "szervezet", "eszkoz", "erveny", "ev"];

    if (window.localStorage.length > 0) {

        var xyz;
        for (xyz = 0; xyz < key.length; xyz++) {
            document.getElementById(key[xyz]).value = window.localStorage.getItem(key[xyz]);
        }
    }

    //document.getElementById("felh").value = localStorage.getItem("felh");
    //document.getElementById("jelsz").value = localStorage.getItem("jelsz");

    if (localStorage.getItem("cegekszama") !== null) {

        var adosz = "";
        var cegn = "";
        var u = 0;


        for (u = 0; u < Number(localStorage.getItem("cegekszama")) ; u++) {

            cegn = "cegnev" + u;
            adosz = "adoszam" + u;

            optq = document.createElement('option');
            optq.id = cegn;
            optq.value = localStorage.getItem(adosz);



            document.getElementById('ceg')
            .appendChild(optq)

            document.getElementById(cegn).innerHTML = localStorage.getItem(cegn);
        }
    }

    // ha nincs hiba van, lekezelni
    if (localStorage.getItem("valcegid") !== null) {

        document.getElementById(localStorage.getItem("valcegid")).selected = true;

    }

    if (localStorage.getItem("arch") == "1") {
        document.getElementById("arch").checked = true;
    }

}

function ertek() {

    localStorage.setItem("felh", document.getElementById("felh").value);
    localStorage.setItem("jelsz", document.getElementById("jelsz").value);
    localStorage.setItem("login", "false");

    var e = document.getElementById("ceg");
    // ha nincs érték hiba van, lekezelni

    if (e.length > 0) {
        var value = e.options[e.selectedIndex].value;

        var text = e.options[e.selectedIndex].text;
        var id = e.options[e.selectedIndex].id;


        localStorage.setItem("valceg", text);
        localStorage.setItem("valcegid", id);
        localStorage.setItem("adosz", value);
    }
        // ez a cégválasztás
    else {
        // cegvalasz
        alert("Válassz céget!");

        $.ajax({
            type: "POST",
            username: "user4",
            password: "pass4",
            crossDomain: true,
            data: { oldal: "cegvalasz" },
            url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
            dataType: "JSON",

            //                data: { felh: localStorage.getItem("felh"), jelsz: localStorage.getItem("jelsz"), ceg: localStorage.getItem("valceg"), adoszam: localStorage.getItem("adosz"), },

            success: function (data) {

                if (data !== "0") {

                    localStorage.setItem("login", "true");
                    localStorage.setItem("cegekszama", data.length);
                    var cegn = "";
                    var u;
                    var w = 0;
                    var adosz = "";

                    for (u in data) {
                        adosz = "adoszam" + w;
                        cegn = "cegnev" + w;
                        w++;

                        localStorage.setItem(cegn, data[u].cegnev);
                        localStorage.setItem(adosz, data[u].adoszam);
                    }

                    for (u = 0; u < Number(localStorage.getItem("cegekszama")) ; u++) {

                        cegn = "cegnev" + u;
                        adosz = "adoszam" + u;

                        optq = document.createElement('option');
                        optq.id = cegn;
                        optq.value = localStorage.getItem(adosz);

                        document.getElementById('ceg')
                        .appendChild(optq)

                        document.getElementById(cegn).innerHTML = localStorage.getItem(cegn);

                    }

                }

                else {
                    alert("hibás felhasználó vagy jelszó!");
                }
            }
        });
    }
    // cegvalasz


    if (document.getElementById('arch').checked) {

        localStorage.setItem("arch", "1");
    }
    else { localStorage.setItem("arch", "0"); }


    if (document.getElementById("ceg").value.length > 0) {

        alert("Adatok mentve!");

        window.location.href = "index.html";
    }

}