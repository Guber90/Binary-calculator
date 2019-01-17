var firstNumber, secondNumber;

var input1=document.getElementById("number1Input");
var input2=document.getElementById("number2Input");

document.getElementById("number1Input").addEventListener("input",function(){
    var textBefore=input1.value;
    var lastCharacter=textBefore[textBefore.length-1];
    if(lastCharacter==="0" || lastCharacter==="1"){
    }
    else{
	console.error("Feil verdi");
	input1.value=textBefore.substring(0,textBefore.length-1);
    }
    
});

document.getElementById("number2Input").addEventListener("input",function(){
    var textBefore=input2.value;
    var lastCharacter=textBefore[textBefore.length-1];
    if(lastCharacter==="0" || lastCharacter==="1"){
    }
    else{
	console.error("Feil verdi");
	input2.value=textBefore.substring(0,textBefore.length-1);
    }
    
});

document.getElementById("calculateSum").addEventListener("click",function(){
    /*Tallene som tastes i input feltene skal splites så at man får enkelt tall. Hver enkelt tall lagres i sitt eget paragraph p så at vi kan kjøre animasjoner riktig. Paragrapher har ID: p1N og p2N*/
    firstNumber=document.getElementById("number1Input").value;
    secondNumber=document.getElementById("number2Input").value;
    if(firstNumber==="" || secondNumber==="")
	alert("Taste inn begge tall");
    else{
	document.getElementById("inputFromUser").style.display="none";
	document.getElementById("reset").style.display="block";
	var numberOfBits1=document.getElementById("number1Input").value.length;
	var numberOfBits2=document.getElementById("number2Input").value.length;
	var numberOfBits=numberOfBits1;
	if(numberOfBits2>numberOfBits1){
	    numberOfBits=numberOfBits2;
	    var diff=numberOfBits2-numberOfBits1;
	    firstNumber="0".repeat(diff)+firstNumber;
	}
	else if(numberOfBits2<numberOfBits1){
	    var diff=numberOfBits1-numberOfBits2;
	    secondNumber="0".repeat(diff)+secondNumber;
	}
	
	firstNumber=firstNumber.split("");
	secondNumber=secondNumber.split("");
	document.getElementById("mask").style.borderLeft=numberOfBits*30+"px solid rgb(0,0,0,0.5)";;
	var positionOfP=65;
	for(var i=0;i<firstNumber.length;i++){
	    var newP=document.createElement("p");
	    newP.classList.add("numbers");
	    var numberOfP="p1"+i;
	    var newP=document.createElement("p");
	    newP.classList.add("numberLook");
	    newP.setAttribute("id", numberOfP);
	    var newTextNode=document.createTextNode(firstNumber[i]);
	    var parent=document.getElementById("number1");
	    newP.appendChild(newTextNode);
	    parent.appendChild(newP);
	    document.getElementById(numberOfP).style.left=positionOfP+"px";
	    positionOfP+=30;
	}
	var positionOfP=65;
	for(var i=0;i<secondNumber.length;i++){
	    var newP=document.createElement("p");
	    newP.classList.add("numbers");
	    var numberOfP="p2"+i;
	    var newP=document.createElement("p");
	    newP.classList.add("numberLook");
	    newP.setAttribute("id", numberOfP);
	    var newTextNode=document.createTextNode(secondNumber[i]);
	    newP.appendChild(newTextNode);
	    document.getElementById("number2").appendChild(newP);
	    document.getElementById(numberOfP).style.left=positionOfP+"px";
	    positionOfP+=30;
	}
	document.getElementById("line1").style.width=150+numberOfBits*30+"px";
	document.getElementById("line2").style.width=150+numberOfBits*30+"px";
	document.getElementById("numbers").style.display="block";
	document.getElementById("mask").style.display="block";
	document.getElementById("dataToCalculate").style.display="block";
	document.getElementById("numbers").classList.add("showCalculations");
	document.getElementById("dataToCalculate").classList.add("showCalculations");
	var pos=0;
	var id=setInterval(frame,3000);/*Animasjon som skal flytte masken til venstre*/

	/*Har får vi verdier av venstre og høyre border så at vi kan flytte masken og holde fokus på de tallene som vi animerer i det tids punkte*/
	var calculatedStyleLeft = window.getComputedStyle(document.getElementById("mask"));
	calculatedStyleLeft=parseInt(calculatedStyleLeft.borderLeft.split("px")[0]);
	var calculatedStyleRight = window.getComputedStyle(document.getElementById("mask"));
	calculatedStyleRight=parseInt(calculatedStyleRight.borderRight.split("px")[0]);

	var currentP=numberOfBits-1;// Vi teller på denne måten hvilken P er det vi skal lese verdi fra
	var memorised=0; /*Det som er i mente etter addisjon*/
	function frame(){
	    /*Dersom vi animerte alle tall slutter vi me animasjon. Vi bruker 30px for hver tall som skal animeres og derfor numberOfBits definerer antall av px*/
	    if(pos<-numberOfBits*30+30){
		setTimeout(function(){
		    document.getElementById("mask").style.border="none";
		}, 100);
		clearInterval(id);
	    }

	    else{
		pos-=30;
		var selectCurrentP1=document.getElementById("p1"+currentP);
		selectCurrentP1;
		var selectCurrentP2=document.getElementById("p2"+currentP);
		calculatedStyleLeft=calculatedStyleLeft-30;
		calculatedStyleRight=calculatedStyleRight+30;
		var currentP1=document.getElementById("p1"+currentP);
		var selectCurrentP2=document.getElementById("p2"+currentP);
		var currentValueOfP1=parseInt(selectCurrentP1.textContent);
		var currentValueOfP2=parseInt(selectCurrentP2.textContent);
		var result=currentValueOfP1 + currentValueOfP2;/*Resultat av addisjon*/
		selectCurrentP1.classList.add("firstNumber");
		selectCurrentP2.classList.add("secondNumber");
		if(result===0){
		    if(memorised===0){
			result=0;
			memorised=0;
		    }
		    else{
			result=1;
			memorised=0;
		    }

		}
		else if(result===1){
		    if(memorised===0){
			result=1;
			memorised=0;
		    }
		    else{
			result=0;
			mente=1;
		    }
		}
		else if(result===2){
		    if(memorised===0){
			result=0;
			memorised=1;
		    }
		    else if(memorised===1){
			result=1;
			memorised=1;
		    }
		}
		//Lage ny paragraph som skal innholde addisjon av tallene
		setTimeout(function(){
		    var newP=document.createElement("p");
		    newP.classList.add("numberLook");
		    newP.setAttribute("id", "p3"+currentP);
		    var newTextNode=document.createTextNode(result);
		    newP.appendChild(newTextNode);
		    var calculatedStyleP1 = window.getComputedStyle(document.getElementById("p1"+currentP));
		    document.getElementById("result").appendChild(newP);
		    document.getElementById("p3"+currentP).style.left=calculatedStyleP1.left;
		    document.getElementById("p3"+currentP).style.color="black";
		},700);
		//Lage ny paragraph som skal innholde mente av addisjon
		setTimeout(function(){
		    newP=document.createElement("p");
		    newP.classList.add("numberLook");
		    newP.setAttribute("id", "p4"+currentP);
		    var newTextNode=document.createTextNode(memorised);
		    newP.appendChild(newTextNode);
		    var calculatedStyleP1 = window.getComputedStyle(document.getElementById("p1"+currentP));
		    document.getElementById("memorisedValues").appendChild(newP);
		    document.getElementById("p4"+currentP).style.left=(parseInt(calculatedStyleP1.left)-30)+"px";
		    document.getElementById("p4"+currentP).style.color="#4286f4";
		},1500);
		if(pos!=-numberOfBits*30){
		    setTimeout(function(){
			document.getElementById("mask").style.borderLeft=calculatedStyleLeft+"px solid rgb(0,0,0,0.5)";
			document.getElementById("mask").style.borderRight=calculatedStyleRight+"px solid rgb(0,0,0,0.5)";
			currentP--;
		    }, 2000);
		}
	    }
	}
    }
});


document.getElementById("reset").addEventListener("click",function(){
    location.reload();
});
