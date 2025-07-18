<?php 
$namespace = Kenjiefx\Pluncext\API\PluncX::namespace(__DIR__);
?>
<div data-block-id="<?php echo $namespace; ?>" class="width:24">
    <?php snippet('Forms/TextArea', [
        "label" => "{{".$namespace.".label}}",
        "placeholder" => "{{".$namespace.".placeholder}}",
        "plunc:model" => $namespace.".value",
        "plunc:change" => $namespace.".validate"
    ]); ?>

    <div class="width:24 display:flex align-items:center justify-content:space-between">
        <div data-role="error" class="width:24 color:error-strong text:1"></div>
        <div class="display:flex align-items:center flex-shrink:0">
            <div data-role="counter" class="text:2 color:grayscale-19 margin-right:3"></div>
            <div class="text:2 color:grayscale-19"> / {{<?php echo $namespace; ?>.limit}}</div>
        </div>
    </div>
</div>