$(document).ready(function(){
	var dataStorage = {};
	//Variables
	var changes_made = false;
	var quantity = 0,
		cost = 0,
		price = 0,
		totaliva = 0,
		totalirpf = 0,
		currencySign = ["€","$"],
		currentCurrency = currencySign[0];
		
	//Creates array
	var items = {};
	
	//showInputLines();
	
	//Loads saved invoice data
	//loadInvoice();
	//Cuando clica en descargar
	$( "#descargar" ).click(function() {
		row_html = $("#invoice-table tbody").html();
		$(".html-hidden").val(row_html);
        return true; // return false to cancel form action
        
	});
	$("#guardar").click(function(e) {
		saveInvoice();
		return false;
	});
	
	$("#create_new").click(function(e) {
		if (!checkChanges() || confirm('There are unsaved changes, do you want to proceed?')) {
			resetForm();
			setInvoiceNum(getLastInvoiceNum()+1);
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
		tax = {
				name: 'IVA',
				value: '21'
		}
		addTax(tax);
		tax = {
				name: 'IRPF',
				value: '-21'
		}
		addTax(tax);
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
		
		console.log("Rows: " + numRows);
		
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
			$(this).find(".precio").text(currentCurrency+price);
			$(this).find(".precio-hidden").val(price);
			subtotal += price;
			
		});
		
var	total_taxes = 0;
		
		$('.added_tax').each(function(key, element) {
			var tax = roundToTwo(($('input.tax_value').eq(key).val()/100)*subtotal);
			total_taxes += tax;
			$('.tax_total-hidden').eq(key).val(tax);
			$('.tax_total').eq(key).html(
				currentCurrency + tax
			);
		});
		
		//totaliva = roundToTwo(subtotal*iva);
		//totalirpf = roundToTwo(subtotal*irpf);
		total = subtotal + total_taxes;
		
		$(".subtotal").text(currentCurrency + subtotal);
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
		
		if (!invoice.invoice_num) {
			//alert('Tienes de indicar un numero de factura');
			//Show alert inline
		showAlert("Tienes de inserir un numero de factura");
			
			return false;
		}
		invoice.client = {};
		invoice.client.name = $( "#cname" ).val();
		invoice.client.email = $( "#cemail" ).val();
		invoice.client.tel = $( "#ctel" ).val();
	    
		invoice.user = {};
		invoice.user.name = $( "#name" ).val();
		invoice.user.email = $( "#email" ).val();
		invoice.user.tel = $( "#tel" ).val();
		
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
		  if (!confirm('Quieres reemplazar la factura '+invoice.invoice_num+'?')) {
				return;
			}
	   }
	   dataStorage.invoices['invoice'+invoice.invoice_num] = invoice;
	   saveLocalStorage();
	   displayInvoices();
	   changes_made = false;
    }
    
	
    function loadInvoice (invoice_num) {
		
		if (!checkChanges() || confirm('No fue grabado, quieres continuar?')) {
			resetForm();
		} 
		if (typeof(dataStorage.invoices['invoice'+invoice_num]) === 'undefined') {
			//alert('No existe esa factura');
			showAlert("No existe esa factura");
			return false;
		}
		var invoice = dataStorage.invoices['invoice'+invoice_num];
    	//Info
    	$( "#name" ).val(invoice.user.name);
    	$( "#email" ).val(invoice.user.email);
    	$( "#tel" ).val(invoice.user.tel);
		
		$( "#cname" ).val(invoice.client.name);
    	$( "#cemail" ).val(invoice.client.email);
    	$( "#ctel" ).val(invoice.client.tel);
		
	    $( "#inv" ).val(invoice.invoice_num);
	    $("#invoice-notas").val(invoice.notas);
	    $('#invoice-title').val(invoice.title);
		
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
	
	//Controls invoice animations
	
	function showInputLines(){
		$("#page-container").find("input").css("border-color","#fff");
		
		$("#page-container").find("a.add-row").hide();
		$("#page-container").find("a.add_tax").hide();
				
		$("#page-container").on("mouseenter", function(e) {
				
				$(this).find("input").css("border-bottom","1px solid #ccc");
				$(this).find("a.add-row").show();
				$(this).find("a.add_tax").show();

		});
		$("#page-container").on("mouseleave", function(e) {
				
				$(this).find("input").css("border-color","#fff");
				$(this).find("a.add-row").hide();
				$(this).find("a.add_tax").hide();
		});
		
	}
	
    function deleteInvoice(invoice_num) {
		if (typeof(dataStorage.invoices['invoice'+invoice_num]) === 'undefined') {
			//alert('No existe esa factura');
			showAlert("No existe esa factura");
			return false;
		}
		if (confirm('Quieres borrar la factura '+invoice_num+"?")) {
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
	
	

   function createInvoiceMenu(invoices) {
		var html = '<ul>';
		var reverse = []
		for (var invoice in invoices) {
			reverse.push(invoice);
		}
		reverse.reverse();
		for (var invoice in reverse) {
			html += "<li data-invoice-num='"+invoices[reverse[invoice]].invoice_num+"'><span class='inv_title'>"+invoices[reverse[invoice]].invoice_num+"</span><br/><span class='inv_date'>"+invoices[reverse[invoice]].date+"</span><br/><span class='inv_delete delete-row'>Delete</span></li>";
		}
		html += "</ul>";
		return html;
		
   }
   
   function displayInvoices() {
		var invoiceshtml = createInvoiceMenu(dataStorage.invoices)
		$('#invoices').html(invoiceshtml);
   }
   
   function changeCurrency (curr) {
	   
   }
   
   loadLocalStorage();
   resetForm();
   displayInvoices();
   
});
