var http = require("http");
var qs = require("querystring");
var fs = require("fs");

var server = http.createServer(function (request, response) {
    // console.log(request.method) // zauważ ze przesyłane po kliknieciu butona dane, będą typu POST
    //console.log("żądany przez przeglądarkę adres: " + request.url)

    switch (request.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            //console.log("Get")
            fs.readFile("static/index.html", function (error, data) {
                if (request.url === "/") {
                    fs.readFile("static/index.html", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'text/html' });
                        response.write(data);
                        response.end();

                    })
                } else if (request.url === "/libs/jquery-3.3.1.js") {
                    fs.readFile("static/libs/jquery-3.3.1.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/libs/three.js") {
                    fs.readFile("static/libs/three.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/css/style.css") {
                    fs.readFile("static/css/style.css", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'text/css' });
                        response.write(data);
                        response.end();
                    })
                }
                else if (request.url === "/js/Game.js") {
                    fs.readFile("static/js/Game.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Main.js") {
                    fs.readFile("static/js/Main.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Net.js") {
                    fs.readFile("static/js/Net.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })
                } else if (request.url === "/js/Ui.js") {
                    fs.readFile("static/js/Ui.js", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'application/javascript' });
                        response.write(data);
                        response.end();
                    })

                }else if (request.url === "/img/drewno1.jpg") {
                    fs.readFile("static/img/drewno1.jpg", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }else if (request.url === "/img/drewno2.jpg") {
                    fs.readFile("static/img/drewno2.jpg", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }else if (request.url === "/img/pionek.jpg") {
                    fs.readFile("static/img/pionek.jpg", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }else if (request.url === "/img/pionek2.jpg") {
                    fs.readFile("static/img/pionek2.jpg", function (error, data) {
                        response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        response.write(data);
                        response.end();
                    })
                }
            });
            break;
        case "POST":

            servResponse(request, response)

            break;

    }

});

var tab_users = [];

function servResponse(request, response) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    request.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })

    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    request.on("end", function (data) {
        var finish = qs.parse(allData)
        if (finish.type == "check") {
            finish.count=tab_users.length;
        }
        else{

            if (tab_users.length == 2) {
                console.log("2 uzytkownikow");
                finish.status = "FULL";
            }
            if (tab_users.length == 1) {

                tab_users.push(finish.user_name);
                console.log("tablica : " + tab_users);
                finish.status = "SECOND";
                finish.users = tab_users;
                finish.count = 2;
            }

        
            if (tab_users.length == 0) {
            tab_users.push(finish.user_name);
            console.log("tablica : " + tab_users)
            finish.status = "FIRST";
        }

        }

    response.end(JSON.stringify(finish));

})
}

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});

