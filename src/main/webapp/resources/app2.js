function insertBook(bookList, books){
	var id;
	books.forEach( book => {
		let title = document.createElement("h4");
		title.classList.add("list-group-item-heading");
		title.innerText = book.firstName;
		
		let aElem = document.createElement("a");
		aElem.appendChild(title);
		aElem.classList.add("list-group-item");
		
		let divElem = document.createElement("div");
		divElem.style.display = 'none'
		aElem.appendChild(divElem);
		
		bookList.appendChild(aElem);
		
		id = book.id
		
		var clicked = false;
		aElem.addEventListener("click", function(e){
			e.preventDefault();
			if (divElem.style.display === 'none') {
				divElem.style.display = 'block';
				if(clicked == false){
					showInfo(title, divElem, book.id);
				}
				clicked = true;
//			} else {
//				divElem.style.display = 'none';
		    }
		})
	})
	setId(id);
}


function showInfo(title, divElem, id){
	
	$.ajax({
		url: "http://localhost:8080/gralicja_app_ss_registration/restUsers/" + id,
		type: "get",
		dataType: "json"
	})
	.done(function (response){
			
			let author = document.createElement("p");
			let publisher = document.createElement("p");
			let type = document.createElement("p");
			let isbn = document.createElement("p");
			
			author.innerText = "Author: ";
			publisher.innerText = "Publisher: ";
			type.innerText = "Type: ";
			isbn.innerText = "ISBN: ";
						
			divElem.appendChild(author);
			divElem.appendChild(publisher);
			divElem.appendChild(type);
			divElem.appendChild(isbn);
			
			let authorValue = document.createElement("p");
			authorValue.innerText = response.author;
			author.appendChild(authorValue);
			
			let publisherValue = document.createElement("p");
			publisherValue.innerText = response.publisher;
			publisher.appendChild(publisherValue);
			
			let typeValue = document.createElement("p");
			typeValue.innerText = response.type;
			type.appendChild(typeValue);
			
			let isbnValue = document.createElement("p");
			isbnValue.innerText = response.isbn;
			isbn.appendChild(isbnValue);
			
			let hideButton = document.createElement("button");
			hideButton.setAttribute("class", "hideButton")
			hideButton.innerText = "Hide";
			divElem.appendChild(hideButton);
			
			let editingButton = document.createElement("button");
			editingButton.setAttribute("class", "editingButton")
			editingButton.innerText = "Edit";
			divElem.appendChild(editingButton);
			
			let deleteButton = document.createElement("button");
			deleteButton.setAttribute("class", "deleteButton")
			deleteButton.innerText = "Delete";
			divElem.appendChild(deleteButton);
			
			hide(hideButton, divElem);
			edit(id, editingButton, title, authorValue, publisherValue, typeValue, isbnValue);
			functionDelete(deleteButton, divElem, id);
			
			})
	
}

function hide(hideButton, divElem){
		hideButton.addEventListener("click", function(e){
			e.preventDefault();
			console.log("hide");
			event.stopImmediatePropagation()
			divElem.style.display = 'none';
	})
}

function edit(id, editingButton, title, authorValue, publisherValue, typeValue, isbnValue){
	
	editingButton.addEventListener("click", function(e){
		e.preventDefault();
		event.stopImmediatePropagation()
		
		if(editingButton.innerText == "Edit" ){
			// setting contenteditable attribute to editing values
			title.setAttribute('contenteditable',true);
			authorValue.setAttribute('contenteditable',true);
			publisherValue.setAttribute('contenteditable',true);
			typeValue.setAttribute('contenteditable',true);
			isbnValue.setAttribute('contenteditable',true);
			editingButton.innerText = "Save";
		} else {
			// removing contenteditable attribute to stop editing values
			title.removeAttribute('contenteditable');
			authorValue.removeAttribute('contenteditable');
			publisherValue.removeAttribute('contenteditable');
			typeValue.removeAttribute('contenteditable');
			isbnValue.removeAttribute('contenteditable');
			
			// geting new values
			let newTitle = title.innerHTML;
			let newAuthor = authorValue.innerHTML;
			let newPublisher = publisherValue.innerHTML;
			let newType = typeValue.innerHTML;
			let newIsbn = isbnValue.innerHTML;
			
			
			$.ajax({
        	    url: "http://localhost:8080/gralicja_app_ss_registration/restUsers/" + id,
        	    type: 'PUT',
        	    dataType: 'json',
        	    contentType: "application/json",
        		data: JSON.stringify({
        				"id" : id,
        				"title" : newTitle,
        				"author" : newAuthor,
        				"publisher" : newPublisher,
        				"type" : newType,
        				"isbn" : newIsbn}),
        	    success: function() { alert('Book updated'); }
        	});
			
			console.log(newTitle);
			console.log(newAuthor);
			console.log(newPublisher);
			console.log(newType);
			console.log(newIsbn);
			
			editingButton.innerText = "Edit";
		}
		
		
	})
}

function functionDelete(deleteButton, divElem, id){
	deleteButton.addEventListener("click", function(e){
		e.preventDefault();
		divElem.parentElement.parentElement.removeChild(divElem.parentElement);
		$.ajax({
			url: "http://localhost:8080/gralicja_app_ss_registration/restUsers/" + id,
			type: "DELETE",
			success: function() { alert('Book deleted'); }
		})
	})
}

function showBooks(bookList){
	console.log($('form').serialize());
	$.ajax({
		url: "http://localhost:8080/gralicja_app_ss_registration/restUsers/",
		type: "get",
		dataType: "json"
	})
	.done(books => insertBook(bookList, books));
}

function setId(id){
	var idForm = document.querySelector("#id");
	var newId = id + 1;
	idForm.setAttribute("value", newId);
}

document.addEventListener("DOMContentLoaded", function(){
	
	var bookList = document.querySelector(".list-group");

	showBooks(bookList);

	var button = document.querySelector("#submit");

    button.addEventListener('click', function(e){
        if(e.target.tagName == 'BUTTON') {
            e.preventDefault();
        	
            // taking data from form
            var newBook = $('form').serializeArray();
        	var id = newBook[0].value;
        	var title = newBook[1].value;
        	var author = newBook[2].value;
        	var publisher = newBook[3].value;
        	var type = newBook[4].value;
        	var isbn = newBook[5].value;
        	
        	console.log(id);
        	console.log(title);
        	console.log(author);
        	console.log(publisher);
        	console.log(type);
        	console.log(isbn);

        	// sending data to endpoint
        	$.ajax({
        	    url: 'http://localhost:8080/gralicja_app_ss_registration/restUsers/',
        	    type: 'POST',
        	    dataType: 'json',
        	    contentType: "application/json",
        		data: JSON.stringify({
        				"id" : id,
        				"title" : title,
        				"author" : author,
        				"publisher" : publisher,
        				"type" : type,
        				"isbn" : isbn}),
        	    success: function() { alert('Book added'); location.reload(); }
        	});
        	
        }
    })
})





