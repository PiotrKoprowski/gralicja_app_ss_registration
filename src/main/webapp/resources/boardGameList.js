function insertBoardGame(boardGameList, boardGames){
	var id;
	boardGames.forEach( boardGame => {
		let title = document.createElement("h4");
		title.classList.add("list-group-item-heading");
		title.innerText = boardGame.title;
		
		let aElem = document.createElement("a");
		aElem.appendChild(title);
		aElem.classList.add("list-group-item");
		
		let divElem = document.createElement("div");
		divElem.style.display = 'none'
		aElem.appendChild(divElem);
		
		boardGameList.appendChild(aElem);
		
		id = boardGame.id
		
		var clicked = false;
		aElem.addEventListener("click", function(e){
			e.preventDefault();
			if (divElem.style.display === 'none') {
				divElem.style.display = 'block';
				if(clicked == false){
					showInfo(title, divElem, boardGame.id);
				}
				clicked = true;
			} else {
				divElem.style.display = 'none';
		    }
		})
	})
}


function showInfo(title, divElem, id){
	
	$.ajax({
		url: "http://localhost:8080/gralicja_app_ss_registration/restBoardGame/" + id,
		type: "get",
		dataType: "json"
	})
	.done(function (response){
			
			let description = document.createElement("p");
			let category = document.createElement("p");
			let publisher = document.createElement("p");
			let minNumOfPlayers = document.createElement("p");
			let maxNumOfPlayers = document.createElement("p");
			let minPlayerAge = document.createElement("p");
			let gameLength = document.createElement("p");
			
			description.innerText = "Opis: ";
			category.innerText = "Kategoria: ";
			publisher.innerText = "Wydawca: ";
			minNumOfPlayers.innerText = "Minimalna liczba graczy: ";
			maxNumOfPlayers.innerText = "Maksymalna liczba graczy: ";
			minPlayerAge.innerText = "Minimalny wiek gracza: ";
			gameLength.innerText = "Długość rozgrywki: ";
			
			divElem.appendChild(description);
			divElem.appendChild(category);
			divElem.appendChild(publisher);
			divElem.appendChild(minNumOfPlayers);
			divElem.appendChild(maxNumOfPlayers);
			divElem.appendChild(minPlayerAge);
			divElem.appendChild(gameLength);
			
			let descriptionValue = document.createElement("b");
			descriptionValue.innerText = response.description;
			description.appendChild(descriptionValue);
			
			let categoryValue = document.createElement("b");
			categoryValue.innerText = response.category;
			category.appendChild(categoryValue);
			
			let publisherValue = document.createElement("b");
			publisherValue.innerText = response.publisher;
			publisher.appendChild(publisherValue);
			
			let minNumOfPlayersValue = document.createElement("b");
			minNumOfPlayersValue.innerText = response.minNumOfPlayers;
			minNumOfPlayers.appendChild(minNumOfPlayersValue);
			
			let maxNumOfPlayersValue = document.createElement("b");
			maxNumOfPlayersValue.innerText = response.maxNumOfPlayers;
			maxNumOfPlayers.appendChild(maxNumOfPlayersValue);
			
			let minPlayerAgeValue = document.createElement("b");
			minPlayerAgeValue.innerText = response.minPlayerAge;
			minPlayerAge.appendChild(minPlayerAgeValue);
			
			let gameLengthValue = document.createElement("b");
			gameLengthValue.innerText = response.gameLength;
			gameLength.appendChild(gameLengthValue);
			
			let hideButton = document.createElement("button");
			hideButton.setAttribute("class", "hideButton")
			hideButton.innerText = "Ukryj";
			divElem.appendChild(hideButton);
			
			hide(hideButton, divElem);
			
			})
	
}

function hide(hideButton, divElem){
		hideButton.addEventListener("click", function(e){
			e.preventDefault();
			event.stopImmediatePropagation()
			divElem.style.display = 'none';
	})
}

function showBoardGames(boardGameList){
	$.ajax({
		url: "http://localhost:8080/gralicja_app_ss_registration/restBoardGame/",
		type: "get",
		dataType: "json"
	})
	.done(boardGames => insertBoardGame(boardGameList, boardGames));
}


document.addEventListener("DOMContentLoaded", function(){
	
	var boardGameList = document.querySelector(".list-group");
	
	showBoardGames(boardGameList);
	
})





