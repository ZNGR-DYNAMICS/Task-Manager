<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For dev set to all
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$tasks = read_tasks();

switch ($method) {
    case 'GET':
        echo json_encode($tasks);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $newTask = [
            'id' => uniqid(),
            'title' => htmlspecialchars($data['title'] ?? ''),
            'status' => $data['status'] ?? 'Backlog',
            'dateCreated' => date('Y-m-d'),
            'description' => $data['description'] ?? '',
            'assignee' => $data['assignee'] ?? '',
            'dateDue' => $data['dateDue'] ?? '',
            'taskSize' => $data['taskSize'] ?? 'Medium',
            'files' => $data['files'] ?? [],
            'type' => 'Task',
        ];

        $tasks[] = $newTask;
        write_tasks($tasks);

        echo json_encode($newTask);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $updated = false;

        foreach ($tasks as &$task) {
            if ($task['id'] === ($data['id'] ?? '')) {
                $task = array_merge($task, $data);
                $updated = true;
                break;
            }
        }

        if ($updated) {
            write_tasks($tasks);
            echo json_encode(['success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Task not found']);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}