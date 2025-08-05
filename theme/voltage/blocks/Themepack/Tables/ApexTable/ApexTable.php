<?php 

$configuration = [
    "namespace" => "Themepack_Tables_ApexTable",
    "display:searchbar" => $block["display:searchbar"] ?? true,
    "section:state:loading" => $block["section:state:loading"] ?? __DIR__ . "/defaults/state.loading.php",
];

?>

<section class="width:24" plunc-block="<?php echo $configuration["namespace"]; ?>">
    <!-- table header -->
    <div class="width:24">
        <?php include $block['section:header']; ?>
    </div>
    <?php snippet("Themepack/Dividers/Horizontal/Border"); ?>
    <!-- table body -->
    <div class="width:24">
        <div class="width:24" plunc-if="<?php echo $configuration["namespace"] ?>.state == 'loading'">
            <?php include $configuration['section:state:loading']; ?>
        </div>
        <div class="width:24" plunc-if="<?php echo $configuration["namespace"] ?>.state == 'with-data'">
            <?php include $block['section:state:with-data']; ?>
        </div>
    </div>
</section>