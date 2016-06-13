//Initialise variables
var logMSG = true;
var curActiveInput = null;//Is storing the input element on the location library so we know what input you are editing and we can change it back to text when you are done editing
var type = 'content';//storing the type
function log(var1, var2) { if(logMSG||var2) console.log(var1); }

function setType(tp) {type = tp; window.history.pushState("", "", "?page="+tp); return tp;}

function getType() {return type;}

function createArticleTable(){
	var table = '';
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type : "getArtikelen"
		},
		success: function(data){
			data = JSON.parse(data);
			table = '<table id="artikelTable" class="artikelTable table table-striped">';
			table += '<thead>';
			table += '<tr>';
			table += '<th>Id</th>';
			table += '<th>Artikel</th>';
			table += '<th>Prijs</th>';
			table += '<th>Aantal</th>';
			table += '<th>Gehaald?</th>';
			table += '<th>Verwijder</th>';
			table += '</tr>';
			table += '</thead>';
			table += '<tbody>';
			
			$.each(data, function(key, val ){
				table += '<tr id="artTRID_'+val.artikel_id+'">';
				table += '<th id="artikel_id_'+val.artikel_id+'">'+val.artikel_id+'</th>';
				table += '<th id="artikel_naam_'+val.artikel_id+'" onclick="editArtikel(event)">'+val.artikel_naam+'</th>';
				table += '<th id="artikel_prijs_'+val.artikel_id+'" onclick="editArtikel(event, true)">'+val.artikel_prijs+'</th>';
				table += '<th id="artikel_aantal_'+val.artikel_id+'" onclick="editArtikel(event, true)">'+val.artikel_aantal+'</th>';
				
				table += '<th id="artikel_status_' + val.artikel_id + '"><select class="form-control" style="max-width:75px;" onchange="saveArtikel('+val.artikel_id+')">';
				if(val.artikel_status) table += '<option>Nee</option> <option selected>Ja</option>';
				else table += '<option selected>Nee</option> <option>Ja</option>';
	            table += '</select></th>';;
				
				table += '<th><button type="button" onclick="deleteArtikel(this)" id="btnArt_'+val.artikel_id+'" class="btn btn-danger"">Verwijder</button></th>';
				table += '</tr>';
			});
			
			table += '</tbody>';
			table += '</table>';
			table += '<button type="button" class="btnAddArt btn btn-success">Voeg toe</button>';
			$(".content").html(table);
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});

	
}

function createNotitieTable() {
	var table = '';
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type : "getNotitie"
		},
		success: function(data){
			data = JSON.parse(data);
			table = '<table id="notitieTable" class="notitieTable table table-striped">';
			table += '<thead>';
			table += '<tr>';
			table += '<th>Id</th>';
			table += '<th>Notitie</th>';
			table += '<th>Verwijder</th>';
			table += '</tr>';
			table += '</thead>';
			table += '<tbody>';
			
			$.each(data, function(key, val ){
				table += '<tr id="notTRID_' + val.n_id + '">';
				table += '<th id="notID_' + val.n_id + '">' + val.n_id + '</th>';
				table += '<th id="notMSG_' + val.n_id + '" onclick="editNotitie(event)">' + val.n_msg + '</th>';
				table += '<th><button type="button" onclick="deleteNotitie(this)" id="btnNot_'+val.n_id+'" class="btn btn-danger"">Verwijder</button></th>';
				table += '</tr>';
			});
			table += '</tbody>';
			table += '</table>';
			table += '<button type="button" class="btnAddNot btn btn-success">Voeg toe</button>';

			$(".content").html(table);
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});
	
}

function deleteNotitie(elm){
	var id = $(elm)[0].id.replace(/^\D+/g, '');
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type: "deleteNotitie",
			id : id
		},
		success: function(){
			$('#notTRID_'+id).remove();
			msgBox('Notitie verwijderd!', 'info');
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});
}

function deleteArtikel(elm){
	var id = $(elm)[0].id.replace(/^\D+/g, '');
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type: "deleteArtikel",
			id : id
		},
		success: function(){
			$('#artTRID_'+id).remove();
			msgBox('Artikel verwijderd!', 'info');
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});
}

