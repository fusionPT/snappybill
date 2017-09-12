<?php

$items = array();

function sendData($valor){



		foreach($valor as $item){

			$items[] = $item;

		}


	}

function renderPDF($content_var){

	if(isset($_POST['submit']))
	{
		$factura = $_POST['invoice-title'];
		$invoice_num = $_POST['invoice-number'];

		$content = mb_convert_encoding($content_var, 'HTML-ENTITIES','UTF-8');
		if(empty($content))
		{
			$error = "No fue posible renderizar el PDF!";
		}

		else {

			include_once('dompdf/dompdf_config.inc.php');


			$dompdf = new DOMPDF();
			$dompdf->load_html(utf8_decode($content));
			$dompdf->render();
			$dompdf->stream($factura .'-'.$invoice_num. '.pdf');

		}
	}
}

?>
