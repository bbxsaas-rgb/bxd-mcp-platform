
export type Status = 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
export type UserRole = 'admin' | 'developer' | 'client';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  repository_url?: string;
  base_url: string;
  created_at: string;
  updated_at: string;
}

export interface TestSuite {
  id: string;
  project_id: string;
  name: string;
  description?: string;
  config: any;
  created_at: string;
}

export interface TestRun {
  id: string;
  test_suite_id: string;
  status: Status;
  started_at: string;
  completed_at?: string;
  duration?: number;
  passed_count: number;
  failed_count: number;
  total_count: number;
  triggered_by: string;
  created_at: string;
  suite_name?: string; // Join result
  diagnosis?: string; // AI diagnosis
}

export interface TestResult {
  id: string;
  test_run_id: string;
  test_name: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error_message?: string;
  stack_trace?: string;
  screenshot_url?: string;
  video_url?: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  created_at: string;
}
