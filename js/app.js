$(document).ready(function(){
	//Cuando clica en descargar
	
	$( "#descargar" ).click(function() {
		
		
		
		row_html = $("tbody").html();
        
		$(".html-hidden").val(row_html);
		
		//console.log(row_html);
		
        return true; // return false to cancel form action
	});
	
	//HTML row html template
	var numRows = 1;
	var template = $("#invoice-table > tbody > tr:first").clone();
		
	//Add row
	
	$(".add-row").on("click", function(e) {
		numRows++;
		var newRow = template.clone();
		$("#invoice-table > tbody > tr.row:last").after(newRow);
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
			irpf = Number($(".irpf").val()) / 100,
			totaliva,
			totalirpf;
			
		//Loop
		  $("#invoice-table > tbody > tr.row").each(function(){
          var quantity = $(this).find("input.cantidad").val(),
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
    
    //Logo preview
    
    /*var thumb = $('img#thumb');        

	  new AjaxUpload('imageUpload', {
	    action: $('form#newHotnessForm').attr('action'),
	    name: 'image',
	    onSubmit: function(file, extension) {
	      $('div.preview').addClass('loading');
	    },
	    onComplete: function(file, response) {
	      thumb.load(function(){
	        $('div.preview').removeClass('loading');
	        thumb.unbind();
	      });
	      thumb.attr('src', response);
	    }
	  });*/

});
