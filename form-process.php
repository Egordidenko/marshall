<?php

//VALIDATING THE INPUT AND CAPTCHA

if (count($_POST)) {

	//HONEYPOT FIELD
	if ($_POST['require_attention']) {
		header("HTTP/1.0 400 Bad Request");
		die('Protection fail');

	}

} else {
	header("HTTP/1.0 400 Bad Request");
	die('Empty');
}


//Contact Form

//Checking if required fields not empty
if (!$_POST['name'] | !$_POST['message'] | !$_POST['email']) {
	header("HTTP/1.0 400 Bad Request");
	die('Required fields are missing');
}

$data['Name'] = htmlspecialchars($_POST['name'], ENT_QUOTES);
$data['E-mail'] = htmlspecialchars($_POST['email'], ENT_QUOTES);
$data['Subject'] = 'J Marshall Website Request';
$data['Message'] = htmlspecialchars($_POST['message'], ENT_QUOTES);

$subject = 'ICO Website Contact Form';
$filename = './.forms/contact.csv';



//PROCESSING RESULTS
$data['Datetime'] = date('Y-m-d H:i:s');

foreach ($data as $key => $value) {
    $message_to_send .= '<p><strong>' . $key . ':</strong> ' . $value . "</p>";
	$csv[] = $value;
}

//WRITING TO FILE
$file = fopen($filename, 'a');
fputcsv($file, $csv);
fclose($file);


// SENDING EMAIL
if ($subject) {
	$to = "info@vispring.com";
	$headers = "From: noreply@jmarshall.co.uk" . "\r\n" . "Reply-To: " . $data['E-mail'];
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	mail($to, $subject, $message_to_send, $headers);
}
