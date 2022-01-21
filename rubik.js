$(document).ready(function () {
    var x = $(window).width();
    var y = $(window).height();
    var scene = new THREE.Scene();
    var gora = false;

    var klik = [];
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
    $(document).mousedown(function (event) {

        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        klik.pop()
        console.log(intersects.length)
        if (intersects.length > 0) {
            if(klik.length<2){
                klik.push(intersects[0].object);
                console.log(klik)
            } 
        }

    })
var dookola = false;
var up_down = false;
var s = false;
var d = false;
    
$(document).keyup(function (event) {

    var keyCode = event.which; 
    
    console.log(keyCode); // wyloguj kod klawisza
    
    switch (keyCode) {
    
        case 38:
                   klik[0].position.y+=20;
                   break;
        case 40:
            klik[0].position.y-=20;
            break;
        case 37:
            klik[0].position.z+=20;
            break;
        case 39:
            klik[0].position.x+=20;
            break;
        case 36:
            klik[0].position.x-=20;
            break;
        case 33:
            klik[0].position.z-=20;
            break;
        case 65:
            dookola = false;
            break;
        case 87:
        up_down = false;
        break;
        case 83:
            s = false;
        
            case 68:
            d = false;
        }
        
    })

    $(document).keydown(function (event) {

        var keyCode = event.which; 
        
        console.log(keyCode); // wyloguj kod klawisz       
        switch (keyCode) {
            case 65:
                       console.log("naciskam A");
                       dookola = true;
                       break;
           case 87:
                up_down = true;
                break;
                case 83:
                s = true;
                break;
                case 68:
                d = true;
            }       
        })
        
        
        
     


    var camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        x / y, // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0Xfffffff);
    renderer.setSize(x, y);
    console.log(x, y)
    $("#root").append(renderer.domElement);



    camera.position.set(400, 300, 400)
    camera.lookAt(scene.position)

    var axes = new THREE.AxesHelper(1000)
    scene.add(axes)
    //------------------------------------------------------------
    var tab = [
        [0, 25, 0],
        [0, 80, 0],
        [0, 135, 0]
    ]
   
    for(var i = 0;i<tab.length;i++){
        for(var j = 0;j<tab.length;j++){
        var geometryCube = new THREE.BoxGeometry(50, 50, 50, 5, 5, 5);
        var materials = [];

        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/dirt_Grass.png') }));//bok
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/dirt_Grass.png') }));//bok
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/grass.jpg') }));//gora
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/tekstura.jpg') }));//dol
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/dirt_Grass.png') }));//bok
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('mats/dirt_Grass.png') }));//bok
        var cube = new THREE.Mesh(geometryCube, materials);
        cube.position.set(tab[i][j],tab[i][j+1],tab[i][j+2]);
        scene.add(cube);
    }
    }




var kat =0;
var angle =0;

    function render() {
        if (dookola) {
            camera.position.z = 400 * Math.cos(kat);
            camera.position.x = 400 * Math.sin(kat);
            kat += 0.1
        }
        if(up_down){
                camera.position.y +=20;
        }
        if(s){
            camera.position.y -=20;
    }
    if(d){
        camera.position.z = 400 * Math.cos(kat);
            camera.position.x = 400 * Math.sin(kat);
            kat -= 0.1
}
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        camera.lookAt(scene.position)


    }



    render();
});