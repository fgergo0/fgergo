// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    
    

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
    
                  


        var arButton = document.getElementById("button1");
        arButton.addEventListener("click", function () { window.location.href = "arbevetel.html"; }, false);

        var afaButton = document.getElementById("button2");
        afaButton.addEventListener("click", function () { window.location.href = "afa.html"; }, false);


        var bankButton = document.getElementById("button3");
        bankButton.addEventListener("click", function () { window.location.href = "bank.html"; }, false);

        var paButton = document.getElementById("button4");
        paButton.addEventListener("click", function () { window.location.href = "palyazat.html"; }, false);

        var hiButton = document.getElementById("button5");
        hiButton.addEventListener("click", function () { window.location.href = "hitel.html"; }, false);

        var bizButton = document.getElementById("button6");
        bizButton.addEventListener("click", function () { window.location.href = "biz.html"; }, false);

        var statButton = document.getElementById("button7");
        statButton.addEventListener("click", function () { window.location.href = "stat.html"; }, false);

        var okButton = document.getElementById("shot");
        okButton.addEventListener("click", shot, false);

        // alert("ajax előtt");

        // json funkciok

        $.ajax({
            type: "POST",
            username: "user4",
            password: "pass4",
            crossDomain: true,
            data: { oldal: "fokep" },
            url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
            dataType: "JSON",

            success: function (result) {

                if (result == "0") { alert("hibás felhasználó vagy jelszó!"); }
                else { jsondata(result); }

            }
        });

        function jsondata(arr) {

            // localStorage.clear();

            document.getElementById("cegnevtext").innerHTML = "Utolsó frissítés: " + arr[0].utolsofrissites + ", " + localStorage.getItem("valceg");

            localStorage.setItem("afau", ezer(arr[0].afa_ertek));
            localStorage.setItem("afae", ezer(arr[0].afa_elozo_ho));
            localStorage.setItem("kintlevoseg", ezer(arr[0].kintlevoseg));
            localStorage.setItem("tartozas", ezer(arr[0].tartozas));
            localStorage.setItem("bankossz", ezer(arr[0].bankossz));

            document.getElementById("button1").innerHTML = "<table class='buttontable'><tr><td class='balra'>Éves Nettó Árbevétel:</td><td class='jobbra'>" + ezer(arr[0].eves_arbevetel) + " Ft</td></tr></table>";
            document.getElementById("button2").innerHTML = "<table class='buttontable'><tr><td class='balra'>Aktuális Áfa:</td><td class='jobbra'>" + ezer(arr[0].afa_ertek) + " Ft</td></tr></table>";
            document.getElementById("button3").innerHTML = "<table class='buttontable'><tr><td class='balra'>Banki Egyenlegek:</td><td class='jobbra'>" + ezer(arr[0].bankossz) + " Ft</td></tr></table>";

            document.getElementById("button4").innerHTML = "<table class='buttontable'><tr><td  class='kozep'>Pályázatok</td></tr></table>";
            document.getElementById("button5").innerHTML = "<table class='buttontable'><tr><td  class='kozep'>Hitelek</td></tr></table>";
            document.getElementById("button6").innerHTML = "<table class='buttontable'><tr><td  class='kozep'>Biztosítások</td></tr></table>";
            document.getElementById("button7").innerHTML = "<table class='buttontable'><tr><td  class='kozep'>Pénzügyek</td></tr></table>";
        };

        // json funkciok vege

        function ezer(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }



        function clearCache() {

            navigator.camera.cleanup();

        }

        function shot() {

                    

            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                targetWidth:900,
                targetHeight: 1160

            });

        }

        function onSuccess(imageURI) {
         //   var image = document.getElementById('myImage');
         //   image.src = imageURI;

            clearCache();

             //    document.getElementById("myImage").innerHTML = imageURI;

                  //  show_image(imageURI);

                 getFileEntry(imageURI);

        }

        function getFileEntry(imgUri) {
            window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {

                                 
                var win = function (r) {

                    clearCache();

                    alert("Sikeres küldés!");
                }

                var fail = function (error) {
          
                    clearCache();

                    alert("Hú, de nagy baj van, hibakód = " + error.code);
                   
                }

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = "myphoto.jpg";
                options.mimeType = "image/jpeg";

                var params = new Object();

              
                params.felh =  localStorage.getItem("felh");
                params.jelsz = localStorage.getItem("jelsz");

                if (localStorage.getItem("arch") == "1") {
                    params.arch = "1";
                }
                else { params.arch = "0"; }
                
                options.params = params;

                var ft = new FileTransfer();
                ft.upload(imgUri, encodeURI("http://109.61.66.130/upload.php"), win, fail, options);

                // writeFile(fileEntry, imgUri); 

                //  document.getElementById("inf").innerHTML = "got file: " + fileEntry.fullPath;

                // displayFileData(fileEntry.nativeURL, "Native URL"); 

            }, function () {
                // If don't get the FileEntry (which may happen when testing 
                // on some emulators), copy to a new FileEntry. 
                createNewFileEntry(imgUri);
            });
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }


        

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
     //   var parentElement = document.getElementById('deviceready');
     //   var listeningElement = parentElement.querySelector('.listening');
      //  var receivedElement = parentElement.querySelector('.received');
       // listeningElement.setAttribute('style', 'display:none;');
      //  receivedElement.setAttribute('style', 'display:block;');


    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();