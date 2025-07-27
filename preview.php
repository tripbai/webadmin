<?php 

# php -S 127.0.0.1:7053 preview.php to start
use Kenjiefx\ScratchPHP\App;

define('ROOT', __DIR__);
require 'vendor/autoload.php';

$app = new App();
$app->run();