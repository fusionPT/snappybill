<?php 
	/* Company details */
	$factura = $_POST['invoice'];
	$invoice_title = $_POST['invoice-title'];
	$fecha = $_POST['date'];

	$imagen = $_POST['image'];
	
	$from_title = $_POST['hidden-from'];
	
	$nombre = $_POST['name'];
	$email = $_POST['email'];
	$tel = $_POST['tel'];
	$dir = $_POST['dir'];
	
	/* Client data */
	
	$cnombre = $_POST['cname'];
	$cemail = $_POST['cemail'];
	$ctel = $_POST['ctel'];
	$cdir = $_POST['cdir'];
	
	/* Invoice data */
	/*This is processed using $_POST['html'] */
	//$description = $_POST['description-value'];
	//$coste = $_POST['cost'];
	//$cantidad = $_POST['qty'];
	//$precio = $_POST['price'];
	
	$userfrom = $_POST['userfrom'];
	
	$subtotal = $_POST['subtotal'];
	$impuesto1 = $_POST['totaliva'];
	$impuesto2 = $_POST['totalirpf'];
	$total = $_POST['total'];
	
	$notas = $_POST['notas'];
	
	$htmls = $_POST['html'];
	$final_html = str_replace('\"', '"', $htmls);
	/* Call functions.php */
	
	require("functions.php");
	
	/* HTML Template */
	$taxes = '';
	foreach($_POST['tax_names'] as $key => $taxname) {
	
	$taxes .=  '<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax">'.$taxname.'</td>
   						  <td><span class="tax"></span><input class="iva" type="text" name="tax1" placeholder="IVA" value="'.$_POST['tax_values'][$key].'" size="2"/></td>
   							<td>'.$_POST['tax_total'][$key].'</td>
   						</tr>';
	
	}
	renderPDF('
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
		
		<html lang=es>
			
		<head>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<link rel="stylesheet" href="css/style-pdf.css">



		</head>
		
		<div id="main">
    
		<div id="header">
		
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="inv-title" width="50%">'.$invoice_title.'</td>
				<td class="inv-number"><span>Numero: </span>'.$factura.'<br />
				<span>Fecha: </span>'.$fecha.'
				</td>
			</tr>
			
		</table>    
	</div>
    	
    	<div id="adress">
    	
    		<table id="adress-details" width="100%" border="0" cellspacing="0" cellpadding="0">
			  <tr>
			    <td class="adress-title" width="50%">'.$from_title.'</td>
			    <td class="adress-title" width="50%">Factura para:</td>
			  </tr>
			  <tr>
			    <td>'.$nombre.'</td>
			    <td>'.$cnombre.'</td>
			  </tr>
			  <tr>
			    <td>'.$email.'</td>
			    <td>'.$cemail.'</td>
			  </tr>
			  <tr>
			    <td>'.$tel.'</td>
			    <td>'.$ctel.'</td>
			  </tr>
			</table>
		
   		</div>	
   		
   		<div id="details">
   			
   				<table id="invoice-table">
   					
   					<thead>
   						<tr>
   							
   							<th class="description">Descripci&oacute;n</th>
   							<th>Cant.</th>
   							<th>Coste</th>
   							<th>Precio</th>
   							
   						</tr>
   					</thead>
   					
   					<tbody><a class="insert">'.$final_html.'</a></tbody>
   					
   					<tfoot>
   						
   						<tr>
   							<td height="40px"></td>
   							<td colspan="2" class="bold">Subtotal</td>
   							<td class="subtotal">'.$subtotal.'</td>
   						</tr>
   						'.$taxes.'
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td colspan="2" class="noborder"><strong>TOTAL</strong></td>
   							<td class="total">'.$total.'</td>
   						</tr>
   					</tfoot>
   					
   				</table>

   		
   		</div>
   		
   		<div id="pay">
   			<h3>Notas</h3>
   			<p>'.$notas.'</p>
   		</div>

    	</div>
		</html>
	');
	

?>

