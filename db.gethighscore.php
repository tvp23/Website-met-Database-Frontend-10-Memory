<?php
include 'db.info.php';

$stmt = "SELECT * FROM memory_info";
$sth = $db -> prepare($stmt);
$sth-> execute();

$highscore = $sth->fetch();
echo json_encode($highscore);