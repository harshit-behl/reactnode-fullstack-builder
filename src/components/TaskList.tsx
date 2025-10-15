import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Circle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  created_at: string;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks((data as Task[]) || []);
    } catch (error: any) {
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setTasks(tasks.filter(task => task.id !== id));
      toast.success("Task deleted");
    } catch (error: any) {
      toast.error("Failed to delete task");
    }
  };

  const updateTaskStatus = async (id: string, newStatus: Task["status"]) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      setTasks(tasks.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      ));
      toast.success("Task updated");
    } catch (error: any) {
      toast.error("Failed to update task");
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "done":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">No tasks yet. Create your first task to get started!</p>
        </CardContent>
      </Card>
    );
  }

  const groupedTasks = {
    todo: tasks.filter(t => t.status === "todo"),
    in_progress: tasks.filter(t => t.status === "in_progress"),
    done: tasks.filter(t => t.status === "done"),
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {(["todo", "in_progress", "done"] as const).map((status) => (
        <div key={status} className="space-y-4">
          <div className="flex items-center gap-2">
            {getStatusIcon(status)}
            <h3 className="font-semibold capitalize">
              {status === "in_progress" ? "In Progress" : status}
            </h3>
            <Badge variant="secondary">{groupedTasks[status].length}</Badge>
          </div>
          
          <div className="space-y-3">
            {groupedTasks[status].map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{task.title}</CardTitle>
                    <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                  {task.description && (
                    <CardDescription className="text-sm">
                      {task.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value as Task["status"])}
                      className="text-xs border rounded px-2 py-1 bg-background"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                      className="ml-auto h-8 w-8"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
