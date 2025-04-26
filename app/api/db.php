<?php

define('DB_FILE', __DIR__ . '/tasks.json');

function read_tasks() {
    if (!file_exists(DB_FILE)) {
        file_put_contents(DB_FILE, json_encode([]));
    }
    return json_decode(file_get_contents(DB_FILE), true);
}

function write_tasks($tasks) {
    file_put_contents(DB_FILE, json_encode($tasks, JSON_PRETTY_PRINT));
}