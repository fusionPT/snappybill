$(document).ready(function(){

	var dataStorage = {};
	
	//Variables
	var changes_made = false;
	
	var lang = '';
	var quantity = 0,
		cost = 0,
		price = 0,
		totaliva = 0,
		totalirpf = 0,
		currencySign = ["$","€","£"],
		currentCurrency = currencySign[1],
		transition = 100;
		
	//Creates array
	var items = {};
	//Hide at begining
	$("#invoice").hide();
	//Cuando clica en descargar
	$( "#descargar" ).click(function() {
		row_html = $("#invoice-table tbody").html();
		from_hidden = $("#from h3").text();
		to_hidden = $("#billto h3").text();
		
		description_hidden = $("th.description").text();
		qty_hidden = $("th.qty").text();
		cost_hidden = $("th.cost").text();
		price_hidden = $("th.price").text();
		total_hidden = $("td.total").text();
		notes_hidden = $('#pay h3').text();
		
		$(".html-hidden").val(row_html);
		$("input[name='hidden-from']").val(from_hidden);
		$("input[name='hidden-to']").val(to_hidden);
		
		$("input[name='hidden-description']").val(description_hidden);
		$("input[name='hidden-qty']").val(qty_hidden);
		$("input[name='hidden-cost']").val(cost_hidden);
		$("input[name='hidden-price']").val(price_hidden);
		
		$("input[name='hidden-notes']").val(notes_hidden);
		$("input[name='total-hidden']").val(total_hidden);
		
		
        return true; // return false to cancel form action
        
	});
	$("#guardar").click(function(e) {
		saveInvoice();
		return false;
	});
	
	$("#create_new").click(function(e) {
		if (!checkChanges() || confirm('There are unsaved changes, do you want to proceed?')) {
		$("#invoice").fadeOut( transition, function() {
			resetForm();
			setInvoiceNum(getLastInvoiceNum()+1);
			changeLanguage(lang);
		}).fadeIn(transition);
		} 
		return false;
	});
	
	
	function checkChanges() {
		if (changes_made) {
			return true;
		} else {
			return false;
		}
	}
	
	function setDefaultTaxes() {
		$("#invoice-table tr.added_tax").remove();
		
	}
	
	function resetForm() {
		 numRows = 1;
		 $('#invoice').find("input[type=text], textarea").val("");
		 $('#invoice-title').val('Factura');
		 $('#invoice-date').val($('#invoice-date').attr('placeholder'));
		 setDefaultTaxes();
		 $('#invoice-table .cantidad').val(0);
		 $('#invoice-table .coste').val(0);
		 $("#invoice-table tr.row:not(:first)").remove();
		 updateTotal();
		 
	}
	function getLastInvoiceNum() {
		var inv_num = 0;
		var keys = Object.keys(dataStorage.invoices);
		//console.log(keys);
	//	return 0;
		for (i in keys) {
			console.log(Math.round(keys[i].replace('invoice','')));
			if (Math.round(keys[i].replace('invoice','')) >= inv_num) {
				inv_num = Math.round(keys[i].replace('invoice',''));
			}
		}
		return inv_num;
	}
	function setInvoiceNum(num) {
		 $( "#inv" ).val(num);
	}
	
	$(document).on('click','#invoices ul li .inv_title',function(e) {
		loadInvoice($(this).parent().attr('data-invoice-num'));
	});
	$(document).on('click','#invoices ul li .inv_delete',function(e) {
		deleteInvoice($(this).parent().attr('data-invoice-num'));
	});
	
	
	//HTML row html template
	var numRows = 1;
	
	
	function addRow(item) {
		numRows++;
		
		if (typeof(item) === 'undefined') {
			item = {
				coste: '0',
				cantidad: '0',
				description: ''
			}
		}
		var template = "<tr class='row'>"
   							+ "<td class='article'>"
   							+ "<input class='description' type='text' name='description-value' size='40' placeholder='ej. Página web' value='{DESCRIPTION}'/>"
	   						+ "<input class='hidden-description' type='hidden' value=''/>"
   							+ "</td>"
   							+ "<td><input class='cantidad' type='text' name='cost' placeholder='Cant.' size='2' value='{CANTIDAD}'/></td>"
   							+ "<td><input class='coste' type='text' name='qty' placeholder='Coste' size='2' value='{COSTE}'/></td>"
   							+ "<td class='value'><span class='precio'>0</span><input class='precio-hidden' type='hidden' name='price' value='0'/></td>"  
   							+ "<td class='insert'><a class='delete-row' href='#'>Delete Row</a></td>"			
   						+ "</tr>";
						
		template = template.replace('{COSTE}',(item.coste).replace("'","\\'"));
		template = template.replace('{CANTIDAD}',(item.cantidad).replace("'","\\'"));
		template = template.replace('{DESCRIPTION}',(item.description).replace("'","\\'"));
		$("#invoice-table > tbody > tr.row:last").after(template);
		
		
		
	}
	
	function addTax(tax) {
		if (typeof(tax) === 'undefined') {
			tax = {
				name: 'Tax',
				value: '0'
			}
		}
		template = "<tr class='added_tax'>"
				   +'<td class="noborder">&nbsp;</td>'
				   +'<td class="tax"><a class="delete-tax">Delete</a></td>'
				   +'<td><span class="tax"><input class="tax_name" style="width:30px;" type="text" name="tax_names[]" placeholder="Tax" value="{TAX_NAME}" size="3"></span><input class="tax_value iva" type="text" name="tax_values[]" placeholder="0" value="{TAX_VALUE}" size="3"></td>'
				   +'<td class="tax_total">0</td>'
				   +'<input class="tax_total-hidden" type="hidden" name="tax_total[]" value="0">'
				   +'</tr>';
				   
		template = template.replace('{TAX_NAME}',(tax.name).replace("'","\\'"));
		template = template.replace('{TAX_VALUE}',(tax.value).replace("'","\\'"));
		$("#invoice-table tr.add_tax_tr").before(template);
	}
	
	
	//add tax row 
	$("#invoice-table").on("click",".delete-tax", function(e) {
		var tableRow = $(this).closest("tr");
		tableRow.remove();
		updateTotal();
		e.preventDefault();
	});
	
	//add tax row 
	$(".add_tax").on("click", function(e) {
		addTax();
		e.preventDefault();
	});
	
	//Add row
	$(".add-row").on("click", function(e) {
		
		addRow();
		e.preventDefault();
	});
	//Delete row
	$("#invoice-table").on("click",".delete-row", function(e) {
		var tableRow = $(this).closest("tr");
		if(numRows > 1){
			numRows--;
			tableRow.remove();
			updateTotal();
			console.log("Rows: " + numRows);
		} else {
			//alert("No puedes borrar la unica linea!");
			showAlert("No puedes borrar la unica linea");
		}
		e.preventDefault();
	});
		
	//Calculate
	$(document).on("change", "div input", function(e) {
		changes_made = true;
		
		if(e.target.className !== "description") {
			updateTotal();
		}			
	});
	$(document).on("keyup", "div input", function(e) {
		var inputs = $('html').find("input:text"); $.each(inputs,function(){ $(this).attr('value',$(this).val()); });
		changes_made = true;
		if(e.target.className !== "description") {
			updateTotal();
		}			
	});
	//Update total function
	function updateTotal() {
		var subtotal = 0;
		//Loop
		$("#invoice-table > tbody > tr.row").each(function(){
			quantity = $(this).find("input.cantidad").val();
			cost = $(this).find("input.coste").val();
			price = +cost * +quantity;
			$(this).find(".precio").text(price);
			$(this).find(".precio-hidden").val(price);
			subtotal += price;
			
		});
		
var	total_taxes = 0;
		
		$('.added_tax').each(function(key, element) {
			var tax = roundToTwo(($('input.tax_value').eq(key).val()/100)*subtotal);
			total_taxes += tax;
			$('.tax_total-hidden').eq(key).val(tax);
			$('.tax_total').eq(key).html(
				tax
			);
		});
		
		//totaliva = roundToTwo(subtotal*iva);
		//totalirpf = roundToTwo(subtotal*irpf);
		total = subtotal + total_taxes;
		
		$(".subtotal").text(subtotal);
		//$(".totaliva").text(totaliva);
		//$(".totalirpf").text(totalirpf);
		$(".total").text(currentCurrency + roundToTwo(total));
		//
		$(".subtotal-hidden").val(subtotal);
		//$(".totaliva-hidden").val(totaliva);
		//$(".totalirpf-hidden").val(totalirpf);
		$(".total-hidden").val(roundToTwo(total));
	}
	
	//Round function
	function roundToTwo(value) {
		
        return(Math.round(value * 100) / 100);
    }
    
    //Save document with localStorage
    function saveLocalStorage() {
		localStorage.setItem('Invoices_DS', JSON.stringify(dataStorage));
	}
	
	
    function saveInvoice () {
		var invoice = {};
		var items = [];
		invoice.title = $("#invoice-title").val();
		invoice.date = $('#invoice-date').val();
		invoice.invoice_num = $('#inv').val();
		
		invoice.th_number = $("input[name='hidden-number']").val();
		invoice.th_date = $("input[name='hidden-date']").val();
		
		//Valor del dropdown de idioma
		invoice.language = $("#language").val();
		invoice.invoice_total = $("td.total").text();
		invoice.invoice_currency = currentCurrency;
		
		invoice.th_description = $("th.description").text();
		invoice.th_qty = $("th.qty").text();
		invoice.th_cost = $("th.cost").text();
		invoice.th_price = $("th.price").text();
		invoice.btn_addrow = $(".add-row").text();
		invoice.btn_addtax = $(".add_tax").text();
		invoice.notes = $("#pay h3").text();
		
		if (!invoice.invoice_num) {
			//alert('Tienes de indicar un numero de factura');
			//Show alert inline
		showAlert("You have to add an invoice number");
			
			return false;
		}
		invoice.client = {};
		invoice.client.name = $( "#cname" ).val();
		invoice.client.email = $( "#cemail" ).val();
		invoice.client.tel = $( "#ctel" ).val();
		invoice.client.to = $("#billto h3").text();
		
		
	    
		invoice.user = {};
		invoice.user.name = $( "#name" ).val();
		invoice.user.email = $( "#email" ).val();
		invoice.user.tel = $( "#tel" ).val();
		invoice.user.from = $("#from h3").text();
		
	    invoice.taxes = [];
		$('.added_tax').each(function(key, element) {
			invoice.taxes.push({name: $('input.tax_name').eq(key).val(), value: $('input.tax_value').eq(key).val()});
		});
		invoice.notas = $("#invoice-notas").val();
	    $('.row').each(function(key, element) {
			items[key] = { 
				description: $('input.description').eq(key).val(),
				cantidad: $('.cantidad').eq(key).val(),
				coste: $('.coste').eq(key).val(),
				//precio: $('.precio').eq(key).text() //we dont need this
			};
		});
	   invoice.items = items;
	   
	   
	   if( Object.prototype.toString.call( dataStorage.invoices ) !== '[object Object]' ) {
			dataStorage.invoices = {};
	   }
	   
	   if (typeof(dataStorage.invoices['invoice'+invoice.invoice_num]) !== 'undefined') {
		  if (!confirm('Want to replace invoice '+invoice.invoice_num+'?')) {
				return;
			}
	   }
	   dataStorage.invoices['invoice'+invoice.invoice_num] = invoice;
	   saveLocalStorage();
	   displayInvoices();
	   changes_made = false;
    }
    
	
    function loadInvoice (invoice_num) {
		
		$("#invoice").fadeOut( transition, function() {
   			
   		
		
		if (!checkChanges() || confirm('Continue without saving?')) {
			resetForm();
	
		} else {
			return false;
			
		}
		if (typeof(dataStorage.invoices['invoice'+invoice_num]) === 'undefined') {
			//alert('No existe esa factura');
			showAlert("There no such invoice");
			return false;
		}
		var invoice = dataStorage.invoices['invoice'+invoice_num];
    	//Info
    	$( "#name" ).val(invoice.user.name);
    	$( "#email" ).val(invoice.user.email);
    	$( "#tel" ).val(invoice.user.tel);
    	$( "#from h3" ).text(invoice.user.from);
    	
    	$("input[name='hidden-number']").val(invoice.th_number);
		$("input[name='hidden-date']").val(invoice.th_date);
		
		$( "#cname" ).val(invoice.client.name);
    	$( "#cemail" ).val(invoice.client.email);
    	$( "#ctel" ).val(invoice.client.tel);
    	$( "#billto h3" ).text(invoice.client.to);
		
	    $( "#inv" ).val(invoice.invoice_num);
	    $("#invoice-notas").val(invoice.notas);
	    $('#invoice-title').val(invoice.title);
	    $("td.total").text(invoice.invoice_total);
	    
	    $("th.description").text(invoice.th_description);
		$("th.qty").text(invoice.th_qty);
		$("th.cost").text(invoice.th_cost);
		$("th.price").text(invoice.th_price);
		$(".add-row").text(invoice.btn_addrow);
		$(".add_tax").text(invoice.btn_addtax);
		$("#pay h3").text(invoice.notes);
	   
		//Language
		$('#language option[value="' + invoice.language + '"]').prop('selected',true);
		
		var keys = Object.keys(invoice.items);
		for (i in keys) {
			addRow(invoice.items[keys[i]]);
		}
		if (keys.length) {
			$("#invoice-table tr.row:first").remove();
		}
		$("#invoice-table tr.added_tax").remove(); //remove all added taxes
		if (invoice.taxes.length) {
			for (i in invoice.taxes) {
				addTax(invoice.taxes[i]);
			}
		} 
		
   		updateTotal();
   		currentCurrency = invoice.invoice_currency;
   		 $("td.total").text(invoice.invoice_total);
   		//alert(invoice.invoice_total);
   		}).fadeIn(transition);
    }
	
	//Alert function
	
	function showAlert(text){
	
			var response = $("<div class='alert'><div class='container'><p>" + text + "</p><a class='remove-alert'>Remove</a></div></div>").fadeIn("fast");
			$(".container").before(response);
			
			$(".remove-alert").on("click", function(e) {
				$(".alert").slideUp("fast", function(){
					
					$(this).remove();
					
				});
		
			});
	
	}
	
	

	
    function deleteInvoice(invoice_num) {
		if (typeof(dataStorage.invoices['invoice'+invoice_num]) === 'undefined') {
			//alert('No existe esa factura');
			showAlert("That invoice doesn't exist.");
			
			return false;
		}
		if (confirm('Do you want to delete '+invoice_num+"?")) {
			delete dataStorage.invoices['invoice'+invoice_num];
			saveLocalStorage();
			displayInvoices();
			
		}
	}
	
	function loadLocalStorage() {
		dataStorage = JSON.parse(localStorage.getItem('Invoices_DS'));
		if( Object.prototype.toString.call( dataStorage ) !== '[object Object]' ) {
			dataStorage = {};
			dataStorage.invoices = {};
			saveLocalStorage();
		} 
	}
	
	//////////// Invoices sidebar
var reverse;
   function createInvoiceMenu(invoices) {
		var html = '<ul>';
			reverse = [];
		for (var invoice in invoices) {
			reverse.push(invoice);
		}
		reverse.reverse();
		for (var invoice in reverse) {
			console.log(reverse[invoice]);
			html += "<li data-invoice-num='"+invoices[reverse[invoice]].invoice_num+"'><span class='inv_title'>"+invoices[reverse[invoice]].invoice_num+"</span><span class='inv_total'>"+invoices[reverse[invoice]].invoice_total+"</span><br/><span class='inv_date'>"+invoices[reverse[invoice]].date+"</span><br/><span class='inv_delete delete-row'>Delete</span></li>";
		}
		html += "</ul>";
		return html;
		
		
   }
   
   //Display Invoices
   
   function displayInvoices() {
		var invoiceshtml = createInvoiceMenu(dataStorage.invoices);
		
		if(reverse.length >= 1 ){
			$('#invoices').hide().html(invoiceshtml).fadeIn('fast');
		} else {
			$('#invoices').hide().html("<p class='blank'>There are no saved invoices. Create one now!</p>").fadeIn('fast');
		}
   }
   
   //
   //Handling the dropdown
   //
   
   function changeLanguage(lang) {
      
	   $.ajax({
		type: "GET",
		url: lang,
		dataType: "xml",
		success: function(xml) {
			
			$(xml).find('info').each(function(){
				
				var invoice_title = $(this).find('invoice-title').text();
				var invoice_number = $(this).find('number').text();
				var from_title = $(this).find('from-title').text();
				var to_title = $(this).find('to-title').text();
				var from = $(this).find('from').text();
				var to = $(this).find('to').text();
				var description_title = $(this).find('description').text();
				var tag_title = $(this).find('tag').text();
				var number_title = $(this).find('number-title').text();
				var date_title = $(this).find('date-title').text();
				
				
				$("input[name='invoice-title']").val(invoice_title);
				$("input[name='invoice-number']").attr("placeholder",invoice_number);
				$("#from h3").text(from_title);
				$("#billto h3").text(to_title);
				$("input[name='name']").attr("placeholder",from);
				$("input[name='cname']").attr("placeholder",to);
				$(".top h2").text(tag_title);
				$("input[name='hidden-number']").val(number_title);
				$("input[name='hidden-date']").val(date_title);
				
			});
			
			$(xml).find('items').each(function(){
				
				var description_title = $(this).find('description').text();
				var qty_title = $(this).find('qty').text();
				var cost_title = $(this).find('cost').text();
				var price_title = $(this).find('price').text();
				var row_content = $(this).find('row').text();
				var add_row_title = $(this).find('add').text();
				var add_tax_title = $(this).find('addtax').text();
				var notes_title = $(this).find('notes').text();
				
				$("#invoice-table th.description").text(description_title);
				$("#invoice-table th.qty").text(qty_title);
				$("#invoice-table th.cost").text(cost_title);
				$("#invoice-table th.price").text(price_title);
				$("input.description").attr("placeholder",row_content);
				$(".add-row").text(add_row_title);
				$(".add_tax").text(add_tax_title);
				$("#pay h3").text(notes_title);
			});
			
			$(xml).find('sidebar').each(function(){
				
				var btn_new = $(this).find('new').text();
				var btn_download = $(this).find('download').text();
				var btn_save = $(this).find('save').text();
				$("#create_new").val(btn_new);
				$("#descargar").val(btn_download);
				$("#guardar").val(btn_save);
			});

		}
	});
	
   }
   var userLang = navigator.language || navigator.userLanguage; 
   
	//$('#language option[value="' + userLang + '"]').prop('selected',true);
	
   lang = $("#language").val();
  
   function selectLang () {
	   //select

   		lang = $("#language").val() + ".xml";
   		
   		
   		$("#invoice").fadeOut( transition, function() {
   				changeCurrency();
				changeLanguage(lang);
				
				
   		}).delay(500).fadeIn(transition);
		

   }
   $('#language option[value="' + lang + '"]').prop('selected',true);
   $( "select" ).change( selectLang );
   


   function changeCurrency () {
   		
			
			if(lang=="english.xml") {
				currentCurrency=currencySign[0];
			}
			if(lang=="englishUK.xml") {
				currentCurrency=currencySign[2];
			}
			if(lang=="espanol.xml") {
				currentCurrency=currencySign[1];
			}
			if(lang=="portugues.xml") {
				currentCurrency=currencySign[1];
			}
			updateTotal();
			
			
   }

   selectLang();
   loadLocalStorage();
   resetForm();
   displayInvoices();
   changeLanguage(lang);
   changeCurrency();
});
