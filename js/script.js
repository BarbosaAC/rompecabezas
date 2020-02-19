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
	pieceElement.dataset.position=piece.position;
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

	for(cell of cells){
		let position=cell.dataset.position;
		let piece=cell.children[0];
		cellPieces[piece.dataset.position].appendChild(piece);
	}
}