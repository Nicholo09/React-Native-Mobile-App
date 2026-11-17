import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { INITIAL_ACTIVITIES, INITIAL_RECENT_IDS } from '../data/activities';

const STORAGE_KEY = '@lab_portfolio/progress';
const ActivityContext = createContext();

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [recentIds, setRecentIds] = useState(INITIAL_RECENT_IDS);
  const [loaded, setLoaded] = useState(false);

  // Load saved progress when the app starts
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw);
        if (saved.statuses) {
          setActivities((prev) =>
            prev.map((a) =>
              saved.statuses[a.id] ? { ...a, status: saved.statuses[a.id] } : a
            )
          );
        }
        if (Array.isArray(saved.recentIds)) setRecentIds(saved.recentIds);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Save progress whenever it changes (after the first load)
  useEffect(() => {
    if (!loaded) return;
    const statuses = {};
    activities.forEach((a) => {
      statuses[a.id] = a.status;
    });
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ statuses, recentIds })).catch(() => {});
  }, [activities, recentIds, loaded]);

  const markCompleted = useCallback((id) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Completed' } : a))
    );
  }, []);

  const markAccessed = useCallback((id) => {
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 3));
  }, []);

  const getActivity = useCallback(
    (id) => activities.find((a) => a.id === id),
    [activities]
  );

  // Dashboard statistics — recalculated automatically
  const stats = useMemo(() => {
    const total = activities.length;
    const completed = activities.filter((a) => a.status === 'Completed').length;
    const inProgress = activities.filter((a) => a.status === 'In Progress').length;
    const pending = activities.filter((a) => a.status === 'Pending').length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, pending, percent };
  }, [activities]);

  const recentActivities = useMemo(
    () => recentIds.map((id) => activities.find((a) => a.id === id)).filter(Boolean),
    [recentIds, activities]
  );

  return (
    <ActivityContext.Provider
      value={{ activities, stats, recentActivities, getActivity, markCompleted, markAccessed }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivities = () => useContext(ActivityContext);
