$(document).ready(function(){

	//Variables
	var quantity = 0,
		cost = 0,
		price = 0,
		totaliva = 0,
		totalirpf = 0;
	
	//Creates array
	
	var items = {};
	
	//Loads saved invoice data
	loadInvoice();
	
	//Cuando clica en descargar
	$( "#descargar" ).click(function() {

		//row_html = $("tbody").html();
		//$(".html-hidden").val(row_html);
       // return true; // return false to cancel form action
        
	});
	
		$("#guardar").click(function(e) {
			
			saveInvoice();
			
			return false;
        
	});
	
	//HTML row html template
	var numRows = 1;
	var template = "<tr class='row'>"
   							+ "<td class='article'>"
   							+ "<input class='description' type='text' name='description-value' size='40' placeholder='ej. Página web' value=''/>"
	   						+ "<input class='hidden-description' type='hidden' value=''/>"
   							+ "</td>"
   							+ "<td><input class='cantidad' type='text' name='cost' placeholder='Cant.' size='2' value='0'/></td>"
   							+ "<td><input class='coste' type='text' name='qty' placeholder='Coste' size='2' value='0'/></td>"
   							+ "<td class='value'><span class='precio'>0</span><input class='precio-hidden' type='hidden' name='price' value='0'/></td>"  
   							+ "<td class='insert'><a class='delete-row' href='#'>Delete Row</a></td>"			
   						+ "</tr>";
		
	//Add row
	
	$(".add-row").on("click", function(e) {
		numRows++;
		
		$("#invoice-table > tbody > tr.row:last").after(template);
		e.preventDefault();
		
		
	});
	
	//Delete row
	
	$("#invoice-table").on("click",".delete-row", function(e) {
		
		var tableRow = $(this).closest("tr");
		
		if(numRows > 1){
			numRows--;
			tableRow.remove();
			updateTotal();
			
		} else {
			alert("You can't delete the only row!");
		}
		e.preventDefault();
		//CONSOLE LOG
		
		
	});
		
	//Calculate
	
	$("#invoice-table").on("input", function(e) {
		
		
			
		$('div input').each(function(){
		    $(this).keyup(function(){
		        $(this).attr('value',$(this).val());
		    });
		});
		if(e.target.className !== "description") {
			updateTotal();
		}
					
	});
	
	//Update total function
	
	function updateTotal() {
		var subtotal = 0,
			iva = Number($(".iva").val()) / 100,
			irpf = Number($(".irpf").val()) / 100;
			
			
			
		//Loop
		
		  $("#invoice-table > tbody > tr.row").each(function(){
          quantity = $(this).find("input.cantidad").val();
          cost = $(this).find("input.coste").val();
          price = +cost * +quantity;
          $(this).find(".precio").text(price);
          $(this).find(".precio-hidden").val(price);
          subtotal += price;
        });
		
		totaliva = roundToTwo(subtotal*iva);
		totalirpf = roundToTwo(subtotal*irpf);
		total = subtotal + totaliva + totalirpf;
		
		
		
		$(".subtotal").text(subtotal);
		$(".totaliva").text(totaliva);
		$(".totalirpf").text(totalirpf);
		$(".total").text(roundToTwo(total));
		//
		$(".subtotal-hidden").val(subtotal);
		$(".totaliva-hidden").val(totaliva);
		$(".totalirpf-hidden").val(totalirpf);
		$(".total-hidden").val(roundToTwo(total));
		
		

	}
	
	//Round function
	function roundToTwo(value) {
        return(Math.round(value * 100) / 100);
    }
    
    //Save document with localStorage
    
    function saveInvoice () {
    	//Info
    	localStorage.name = $( "#name" ).val();
		localStorage.email = $( "#email" ).val();
		localStorage.tel = $( "#tel" ).val();
    	localStorage.invoice_num = $('#inv').val();
    	
	    //Rows
	    localStorage.description = $("input.description").val();
	    localStorage.quantity = quantity;
	    localStorage.cost = cost;
	    localStorage.price = price;
	    
	    //Taxes
	    localStorage.totaliva = totaliva;
	    localStorage.totalirpf = totalirpf;
	    
	    //Totals
    	localStorage.subtotal = $(".subtotal").text();
	    localStorage.total = $(".total").text();
	    
	    addToArray();
	    
    }
    
    function loadInvoice () {
    	//Info
    	$( "#name" ).val(localStorage.name);
    	$( "#email" ).val(localStorage.email);
    	$( "#tel" ).val(localStorage.tel);
	    $( "#inv" ).val(localStorage.invoice_num);
	    
	    //Rows
	    $("input.description").val(localStorage.description);
	    $(".cantidad").val(localStorage.quantity);
	    $(".coste").val(localStorage.cost);
	    $(".precio").text(localStorage.price);
	    
	    //Taxes
	    $(".totaliva").text(localStorage.totaliva);
	    $(".totalirpf").text(localStorage.totalirpf);
	    
	    //Totals
	    $(".subtotal").text(localStorage.subtotal);
	    $(".total").text(localStorage.total);
    }
    
    //Saves rows to an Array
    function addToArray() {
	     $('.row').each(function(key, element) {
	     
	    items[key] = { 
	    
	    description: $('input.description').eq(key).val(),
	    cantidad: $('.cantidad').eq(key).val(),
	    coste: $('.coste').eq(key).val(),
	    precio: $('.precio').eq(key).text()
	    };
	    console.log("How many rows: " + key)
	  });
	   
	   for (var item in items) {
		   //console.log(items[item]);
		   
		   localStorage.setItem('items', JSON.stringify(items[item]));
		   console.log(JSON.parse(localStorage.getItem('items')));
	  }
   }   
   
});

