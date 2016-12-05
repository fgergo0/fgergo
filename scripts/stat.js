
 document.addEventListener('deviceready', stat, false);


// function stat(eves, aee, tao, ipado, ha, hfvk, hmm, icash) {

 function stat() {

     var siButton = document.getElementById("si");
     siButton.addEventListener("click", function () { window.history.back(); }, false);

     // alert("ez itt a stat!");

     $.ajax({
         type: "POST",
         username: "user4",
         password: "pass4",
         data: { oldal: "stat" },
         url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
         dataType: "JSON",

         success: function (result) {
             // alert("result");

             if (result == "0") { alert("hibás felhasználó vagy jelszó!"); }
             else { jsondata(result); }

         }
     });

     function jsondata(arr) {

         document.getElementById("ena").innerHTML = ezer(arr[0].eves_arbevetel) + " Ft";
         document.getElementById("aee").innerHTML = ezer(arr[0].adozase) + " Ft";
         document.getElementById("tao").innerHTML = ezer(arr[0].tao) + " Ft";
         document.getElementById("ipado").innerHTML = ezer(arr[0].ipado) + " Ft";
         document.getElementById("ha").innerHTML = ezer(arr[0].haviarbe) + " Ft";
         document.getElementById("hfvk").innerHTML = ezer(arr[0].havifixk) + " Ft";
         document.getElementById("hmm").innerHTML = ezer(arr[0].havifixm) + " Ft";
         document.getElementById("icash").innerHTML = ezer(arr[0].icash) + " Ft";
     }
     function ezer(x) {
         return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
     }
 }