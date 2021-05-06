<?php 
header('Content-type: text/plain; charset=utf-8');
$sisalto = wordwrap($_POST["sisalto"],70);
$lahetetty = mail('noa.julkunen2@gmail.com', $_POST["otsikko"], $sisalto, $_POST["email"]);
if(!$lahetetty) {   
     echo "Viestiä ei onnistututtu lähettämään.";   
} else {
    echo "Lähetetty onnistuneesti";
} 



?>




