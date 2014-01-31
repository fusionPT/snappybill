<!doctype html>
<html>
<head>
  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title></title>
  <meta name="description" content="facturame">
  <meta name="author" content="">

  <!-- Mobile viewport optimized: j.mp/bplateviewport -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Place favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">


  <!-- CSS: implied media="all" -->
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">


  <!-- All JavaScript at the bottom, except for Modernizr which enables HTML5 elements & feature detects -->
  <!-- <script src="js/libs/modernizr-1.7.min.js"></script> -->

</head>

<body>

  <div id="container">
  <div id="page-container">
  
  <form id="invoice" method="POST" action="invoice_html.php"><!-- Invoice form -->
  <div id="main" role="main">
    <header>
		
		<h2>Factura</h2>
		
		<fieldset id="invoice-num">
			<input type="text" name="invoice" placeholder="Numero de factura" id="inv"/><br />
			<input type="text" name="date" placeholder="26-01-12"/><br />
		</fieldset>
    </header>
    
    	
    	<div id="adress">
    	
    		<fieldset id="from">
    		<h3>Factura de:</h3>
				<input type="text" name="name" placeholder="Escribe tu nombre"/><br />
				<input type="text" name="email" placeholder="Escribe tu email"/><br />
				<input type="text" name="tel" placeholder="Escribe tu teléfono"/><br />
				
			</fieldset>
		
			<fieldset id="billto">
			<h3>Facturar a:</h3>
				<input type="text" name="cname" placeholder="Escribe tu nombre"/><br />
				<input type="text" name="cemail" placeholder="Escribe tu e-mail"/><br />
				<input type="text" name="ctel" placeholder="Escribe tu telefono"/><br />
				
			</fieldset>
		
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
   					<tbody>
   						
   						<tr class="row">
   							
   							<td class="article">
   							
   								<input class="description" type="text" name="description-value" size="40" value="a"/>
	   							<input class="hidden-description" type="hidden" value=""/>
   							</td>
   							<td><input class="cantidad" type="text" name="cost" placeholder="Cant." size="2" value="0"/></td>
   							<td><input class="coste" type="text" name="qty" placeholder="Coste" size="2" value="0"/></td>
   							<td class="value"><span class="precio">0</span><input class="precio-hidden" type="hidden" name="price" value="0"/></td>  
   							<td class="insert"><a class="delete-row" href="#">Delete Row</a></td>		
   										
   						</tr>
   						
	   						
   						
   					</tbody>
   					<tfoot>
   						
   						<tr>
   							<td class="add"><a href="#" class="add-row">+ Add row</a></td>
   							<td colspan="2" class="bold">Subtotal</td>
   							<td class="subtotal">0</td>
   							<input class="subtotal-hidden" type="hidden" name="subtotal" value="0">
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax"></td>
   						  <td><span class="tax">IVA</span><input class="iva" type="text" name="tax1" placeholder="IVA" value="21" size="2"/></td>
   							<td class="totaliva">0</td>
   							<input class="totaliva-hidden" type="hidden" name="totaliva" value="0">
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax"></td>
   						  <td><span class="tax">IRPF</span><input class="irpf" type="text" name="tax2" placeholder="IRPF" value="21" size="2"/></td>
   							<td class="totalirpf">0</td>
   							<input class="totalirpf-hidden" type="hidden" name="totalirpf" value="0">
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td colspan="2" class="noborder"><strong>TOTAL</strong></td>
   							<td class="total">0</td>
   							<input class="total-hidden" type="hidden" name="total" value="0">
   							<input class="html-hidden" type="hidden" name="html" value="0">
   						</tr>
   					</tfoot>
   				</table>

   		
   		</div>
   		
   		<div id="pay">
   			<h3>Notas</h3>
   			<textarea name="notas"></textarea>
   		</div>

    	</div><!--! end of #main -->
 	
   
    </div> <!--! end of #page-container -->
    <div class="sidebar">
    		<input type="submit" name="submit" id="descargar" value="Descargar"/>
    		
    	</div><!-- End of sidebar -->

   		</form>
   		<div class="clearfix"></div>
   <footer>
	<p>&#169; brunofelicio.com</p>		
  </footer>
  
  </div> <!--! end of #container -->
  
 

  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="js/app.js"></script>
  

  
  <!-- end scripts-->


  <!--[if lt IE 7 ]>
    <script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix("img, .png_bg"); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
  <![endif]-->


  <!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID -->
  <script>
    var _gaq=[["_setAccount","UA-XXXXX-X"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));
  </script>

</body>
</html>