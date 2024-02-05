import { UUID } from "node:crypto";

interface TaskInterface {
  id: UUID;
  title: string;
  description: string;
  completed_at: Date | null;
  created_at: Date;
  updated_at: Date | null;
}
interface CraeteTask {
  title: string;
  description: string;
}
interface UpdateTask {
  id: string;
  title?: string;
  description?: string;
}