<?php 
$namespace = "Themepack_Sidebars_CancunSidebar";
$width = $block["width"] ?? "300px";
$itemPaddings = [];
isset($block["padding-top"])    ? array_push($itemPaddings, $block["padding-top"]) : "";
isset($block["padding-bottom"]) ? array_push($itemPaddings, $block["padding-bottom"]) : "";
isset($block["padding-left"])   ? array_push($itemPaddings, $block["padding-left"]) : "";
isset($block["padding-right"])  ? array_push($itemPaddings, $block["padding-right"]) : "";
$itemPaddingCss = trim(implode(" ", $itemPaddings));
?>

<ul style="width:<?php echo $width; ?>" plunc-block="<?php echo $namespace; ?>" class="height:24">
<?php
    foreach ($block["content"] as $navItemGroup) {
        echo '<li class="--cc-nav-item-group">';
            if (isset($navItemGroup['heading'])) {
                echo '<div class="--cc-nav-item-group-heading">';
                echo htmlspecialchars($navItem['heading']);
                echo '</div>';
            }
            foreach ($navItemGroup["blocks"] as $navItem) {
                if ($navItem['type'] === 'link') {
                    $navItemName = $navItem['name'] ?? '';
                    echo '<a href="' . htmlspecialchars($navItem['url']) . '" class="--cc-nav-link-wrapper-outer '.$itemPaddingCss.'" data-cancun-name="'.$navItemName.'">';
                        echo '<div class="--cc-nav-link-inner display:flex align-items:center width:24">';
                            $navItem["icon"]["width"] ??= "concrete-width-extra-small:15";
                            $navItem["icon"]["height"] ??= "concrete-height-extra-small:15";
                            $navItem["icon"]["stroke:color"] ??= "svg-stroke:white";
                            $navItem["icon"]["fill:color"] ??= "svg-fill:primary-strong";
                            $navItem["icon"]["classlist"] ??= [];
                            $__icon_classlist = array_merge(
                                $navItem["icon"]["classlist"],
                                [
                                    $navItem["icon"]["width"],
                                    $navItem["icon"]["stroke:color"],
                                    $navItem["icon"]["fill:color"],
                                    "margin-right:5",
                                    "margin-left:5"
                                ]
                            );
                            snippet("Themepack/Icons/SVG", [
                                "path" => $navItem["icon"]["path"],
                                "class" => implode(" ", $__icon_classlist),
                                "stroke:width" => $navItem["icon"]["stroke:width"] ?? "1.5",
                                "use:gradient" => $navItem["icon"]["use:gradient"] ?? false,
                            ]);
                            echo '<span class="--cc-nav-label text:5">';
                            echo htmlspecialchars($navItem['label']);
                            echo '</span>';
                        echo '</div>';
                    echo '</a>';
                } elseif ($navItem['type'] === 'collapsible') {
                    $itemId = 'cc' . uniqid();
                    $navItemName = $navItem['name'] ?? '';
                    echo '<div data-cancun-id="'.$itemId.'" data-cancun-name="'.$navItemName.'" class="width:24">';
                        echo '<div plunc-click="'.$namespace.'.toggleCollapse(\''.$itemId.'\')'.'" class="--cc-nav-collapsible-heading width:24 cursor:pointer display:flex justify-content:space-between align-items:center  '.$itemPaddingCss.'">';
                            echo '<div class="display:flex align-items:center">';
                                $navItem["icon"]["width"] ??= "concrete-width-extra-small:15";
                                $navItem["icon"]["height"] ??= "concrete-height-extra-small:15";
                                $navItem["icon"]["stroke:color"] ??= "svg-stroke:white";
                                $navItem["icon"]["fill:color"] ??= "svg-fill:primary-strong";
                                $navItem["icon"]["classlist"] ??= [];
                                $__icon_classlist = array_merge(
                                    $navItem["icon"]["classlist"],
                                    [
                                        $navItem["icon"]["width"],
                                        $navItem["icon"]["stroke:color"],
                                        $navItem["icon"]["fill:color"],
                                        "margin-right:5",
                                        "margin-left:5"
                                    ]
                                );
                                snippet("Themepack/Icons/SVG", [
                                    "path" => $navItem["icon"]["path"],
                                    "class" => implode(" ", $__icon_classlist),
                                    "stroke:width" => $navItem["icon"]["stroke:width"] ?? "1.5",
                                    "use:gradient" => $navItem["icon"]["use:gradient"] ?? false,
                                ]);
                                echo '<span class="--cc-nav-label --cc-nav-label-type-collapsible text:5">';
                                echo htmlspecialchars($navItem['label']);
                                echo '</span>';
                            echo '</div>';
                            echo '<div class="--cc-collapsible-arrow-right">';
                                snippet("Themepack/Icons/SVG", [
                                    "path" => '/Paths/chevron-right.svg',
                                    "class" => 'concrete-width-extra-small:13 concrete-height-extra-small:13 svg-fill:grayscale-16',
                                    "stroke:width" => "1.0",
                                    "use:gradient" => false,
                                ]);
                            echo '</div>';
                            echo '<div class="--cc-collapsible-arrow-down" style="display:none;">';
                                snippet("Themepack/Icons/SVG", [
                                    "path" => '/Paths/chevron-down.svg',
                                    "class" => 'concrete-width-extra-small:13 concrete-height-extra-small:13 svg-fill:grayscale-16',
                                    "stroke:width" => "1.0",
                                    "use:gradient" => false,
                                ]);
                            echo '</div>';
                        echo '</div>';
                        echo '<div class="--cc-nav-collapsible-content width:24" style="max-height: 0; overflow:hidden; transition: max-height 0.4s ease;">';
                            foreach($navItem["content"] as $content) {
                                $contentName = $content['name'] ?? '';
                                echo '<a href="' . htmlspecialchars($content['url']) . '" class="--cc-nav-link-wrapper-outer display:flex align-items:center" data-cancun-name="'.$contentName.'">';
                                    echo '<div class="concrete-width-extra-small:15 concrete-height-extra-small:17 margin-right:5"></div>';
                                    echo '<div class="height:24">';
                                        echo '<span class="--cc-nav-label text:5">';
                                        echo htmlspecialchars($content['label']);
                                        echo '</span>';
                                    echo '</div>';
                                echo '</a>';
                            }
                        echo '</div>';
                    echo '</div>';

                } elseif ($navItem['type'] === 'icon') {
                    echo '<i class="' . htmlspecialchars($navItem['icon']) . '"></i>';
                } else {
                    // Handle other types or unknown types
                    echo '<span class="--cc-nav-unknown">';
                    echo 'Unknown item type';
                    echo '</span>';
                }
            }
        echo '</li>';
    }
?> 
    <style>
        {{ <?php echo $namespace; ?>.presetCss }}
        .cancun-color-primary-weak {
            color: var(--default-color-primary-weak);
        }
    </style>
</ul>