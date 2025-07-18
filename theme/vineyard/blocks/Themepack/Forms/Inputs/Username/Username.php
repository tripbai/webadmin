<?php 
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>

<?php snippet("Forms/Input", [
    "blockname" => $namespace,
    "type" => "text",
    "label" => "Username",
    'placeholder' => 'johndoe1993',
    'plunc:model' => $namespace . '.value',
    'plunc:change' => $namespace . '.validate'
]); ?>