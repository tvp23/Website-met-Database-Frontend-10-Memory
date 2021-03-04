<?php
include 'db.info.php';

$q = $_REQUEST["q"];
$stmt = "UPDATE memory_info SET high_score = $q WHERE high_score = $q-1";
$sth = $db -> prepare($stmt);
$sth-> execute();