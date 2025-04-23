export interface Task {
    id: string;
    type: 'Task';
    title: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    taskSize?: 'Small' | 'Medium' | 'Large';
    files?: string[];
    status: 'Backlog' | 'InProgress' | 'OnHold' | 'Committed' | 'Cancelled' | 'Released';
}