<!doctype html>
<html>
<head>
  <meta charset="utf-8">

  <!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
       Remove this if you use the .htaccess -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Factura Rapida</title>
  <meta name="description" content="facturas gratis, finanzas on-line, factura, pdf">
  <meta name="author" content="Factura Rapida. Facturas online gratis">

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
  
  <h1>Factura<span>rapida</span>.net</h1>
  <h2>Factura a PDF. Sin complicaciones. Gratis.</h2>
  
  <div id="page-container">
  
  <form id="invoice" method="POST" action="invoice_html.php"><!-- Invoice form -->
  <div id="main" role="main">
    <header>
		
		<input class="title" type="text" name="invoice-title" placeholder="Factura" value="Factura" id='invoice-title'/>
		
		<fieldset id="invoice-num">
			<input type="text" name="invoice" placeholder="Numero de factura" id="inv"/><br />
			<input type="text" name="date" placeholder="<?php echo date('d/m/Y');?>" value="<?php echo date('d/m/Y');?>" id='invoice-date'/><br />
		</fieldset>
    </header>
    
    	
    	<div id="adress">
    	
    		<fieldset id="from">
    		<h3>Factura de:</h3>
				<input type="text" id="name" name="name" placeholder="Nombre, dirección, NIF..."/><br />
				<input type="text" id="email" name="email" placeholder=""/><br />
				<input type="text" id="tel" name="tel" placeholder=""/><br />
				
			</fieldset>
		
			<fieldset id="billto">
			<h3>Facturar a:</h3>
				<input type="text" id='cname' name="cname" placeholder="Nombre, dirección, NIF..."/><br />
				<input type="text" id='cemail' name="cemail" placeholder=""/><br />
				<input type="text" id='ctel' name="ctel" placeholder=""/><br />
				
			</fieldset>
		
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
   					<tbody>
   						
   						<tr class="row">
   							
   							<td class="article">
   							
   								<input class="description" type="text" name="description-value" size="40" placeholder="ej. Página web" value=""/>
	   							<input class="hidden-description" type="hidden" value=""/>
   							</td>
   							<td><input class="cantidad" type="text" name="cost" placeholder="Cant." size="2" value="0"/></td>
   							<td><input class="coste" type="text" name="qty" placeholder="Coste" size="2" value="0"/></td>
   							<td class="value"><span class="precio">0</span><input class="precio-hidden" type="hidden" name="price" value="0"/></td>  
   							<td class="insert"><a class="delete-row" href="#">Delete Row</a></td>		
   										
   						</tr>
   						
	   						
   						
   					</tbody>
   					<tfoot>
   						
   						<tr >
   							<td class="add"><a href="#" class="add-row">+ Añadir linea</a></td>
   							<td colspan="2" class="bold">Subtotal</td>
   							<td class="subtotal">0</td>
   							<input class="subtotal-hidden" type="hidden" name="subtotal" value="0">
   						</tr>
						
   					<!--	<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax"></td>
   						  <td><span class="tax">IVA</span><input class="iva" type="text" name="tax1" placeholder="IVA" value="21" size="2"/></td>
   							<td class="totaliva">0</td>
   							<input class="totaliva-hidden" type="hidden" name="totaliva" value="0">
   						</tr>
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax"></td>
   						  <td><span class="tax">IRPF</span><input class="irpf" type="text" name="tax2" placeholder="IRPF" value="-21" size="2"/></td>
   							<td class="totalirpf">0</td>
   							<input class="totalirpf-hidden" type="hidden" name="totalirpf" value="0">
   						</tr>-->
						
						<tr class='add_tax_tr'>
   						  <td class="noborder">&nbsp;</td>
   						  <td class="tax"></td>
   						  <td><a href='#' class="add_tax">+ Add tax</a></td>
   							<td class=""></td>
   				
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
   			<textarea name="notas" id='invoice-notas'></textarea>
   		</div>

    	</div><!--! end of #main -->
 
    </div> <!--! end of #page-container -->
	<style>
		#invoices li {
			margin-bottom:20px;
			position:relative;
		}
		.inv_title {
			font-size: 18px;
			font-weight: bolder;
			cursor:pointer;
		}
		.inv_date {
			font-size: 11px;
		}
		.inv_delete.delete-row {
			position: absolute;
			top: 4px;
			left: -17px;
		}
	</style>
    <div class="sidebar">
	
			<input type="button"  id='create_new' value="Create new invoice"/>
    		<input type="submit" name="submit" id="descargar" value="Descargar"/>
    		<input type="button" name="guardar" id="guardar" value="Guardar"/>
			
			<br/>
			<div style='clear:both'></div>
			<h2 style='margin-top:60px;margin-bottom:20px;'>LAST INVOICES:</h2>
			<div id='invoices'>
			
			</div>
    	</div><!-- End of sidebar -->

   		</form>
   		<div class="clearfix"></div>
   <footer>
	<p class="left">info@facturarapida.net</p>
		<!--
	<a href="https://twitter.com/share" class="twitter-share-button right" data-via="brunofelici" data-lang="es">Twittear</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>-->
	
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
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-41351971-3', 'facturarapida.net');
  ga('send', 'pageview');

</script>

</body>
</html>