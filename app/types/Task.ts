export interface Task {
    id: string;
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    taskSize?: 'Small' | 'Medium' | 'Large';
    files?: string[];
    status: 'Backlog' | 'InProgress' | 'Committed';
}