$(document).ready(function() {
	
	$("body").on("click", ".btnAddNot", function() {
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type: "addNotitie"
			},
			success: function(data){
				data = JSON.parse(data);
				if(!data[0].error){
					msgBox('Notitie toegevoegd!', 'success');
					var th = '<tr id="notTRID_'+data[0].n_id+'">';
					th += '<th id="notID_' + data[0].n_id + '">' + data[0].n_id + '</th>';
					th += '<th id="notMSG_' + data[0].n_id + '" onclick="editNotitie(event)">Bericht</th>';
					th += '<th><button type="button" onclick="deleteNotitie(this)" id="btnNot_'+data[0].n_id+'" class="btn btn-danger">Verwijder</button></th>';
					th += '</tr>';
					$('#notitieTable tr:last').after(th);
				} else errorMsg(e, 'error', 500);
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
		
	});
	
	$("body").on("click", ".btnAddArt", function() {
		
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type: "addArtikel"
			},
			success: function(data){
				data = JSON.parse(data);
				if(!data[0].error){
					msgBox('Artikel toegevoegd!', 'success');
					var th = '<tr id="artTRID_'+data[0].artikel_id+'">';
					th += '<th id="artikel_id_' + data[0].artikel_id + '">' + data[0].artikel_id + '</th>';
					th += '<th id="artikel_naam_' + data[0].artikel_id + '">Artikel naam</th>';
					th += '<th id="artikel_prijs_'+data[0].artikel_id+'">1</th>';
					th += '<th id="artikel_aantal_'+data[0].artikel_id+'">1</th>';
					th += '<th id="artikel_status_' + data[0].artikel_id + '"><select class="form-control" style="max-width:75px;">';
					th += '<option selected>Nee</option> <option>Ja</option>';
		            th += '</select></th>'
					th += '<th><button type="button" onclick="deleteArtikel(this)" id="btnArt_'+data[0].artikel_id+'" class="btn btn-danger">Verwijder</button></th>';
					th += '</tr>';
					$('#artikelTable tr:last').after(th);
				} else errorMsg(e, 'error', 500);
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
		
	});
});

function saveNotitie(id){
	var msg = $('#notMSG_'+id).html();
	
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type : "editNotitie",
			id : id,
			msg : msg
		},
		success: function(){
			msgBox('Notitie is opgeslagen!', 'success');
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});
	curActiveInput = null;
}

function saveArtikel(id){
	var naam = $('#artikel_naam_'+id).html();
	var prijs = $('#artikel_prijs_'+id).html();
	var aantal = $('#artikel_aantal_'+id).html();
	var status = $($($('#artikel_status_'+id))[0].firstChild).val();
	
	$.ajax({
		url:"WebService.do",
		type:"POST",
		data: {
			type : "editArtikel",
			artikel_id : id,
			artikel_naam : naam,
			artikel_prijs : prijs,
			artikel_aantal : aantal,
			artikel_status : status
		},
		success: function(){
			msgBox('Artikel is opgeslagen!', 'success');
		},
		error: function(e){
			errorMsg(e, 'error', 500);
		}
	});
	curActiveInput = null;
}


$(document).on('click', function(e) {
	//We want that if you click away from the input field/table in the library the input field returns to normal text and saves the value
	var noErrorNotitie = true;
	var noErrorArtikel = true;
	
	//log(val.id);
	$.each(e.originalEvent.path, function(key, val) {
		if (val.id == 'notitieTable') noErrorNotitie = false;
		if (val.id == 'artikelTable') noErrorArtikel = false;
	});

	if (curActiveInput != null && noErrorNotitie && getType() == 'notitie') {
		$(curActiveInput).replaceWith(function() {
			return '<th id="' + $(curActiveInput).attr('id') + '" onclick="editNotitie(event)">' + $(curActiveInput)[0].children[0].value + '</th>'
		});
		var id = $(curActiveInput).attr('id').replace(/^\D+/g, '');
		curActiveInput = null;
		saveNotitie(id);
	}
	
	if (curActiveInput != null && noErrorArtikel && getType() == 'article') {
		$(curActiveInput).replaceWith(function() {
			return '<th id="' + $(curActiveInput).attr('id') + '" onclick="editArtikel(event)">' + $(curActiveInput)[0].children[0].value + '</th>'
		});
		var id = $(curActiveInput).attr('id').replace(/^\D+/g, '');
		curActiveInput = null;
		saveArtikel(id);
	}
});

function editNotitie(ev, bool) {
	if (curActiveInput != ev.path[1]) {

		if (curActiveInput != null) {
			$(curActiveInput).replaceWith(function() {
				return '<th id="' + $(curActiveInput).attr('id') + '" onclick="editNotitie(event)">' + $(curActiveInput)[0].children[0].value + '</th>'
			});
			log('Opslaan ' + getType() + ' met id: ' + $(curActiveInput).attr('id').replace(/^\D+/g, ''));
			curActiveInput = null;
		}
		curActiveInput = ev.path[0];
		var t = $(ev.path[0]).text();
		if (bool) $(ev.path[0]).html($('<input type="number"/>', {'value' : t	}).val(t));
		else $(ev.path[0]).html($('<input />', {'value' : t }).val(t));
		$(ev.path[0]).attr('id', $(curActiveInput).attr('id'));
		curActiveInput = ev.path[0];

	}
}

