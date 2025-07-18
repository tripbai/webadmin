<?php 
    $unique_id    = uniqid().rand(1,1000);
    $stroke_width = $snippet["stroke:width"] ?? '0.5';
    $use_gradient = $snippet["use:gradient"] ?? false;
    $viewbox      = $snippet["viewbox"] ?? '0 0 24 24';
?>


<svg xmlns="http://www.w3.org/2000/svg" viewBox="<?php echo $viewbox; ?>" stroke-width="<?php echo $stroke_width; ?>" class="<?php echo $snippet['class'] ?? ''; ?>">
    <?php if ($use_gradient): ?>
        <defs>
            <linearGradient id="<?php echo $unique_id; ?>" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#7debf2; stop-opacity:1" />
                <stop offset="100%" style="stop-color:#60a4ff; stop-opacity:1" />
            </linearGradient>
        </defs>
    <?php endif; ?>
    <?php 
        if (str_contains($snippet['path'], '/Paths')) {
            $path = file_get_contents(__dir__.$snippet['path']);
            if ($use_gradient) {
                echo str_replace('<path ', '<path fill="url(#'.$unique_id.')" ', $path);
            } else {
                echo $path;
            }
        } else {
            echo $snippet['path'];
        }
    ?>
</svg>

