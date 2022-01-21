/*
    UI - obsługa interfejsu użytkownika
*/

function Ui() {
    
/*
    $("#bt1").on("click", function () {
        
    })

    $("#bt2").on("click", function () {
        $("h1").html("pobieram zmienną test z klasy Game: " + game.getTest());
    })
*/
    $("#log").on("click", function () {
        //net.sendData($("#login").val());
        net.sendData();
        game.view($("select").val());
    })
    $("#reset").on("click", function(){
        var reset="reset"
        net.sendData(reset)
    })

  
}