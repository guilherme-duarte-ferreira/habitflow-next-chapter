export interface Habit {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  logged_at: string;
  created_at: string;
}

export interface Note {
  id: string;
  content: string;
  habit_id?: string; // null for general notes
  created_at: string;
  updated_at: string;
}

export interface BackupData {
  habits: Habit[];
  logs: HabitLog[];
  notes: Note[];
  exported_at: string;
}