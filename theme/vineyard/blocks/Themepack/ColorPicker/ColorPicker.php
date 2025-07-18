<?php 

$path = dirname(__DIR__, 3) . '/venta/color.json';
$colors = json_decode(file_get_contents($path), TRUE);
$spans = '<div id="slate_color_palette" style="display:none;">'.PHP_EOL;
foreach ($colors as $selector => $data) {
    foreach ($data['values'] as $variant => $code) {
        $fullname  = "{$selector}-{$variant}";
        $classname = "{$selector}:{$variant}";
        $spans = $spans.'<span data-color-id="'.$fullname.'" class="'.$classname.'"></span>'.PHP_EOL;
    }
}
$spans = $spans.'</div>';
echo $spans;