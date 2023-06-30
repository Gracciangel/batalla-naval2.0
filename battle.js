
const barcos =[
    
    {
        imagen: './img/porta-aviones.png',
        nombre: 'Porta-Aviones',
        size: 5
      
    },
 {      imagen: './img/batalla.png',
 nombre:'Acorazado',
 size: 4
      
    },
 {
        
        imagen: './img/submarine.png',
        nombre:'Submarino',
        size: 3
    },
{     imagen: '/img/ship.png',
      nombre: 'Destructor',
      size:2
       
    }

]



    const board = document.querySelector("#board");
    const boardAttack = document.querySelector("#boardAttack");
    const position = document.querySelectorAll(".position");
    
    let matrix = [];
    let matrixAttack = [];
    const sizeShip = [5, 4, 3, 2];
    const positionArray = ["horizontal", "vertical"]
    let quantityShip = [1, 1, 1, 2];
    let quantityShipPC =  [1, 1, 1, 2];
    let ship = {};
    let shipRandom = {};
    let puntos = document.getElementById('count'); 
    let puntosPc = document.getElementById('countPc')
    let count = 0 
    let countpc = 0
    //Función para creación de tableros
    function createMatrix(boardType, matrixType, func, type){
        for(let i=0; i<10; i++){
            let list = []
            let row = document.createElement("div");
            boardType.appendChild(row);
            row.className = "myRow"
            for(let j=0; j<10; j++){
                let grid = document.createElement("div");
                row.appendChild(grid);
                grid.className = "grid";
                grid.id = i + "," + j + "," + type;
                grid.addEventListener("click", func);
                list.push("");
            }
            matrixType.push(list)
        }
    }
    //Función para seleccionar barco
    function selectShip(event) {
        const shipElement = event.target;
        const position = shipElement.getAttribute("data-position");
        const size = parseInt(shipElement.getAttribute("data-size"));
        const quantity = parseInt(shipElement.getAttribute("data-quantity"));
        const id = shipElement.getAttribute("data-id");
      
        ship.position = position;
        ship.size = size;
        ship.quantity = quantity;
        ship.id = id;
      }
      
      // Creación de tablero jugador
      createMatrix(board, matrix, selectPosition, "player");
      
      // Creación de barcos
      for (let i = 0; i < position.length; i++) {
        let horizontal = document.createElement("img");
        horizontal.src = barcos[i].imagen;
        horizontal.setAttribute("data-position", "horizontal");
        horizontal.setAttribute("data-size", sizeShip[i]);
        horizontal.setAttribute("data-quantity", quantityShip[i]);
        horizontal.setAttribute("data-id", i);
        horizontal.addEventListener("dragstart", selectShip); // Cambiado a "dragstart" en lugar de "click"
        horizontal.draggable = true; // Habilitar el elemento para ser arrastrado
        position[i].appendChild(horizontal);
      
        let vertical = document.createElement("img");
        vertical.src = barcos[i].imagen;
        vertical.setAttribute("data-position", "vertical");
        vertical.setAttribute("data-size", sizeShip[i]);
        vertical.setAttribute("data-quantity", quantityShip[i]);
        vertical.setAttribute("data-id", i);
        vertical.addEventListener("dragstart", selectShip); // Cambiado a "dragstart" en lugar de ""
        vertical.draggable = true; // Habilitar el elemento para ser arrastrado
        position[i].appendChild(vertical);
      }
      
      // Controladores de eventos para el cuadrado objetivo
      let dropTarget = document.getElementById("board");
      
      dropTarget.addEventListener("dragover", allowDrop);
      dropTarget.addEventListener("drop", handleDrop);
      function allowDrop(event) {
        event.preventDefault();
        
      }
      
      function handleDrop(event) {
        event.preventDefault();
        const draggedItemId = event.dataTransfer.getData("text/plain");
        const draggedItem = document.getElementById(draggedItemId);
        dropTarget.appendChild(draggedItem);
      }
