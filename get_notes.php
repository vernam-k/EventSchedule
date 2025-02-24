<?php
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

$file = 'data/notes.json';
$data = file_get_contents($file);

if ($data === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read notes']);
    exit();
}

$notes = json_decode($data, true);
$notes['timestamp'] = time(); // Add timestamp for cache busting

echo json_encode($notes);
?>