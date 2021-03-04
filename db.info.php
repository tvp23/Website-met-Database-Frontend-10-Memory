<?php

/* Maak de connection string voor MySQL */
$host = 'localhost';
$dbname = 'memory';
$dbusername = 'root';
$dbpassword = '';

/* Maak de database connectie */
$connectStr = 'mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8';
$db = new PDO($connectStr, $dbusername, $dbpassword);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);