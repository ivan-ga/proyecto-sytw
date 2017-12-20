var myApp = angular.module("myApp", []);

myApp.controller("PieCtrl", function($scope) {
  $scope.footer = {name: "footer.html", url: "footer.html"};
});



myApp.controller("controladorConMetodos", function($scope){

           $scope.form=false;
           var fo = this;
           //inicializo un objeto en los datos de formulario
           //Primero aki dentro despues html coge lso dao y lo pasa.
           fo.registro = {};
           fo.login = {};
           console.log(fo.registro);
           $scope.ShowForm=function(){
                  fo.login.username = "";
                  fo.login.password = "";
                  $scope.estilos={display:"block"};
                  $scope.form=true;
           }

           $scope.ShowRetroceder=function(){
                
                  fo.registro.username = "";
                  fo.registro.password = "";
                  fo.registro.passwordh = "";
                  $scope.form=false;
            }
            
            fo.comprobar= function(){
                
                if(fo.registro.password === fo.registro.passwordh){
                   return true; 
                }else return false;
            }
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
                                console.log("eroro" + res.data);
                      },function (res) {
                       //  console.log("eroro" + res.data);
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
                // $http.post("/login", mensaje)
                 $http.post("/registro",   rg.registro).then(function(res){

                                 console.log(res.data);
                                        //  rg.registro.username="";
                                         // rg.registro.password="";
                                          // rg.registro.passwordh="";
              //por supuesto podrás volcar la respuesta al modelo con algo como vm.res = res;
                    },function (res) {
                         console.log(res.data);
                     });
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
