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
  theme: 'light' | 'dark' | 'system';
}

const defaultProfile: Profile = {
  id: 'user-1',
  email: 'contato@bxd.com',
  full_name: 'BXD Developer',
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
    return JSON.parse(stored);
  },

  updateSettings: (updates: Partial<GeneralSettings>) => {
    const settings = settingsService.getSettings();
    const updated = { ...settings, ...updates };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  }
};
