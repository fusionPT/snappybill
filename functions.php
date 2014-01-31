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
		$title = $_POST['invoice'];
		$content = $content_var;
		if(empty($content))
		{
			$error = "No fue posible renderizar el PDF!";
		}
		
		else {
		
			include_once('dompdf/dompdf_config.inc.php');
			
				
			$dompdf = new DOMPDF();
			$dompdf->load_html(utf8_decode($content));
			$dompdf->render();
			$dompdf->stream($title . '.pdf');
		
		}
	}
}

?>