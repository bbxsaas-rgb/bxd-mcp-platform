import { Profile } from '../types/database';

const PROFILE_KEY = 'bxd_mcp_profile';
const SETTINGS_KEY = 'bxd_mcp_general_settings';

export interface GeneralSettings {
  notifications: {
    email: boolean;
    browser: boolean;
    on_failure: boolean;
    on_success: boolean;
  };
  api_keys: {
    gemini: string;
    openai: string;
  };
  integrations: {
    supabase_url: string;
    supabase_anon_key: string;
    github_token: string;
    vercel_token: string;
  };
  theme: 'light' | 'dark' | 'system';
}

const defaultProfile: Profile = {
  id: 'user-1',
  email: 'contato@bxd.com',
  full_name: 'BXD Developer',
  role: 'admin',
  avatar_url: 'https://github.com/github.png',
  created_at: new Date().toISOString()
};

const defaultSettings: GeneralSettings = {
  notifications: {
    email: true,
    browser: true,
    on_failure: true,
    on_success: false,
  },
  api_keys: {
    gemini: '',
    openai: '',
  },
  integrations: {
    supabase_url: 'https://mlvokrlquuicidqupxhf.supabase.co',
    supabase_anon_key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sdm9rcmxxdXVpY2lkcXVweGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NjQ3ODIsImV4cCI6MjA4NDM0MDc4Mn0.To4f8X_xe6FYIulCIZVN5Tjw2mqJXoAKBYyUAK-HNR0',
    github_token: '',
    vercel_token: '',
  },
  theme: 'light',
};

export const settingsService = {
  getProfile: (): Profile => {
    const stored = localStorage.getItem(PROFILE_KEY);
    if (!stored) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(stored);
  },

  updateProfile: (updates: Partial<Profile>) => {
    const profile = settingsService.getProfile();
    const updated = { ...profile, ...updates };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
  },

  getSettings: (): GeneralSettings => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    const settings = JSON.parse(stored);
    // Garantir que novas propriedades de integração existam para usuários antigos
    if (!settings.integrations) {
      settings.integrations = defaultSettings.integrations;
    }
    return settings;
  },

  updateSettings: (updates: Partial<GeneralSettings>) => {
    const settings = settingsService.getSettings();
    const updated = { ...settings, ...updates };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  }
};
