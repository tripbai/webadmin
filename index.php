<?php
$root = __DIR__ . '/out';
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize
$uri = rtrim($uri, '/');

// Helper: send correct content type
function sendFile($file) {
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    $mimeTypes = [
        'html' => 'text/html; charset=utf-8',
        'css'  => 'text/css; charset=utf-8',
        'js'   => 'application/javascript; charset=utf-8',
        'json' => 'application/json; charset=utf-8',
        'png'  => 'image/png',
        'jpg'  => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif'  => 'image/gif',
        'svg'  => 'image/svg+xml',
        'ico'  => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2'=> 'font/woff2',
        'ttf'  => 'font/ttf',
        'eot'  => 'application/vnd.ms-fontobject',
        'map'  => 'application/json'
    ];
    if (isset($mimeTypes[$ext])) {
        header('Content-Type: ' . $mimeTypes[$ext]);
    } else {
        header('Content-Type: application/octet-stream');
    }
    readfile($file);
    exit;
}

// Case 1: root → index.html
if ($uri === '' || $uri === '/') {
    sendFile($root . '/index.html');
}

// Case 2: if the request matches a real file (e.g. /_next/*, /favicon.ico, /images/*)
if (file_exists($root . $uri)) {
    sendFile($root . $uri);
}

// Case 3: if a .html version exists (e.g. /login → login.html, /admin/users → admin/users.html)
if (file_exists($root . $uri . '.html')) {
    sendFile($root . $uri . '.html');
}

// Case 4: fallback → 404.html if available, else index.html
if (file_exists($root . '/404.html')) {
    header("HTTP/1.0 404 Not Found");
    sendFile($root . '/404.html');
} else {
    sendFile($root . '/index.html');
}
