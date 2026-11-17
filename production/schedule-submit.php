<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$configPath = '/run/secrets/booking-config.php';
if (!is_readable($configPath)) {
    http_response_code(503);
    echo json_encode(['error' => 'Booking is not configured yet. Please contact us by phone or WhatsApp.']);
    exit;
}

/** @var array{to:string,from:string,subject_prefix?:string} $config */
$config = require $configPath;

$to = trim($config['to'] ?? '');
$from = trim($config['from'] ?? '');
$subjectPrefix = trim($config['subject_prefix'] ?? 'Schedule request – Kat Team Events');

if ($to === '' || $from === '' || !filter_var($to, FILTER_VALIDATE_EMAIL) || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
    http_response_code(503);
    echo json_encode(['error' => 'Booking email is not configured correctly.']);
    exit;
}

// Honeypot — bots only
if (!empty($_POST['website'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid submission.']);
    exit;
}

$name = trim((string)($_POST['name'] ?? ''));
$email = trim((string)($_POST['email'] ?? ''));
$phone = trim((string)($_POST['phone'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));
$location = trim((string)($_POST['location'] ?? ''));
$date = trim((string)($_POST['date'] ?? ''));
$eventType = trim((string)($_POST['event_type'] ?? ''));

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter your name and a valid email address.']);
    exit;
}

if ($phone === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter your phone number.']);
    exit;
}

if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date.']);
    exit;
}

$allowedEvents = ['wedding', 'baptism', 'party', 'other'];
if ($eventType === '' || !in_array($eventType, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please choose an event type.']);
    exit;
}

if (mb_strlen($name) > 120 || mb_strlen($email) > 160 || mb_strlen($phone) > 40 || mb_strlen($location) > 200 || mb_strlen($message) > 2000) {
    http_response_code(400);
    echo json_encode(['error' => 'One or more fields are too long.']);
    exit;
}

$eventLabels = [
    'wedding' => 'Nuntă / Wedding',
    'baptism' => 'Botez / Baptism',
    'party' => 'Petrecere / Party',
    'other' => 'Alt eveniment / Other',
];
$eventLabel = $eventLabels[$eventType] ?? ($eventType !== '' ? $eventType : 'Not specified');

$subject = $subjectPrefix . ' – ' . $date;
$bodyLines = [
    'New booking request from katteamevents.com',
    '',
    'Date requested: ' . $date,
    'Event type: ' . $eventLabel,
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . $phone,
    'Location: ' . ($location !== '' ? $location : '(not provided)'),
    '',
    'Message:',
    $message !== '' ? $message : '(none)',
    '',
    '---',
    'Reply directly to the customer using their email address.',
];
$body = implode("\r\n", $bodyLines);

$headers = [
    'From: ' . $from,
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not send your request. Please try WhatsApp or phone.']);
    exit;
}

echo json_encode(['ok' => true]);
