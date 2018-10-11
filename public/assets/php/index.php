<?php

require_once "vendor/autoload.php";

//PHPMailer Object
$mail = new PHPMailer\PHPMailer\PHPMailer();

//Enable SMTP debugging. 
$mail->SMTPDebug = 3;    

//Set PHPMailer to use SMTP
$mail->isSMTP();

//Set SMTP host name
$mail->Host = 'smtp.gmail.com';

//Set this to true if SMTP host requires authentication to send email
$mail->SMTPAuth = true; 

//Provide username and password
$mail->Username = 'codek504@gmail.com';
$mail->Password = '**************';

$mail->SMTPSecure = 'tls';

$mail->Port = '587';


//From email address and name
$mail->From = "codek504@unioncitysoccerclub.com";
$mail->FromName = "Orvin Welchez";

//To address and name
$mail->addAddress("owelchez@gmail.com", "Goku and Batman");
$mail->addAddress("Jshwelz09@gmail.com"); //Recipient name is optional

//Address to which recipient will reply
$mail->addReplyTo("codek504@gmail.com", "Reply");

//CC and BCC
//$mail->addCC("cc@example.com");
//$mail->addBCC("bcc@example.com");

//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = "Hello humans";
$mail->Body = "<i>Testing emails through SMTP</i>";
$mail->AltBody = "Testing emails through SMTP";

if(!$mail->send()) 
{
    echo "Mailer Error: " . $mail->ErrorInfo;
} 
else 
{
    echo "Message has been sent successfully";
}