function selectPosition(event){
    if(ship.quantity > 0){
        let grid = event.target
        let gridID = grid.id.split(",");
        let x = parseInt(gridID[0]);
        let y = parseInt(gridID[1]);
        if(ship.position === "horizontal"){
            if((y + (ship.size - 1)) < 10){
                for(let i=y; i<(y + ship.size); i++){
                    matrix[x][i] = "ship";
                    document.getElementById(x + "," + i + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
        else if(ship.position === "vertical"){
            if((x + (ship.size - 1)) < 10){
                for(let i=x; i<(x + ship.size); i++){
                    matrix[i][y] = "ship";
                    document.getElementById(i + "," + y + "," + "player").className += " selected";
                }
                quantityShip[ship.id] -= 1;
                ship = {}
            }
            else{
                alert("Selecciona una posición válida");
            }
        }
    }
    else{
        alert("Debes seleccionar un barco disponible");
    }
}
//Función de botón iniciar juego
function startGame(){
    createMatrix(boardAttack, matrixAttack, checkShot, "pc");
    selectPositionRandom()
    document.querySelector("#button").disabled = true;
    document.getElementById('radar').style.display = 'grid'
}
//Generar posición random de barcos
function selectPositionRandom(){
    for(let i=0; i<quantityShipPC.length; i++){
        while(quantityShipPC[i] > 0){
            random(i);
            quantityShipPC[i] -= 1;
        }
    }
}
//Verificación de posición válida
function checkPosition(pos, axis, size){
    if(shipRandom.position  === pos){
        if((axis + (size - 1)) < 10){
            return true;
        }
        else{
            return false;
        }
    }
}
//Función para crear barco random
function random(i){
    shipRandom.position = positionArray[Math.floor(Math.random() * Math.floor(positionArray.length))];
    shipRandom.x = Math.floor(Math.random() * Math.floor(10));
    shipRandom.y = Math.floor(Math.random() * Math.floor(10));
    if(checkPosition("horizontal", shipRandom.y, sizeShip[i])){
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            if(matrixAttack[shipRandom.x][j] === "ship"){
                return random(i)
            }
        }
        for(let j=shipRandom.y; j<(shipRandom.y + sizeShip[i]); j++){
            matrixAttack[shipRandom.x][j] = "ship";
        }
    }
    else if(checkPosition("vertical", shipRandom.x, sizeShip[i])){
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            if(matrixAttack[j][shipRandom.y] === "ship"){
                return random(i)
            }
        }
        for(let j=shipRandom.x; j<(shipRandom.x + sizeShip[i]); j++){
            matrixAttack[j][shipRandom.y] = "ship";
        }
    }
    else{
        return random(i)
    }
}
//Verificar tiro de jugador
function checkShot(event){
    let grid = event.target
    let gridID = grid.id.split(",");
    let x = parseInt(gridID[0]);
    let y = parseInt(gridID[1]);
    if(matrixAttack[x][y] === "ship"){
        alert("Muy bien, acertaste. Vuelve a jugar");
        count++ ;
        puntos.innerText= `puntos: ${count}`
        matrixAttack[x][y] = "hit";
        document.getElementById(x + "," + y + "," + "pc").className += " hit";
        checkWinner(matrixAttack, "player")
        console.log(count)
    }
    else{
        alert('tu disparo cayo en el agua')
        count--
        puntos.innerText= `puntos: ${count}`
        matrixAttack[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "pc").className += " miss";
        shotPc()
    }
}
//Jugada del PC
function shotPc(){
    let x = Math.floor(Math.random() * Math.floor(10));
    let y = Math.floor(Math.random() * Math.floor(10));
    if(matrix[x][y] === "ship"){
        alert("Ops! te han disparado");
        countpc++
        puntosPc.innerText=`puntos pc: ${countpc}` ;
        matrix[x][y] = "hit";
        document.getElementById(x + "," + y + "," + "player").className += " hit";
        checkWinner(matrix, "pc");
        console.log(countpc)
        return shotPc();
        
    }
    else if(matrix[x][y] === "hit" || matrix[x][y] === "miss"){
        return shotPc();
    }
    else{
        alert("El disparo del pc cayó al agua");
        countpc-- ;
        puntosPc.innerText=`puntos pc: ${countpc}`
        matrix[x][y] = "miss";
        document.getElementById(x + "," + y + "," + "player").className += " miss";
    }
}
//Revisar ganador
function checkWinner(matrix, player){
    for(let i=0; i<10; i++){
        let arraychecked = matrix[i].filter((index)=>{return index === "ship"})
        if(arraychecked.length > 0){
            return
        }
    }
    if(player === "pc"){
        alert("Ha ganado el PC")
    }
    else{
        alert("GANASTE!!!")
    }

}

function addBarcos(){
    const bacosArray  = document.querySelectorAll('img') ; 
    
}

