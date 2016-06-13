
$(document).ready(function() {
	
	var jsonDataAll = [];
	var jsonDataLS = [];
	var jsonDataLP = [];
	$.getJSON( 'CountryResource.do?type=all', function( data ) {jsonDataAll = data;});
	$.getJSON( 'CountryResource.do?type=largest_surfaces', function( data ) {jsonDataLS = data;});
	$.getJSON( 'CountryResource.do?type=largest_population', function( data ) {jsonDataLP = data;});
	
	console.log('aaaa');
	$("#showForm").on( "click", function() {
		console.log('countryForm toggle');
		$( "#countryForm" ).toggle();
	});
	$("#showList").on( "click", function() {
		console.log('countryList toggle');
		$( "#countryList" ).toggle();
	});
	
	$("#all").on( "click", function() {
		console.log('inladen tabel');
		var table = '<table class="countriesall table table-striped">';
		table += '<thead>';
		table += '<tr>';
		table += '<th>Land code</th>';
		table += '<th>Naam</th>';
		table += '<th>Continent</th>';
		table += '</tr>';
		table += '</thead>';
		table += '<tbody>';
		
		
		$.each( jsonDataAll, function( key, val ) {
			table += '<tr>';
			table += '<th>'+val.code+'</th>';
			table += '<th>'+val.name+'</th>';
			table += '<th>'+val.continent+'</th>';
			table += '</tr>';
		});
		
		table += '</tbody>';
		table += '</table>';
		$('#countriesall').toggle();
		$('#countriesall').html(table);
	});
	
	$("#surfaces").on( "click", function() {
		console.log('inladen tabel');
		var table = '<table class="countriessur table table-striped">';
		table += '<thead>';
		table += '<tr>';
		table += '<th>Land code</th>';
		table += '<th>Naam</th>';
		table += '<th>Continent</th>';
		table += '</tr>';
		table += '</thead>';
		table += '<tbody>';
		
		
		$.each( jsonDataLS, function( key, val ) {
			table += '<tr>';
			table += '<th>'+val.code+'</th>';
			table += '<th>'+val.name+'</th>';
			table += '<th>'+val.continent+'</th>';
			table += '</tr>';
		});
		
		table += '</tbody>';
		table += '</table>';
		$('#countriessur').toggle();
		$('#countriessur').html(table);
	});
	
	$("#populations").on( "click", function() {
		console.log('inladen tabel');
		var table = '<table class="countriespop table table-striped">';
		table += '<thead>';
		table += '<tr>';
		table += '<th>Land code</th>';
		table += '<th>Naam</th>';
		table += '<th>Continent</th>';
		table += '</tr>';
		table += '</thead>';
		table += '<tbody>';
		
		
		$.each( jsonDataLP, function( key, val ) {
			table += '<tr>';
			table += '<th>'+val.code+'</th>';
			table += '<th>'+val.name+'</th>';
			table += '<th>'+val.continent+'</th>';
			table += '</tr>';
		});
		
		table += '</tbody>';
		table += '</table>';
		$('#countriespop').toggle();
		$('#countriespop').html(table);
	});
	
	
	
	
});