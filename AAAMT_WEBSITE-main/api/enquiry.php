<?php
/**
 * Same-origin contact enquiry proxy for Hostinger / Apache.
 * Browser → POST /api/enquiry → this file → communication API (no CORS).
 *
 * Live host (aaamt.in)  → https://communication.aaamt.in/api/Email/demo-survey
 * Other hosts           → https://devcommunication.aaamt.in/api/Email/demo-survey
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Accept');
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['message' => 'Method not allowed']);
  exit;
}

$host = strtolower($_SERVER['HTTP_HOST'] ?? '');
$isLive = ($host === 'aaamt.in' || $host === 'www.aaamt.in');
$upstream = $isLive
  ? 'https://communication.aaamt.in/api/Email/demo-survey'
  : 'https://devcommunication.aaamt.in/api/Email/demo-survey';

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);
if (!is_array($payload)) {
  http_response_code(400);
  echo json_encode(['message' => 'Invalid JSON body']);
  exit;
}

$body = json_encode([
  'applicationName' => $payload['applicationName'] ?? 'AAAMT Website',
  'fullName' => $payload['fullName'] ?? '',
  'emailId' => $payload['emailId'] ?? '',
  'phoneNumber' => $payload['phoneNumber'] ?? '',
  'companyName' => $payload['companyName'] ?? '',
  'message' => $payload['message'] ?? '',
  'recipientEmail' => $payload['recipientEmail'] ?? 'sales@aaamt.in',
  'toEmail' => $payload['toEmail'] ?? 'sales@aaamt.in',
]);

$ch = curl_init($upstream);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Accept: application/json',
  ],
  CURLOPT_POSTFIELDS => $body,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
]);

$response = curl_exec($ch);
$status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err = curl_error($ch);
curl_close($ch);

if ($response === false) {
  http_response_code(502);
  echo json_encode(['message' => 'Enquiry proxy failed', 'detail' => $err]);
  exit;
}

http_response_code($status > 0 ? $status : 502);
echo $response;
