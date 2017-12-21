


var minas = inicializaMatriz();
var ganas = null;

function inicializaMatriz(){
				var tabla = [];
				for(var i = 0; i < 8; i++){
			        tabla[i] = [0,0,0,0,0,0,0,0];
			    }
			    return tabla;
			}

			function crearTablero(){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			           var div = document.createElement("div");
			            div.id = i + "" + j;
			            div.style.backgroundColor = "#9577cf";
			            div.style.backgroundImage = null;
			            div.name = "agua";

			            div.addEventListener("click", botonIzq, true);
			            div.addEventListener("contextmenu",botonDer, true);
			            tablerominas.appendChild(div);
			        }
			    }

			}

			function resetTablero(){
				ganas = null;
				minas ={}
				minas=inicializaMatriz();
	            generarBombas(minas);
		       	bombasAlrededor(minas);
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			            //var div = document.createElement("div");
			            var dato = i.toString() + j.toString()
			            var div = document.getElementById( dato) ;
			            div.remove()
			            var div = document.createElement("div");
			            div.id = i + "" + j;
			            div.name = "agua";
			            div.style.backgroundColor = "#9577cf";
			            div.style.backgroundImage = null;

			            div.addEventListener("click", botonIzq, true);
			            div.addEventListener("contextmenu",botonDer, true);
			            tablerominas.appendChild(div);


			        }
			    }


			}

			function isTerminar(){
					if((isNoHayAgua())&&isTodasBanderas()){
						alert("YOU WIN");
			            enviadatos_gan();
						ganas = true;
					}


			}

			function isTodasBanderas(){
			    var cont=0;
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			            //var div = document.createElement("div");
			            var dato = i.toString() + j.toString()
			            var div = document.getElementById( dato) ;
			        	if(div.name === "bandera"){
			        	     cont++;
			        	}

			        }
			    }
				if(cont === 8){
					return true;
				}else{
					return false;
				}



			}


			function isNoHayAgua(){
				var cont=0;
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			            //var div = document.createElement("div");
			            var dato = i.toString() + j.toString()
			            var div = document.getElementById( dato) ;
			        	if(div.name === "agua"){
			        	     cont++;
			        	}

			        }
			    }
				if(cont > 0){
					return false;
				}else{
					return true;
				}
			}


		    function botonDer(e){

			   window.oncontextmenu = function() {
								return false;
			   }

			  if(ganas === null){
					var auxstr = this.id.split("");
					var myid = auxstr[0] + auxstr[1];
					divObj = document.getElementById(myid);
	                // console.log("Contenido del div:  "	)
	                // console.log( divObj);

	                if(divObj.name === "agua"){
	                	divObj.name = "bandera"
						divObj.style.backgroundImage = "url(img/juegos/buscaminas/flag.jpg)";

	                }else{
	                	 if(divObj.name === "bandera"){
		                     divObj.name = "agua"
							 divObj.style.backgroundImage = "";
	                	 }
	                }
	                isTerminar();
			  }else{
			  	      	alert("Presionar Empezar para comenzar el juego");

			  }

		    }

			function botonIzq(e){

			   var auxstr = this.id.split("");
			   var myid = auxstr[0] + auxstr[1];
			   divObj = document.getElementById(myid);

               if((ganas === null)){
	               	 if(divObj.name!=="bandera" ){
						if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] == 0){
							divObj.style.backgroundColor = "white";
						    divObj.name = "nada";
							abrirAlrededor(parseInt(auxstr[0],10),parseInt(auxstr[1],10),minas);
						}else{
							if(minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] != "*"){
								document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + minas[parseInt(auxstr[0],10)][parseInt(auxstr[1],10)] + "</p>";
								divObj.style.backgroundColor = "white";
								divObj.name = "nada";
							}else{
								divObj.style.backgroundImage = "url(img/juegos/buscaminas/bomba.jpg)";
								divObj.name = "bomba";
								abrirTablero(minas);
								ganas = false;      //si se pierde varialb se poner a fase.
								enviadatos_per();
								alert("Perdiste =(");
							}
						}
	               	 }
	               	 isTerminar();
                }else{
			  	      	alert("Presionar Empezar para comenzar el juego");

			    }



			}

			function bombasAlrededor(tablero){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			           if(tablero[i][j] == "*"){
			           		if(i == 0 && j == 0){
			           			colocaNumeroBombas(i, j, i + 1, j + 1,tablero);
			           		}
			           		else if (i == 0 && (j > 0 && j < 7)) {
			           			colocaNumeroBombas(i, j - 1, i + 1, j + 1,tablero);
			           		}
			           		else if(i == 0 && j == 7){
			           			colocaNumeroBombas(i, j - 1, i + 1, j,tablero);
			           		}
			           		else if(j == 7 && (i > 0 && i < 7)){
			           			colocaNumeroBombas(i - 1, j - 1, i + 1, j,tablero);
			           		}
			           		else if(i == 7 && j == 7){
			           			colocaNumeroBombas(i - 1, j - 1, i, j,tablero);
			           		}
			           		else if(i == 7 && (j > 0 && j < 7)){
			           			colocaNumeroBombas(i - 1, j - 1, i, j + 1,tablero);
			           		}
			           		else if(i == 7 && j == 0){
			           			colocaNumeroBombas(i - 1, j, i, j + 1,tablero);
			           		}
			           		else if(j == 0 && (i > 0 && i < 7)){
			           			colocaNumeroBombas(i - 1, j, i + 1, j + 1,tablero);
			           		}else{
			           			colocaNumeroBombas(i - 1, j - 1, i + 1, j + 1,tablero);
			           		}
			           }
			        }
			    }
			}

			function colocaNumeroBombas(vari,varj,fini,finj,tablero){
				for(var i = vari; i <= fini; i++){
			        for(var j = varj; j <= finj; j++){
			           if(tablero[i][j] != "*"){
			           		tablero[i][j] = (parseInt(tablero[i][j])+1);
			           }
			        }
			    }
			}

			function generarBombas(tablero){
				var fil = 0;
				var col = 0;

				fil = Math.floor((Math.random()*7)+0);
				col = Math.floor((Math.random()*7)+0);

				for(var i = 0; i < 8; i++){
					while (tablero[fil][col] == "*"){
						fil = Math.floor((Math.random()*7)+0);
						col = Math.floor((Math.random()*7)+0);
					}
					tablero[fil][col] = "*";
				}
			}

			function abrirCeros(vari,varj,fini,finj,cori,corj,tablero){
				for(var i = vari; i <= fini; i++){
			        for(var j = varj; j <= finj; j++){
			        	var myid = i+""+j;
			        	var objDiv =  document.getElementById(myid)
			           if(objDiv.textContent == ""){
			           		if(tablero[i][j] == 0){
			           			if(i == cori && j == corj){
			           				objDiv.textContent = ""	;
			           				objDiv.style.backgroundColor = "white";
			           				objDiv.name = "nada";
			           			}else{
			           				if(objDiv.style.backgroundColor != "white"){
			           					abrirAlrededor(i, j,tablero);
			           					objDiv.name = "nada";
			           				}
			           			}

			           		}else{
			           			if(tablero[i][j] != "*"){
			           				document.getElementById(myid).innerHTML = "<p style='margin-top:15px;'>" + tablero[i][j] + "</p>";
			           				objDiv.style.backgroundColor = "white";
			           			    objDiv.name = "nada";
			           			}
			           		}
			           }
			        }
			    }
			}

			function abrirAlrededor(xi,xj,tablero){
				if(xi == 0 && xj == 0){
					abrirCeros(xi, xj, xi + 1, xj + 1, xi, xj,tablero);
				}
				else if(xi == 0 && (xj > 0 && xj < 7)){
					abrirCeros(xi, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
				}
				else if(xi == 0 && xj == 7){
					abrirCeros(xi, xj - 1, xi + 1, xj, xi, xj,tablero);
				}
				else if(xj == 7 && (xi > 0 && xi < 7)){
					abrirCeros(xi - 1, xj - 1, xi + 1, xj, xi, xj,tablero);
				}
				else if(xi == 7 && xj == 7){
					abrirCeros(xi - 1, xj - 1, xi, xj, xi, xj,tablero);
				}
				else if(xi == 7 && (xj > 0 && xj < 7)){
					abrirCeros(xi - 1, xj - 1, xi, xj + 1, xi, xj,tablero);
				}
				else if(xi == 7 && xj == 0){
					abrirCeros(xi - 1, xj, xi, xj + 1, xi, xj,tablero);
				}
				else if(xj == 0 && (xi > 0 && xi < 7)){
					abrirCeros(xi - 1, xj, xi + 1, xj + 1, xi, xj,tablero);
				}else{
					abrirCeros(xi - 1, xj - 1, xi + 1, xj + 1, xi, xj,tablero);
				}
			}

			function abrirTablero(tablero){
				for(var i = 0; i < 8; i++){
			        for(var j = 0; j < 8; j++){
			        	var myid = i+""+j;
			        	var objDiv =  document.getElementById(myid);
			           if(tablero[i][j] == "*"){
			           		objDiv.style.backgroundImage =  "url(img/juegos/buscaminas/bomba.jpg)";
			           		objDiv.name = "bomba";
			           }
			        }
			    }
			}

function cargarTablero(){
			crearTablero();
			generarBombas(minas);
			bombasAlrededor(minas);

		}
/*Enviar acutilizar la tabla de base de datos*/
function enviadatos_gan(){

		window.location = "/actualizar?ganadas_buscaminas=1";
		return true;
}
function enviadatos_per(){
		window.location = "/actualizar?perdidas_buscaminas=1";
		return true;

}