var invoiceItems = "invoices";


$(document).ready(function(){

	//$("#descargar").on("click",function(){
	//download invoice
	$("#invoice").submit(function(){
		
		if($("#existing-invoice").val()==0){
			var invoice = {};
			
			invoice.invoiceTitle = $("#invoice-title").val();
			invoice.invoiceNumber = $("#invoice-number").val();
			invoice.invoiceDate = $("#invoice-date").val();
			
			invoice.invoiceName = $("#invoice-name").val();
			invoice.invoiceEmail = $("#invoice-email").val();
			invoice.invoiceTel = $("#invoice-tel").val();
			
			
			invoice.billName = $("#cname").val();
			invoice.billEmail = $("#cemail").val();
			invoice.billTel = $("#ctel").val();
			
			//Get Item Info
			
			var items = new Array();
			var itemDescription;
			var itemQty;
			var itemUnitPrice;
			var itemTotal;
			$('#invoice-table tbody tr').each(function (i, row) {
				var eachRow = {};
				var itemDescription = $(row).find('input[name="description-value"]').val();
				var itemQty = $(row).find('input[name="qty"]').val();
				var itemUnitPrice = $(row).find('input[name="cost"]').val();
				var itemTotal = itemQty * itemUnitPrice;
				//Item description
				eachRow.itemDescription = itemDescription;
				eachRow.itemQty = itemQty;
				eachRow.itemUnitPrice = itemUnitPrice;
				eachRow.itemTotal = itemTotal;
				//Item description
				items.push(eachRow);
			});
			
			invoice.items = items;
			invoice.subTotal = $("#subtotal-hidden").val();
			invoice.VAT = $("#iva").val();
			invoice.IncomeTax = $("#irpf").val();
			invoice.totalAmount = $("#total-hidden").val();
			
			invoice.notes = $("#notas").val();
			
			var jsonStringInvoice = JSON.stringify(invoice);
			console.log(jsonStringInvoice);
			
			//store_to_localstorage(jsonStringInvoice);
			
			$("#form-all-json-data").val(jsonStringInvoice);
		}
		
	});
	
	//Store invoice to local storage
	$("#guardar").on("click",function(){
		if($("#existing-invoice").val() == 0){
			var invoice = {};
			
			invoice.invoiceTitle = $("#invoice-title").val();
			invoice.invoiceNumber = $("#invoice-number").val();
			invoice.invoiceDate = $("#invoice-date").val();
			
			invoice.invoiceName = $("#invoice-name").val();
			invoice.invoiceEmail = $("#invoice-email").val();
			invoice.invoiceTel = $("#invoice-tel").val();
			
			
			invoice.billName = $("#cname").val();
			invoice.billEmail = $("#cemail").val();
			invoice.billTel = $("#ctel").val();
			
			//Get Item Info
			
			var items = new Array();
			var itemDescription;
			var itemQty;
			var itemUnitPrice;
			var itemTotal;
			$('#invoice-table tbody tr').each(function (i, row) {
				var eachRow = {};
				var itemDescription = $(row).find('input[name="description-value"]').val();
				var itemQty = $(row).find('input[name="qty"]').val();
				var itemUnitPrice = $(row).find('input[name="cost"]').val();
				var itemTotal = itemQty * itemUnitPrice;
				//Item description
				eachRow.itemDescription = itemDescription;
				eachRow.itemQty = itemQty;
				eachRow.itemUnitPrice = itemUnitPrice;
				eachRow.itemTotal = itemTotal;
				//Item description
				items.push(eachRow);
			});
			
			invoice.items = items;
			invoice.subTotal = $("#subtotal-hidden").val();
			invoice.VAT = $("#iva").val();
			invoice.IncomeTax = $("#irpf").val();
			invoice.totalAmount = $("#total-hidden").val();
			
			invoice.notes = $("#notas").val();
			
			var jsonStringInvoice = JSON.stringify(invoice);
			console.log(jsonStringInvoice);
			
			store_to_localstorage(jsonStringInvoice);
			
			load_recent_invoices();
			//$("#form-all-json-data").val(jsonStringInvoice);
		}
		else{
			alert("Existing invoice can't be saved");
		}
		
	});

});

