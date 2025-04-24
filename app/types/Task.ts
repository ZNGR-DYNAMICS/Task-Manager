export interface Task {
    id: string;
    title: string;
    status: 'Backlog' | 'InProgress' | 'OnHold' | 'Committed' | 'Cancelled' | 'Released';
    dateCreated: string;
    description?: string;
    assignee?: string;
    dateDue?: string;
    taskSize?: 'Small' | 'Medium' | 'Large';
    files?: string[];
    type: 'Task';
}