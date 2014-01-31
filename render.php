<?php 


function renderPDF($content_var){

		
			include_once('dompdf/dompdf_config.inc.php');
			
			$dompdf = new DOMPDF();
			$dompdf->load_html('test');
			$dompdf->render();
			$dompdf->stream('Sample.pdf');
		
		}
	}
}

renderPDF();

?>