function store_to_localstorage(newInvoiceItems)
{
	var storedInvoiceItems = localStorage.getItem(invoiceItems);
	var storedInvoiceItems = JSON.parse(storedInvoiceItems);
	var jsonStringInvoices = '';
	
	if(storedInvoiceItems != null && storedInvoiceItems != '')
	{
		console.log("old ...");
		console.log(storedInvoiceItems.length);
		storedInvoiceItems.push(newInvoiceItems);
		jsonStringInvoices = JSON.stringify(storedInvoiceItems);
		localStorage.setItem(invoiceItems, jsonStringInvoices);
	}
	else
	{
		
		var newInvoiceList =  new Array(newInvoiceItems);
		jsonStringInvoices = JSON.stringify(newInvoiceList);
		localStorage.setItem(invoiceItems, jsonStringInvoices);
	}
	
}

function load_recent_invoices(){
	$(document).ready(function(){
		//recent-invoices-list
		
		var storedInvoiceItems = localStorage.getItem(invoiceItems);
		var storedInvoiceItems = JSON.parse(storedInvoiceItems);
		//console.log(JSON.parse(storedInvoiceItems[0]));
		//return false;
		
		
		
		var recentInvoicesListHtml = '';
		recentInvoicesListHtml += '<ul>';
		var currentInvoice;
		
		/*$.each(storedInvoiceItems, function( key, value ) {
			var currentInvoice = JSON.parse(value);
			recentInvoicesListHtml += '<li>'+currentInvoice.invoiceTitle+'</li>';
		});*/
		
		for(var i=storedInvoiceItems.length-1; i>=0; i--){
			var currentInvoice = JSON.parse(storedInvoiceItems[i]);
			recentInvoicesListHtml += '<li onclick="load_invoice_item('+i+')" >'+currentInvoice.invoiceTitle+'</li>';
		}
		
		recentInvoicesListHtml += '</ul>';
		 
		$("#recent-invoices-list").html(recentInvoicesListHtml);
		
		
	});
} 

function load_invoice_item(index){
	
	var storedInvoiceItems = localStorage.getItem(invoiceItems);
	var storedInvoiceItems = JSON.parse(storedInvoiceItems);
	var currentInvoice = JSON.parse(storedInvoiceItems[index]);
	console.log(currentInvoice.invoiceTitle);
	
	 $("#invoice-title").val(currentInvoice.invoiceTitle);
	 $("#invoice-number").val(currentInvoice.invoiceNumber);
	 $("#invoice-date").val(currentInvoice.invoiceDate);
	
	 $("#invoice-name").val(currentInvoice.invoiceName);
	 $("#invoice-email").val(currentInvoice.invoiceEmail);
	 $("#invoice-tel").val(currentInvoice.invoiceTel);
	
	
	 $("#cname").val(currentInvoice.billName);
	 $("#cemail").val(currentInvoice.billEmail);
	 $("#ctel").val(currentInvoice.billTel);
	 
	  
	  $("#total-hidden").val(currentInvoice.totalAmount);
	  $("#table-column-total").html(currentInvoice.totalAmount);
	
	  $("#notas").val(currentInvoice.notes);
	  
	  $("#form-all-json-data").val(storedInvoiceItems[index]);
	  
	  $("#existing-invoice").val(1);
	
}

//Done By Mamun
$(document).ready(function(){
	load_recent_invoices();
	
});

