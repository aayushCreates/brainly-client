import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";
import { TaskData, TaskPriority, TaskStatus } from "@/types/task.types";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiCheck,
  FiPlus,
  FiTrash2,
  FiCalendar,
  FiCheckCircle,
  FiCircle,
  FiEdit2,
  FiClock,
  FiAlignLeft,
  FiAlertTriangle
} from "react-icons/fi";
import { toast } from "sonner";

type FilterType = "all" | "pending" | "completed" | "rejected";

const TasksPage = () => {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskData | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success || Array.isArray(data.data)) {
        setTasks(data.data || []);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setTasks([]);
      } else {
        console.error("Failed to fetch tasks", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (taskData: TaskData) => {
    setIsSaving(true);
    const token = localStorage.getItem("token");

    try {
      let response;
      if (taskToEdit && taskToEdit.id) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks/${taskToEdit.id}`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks`,
          taskData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        setIsModalOpen(false);
        setTaskToEdit(null);
        toast.success(taskToEdit ? "Task updated" : "Task added");
        fetchTasks();
      }
    } catch (err) {
      toast.error(taskToEdit ? "Failed to update task" : "Failed to add task");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTask = async (id: string, currentStatus: TaskStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;
      
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Task updated successfully");
        fetchTasks();
      }
    } catch (err) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDeleteId) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/tasks/${taskToDeleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Task deleted");
        setIsDeleteModalOpen(false);
        setTaskToDeleteId(null);
        setTasks(prev => prev.filter(t => t.id !== taskToDeleteId));
      }
    } catch (err) {
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClick = (task: TaskData) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return task.status === TaskStatus.PENDING;
    if (filter === "completed") return task.status === TaskStatus.COMPLETED;
    if (filter === "rejected") return task.status === TaskStatus.REJECTED;
    return true;
  });

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "bg-red-100 text-red-700 border-red-200";
      case TaskPriority.MEDIUM:
        return "bg-amber-100 text-amber-700 border-amber-200";
      case TaskPriority.LOW:
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-700 border-green-200";
      case TaskStatus.PENDING:
        return "bg-blue-100 text-blue-700 border-blue-200";
      case TaskStatus.REJECTED:
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <div className="text-gray-500 mt-2 flex justify-between gap-2 items-center">
              <p className="flex items-center gap-2">
                <FiCalendar />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <button
                onClick={handleAddClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm font-medium transition hover:bg-blue-700 flex items-center gap-2"
              >
                <FiPlus /> Add Task
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {(["all", "pending", "completed", "rejected"] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-sm text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
              </div>
            ) : filteredTasks.length > 0 ? (
              <AnimatePresence mode="popLayout">
                {filteredTasks.map((task) => {
                   const isCompleted = task.status === TaskStatus.COMPLETED;
                   const isRejected = task.status === TaskStatus.REJECTED;
                   const taskId = task.id as string;
                   
                   return (
                  <motion.div
                    key={taskId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-md border transition-all gap-4 ${
                      isCompleted
                        ? "border-green-100 bg-green-50/10"
                        : isRejected
                        ? "border-gray-200 bg-gray-50/50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-1 w-full">
                      <button
                        onClick={() => toggleTask(taskId, task.status)}
                        className={`shrink-0 mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isRejected
                            ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 text-transparent hover:border-blue-400"
                        }`}
                        disabled={isRejected}
                      >
                        <FiCheck size={14} />
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-gray-800 font-medium transition-all ${
                              isCompleted
                                ? "text-gray-400 line-through"
                                : isRejected
                                ? "text-gray-400"
                                : ""
                            }`}
                          >
                            {task.title}
                          </span>
                          
                          <div className="flex gap-1.5">
                            {task.priority && (
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-wide ${getPriorityColor(
                                  task.priority
                                )}`}
                              >
                                {task.priority}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-wide ${getStatusColor(
                                task.status
                              )}`}
                            >
                              {task.status}
                            </span>
                          </div>
                        </div>

                        {task.description && (
                          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2">
                             <FiAlignLeft size={14} className="shrink-0" />
                             <p className="truncate">{task.description}</p>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                          {task.startDate && (
                             <span className="flex items-center gap-1">
                              <FiCalendar size={12} />
                              S: {new Date(task.startDate).toLocaleDateString()}
                            </span>
                          )}
                          {task.dueDate && (
                            <span className="flex items-center gap-1">
                              <FiCalendar size={12} />
                              D: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                          {(task.startTime || task.endTime) && (
                            <span className="flex items-center gap-1">
                              <FiClock size={12} />
                              {task.startTime} 
                              {task.startTime && task.endTime && " - "} 
                              {task.endTime}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Edit task"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(taskId)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                        aria-label="Delete task"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                );
                })}
              </AnimatePresence>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 text-gray-400">
                  {filter === "completed" ? (
                    <FiCheckCircle size={32} />
                  ) : (
                    <FiCircle size={32} />
                  )}
                </div>
                <p className="text-gray-500 font-medium">
                  {filter === "completed"
                    ? "No completed tasks yet"
                    : filter === "pending"
                      ? "No pending tasks! All caught up."
                      : filter === "rejected"
                      ? "No rejected tasks."
                      : "No tasks found. Add one above!"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          isLoading={isSaving}
          taskToEdit={taskToEdit}
        />

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {isDeleteModalOpen && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
                onClick={() => !isDeleting && setIsDeleteModalOpen(false)}
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="relative w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden p-6 text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-red-50 text-red-500 rounded-full mx-auto mb-4">
                  <FiAlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Task</h3>
                <p className="text-gray-500 mb-6">
                  Are you sure you want to delete this task? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition disabled:opacity-50"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default TasksPage;
