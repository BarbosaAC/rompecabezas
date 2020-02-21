//Obtener elementos principales de html
var containerCell=document.getElementById("container-cell");
var containerPiece=document.getElementById("container-piece");
var dialogElement=document.getElementById("dialog");
var selectedPiece=null;

document.onkeypress=keypress;

var width=containerCell.offsetWidth;
var height=containerCell.offsetHeight;
width/=4;
height/=4;

createBoard();
createPieces();

function createCell(width,height,position){
	//Mismo tamaño de cuaditos
	
	var cellElement=document.createElement("div");
	cellElement.style.width=width;
	cellElement.style.height=height;
	cellElement.style.border="1px solid black";
	cellElement.style.background="#124242";
	cellElement.dataset.position=position;
	cellElement.dataset.fill=false;
	//configurar eventos

	cellElement.onclick=clickCell;//click en celda
	cellElement.ondrop=dropCell;//drop, soltar en la celda
	cellElement.ondragover=allowDrop;
	return cellElement;
}
function createPiece(width,height,piece){
	var cellElement=document.createElement("div");
	var pieceElement=document.createElement("img");
	//configurando la celda para la pieza, dentro del contenedor de piezas
	cellElement.style.width=width;
	cellElement.style.height=height;
	cellElement.dataset.fill=false;

	//configurando la pieza dentro del contenedor pieza
	pieceElement.width=width;
	pieceElement.height=height;
	pieceElement.style.border="1px solid black";
	pieceElement.src=piece.image;
	pieceElement.dataset.position=piece.position;

	pieceElement.classList.add("piece-zoomin");

	pieceElement.id="img"+piece.position;
	pieceElement.draggable=true;

	//Configurando eventos
	pieceElement.onclick=clickPiece;
	pieceElement.ondragstart=dragPiece;

	cellElement.ondrop=dropCell;
	cellElement.ondragover=allowDrop;

	//poner imagen en el div
	cellElement.appendChild(pieceElement);
	return cellElement;
}
function createBoard(){
	var width=containerCell.offsetWidth;
	var height=containerCell.offsetHeight;
	width/=4;
	height/=4;
	for(var i=0;i<16;i++){
		let cellElement=createCell(width,height,i);
		addCell(cellElement);
	}
}
function createPieces(){
	var width=containerPiece.offsetWidth;
	var height=containerPiece.offsetHeight;
	width /= 4;
	height /= 4;
	var pieces=generatePieceData();
	for (let i=0;i<16;i++){
		let pieceElement=createPiece(width,height,pieces[i]);
		addPiece(pieceElement);
	}
}

function addCell(element){
	containerCell.appendChild(element);
	
}

function addPiece(element){
	containerPiece.appendChild(element);
}
function generatePieceData(){
	//Generamos una lista de piezas 

	var pieces=[];
	var indexShuffle=shuffle(16); 
	console.log(indexShuffle);
	for(let i=0;i<16;i++){
		let piece={
			image:"img/"+(indexShuffle[i]+1)+".jpg",
			position:indexShuffle[i]
		};
		pieces.push(piece);

	}
	//pieces=pieces.sort(function(){return Math.random()-0.5});
	return pieces;
}
function clickPiece(e){
	var piece=e.target;
	selectedPiece=piece;

}
function clickCell(e){
	if(selectedPiece){
		let cell=e.target;
		cell.appendChild(selectedPiece);
	}
	else{
		console.log("Seleciona una pieza");
	}
}

function keypress(ke){
	if(ke.keyCode==101||ke.keyCode==69){
		let result=evaluatedBoard();
		showDialog(result);
		console.log(result);
	}
}
function showDialog(result){
	var imgElement=dialogElement.children[0];
	var testContent=dialogElement.children[1];
	console.log(result);
	if (result){
		imgElement.src="img/ganaste.jpg";
		testContent.innerText="Ganaste";
	}
	else{
		imgElement.src="img/perdiste.gif";
		testContent.innerText="Perdiste"
		returnPices();
	}
	dialogElement.style.display="block";
	dialogElement.classList.add("dialog");
}

function evaluatedBoard(){
	var cells=containerCell.children;
	for(cell of cells){
		let piece=cell.children[0];
		console.log(piece.dataset.position+"="+cell.dataset.position);
		if(piece.dataset.position!=cell.dataset.position){
			
			return false;
		}
	}
	return true;
}
function returnPices(){
	let cells=containerCell.children;
	let cellPieces=containerPiece.children;
	var indexList=shuffle(16);

	for(cell of cells){
		let position=cell.dataset.position;
		let piece=cell.children[0];
		cellPieces[indexList[position]].appendChild(piece);
	}
}

function dragPiece(ev){
	console.log(ev);
	let piece=ev.target;
	ev.dataTransfer.setData("text",piece.id);
}

function dropCell(ev){
	ev.preventDefault();
	console.log(ev);
	//recuperar el id de la pieza que viene en el evento
	let dataId=ev.dataTransfer.getData("text");
	//Recuperando el elemento donde voy a soltar otro elemento
	let cell=ev.target;
	//recuperamos la pieza a través de su id (propiedad)
	let piece=document.getElementById(dataId);

	if(cell.dataset.fill=="false"){
		cell.dataset.fill=true;
		cell.appendChild(piece);
	
	}
	else if(cell.dataset.fill=="true"){
		cell.dataset.fill=false;
		cell.appendChild(piece);
	
	}
}

function allowDrop(ev){
	ev.preventDefault();
}

function shuffle(max){
	let listShuffle=[];
	let i=0;
	let temp=0;
	while(i<max){
		temp=Math.round(Math.random()*(max-1));
		if(listShuffle.indexOf(temp)==-1){
			listShuffle.push(temp);
			i++;
		}
	}
	return listShuffle
}
/*function shuffleList(lista){
	let indexShuffleList=shuffle(list.length);
	for(let i=0;i<list.length;i++){

	}
}*/