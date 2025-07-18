<?php 

$classlist = [
    "@wrapper:main" => [],
    "@input" => [],
    "@label" => []
];
$html = [
    "@icon:left" => "",
    "@icon:right" => ""
];
$plunc = [
    "@click" => "",
    "@disable" => ""
];
// Set default size of the button
$snippet["size"] ??= "medium";
$snippet["type"] ??= "button";
// Adds border to input wrapper, if enabled
if ($snippet["border:enabled"] ?? false) {
    $classlist["@wrapper:main"][] = $snippet["border:width"] ?? "border-width:1";
    $classlist["@wrapper:main"][] = $snippet["border:style"] ?? "border-style:solid";
    $classlist["@wrapper:main"][] = $snippet["border:color"] ?? "border-color:grayscale-15";
} else {
    $classlist["@wrapper:main"][] = "border-style:none"; // No border
}
$classlist["@wrapper:main"][] = $snippet["background:color"] ?? "background-gradient:primary";
$classlist["@wrapper:main"][] = $snippet["border:radius"] ?? "border-radius-extra-small:4";
$classlist["@wrapper:main"][] = $snippet["text:color"] ?? "color:everwhite";
$classlist["@wrapper:main"][] = $snippet["cursor"] ?? "cursor:pointer";
// Plunc attributes
if (isset($snippet["plunc:click"])) {
    $plunc["@click"] = "plunc-click=\"{$snippet['plunc:click']}\"";
}
if (isset($snippet["plunc:disable"])) {
    $plunc["@disable"] = "plunc-disable=\"{$snippet['plunc:disable']}\"";
}
switch ($snippet["size"]) {
    case "medium": 
        $classlist["@wrapper:main"][] = $snippet["padding:top"] ?? "padding-top:3";
        $classlist["@wrapper:main"][] = $snippet["padding:bottom"] ?? "padding-bottom:3";
        $classlist["@wrapper:main"][] = $snippet["padding:left"] ?? "padding-left:4";
        $classlist["@wrapper:main"][] = $snippet["padding:right"] ?? "padding-right:4";
        break;
    default: 
        // Custom sizing, must be defined in the snippet, if not default to medium
        $classlist["@wrapper:main"][] = $snippet["padding:top"] ?? "padding-top:3";
        $classlist["@wrapper:main"][] = $snippet["padding:bottom"] ?? "padding-bottom:3";
        $classlist["@wrapper:main"][] = $snippet["padding:left"] ?? "padding-left:4";
        $classlist["@wrapper:main"][] = $snippet["padding:right"] ?? "padding-right:4";
        break;
}
// If left icon is set
if (isset($snippet["icon:left"])) {
    $snippet["icon:left"]["width"] ??= "concrete-width-extra-small:11";
    $snippet["icon:left"]["stroke:color"] ??= "svg-stroke:white";
    $snippet["icon:left"]["fill:color"] ??= "svg-fill:none";
    $snippet["icon:left"]["classlist"] ??= [];
    $__icon_left_classlist = array_merge(
        $snippet["icon:left"]["classlist"],
        [
            $snippet["icon:left"]["width"],
            $snippet["icon:left"]["stroke:color"],
            $snippet["icon:left"]["fill:color"],
            "margin-right:2",
        ]
    );
    ob_start();
    snippet("Icons/SVG", [
        "path" => $snippet["icon:left"]["path"],
        "class" => implode(" ", $__icon_left_classlist),
        "stroke:width" => $snippet["icon:left"]["stroke:width"] ?? "1.5",
        "use:gradient" => $snippet["icon:left"]["use:gradient"] ?? false,
    ]);
    $html["@icon:left"] = ob_get_contents();
    ob_end_clean();
}
$classlist["@wrapper:main"][] = "display:flex align-items:center";
$__main_classlist = implode(" ", $classlist["@wrapper:main"]);
echo <<<HTML
    <button type="{$snippet['type']}" class="{$__main_classlist}" {$plunc['@click']} {$plunc['@disable']}>
        {$html['@icon:left']}
        <span>{$snippet['text']}</span>
        {$html['@icon:right']}
    </button>
HTML;