function editArtikel(ev, bool) {
	if (curActiveInput != ev.path[1]) {

		if (curActiveInput != null) {
			$(curActiveInput).replaceWith(function() {
				if(bool) return '<th id="' + $(curActiveInput).attr('id') + '" onclick="editArtikel(event, true)">' + $(curActiveInput)[0].children[0].value + '</th>';
				else return '<th id="' + $(curActiveInput).attr('id') + '" onclick="editArtikel(event)">' + $(curActiveInput)[0].children[0].value + '</th>';
			});
			log('Opslaan ' + getType() + ' met id: ' + $(curActiveInput).attr('id').replace(/^\D+/g, ''));
			curActiveInput = null;
		}
		curActiveInput = ev.path[0];
		var t = $(ev.path[0]).text();
		if (bool) $(ev.path[0]).html($('<input type="number"/>', {'value' : t	}).val(t));
		else $(ev.path[0]).html($('<input />', {'value' : t }).val(t));
		$(ev.path[0]).attr('id', $(curActiveInput).attr('id'));
		curActiveInput = ev.path[0];

	}
}

//Create the Login view
var loginView = React.createClass({

	updateUsername : function(event) {
		if (username) username = event.target.value;
		else username = '';
	},

	updatePassword : function(event) {
		if (password) password = event.target.value;
		else password = '';
	},

	//Checking if user exist
	loginCheck : function() {
		
		$.post("WebService.do", {
			type : "getGebruiker",
			gb : username,
			ww : password
		}, function(data, status) {
			if (status == 'success' && !JSON.parse(data)[0].error){
				ReactDOM.render(
					React.createElement(loggedInSidebar),
					document.getElementById('react-app')
				);
			}
			else{
				$('.login-error-msg').html('<div class="alert alert-danger"><strong>Error</strong> '+JSON.parse(data)[0].response+'.</div>');
			}
		});
	},

	render : function() {

		return (
			React.createElement('div', {className : 'wrapper'},
				React.createElement('div', {className : 'form-signin'},
					React.createElement('h2', {className : "form-signin-heading"}, "Please login"),
					React.createElement('p', {className : "login-error-msg"}),
					React.createElement('input', {id : "username", "type" : "text", className : "form-control", "name" : "username", "placeholder" : "Username", onChange : this.updateUsername}),
					React.createElement('input', {id : "password", "type" : "password", "name" : "password", "placeholder" : "password", className : "form-control", onChange : this.updatePassword}),
					React.createElement('button', {className : "btn btn-lg btn-primary btn-block", "type" : "submit", onClick : this.loginCheck}, "Login")
				)
			)
		);
	}
});

function errorMsg(msg, typeMsg, statusCode) {
	log(msg);
	if (statusCode == 400) {
		msgBox('Verkeerde aanvraag', 'error', statusCode);
	} else if (statusCode == 403) {
		msgBox('Verwijderen niet gelukt', 'error', statusCode);
	} else if (statusCode == 412) {
		msgBox('Verkeerde values meegegegeven', 'error', statusCode);
	} else if (statusCode == 426) {
		msgBox('Verkeerde aanvraag', 'error', statusCode);
	} else if (statusCode == 500) {
		msgBox('Interne server error', 'error', statusCode);
	}
}

function msgBox(msg, typeMsg, title) {
	if (typeMsg == 'error') {
		icon = 'glyphicon glyphicon-warning-sign';
		if (!title)
			title = 'Error';
		typeMsg = 'danger';
	} else if (typeMsg == 'info') {
		icon = 'glyphicon glyphicon-warning-sign';
		if (!title)
			title = 'Info';
	} else if (typeMsg == 'success') {
		icon = 'glyphicon glyphicon-warning-sign';
		if (!title)
			title = 'success';
	} else {
		//succes, default
		icon = 'glyphicon glyphicon-warning-sign';
		if (!title)
			title = 'Succes';
	}

	$.notify({
		// options
		icon : icon,
		title : title,
		message : msg
	}, {
		// settings
		element : 'body',
		position : null,
		type : "info",
		allow_dismiss : true,
		newest_on_top : false,
		showProgressbar : false,
		placement : {
			from : "top",
			align : "right"
		},
		offset : 20,
		spacing : 10,
		z_index : 1031,
		delay : 5000, //default 5000, 5seconds
		timer : 1000,
		url_target : '_blank',
		mouse_over : null,
		animate : {
			enter : 'animated fadeInDown',
			exit : 'animated fadeOutUp'
		},
		onShow : null,
		onShown : null,
		onClose : null,
		onClosed : null,
		icon_type : 'class',
		template : '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-' + typeMsg + ' msgBox" role="alert">' + '<button type="button" aria-hidden="true" class="close" data-notify="dismiss"><strong>x</strong></button>' + '<span data-notify="icon"></span> ' + '<strong data-notify="title">{1}</strong> ' + '<span data-notify="message">{2}</span>' + '<div class="progress" data-notify="progressbar">' + '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' + '</div>' + '<a href="{3}" target="{4}" data-notify="url"></a>' + '</div>'
	});
}

