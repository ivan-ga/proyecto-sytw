var myApp = angular.module("myApp", []);

myApp.controller("PieCtrl", function($scope) {
  $scope.footer = {name: "footer.html", url: "footer.html"};
});


myApp.controller("HeaderCtrl", function($scope) {
  $scope.header = {name: "header.html", url: "header.html"};
});

myApp.controller("controladorConMetodos", function($scope){

          $scope.form=false;
        // $scope.ocultocss='display: initial;';
        // $scope.form=true;
        


   
           $scope.ShowForm=function(){
                   $scope.estilos={display:"block"};
                  $scope.form=true;
           }

            $scope.ShowRetroceder=function(){
                 $scope.form=false;

            }
        });

 myApp.controller('MainCtrl', function ($scope) {
  $scope.usuario = {username: $scope.usuario.username ,
                     password: $scope.usuario.password,}
   
   
  $scope.submitForm = function (usuario) {

    alert('Form submitted with' + JSON.stringify( usuario));
  }
});

myApp.controller("dentro", function($scope){
        
       
        /*aki funcion sumirt*/ 
      
        //Poner esto$scope.chuchu.mierda= $scope.hola;
});

myApp.controller('loginCtrl', ['$http',controladorPrincipal ]);

function controladorPrincipal($http, $scope){
        var vm=this;
        var home=this;
        home.datos={};
        //inicializo un objeto en los datos de formulario
        //Primero aki dentro despues html coge lso dao y lo pasa.
        vm.fdatos = {};
        //var mensaje = {username: "pepe" ,password: "Otormas"}
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" );
        // declaro la función enviar
        vm.enviar = function(){
                // $http.post("/login", mensaje)
                 $http.post("/login",  vm.fdatos).then(function(res){
                     
                                
                               vm.fdatos.username="";
                               vm.fdatos.password="";
                               home.datos = res.data; 
                               
                               console.log(home);
                               //Crea un alerta
                                        //vm.url("www.google.com/home");
              //por supuesto podrás volcar la respuesta al modelo con algo como vm.res = res;
                    },function (res) {
                         console.log(res.data);
                     });
        }
}




myApp.controller('registroCtrl', ['$http',controladorRegistro ]);

function controladorRegistro($http){
        var rg=this;
    
        //inicializo un objeto en los datos de formulario
        //Primero aki dentro despues html coge lso dao y lo pasa.
        rg.registro = {};
        
        //var mensaje = {username: "pepe" ,password: "Otormas"}
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" );
        // declaro la función enviar
        rg.registrar = function(){
            console.log(  rg.registro);
            if(rg.registro.password === rg.registro.passwordh){
                 //alert("Contraseña distintaasdddddd");
                 $http.post("/registro",   rg.registro).then(function(res){
                                console.log(res.data);
                                rg.registro.username="";
                                rg.registro.password="";
                                rg.registro.passwordh="";
                         
                                
                                
                                
                                //por supuesto podrás volcar la respuesta al modelo con algo como vm.res = res;
                    },function (res) {
                        //Si lo antriro no se ejecuta.
                        // console.log(res.data);
                         console.log(res)
                         //alert("Usuario Registrado")
                     });
            }else{
                rg.registro.password="";
                rg.registro.passwordh="";
                alert("Contraseñas Distintas");
            }      
        }
}



        
        
myApp.controller("verTextRS",   function($scope) {
   
 $scope.Github="Github";
 
 var nuevo = "";
 setInterval( nuevo=function otro(){
            
                var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
 
var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;
console.log("Mi tamaño es " + width)
return width




}


,1000)


if(nuevo<1200){
      console.log("soy chikitooo");  
   
      $scope.Github = "";
}else{
    $scope.Github = "Github" 
}

 console.log("estoy afuera "+$scope.Github); 
 
 
 
}

 

);

        