<?php 

$labelFor    = $snippet["for"];
$labelValue  = $snippet["value"] ?? "";
$classlist   = [$snippet["class"] ?? ""];
$classlist[] = $snippet["text:size"] ?? "text:1";
$classlist[] = $snippet["font:weight"] ?? "font-weight:400";
$classlist[] = $snippet["text:color"] ?? "color:grayscale-24";
$classlist[] = $snippet["margin:top"] ?? "";
$classlist[] = $snippet["margin:bottom"] ?? "margin-bottom:4";
$classlist[] = $snippet["margin:left"] ?? "";
$classlist[] = $snippet["margin:right"] ?? "margin-right:5";

?>

<label for="<?php echo $labelFor; ?>" class="<?php echo trim(implode(" ", $classlist)); ?>">
    <?php echo $labelValue; ?>
</label>

