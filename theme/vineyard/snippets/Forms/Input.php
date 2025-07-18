<?php 

$classlist = [
    "@wrapper:main" => [],
    "@wrapper:input" => [],
    "@input" => [],
    "@label" => []
];
$html = [
    "@label" => "",
    "@icon:left" => ""
];
$plunc = [
    "@model" => "",
    "@click" => "",
    "@change" => ""
];

// Set default size of the input
$snippet["size"] ??= "medium";
$snippet["placeholder"] ??= "";

$snippet["id"] = uniqid("input_");
$snippet["blockname"] ??= $snippet["id"];
$blockname = "Forms/Input/" . $snippet["blockname"];

$classlist["@wrapper:main"][] = $snippet["width"] ?? "width:24";
$classlist["@wrapper:input"][] = "width:24";
$classlist["@wrapper:input"][] = "display:flex";
$classlist["@wrapper:input"][] = "align-items:center";
$classlist["@input"][] = "border-style:none";
$classlist["@input"][] = "width:24";
$classlist["@input"][] = $snippet["background:color"] ?? "background-color:transparent";


// Adds border to input wrapper, if enabled
if ($snippet["border:enabled"] ?? true) {
    $classlist["@wrapper:input"][] = $snippet["border:width"] ?? "border-width:1";
    $classlist["@wrapper:input"][] = $snippet["border:style"] ?? "border-style:solid";
    $classlist["@wrapper:input"][] = $snippet["border:color"] ?? "border-color:grayscale-15";
    $classlist["@wrapper:input"][] = $snippet["border:radius"] ?? "border-radius-extra-small:4";
}

// Adds label, if enabled
if ($snippet["label:enabled"] ?? true) {
    $classlist["@label"][] = $snippet["label:text:size"] ?? "text:1";
    $classlist["@label"][] = $snippet["label:font:weight"] ?? "font-weight:400";
    $classlist["@label"][] = $snippet["label:text:color"] ?? "color:grayscale-21";
    $classlist["@label"][] = $snippet["label:margin:top"] ?? "";
    $classlist["@label"][] = $snippet["label:margin:bottom"] ?? "margin-bottom:4";
    $classlist["@label"][] = $snippet["label:margin:left"] ?? "";
    $classlist["@label"][] = $snippet["label:margin:right"] ?? "margin-right:5";
    $html["@label"] = "<label for=\"{$snippet['id']}\" class=\"" . implode(" ", $classlist["@label"]) . "\">{$snippet['label']}</label>";
}

// Plunc attributes
if (isset($snippet["plunc:model"])) {
    $plunc["@model"] = "plunc-model=\"{$snippet['plunc:model']}\"";
}
if (isset($snippet["plunc:change"])) {
    $plunc["@change"] = "plunc-change=\"{$snippet['plunc:change']}()\"";
}

// If left icon is set
if (isset($snippet["icon:left"])) {
    $snippet["icon:left"]["width"] ??= "concrete-width-extra-small:15";
    $snippet["icon:left"]["stroke:color"] ??= "svg-stroke:primary-strong";
    $snippet["icon:left"]["fill:color"] ??= "svg-fill:none";
    $snippet["icon:left"]["classlist"] ??= [];
    $__icon_left_classlist = array_merge(
        $snippet["icon:left"]["classlist"],
        [
            $snippet["icon:left"]["width"],
            $snippet["icon:left"]["stroke:color"],
            $snippet["icon:left"]["fill:color"],
            "margin-right:5"
        ]
    );
    ob_start();
    snippet("Icons/SVG", [
        "path" => $snippet["icon:left"]["path"],
        "class" => implode(" ", $__icon_left_classlist),
        "stroke:width" => $snippet["icon:left"]["stroke:width"] ?? "1.0",
        "use:gradient" => $snippet["icon:left"]["use:gradient"] ?? false,
    ]);
    $html["@icon:left"] = ob_get_contents();
    ob_end_clean();
}

switch ($snippet["size"]) {
    case "medium": 
        $classlist["@wrapper:input"][] = $snippet["padding:top"] ?? "padding-top:5";
        $classlist["@wrapper:input"][] = $snippet["padding:bottom"] ?? "padding-bottom:5";
        $classlist["@wrapper:input"][] = $snippet["padding:left"] ?? "padding-left:6";
        $classlist["@wrapper:input"][] = $snippet["padding:right"] ?? "padding-right:6";
        break;
    default: 
        // Custom sizing, must be defined in the snippet, if not default to medium
        $classlist["@wrapper:input"][] = $snippet["padding:top"] ?? "padding-top:5";
        $classlist["@wrapper:input"][] = $snippet["padding:bottom"] ?? "padding-bottom:5";
        $classlist["@wrapper:input"][] = $snippet["padding:left"] ?? "padding-left:6";
        $classlist["@wrapper:input"][] = $snippet["padding:right"] ?? "padding-right:6";
        break;
}

$__main_classlist = implode(" ", $classlist["@wrapper:main"]);
$__wrapper_input_classlist = implode(" ", $classlist["@wrapper:input"]);
$__input_classlist = implode(" ", $classlist["@input"]);

echo <<<HTML
    <div plunc-block="{$blockname}" class="{$__main_classlist}">
        {$html['@label']}
        <div class="{$__wrapper_input_classlist}" data-style="@wrapper:input">
            {$html['@icon:left']}
            <input id="{$snippet['id']}" {$plunc['@model']} {$plunc['@change']} type="{$snippet['type']}" class="{$__input_classlist}" placeholder="{$snippet['placeholder']}"/>
        </div>
        <div plunc-block="{$blockname}/Message" class="text-small:23">
            
        </div>
    </div>
HTML;