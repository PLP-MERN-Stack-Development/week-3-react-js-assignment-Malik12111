import { Check, Edit, Trash2, Clock, AlertCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Circle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
          <p className="text-muted-foreground">
            Create your first task to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      case 'medium':
        return <Clock className="h-3 w-3" />;
      case 'low':
        return <Circle className="h-3 w-3" />;
      default:
        return <Circle className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card 
          key={task.id} 
          hover
          className={`transition-all duration-300 ${
            task.completed ? 'opacity-60' : ''
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleComplete(task.id)}
                  className={`mt-1 p-1 h-6 w-6 rounded-full ${
                    task.completed
                      ? 'bg-success text-success-foreground hover:bg-success/80'
                      : 'border-2 border-muted-foreground hover:border-primary'
                  }`}
                >
                  {task.completed && <Check className="h-3 w-3" />}
                </Button>
                
                <div className="flex-1">
                  <CardTitle className={`text-lg ${
                    task.completed ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {task.title}
                  </CardTitle>
                  {task.description && (
                    <p className={`text-sm mt-1 ${
                      task.completed ? 'text-muted-foreground' : 'text-muted-foreground'
                    }`}>
                      {task.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge 
                  className={`${getPriorityColor(task.priority)} flex items-center gap-1`}
                >
                  {getPriorityIcon(task.priority)}
                  {task.priority}
                </Badge>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              {task.category && (
                <Badge variant="outline" className="text-xs">
                  {task.category}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}