document.addEventListener('deviceready', afastat, false);

// afastat();

function afastat() {

    var siButton = document.getElementById("si");
    siButton.addEventListener("click", function () { window.history.back(); }, false);

    document.getElementById("fivi").innerHTML = "<table class='buttontable'><tr><td class='balra'>Aktuális Áfa:</td><td class='jobbra'>" + localStorage.getItem("afau") + " Ft</td></tr></table>";
    document.getElementById("elozo_afa").innerHTML = "<table class='buttontable'><tr><td class='balra'>Előző havi Áfa:</td><td class='jobbra'>" + localStorage.getItem("afae") + " Ft</td></tr></table>";

    $.ajax({
        type: "POST",
        username: "user4",
        password: "pass4",
        crossDomain: true,
        data: { oldal: "szamlak" },
        url: "http://109.61.66.130/szla.php?nocache=" + (new Date()).getTime(),
        dataType: "JSON",

        success: function (result) {
            // alert("result");

            if (result == "0") { alert("hibás felhasználó vagy jelszó!"); }
            else { jsondata(result); }

        }
    });

    function jsondata(arr) {

        $('#ide').DataTable({
            data: arr,
            columns: [
                { data: 'partnern' },
                { data: 'brutto', render: $.fn.dataTable.render.number(' ', ',', 0, '') },
                { data: 'szafa', render: $.fn.dataTable.render.number(' ', ',', 0, '') }

            ],

            // Nyelvi beállítások

            'oLanguage': {

                // Lapozó beállítása

                'oPaginate': {

                    'sFirst': 'Első oldal',

                    'sLast': 'Utolsó oldal',

                    'sNext': 'Következő',

                    'sPrevious': 'Előző',

                },

                // Egyéb nyelvi beállítások

                'sSearch': 'Keresés:',

                'sLengthMenu': 'Mutat: _MENU_',

                'sInfo': 'Megjelenítve: _START_ - _END_ a(z) _TOTAL_ rekordból',

                'sInfoEmpty': 'Megjelenítve: 0 rekord a 0 rekordból',

                'sInfoFiltered': '(keresés _MAX_ rekordban)',

                'sEmptyTable': 'Nincs megjeleníthető adat',

                'sZeroRecords': 'A szűrési feltételnek egyetlen rekord sem felel meg',

                'sProcessing': 'A feldolgozás folyamatban...'

            },

            // szinezo

            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                switch (aData.tipus) {
                    case 'vevo':
                        $(nRow).css('color', 'red')
                        break;
                    case 'szallito':
                        $(nRow).css('color', 'green')
                        break;
                }
            },

            "aoColumnDefs": [{
                "aTargets": [0],
                "mData": "download_link",
                "mRender": function (data, type, full) {

                    return '<a href="image.html?idw=' + full.DT_RowID + '">' + data + '</a>';
                }
            }]
        });
    }
}