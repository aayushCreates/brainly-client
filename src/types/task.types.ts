export enum TaskPriority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export enum TaskStatus {
    COMPLETED = "COMPLETED",
    PENDING = "PENDING",
    REJECTED = "REJECTED"
}

export interface TaskData {
    id?: string;
    title: string;
    description: string;
    priority: TaskPriority;
    startDate: string;
    dueDate: string;
    startTime: string;
    endTime: string;
    status: TaskStatus;
    createdAt?: string;
}