//function is needed to get the GET parameters in the URL. This way users can be redirected to the page they want.
function getParameter(parm){
	var params = {};

	if (location.search) {
		var parts = location.search.substring(1).split('&');

		for (var i = 0; i < parts.length; i++) {
			var nv = parts[i].split('=');
			if (!nv[0]) continue;
			params[nv[0]] = nv[1] || true;
		}
	}
	return params[parm];
}

//Create the loggedin sidebar view
var loggedInSidebar = React.createClass({

	article: function(){
		
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type: "getGebruikerData"
			},
			success: function(data){
				data = JSON.parse(data);
				if(!data[0].error){
					setType('article');
					$('.content').html("");
					createArticleTable();
					$("body li").removeClass("active");
					$("li.li-article").addClass("active");
				} else location.reload();
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
	},

	homePage: function(){
		setType('home');
		$('.content').html("");
		
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type : "getVakantieInfo"
			},
			success: function(data){
				data = JSON.parse(data);
				log(data);
				if(!data[0].error){
					$('.content').append('<strong>Gebruikers id:</strong> ' + data[0].g_id +'<br>');
					$('.content').append('<strong>Gebruikers naam:</strong> ' + data[0].g_naam +'<br>');
					$('.content').append('<strong>Vakantie bestemming:</strong> ' + data[1].v_bestemming +'<br>');
					$('.content').append('<strong>Vakantie Kosten:</strong> ' + data[1].v_kosten +' euro<br>');
				}
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
		
		$("body li").removeClass("active");
		$("li.li-home").addClass("active");
	},

	notition: function(){
		
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type: "getGebruikerData"
			},
			success: function(data){
				data = JSON.parse(data);
				log(data);
				if(!data[0].error){
					setType('notitie');
					$('.content').html("");
					createNotitieTable();
					$("body li").removeClass("active");
					$("li.li-notition").addClass("active");
				} else location.reload();
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
	},

	//Logout function
	logout: function(){
		$.ajax({
			url:"WebService.do",
			type:"POST",
			data: {
				type: "logout"
			},
			success: function(){
				location.reload();
			},
			error: function(e){
				errorMsg(e, 'error', 500);
			}
		});
	},

	render: function() {
		return (
			React.createElement("div", {className: "main"},
				React.createElement("div", {className: "sidebar"},
					React.createElement('ul', {className: 'item-list'},
						React.createElement('li', {className: 'li-home', onClick: this.homePage},
							React.createElement('a', {className: 'home'}, "Vakantie planner")
						),
						React.createElement('li', {className: 'li-logout', onClick: this.logout},
							React.createElement('a', {className: 'logout'}, "Logout")
						),
						React.createElement('hr'),
						React.createElement('li', {className: 'li-article', onClick: this.article},
							React.createElement('a', {className: 'article'}, "Benodigheden")
						),
						React.createElement('li', {className: 'li-notition', onClick: this.notition},
							React.createElement('a', {className: 'notition'}, "Notities")
						)
					)
				),
				React.createElement("div", {className: "content", id: "content"},
					React.createElement("h1", {className : "h1_elm"}, "Welkom!")
				)
			)
		);
	}
});

$.ajax({
	url:"WebService.do",
	type:"POST",
	data: {
		type: "getGebruikerData"
	},
	success: function(data){
		data = JSON.parse(data);
		if(!data[0].error){			
			ReactDOM.render(
				React.createElement(loggedInSidebar),
				document.getElementById('react-app')
			);
			
		} else {
			ReactDOM.render(
				React.createElement(loginView),
				document.getElementById('react-app')
			);
		}
	},
	error: function(e){
		errorMsg(e, 'error', 500);
	}
});

