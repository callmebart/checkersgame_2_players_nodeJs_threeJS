
/*
    obsługa komunikację Ajax - serwer
*/

function Net() {
    /*
        funkcja publiczna możliwa do uruchomienia 
        z innych klas
    */

    var player;
    this.sendData = function () {

        var action = $("#login").val();
        $.ajax({
            url: "http://localhost:3000",
            data: { user_name: action,type:"dodaj" },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)
                console.log(obj)
                var waiting = $('<div class="loader">');
                var oczekiwanie = $('<p class="oczekiwanie">');
                
                // to ma wrocic info o zalogowaniu albo o bledzie  
                //    console.log(data)
                if (obj.status == "FULL") {
                    console.log("pelen")
                    alert("Nie grasz")
                }
                if (obj.status == "FIRST") {
                    console.log("Pierwszy gracz");
                    game.pionki();
                 $("#logowanie").css("display", "none");
                    oczekiwanie.text("Czekam na drugiego gracza..");
                    $(document.body).css("height","100%");
                    $(document.body).css("backgroundcolor","#e7d9f2");
                    $(document.body).append(waiting);
                    $(document.body).append(oczekiwanie);
                   
                    $("#root").css("display", "none");
                    player ="black";
                   checking = setInterval(function () {                     
                           check();                       
                        console.log("waiting")
                    }, 500);

                }
                if (obj.status == "SECOND") {
                    console.log("Drugi gracz")
                    $("#logowanie").css("display","none");
                    game.view("s2");
                    game.pionki();
                    
                    alert("Witaj " + obj.user_name + " Grasz białymi");
                    player="white";
                }



                //tu wypisz sumę w div-ie na stronie
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }
    var check = function(){
        $.ajax({
            data: {type:"check"},
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(data)
                if(obj.count ==2){
                    console.log("Wszedł drugi gracz");
                    clearInterval(checking);
                    $("#root").css("display", "block");
                    $("#wait").css("display","none")
                    $(".oczekiwanie").css("display","none");
                    $(".loader").css("display","none");
                    alert("Start gry ! Grasz czarnymi ");
                }

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

    this.getplayer = function(){
        return player
    }
}
