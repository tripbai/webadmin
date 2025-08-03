<?php 
$namespace = "Themepack_Sidebars_CancunSidebar";
$width = $block["width"] ?? "300px";
?>

<ul style="width:<?php echo $width; ?>" class="height:24 background-color:grayscale-1">
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
                    echo '<a href="' . htmlspecialchars($navItem['url']) . '" class="--cc-nav-link-wrapper-outer">';
                    echo '<div class="--cc-nav-link-inner display:flex align-items:center width:24">';
                        $navItem["icon"]["width"] ??= "concrete-width-extra-small:19";
                        $navItem["icon"]["height"] ??= "concrete-height-extra-small:19";
                        $navItem["icon"]["stroke:color"] ??= "svg-stroke:white";
                        $navItem["icon"]["fill:color"] ??= "svg-fill:primary-strong";
                        $navItem["icon"]["classlist"] ??= [];
                        $__icon_classlist = array_merge(
                            $navItem["icon"]["classlist"],
                            [
                                $navItem["icon"]["width"],
                                $navItem["icon"]["stroke:color"],
                                $navItem["icon"]["fill:color"],
                                "margin-right:5"
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
                    echo '<div class="--cc-nav-collapsible-heading width:24 cursor:pointer display:flex justify-content:space-between align-items:center">';
                        echo '<div class="display:flex align-items:center">';
                            $navItem["icon"]["width"] ??= "concrete-width-extra-small:19";
                            $navItem["icon"]["height"] ??= "concrete-height-extra-small:19";
                            $navItem["icon"]["stroke:color"] ??= "svg-stroke:white";
                            $navItem["icon"]["fill:color"] ??= "svg-fill:primary-strong";
                            $navItem["icon"]["classlist"] ??= [];
                            $__icon_classlist = array_merge(
                                $navItem["icon"]["classlist"],
                                [
                                    $navItem["icon"]["width"],
                                    $navItem["icon"]["stroke:color"],
                                    $navItem["icon"]["fill:color"],
                                    "margin-right:5"
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
                        echo '<div>';
                            snippet("Themepack/Icons/SVG", [
                                "path" => '/Paths/chevron-right.svg',
                                "class" => 'concrete-width-extra-small:13 concrete-height-extra-small:13 svg-fill:grayscale-16',
                                "stroke:width" => "1.0",
                                "use:gradient" => false,
                            ]);
                        echo '</div>';
                    echo '</div>';
                    echo '<div class="--cc-nav-collapsible-content width:24">';
                        foreach($navItem["content"] as $content) {
                            echo '<div class="display:flex align-items:center">';
                                echo '<div class="concrete-width-extra-small:19 margin-right:5"></div>';
                                echo '<a href="' . htmlspecialchars($content['url']) . '" class="--cc-nav-link-wrapper-outer">';
                                    echo '<span class="--cc-nav-label text:5">';
                                    echo htmlspecialchars($content['label']);
                                    echo '</span>';
                                echo '</a>';
                            echo '</div>';
                        }
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
</ul>