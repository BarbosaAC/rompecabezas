//Obtener elementos principales de html
var containerCell=document.getElementById("container-cell");
var containerPiece=document.getElementById("container-piece");
var selectedPiece=null;

var width=containerCell.offsetWidth;
var height=containerCell.offsetHeight;
width/=4;
height/=4;

createBoard();
createPieces();

function createCell(width,height){
	//Mismo tamaño de cuaditos
	
	var cellElement=document.createElement("div");
	cellElement.style.width=width;
	cellElement.style.height=height;
	cellElement.style.border="1px solid black";
	cellElement.style.background="#124242";
	cellElement.onclick=clickCell;
	return cellElement;
}
function createPiece(width,height,piece){
	var cellElement=document.createElement("div");
	var pieceElement=document.createElement("img");
	//configurando la celda para la pieza, dentro del contenedor de piezas
	cellElement.style.width=width;
	cellElement.style.height=height;
	//configurando la pieza dentro del contenedor pieza
	pieceElement.width=width;
	pieceElement.height=height;
	pieceElement.style.border="1px solid black";
	pieceElement.src=piece.image;
	pieceElement.onclick=clickPiece;
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
		let cellElement=createCell(width,height);
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
	for(let i=0;i<16;i++){
		let piece={
			image:"img/"+(i+1)+".jpg",
			position:i
		};
		pieces.push(piece);
	}
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