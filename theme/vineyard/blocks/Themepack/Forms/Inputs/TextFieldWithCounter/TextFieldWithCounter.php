<?php 
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>

<div data-block-id="<?php echo $namespace; ?>" class="width:24 display:flex align-items:center position:relative">
    <div class="width:24">
        <?php snippet('Forms/Input', [
            "type" => "text",
            "label" => "{{".$namespace.".label}}",
            "placeholder" => "{{".$namespace.".placeholder}}",
            "plunc:model" => $namespace.".value",
            "plunc:change" => $namespace.".validate",
        ]) ?>
    </div>
    <div data-role="counter" class="position:absolute text:2 margin-top:20 color:grayscale-20" style="right:8px"></div>
</div>
<div data-role="error" class="width:24 color:error-strong text:1"></div>