<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Factura Rapida</title>
  <meta name="description" content="Online Invoicing FREE. No Signup.">
  <meta name="author" content="brunofelicio.com">
  <meta name="keywords" content="Invoices, free, billing, pdf, facturas, gratis, facturación, facturas en pdf, facturación en la nube">

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
 <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-XXXXXX-XX', 'example.com');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');
</script>
</head>

<body>

	<div class="container">
		<div class="top">
			<hgroup>
				<h1>Facturarapida.net</h1>
				<h2>Facturación. Simples. Gratis.</h2>
			</hgroup>
			<select id="language">
        <option value="espanol">Español - €</option>
				<option value="english">English - $</option>
        <option value="englishUK">English - £</option>
				<option value="portugues">Português - €</option>
			</select>

		</div>
		
  <div id="page-container">
  <form id="invoice" method="POST" action="invoice_html.php"><!-- Invoice form -->
  <div id="main" role="main">
    <header>
		
		<input class="title" type="text" name="invoice-title" placeholder="Factura" value="Factura" id='invoice-title'/>
		
		<fieldset id="invoice-num">
			<input type="text" name="invoice-number" placeholder="Numero de factura" id="inv"/><br />
			<input type="text" name="date" placeholder="<?php echo date('d/m/Y');?>" value="<?php echo date('d/m/Y');?>" id='invoice-date'/><br />
            <input type="hidden" name="hidden-number" value="Invoice nº">
            <input type="hidden" name="hidden-date" value="Date">
		</fieldset>
    </header>
    
    	
    	<div id="adress">
    	
    		<fieldset id="from">
    		<h3>Factura de:</h3>
    			<input type="hidden" name="hidden-from" value=0>
				<input type="text" id="name" name="name" placeholder="Nombre, dirección, NIF..."/><br />
				<input type="text" id="email" name="email" placeholder=""/><br />
				<input type="text" id="tel" name="tel" placeholder=""/><br />
				
			</fieldset>
		
			<fieldset id="billto">
			<h3>Facturar a:</h3>
				<input type="hidden" name="hidden-to" value=0>
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
   							<th class="qty">Cant.</th>
   							<th class="cost">Coste</th>
   							<th class="price noborder">Precio</th>
   							<input type="hidden" name="hidden-description" value="-">
   							<input type="hidden" name="hidden-qty" value="-">
   							<input type="hidden" name="hidden-cost" value="-">
   							<input type="hidden" name="hidden-price" value="-">
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
   						  <td><a href='#' class="add_tax">+ Añadir Impuesto</a></td>
   							<td class=""></td>
   				
   						</tr>
						
						
   						<tr>
   						  <td class="noborder">&nbsp;</td>
   						  <td colspan="2" class="noborder"><strong>TOTAL</strong></td>
   							<td class="total">0</td>
   							<input class="total-hidden" type="hidden" name="total-hidden" value="0">
   							<input class="html-hidden" type="hidden" name="html" value="0">
   						</tr>
   					</tfoot>
   				</table>

   		
   		</div>
   		
   		<div id="pay">
   			<h3>Notas</h3>
   			<textarea name="notas" id='invoice-notas'></textarea>
   			<input type="hidden" name="hidden-notes" value="-">
   		</div>

    	</div><!--! end of #main -->
 
    </div> <!--! end of #page-container -->
	
    <div class="sidebar">
	
			<ul class="menu">
				
				<li><input type="button"  id="create_new" value="Nueva"/></li>
				<li><input type="submit" name="submit" id="descargar" value="Descargar"/></li>
				<li><input type="button" name="guardar" id="guardar" value="Guardar"/></li>
				
			</ul>
			
			
			<h2>Ultimas facturas</h2>
			<div id="invoices">
				
			</div>
    	</div><!-- End of sidebar -->

   		</form>
   		<div class="clearfix"></div>
   <footer>
	<p class="left">info@facturarapida.net</p>
	<div class="fb-like" data-href="http://www.facturarapida.net" data-layout="button_count" data-action="like" data-show-faces="false" data-share="true"></div>	
	<a href="https://twitter.com/share" class="twitter-share-button" data-via="brunofelici" data-lang="es">Twittear</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
	
  </footer>
  
  </div> <!--! end of #container -->
  
 

  <!-- JavaScript at the bottom for fast page loading -->

  <!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  <script src="js/app-ck.js"></script>
  

  
  <!-- end scripts-->


  <!--[if lt IE 7 ]>
    <script src="js/libs/dd_belatedpng.js"></script>
    <script>DD_belatedPNG.fix("img, .png_bg"); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
  <![endif]-->


<div id="fb-root"></div>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1&appId=19837451874";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
</body>
</html>