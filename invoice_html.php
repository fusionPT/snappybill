<?php 
	
	
	
	/* Company details */

	$factura = $_POST['invoice'];
	$fecha = $_POST['date'];

	$imagen = $_POST['image'];
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
	
	$description = $_POST['description-value'];
	$coste = $_POST['cost'];
	$cantidad = $_POST['qty'];
	$precio = $_POST['price'];
	
	
	$subtotal = $_POST['subtotal'];
	$impuesto1 = $_POST['totaliva'];
	$impuesto2 = $_POST['totalirpf'];
	$total = $_POST['total'];
	
	$notas = $_POST['notas'];
	
	$htmls = $_POST['html'];
	/* Call functions.php */
	
	require("functions.php");
	
	/* HTML Template */
	
	
	renderPDF('
		
		<html>
			
		<head>
		
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<style type="text/css">


body {
  font-family: "Opensans", serif;
  font-weight: normal;
  color: #404040;
  height: 100%;
  font-size: 14px; 
  }

h1 {
  color: #171a1c;
  
  width: 500px; }
  h1 span {
    color: #171a1c;
    display: block; }

h3 {
  font-weight: normal;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #171a1c; }

a {
	display:none;
  text-decoration: none; }
  a:hover {
    text-decoration: underline; }

/* TABLE */

table {
  position: relative;
  border-collapse: collapse;
  width: 100%; }
  
  table thead {
    border-bottom: 1px solid #959595; }
    
    table thead th {
      text-align: right;
      width: 13%;
      font-family: "Open Sans_semi", sans-serif;
      
      padding-right: 20px;
      padding-bottom: 18px; }
      
      table thead th:last-child {
        border-right: none; }
        
      table thead th.description {
        width: 60%;
        text-align: left; }
        
  table td {
    text-align: right;
    padding-right: 20px;
    vertical-align: middle; }
    
    table td.add {
      text-align: left; }
      
    table td span {
      display: inline-block;
      padding-bottom: 12px; }
  table input {
  	display:inline-block;
    text-align: right;
    
    width: 98%;
    padding-top: 0 !important;
    width: 80%; }
    
    table input.description {
      display:inline-block;
      text-align: left;
     
      width: 98%; }

/* RULES */
.bold {
  font-weight: 600; }

.iva, .irpf {
  width: 40% !important; }

.tax {
  color: #ccc;
  padding-right: 10px; 
  
  }

#container {
  width: 1000px;
  margin: 50px auto; }



#page-container {
  width: 800px;
  margin-bottom: 10px;}
 


#main {
  padding: 40px; }

header {
  overflow: hidden; }
  header img {
    }

header fieldset {
 
  width: 300px; }
  header fieldset input#inv {
    font-size: 18px; }

fieldset#invoice-num {
  text-align: right; 
 
  }
  fieldset#invoice-num input {
    text-align: right;
    width: 200px;
    padding-right: 0; 
    
    }
  fieldset#invoice-num input#inv {
    font-size: 21px; }

h2 {
  
  text-align: left;
  font-size: 32px;
  font-weight: 400; }

#adress {
  overflow: hidden;
  margin: 25px 0 100px;
  
   }

fieldset input {
  font-family: "Open Sans", sans-serif; }
  
fieldset#from {
  width: 340px;
 
  text-align: left !important;
  margin-right: 40px; 
  
  }
fieldset#billto {
  width: 340px;
  
  text-align: left !important;
 }

input[type="text"] {
  display: block;
  font-size: 14px;
  color: #666;
  
  appearance: none;
  -webkit-appearance: none;
  border: none;
 
  margin: 0px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 90% !important; }



textarea {
  padding: 20px;
  width: 93%;
  resize: vertical;
  border: none;
  
  font-family: "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 14px;
 }

#pay {
  padding-bottom: 10px; }

#details {
  position: relative; }


.insert {
	display: none;
   }
  
.delete-row {
	display: none;
	text-indent: -9999px;
}

.total {
  font-size: 24px;
  font-weight: bold; }

#header {
	padding-bottom: 20px;
	
}
#header td, #adress-details td {
	
	text-align: left;
	vertical-align:text-top;
	
}
#header .inv-title{
	font-size: 32px;
	vertical-align:text-top;
}

#header .inv-number {
	text-align: right;
	
}
#header .inv-number span {
	color: #ccc;
	display: inline;
	line-height: 14px;
	font-family: "Open Sans_semi", sans-serif;
}
.row td {
	border-bottom: 1px solid #ccc;
}

</style>
		</head>
		
		<div id="main">
    
		<div id="header">
		
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td class="inv-title" width="50%">Factura</td>
				<td class="inv-number"><span>Numero: </span>'.$factura.'<br />
				<span>Fecha: </span>'.$fecha.'
				</td>
			</tr>
			
		</table>    
	</div>
    	
    	<div id="adress">
    	
    		<table id="adress-details" width="100%" border="0" cellspacing="0" cellpadding="0">
			  <tr>
			    <td width="50%">Factura de:</td>
			    <td width="50%">Factura para:</td>
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
   							
   							<th class="description">Descripción</th>
   							<th>Cant.</th>
   							<th>Coste</th>
   							<th>Precio</th>
   							
   						</tr>
   					</thead>
   					
   					<tbody><a class="insert">'.$htmls.'</a></tbody>
   					
   					<tfoot>
   						
   						<tr>
   							<td height="40px"></td>
   							<td colspan="2" class="bold">Subtotal</td>
   							<td class="subtotal">'.$subtotal.'</td>
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax">IVA</td>
   						  <td><span class="tax"></span><input class="iva" type="text" name="tax1" placeholder="IVA" value="21" size="2"/></td>
   							<td>'.$impuesto1.'</td>
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax">IRPF</td>
   						  <td><span class="tax"></span><input class="irpf" type="text" name="tax2" placeholder="IRPF" value="-21" size="2"/></td>
   							<td>'.$impuesto2.'</td>
   						</tr>
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