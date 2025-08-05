<?php 

$configuration = [
    "namespace" => "Themepack_Sidebars_CancunSidebar"
];
$css = [
    "icon" => "concrete-width-extra-small:13 concrete-height-extra-small:13 svg-stroke:primary-strong svg-fill:none margin-left:5 margin-right:5",
    "item:padding" => ""
];

if (isset($block["item"])) {
    $paddings = [];
    $keys = ["padding-top", "padding-bottom", "padding-left", "padding-right"];
    foreach ($keys as $key) {
        if (isset($block["item"][$key]) && !empty($block["item"][$key])) {
            $paddings[] = $block["item"][$key];
        }
    }
    $css["item:padding"] = trim(implode(" ",$paddings));
}

$render = [
    "item:link" => function (array $item, array $css, array $render, array $block) {
        $url = $item["url"];
        $label = $item["label"];
        $name = $item["name"] ?? $url;
        ob_start();
        snippet("Themepack/Icons/SVG", [
            "path" => $item["icon"]["path"],
            "class" => $css["icon"],
            "stroke:width" => "1",
            "use:gradient" => false,
        ]);
        $icon = ob_get_contents();
        $itemcss = $css["item:padding"];
        ob_end_clean();
        return <<<HTML
        <div class="width:24 height:24 {$itemcss}" data-cancun-name="{$name}">
            <a href="{$url}" class="--cc-nav-link-wrapper-outer">
                <div class="--cc-nav-link-inner display:flex align-items:center width:24">
                    {$icon}
                    <span class="--cc-nav-label text:5">{$label}</span>
                </div>
            </a>
        </div>
        HTML;
    },
    "item:collapsible" => function (array $item, array $css, array $render, array $block, array $configuration) {
        $id    = 'cc' . uniqid();
        $label = $item["label"];
        $name  = $item["name"] ?? $label;
        ob_start();
        snippet("Themepack/Icons/SVG", [
            "path" => $item["icon"]["path"],
            "class" => $css["icon"],
            "stroke:width" => "1",
            "use:gradient" => false,
        ]);
        $icon = ob_get_contents();
        ob_end_clean();
        ob_start();
        snippet("Themepack/Icons/SVG", [
            "path" => '/Paths/chevron-right.svg',
            "class" => 'concrete-width-extra-small:13 concrete-height-extra-small:13 svg-fill:grayscale-16',
            "stroke:width" => "1",
            "use:gradient" => false,
        ]);
        $arrowRightIcon = ob_get_contents();
        ob_end_clean();
        ob_start();
        snippet("Themepack/Icons/SVG", [
            "path" => '/Paths/chevron-down.svg',
            "class" => 'concrete-width-extra-small:13 concrete-height-extra-small:13 svg-fill:grayscale-16',
            "stroke:width" => "1",
            "use:gradient" => false,
        ]);
        $arrowDownIcon = ob_get_contents();
        ob_end_clean();
        $renderContent = function ($collapsibleContent) use ($render, $block, $configuration, $css) {
            $itemcss = $css["item:padding"];
            $url = $collapsibleContent['url'];
            $name = $collapsibleContent['name'] ?? $url;
            $label = $collapsibleContent['label'];
            $cssicon = $css["icon"];
            return <<<HTML
            <div class="width:24 height:24 {$itemcss}" data-cancun-name="{$name}">
                <a href="{$url}" class="--cc-nav-link-wrapper-outer display:flex align-items:center">
                    <div class="{$cssicon}"></div>
                    <div class="height:24">
                        <span class="--cc-nav-label text:5"> {$label} </span>
                    </div>
                </a>
            </div>
            HTML;
        };
        $collapsibleContentHtml = '';
        foreach ($item["content"] as $collapsibleContent) {
            if (isset($collapsibleContent['url']) && isset($collapsibleContent['label'])) {
                $collapsibleContentHtml .= $renderContent($collapsibleContent);
            }
        }
        $clickAttribute = "plunc-click=\"{$configuration['namespace']}.toggleCollapse('{$id}')\"";
        $itemcss = $css["item:padding"];
        return <<<HTML
        <div data-cancun-id="{$id}" data-cancun-name="{$name}" class="width:24 {$itemcss}">
            <div {$clickAttribute} class="--cc-nav-collapsible-heading width:24 cursor:pointer display:flex justify-content:space-between align-items:center">
                <div class="display:flex align-items:center">
                    {$icon}
                    <span class="--cc-nav-label --cc-nav-label-type-collapsible text:5">{$label}</span>
                </div>
                <div class="--cc-collapsible-arrow-right"> {$arrowRightIcon} </div>
                <div class="--cc-collapsible-arrow-down" style="display:none;"> {$arrowDownIcon} </div>
            </div>
            <div class="--cc-nav-collapsible-content width:24" style="max-height: 0; overflow:hidden; transition: max-height 0.4s ease;">
                {$collapsibleContentHtml}
            </div>
        </div>
        HTML;
    }
];
?>

<section plunc-block="<?php echo $configuration["namespace"]; ?>" class="width:24 height:24">
    <div class="height:12 width:24">
        <ul class="width:24 height:24">
            <?php $contents = []; if (isset($block["top"]) && is_array($block["top"]["content"])) { $contents = $block["top"]["content"]; } ?>
            <?php foreach ($contents as $content): ?>
                <li class="--cc-nav-item-group width:24">
                    <!-- content heading -->
                    <?php if (isset($content["heading"])): ?>
                        <div class="--cc-nav-item-group-heading">
                            <?php echo htmlspecialchars($content["heading"]); ?>
                        </div>
                    <?php endif; ?>
                    <!-- content blocks -->
                    <?php foreach ($content["blocks"] as $item): ?>
                        <?php if ($item["type"] === "link"): ?>
                            <?php echo $render["item:link"]($item, $css, $render, $block); ?>
                        <?php elseif ($item["type"] === "collapsible"): ?>
                            <?php echo $render["item:collapsible"]($item, $css, $render, $block, $configuration); ?>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </li>
            <?php endforeach; ?>    
        </ul>
    </div>
    <div class="height:12 width:24">
        <ul class="width:24 height:24 display:flex flex-direction:column-reverse">
            <?php $contents = []; if (isset($block["bottom"]) && is_array($block["bottom"]["content"])) { $contents = $block["bottom"]["content"]; } ?>
            <?php foreach ($contents as $content): ?>
                <li class="--cc-nav-item-group width:24">
                    <!-- content heading -->
                    <?php if (isset($content["heading"])): ?>
                        <div class="--cc-nav-item-group-heading">
                            <?php echo htmlspecialchars($content["heading"]); ?>
                        </div>
                    <?php endif; ?>
                    <!-- content blocks -->
                    <?php foreach ($content["blocks"] as $item): ?>
                        <?php if ($item["type"] === "link"): ?>
                            <?php echo $render["item:link"]($item, $css, $render, $block); ?>
                        <?php elseif ($item["type"] === "collapsible"): ?>
                            <?php echo $render["item:collapsible"]($item, $css, $render, $block, $configuration); ?>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </li>
            <?php endforeach; ?>  
        </ul>
    </div>
    <style></style>
</section>