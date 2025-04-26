<?php
require_once 'db.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // For dev set to all
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
$tasks = read_tasks();

switch($method) {
    case 'GET':
        echo json_encode($tasks);
        break;

    case 'POST': 
        $data = json_decode(file_get_contents('php://input'), true);
        if(!isset($data['title']) || trim($data['title']) === '') {
            echo json_encode(['error' => 'Title is required']);
            exit;
        }

        $task = [
            'id' => uniqid(),
            'title' => htmlspecialchars($data['title']),
            'status' => 'backlog'
        ];

        $tasks[] = $task;
        write_tasks($tasks);

        echo json_encode($task);
        break;

    case 'PUT': 
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;
        $updated = false;

        foreach ($tasks as $task) {
            if ($task[$id] === $id) {
                $task['title'] = htmlspecialchars($data['title'] ?? $task['title']);
                $task['status'] = $data['status'] ?? $task['status'];
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
    default: 
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
