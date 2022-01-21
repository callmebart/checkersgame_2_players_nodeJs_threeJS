
/*
    klasa Game
*/

function Game() {

    /*
        zmienna prywatna widoczna tylko w tym pliku / klasie
    */

    /*
        zmienna publiczna, dostępna z innych klas, nie używać
    */

    //this.test = 0; 

    /*
        funkcja prywatna widoczna tylko w tej klasie
    */
    var camera;
    var szachownica = [

        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],

    ];

    var pionkitab = [

        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],

    ];
    var scene = new THREE.Scene();
    var init = function () {

        //// selectt
        var camx = 0;
        var camy = 600;
        var camz = -1000;
        /////
        camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            4 / 3, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maxymalna renderowana odległość
        );
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0xfff0ff);
        renderer.setSize(window.innerWidth, window.innerHeight);
        $("#root").append(renderer.domElement);
        camera.position.set(camx, camy, camz)




        var meshBlack = new THREE.MeshBasicMaterial({
            color: 0x874124,
            side: THREE.DoubleSide,
            map:new THREE.TextureLoader().load('../img/drewno1.jpg'),
            wireframe: false,
            transparent: true,
            opacity: 1
        });

        var meshWhite = new THREE.MeshBasicMaterial({
            color: 0xf9eec4,
            map:new THREE.TextureLoader().load('../img/drewno2.jpg'),
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 1
        });

        var planegeo = new THREE.BoxGeometry(100, 100, 30);


        var x = -350;
        var z = -350;
        for (var i = 0; i < szachownica.length; i++) {
            for (var ii = 0; ii < szachownica.length; ii++) {
                if (szachownica[i][ii] == 0) { //black
                    var planeBlack = new THREE.Mesh(planegeo, meshBlack)
                    planeBlack.rotateX(Math.PI / 2)
                    planeBlack.name = "poleblack";
                    scene.add(planeBlack);
                    planeBlack.position.x = x;
                    planeBlack.position.z = z;
                    x += 100;
                }
                if (szachownica[i][ii] == 1) { // white
                    var planeWhite = new THREE.Mesh(planegeo, meshWhite)
                    planeWhite.rotateX(Math.PI / 2)
                    scene.add(planeWhite)
                    planeWhite.position.x = x;
                    planeWhite.position.z = z;
                    x += 100;
                }
            }
            x = -350;
            z += 100;
        }



        camera.lookAt(scene.position);
        function render() {
            //console.log(camera.position)

            camera.lookAt(scene.position);
            //cube.rotation.y += 0.01;
            //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
            //np zmieniająca się wartość rotacji obiektu

            //mesh.rotation.y += 0.01;

            //wykonywanie funkcji bez końca ok 60 fps jeśli pozwala na to wydajność maszyny

            requestAnimationFrame(render);

            //ciągłe renderowanie / wyświetlanie widoku sceny nasza kamerą

            renderer.render(scene, camera);
        }
        render();
        ////////////////////////////


        ////////////////////////////


    }
    this.pionki = function () {
        var xx = -350;
        var zz = -350;
        var geometry = new THREE.CylinderGeometry(45, 45, 20, 32);

        for (var i = 0; i < szachownica.length; i++) {
            for (var ii = 0; ii < szachownica.length; ii++) {
                if (pionkitab[i][ii] == 2) { //black
                    var blackpionek = new THREE.MeshBasicMaterial({ color: 0x000000,
                    map: new THREE.TextureLoader().load('../img/pionek.jpg')
                    });
                    var pblack = new THREE.Mesh(geometry, blackpionek);
                    pblack.name = "pionblack";
                    scene.add(pblack);
                    pblack.position.x = xx;
                    pblack.position.z = zz;
                    pblack.position.y = 25;
                    xx += 100;
                }
                if (pionkitab[i][ii] == 1) { // white
                    var whitepionek = new THREE.MeshBasicMaterial({ color: 0xffffff,
                        map: new THREE.TextureLoader().load('../img/pionek2.jpg') });
                    var pwhite = new THREE.Mesh(geometry, whitepionek);
                    pwhite.name = "pionwhite"
                    scene.add(pwhite)
                    pwhite.position.x = xx;
                    pwhite.position.z = zz;
                    pwhite.position.y = 25;
                    xx += 100;
                }
                if (pionkitab[i][ii] == 0) {
                    xx += 100;
                }
            }
            xx = -350;
            zz += 100;
        }
    }
    init();

    /*
        funkcje publiczne możliwe do wywołania z innych klas
    */


    this.setTest = function (val) {
        test = val;
        $("h1").html("ustawiam test w klasie Game na: " + test)
    }

    this.getTest = function () {
        return test;
    }
    this.view = function (val) {
        view = val;
        if (view == "s1") {
            camx = 0;
            camy = 300;
            camz = -1000;
        }
        if (view == "s2") {
            camx = 0;
            camy = 600;
            camz = 1000;
        }
        if (view == "s3") {
            camx = 0;
            camy = 1100;
            camz = 0;
        }
        if (view == "s4") {
            camx = 1000;
            camy = 0;
            camz = 0;
        }
        camera.position.set(camx, camy, camz);
    }

    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D 
    var actual = null;
    $(document).mousedown(function (event) {
        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children);
        var gracz = net.getplayer();
        console.log(gracz)
        console.log(intersects.length)

        if (intersects.length > 0) {
            console.log(intersects[0].object);
            if(gracz == "black"){
                if (intersects[0].object == actual) {
                    actual.material.color.setHex(0x000000);
                    actual = null;
                }
                else if (intersects[0].object.name == "pionblack" && actual == null) {
                    actual = intersects[0].object;
                    actual.material.color.setHex(0x42f4a1);
                }
    
                else if (intersects[0].object.name == "poleblack" && actual != null) {
                    console.log(intersects[0].object.position.x)
                    actual.position.x = intersects[0].object.position.x;
                    actual.position.z = intersects[0].object.position.z;
                    actual.material.color.setHex(0x000000);
                    actual = null;
                }
            }
            if(gracz == "white"){
                if (intersects[0].object == actual) {
                    actual.material.color.setHex(0x000000);
                    actual = null;
                }
                else if (intersects[0].object.name == "pionwhite" && actual == null) {
                    actual = intersects[0].object;
                    actual.material.color.setHex(0x42f4a1);
                }
    
                else if (intersects[0].object.name == "poleblack" && actual != null) {
                    console.log(intersects[0].object.position.x)
                    actual.position.x = intersects[0].object.position.x;
                    actual.position.z = intersects[0].object.position.z;
                    actual.material.color.setHex(0xffffff);
                    actual = null;
                }
            }


        }
    });


}