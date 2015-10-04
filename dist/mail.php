<?php

header( 'Content-Type: text/html; charset=utf-8' );
$myemail = "info@bright-fish.ru"; // email доставки можно указать несколько (разделяя их запятой и пробелом)
$from_email_2 = "info@bright-fish.ru"; // запасной email отправителя

// принимаем данные из формы
$name = $_POST["name"];
$tel = $_POST["phone"];
$email = $_POST["email"];
$form = $_POST["form"];
$ref = $_POST["ref"];

file_put_contents('log.txt', $name." ".$tel." ".$email."\n"."***"."\n", FILE_APPEND);


if ($email != '') {$email_to = "Email: $email<br>"; $from_email_2 = $email;}
if ($form != '') {$form_mail = "Форма: $form<br>";}
if ($ref != '') {$ref_mail = "Источник перехода: $ref<br>";}

// отправляем письмо
$header=null;
$header.="From: $name <$from_email_2>\n";
$header.="X-Mailer: PHP/".phpversion()."\n";
$header.="Content-Type: text/html; charset=UTF-8";

if (!empty($name) && !empty($tel)) {
	mail("$myemail", "Заявка с сайта (отправитель: $name)", "
	Получена новая заявка с лендинга \"bright-fish.ru\".<br><br>
	<strong>Информация о лиде:</strong><br>
	Имя: $name<br>
	Телефон: $tel<br>
	$email_to<br>
	<strong>Дополнительная информация:</strong><br>
	$ref_mail<br>
	<hr>", $header);
}

function translit($str) {
$rus = array('А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я');
$lat = array('A', 'B', 'V', 'G', 'D', 'E', 'E', 'Gh', 'Z', 'I', 'Y', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'F', 'H', 'C', 'Ch', 'Sh', 'Sch', 'Y', 'Y', 'Y', 'E', 'Yu', 'Ya', 'a', 'b', 'v', 'g', 'd', 'e', 'e', 'gh', 'z', 'i', 'y', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'f', 'h', 'c', 'ch', 'sh', 'sch', 'y', 'y', 'y', 'e', 'yu', 'ya');
return str_replace($rus, $lat, $str);
}

$text = "
Новая заявка с сайта.\n
От: $name\n
tel: $tel\n
$form";

if (!empty($name) && !empty($tel)) {
	mail("sms@massreach.com", "2b8021544391340c 79151043056", "
	[SENDER]zaiavka[/SENDER]
	[SMS]".translit($text)."[/SMS].", $header);
}
?>