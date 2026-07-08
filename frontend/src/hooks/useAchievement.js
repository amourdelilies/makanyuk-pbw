import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { achievementsList } from '../data/achievements';

export function useAchievement() {
  const [progress, setProgress] = useState({
    favoritesCount: 0,
    detailViewsCount: 0,
    plannerDaysCount: 0,
    exploredRecipesCount: 0,
  });

  const [notifiedList, setNotifiedList] = useState([]);

  // Load from Local Storage on mount
  useEffect(() => {
    const favs = parseInt(localStorage.getItem('makanyuk_favs_count') || '0', 10);
    const details = parseInt(localStorage.getItem('makanyuk_details_count') || '0', 10);
    const planner = parseInt(localStorage.getItem('makanyuk_planner_count') || '0', 10);
    const explored = parseInt(localStorage.getItem('makanyuk_explored_count') || '0', 10);
    const notified = JSON.parse(localStorage.getItem('makanyuk_notified_achievements') || '[]');

    setProgress({
      favoritesCount: favs,
      detailViewsCount: details,
      plannerDaysCount: planner,
      exploredRecipesCount: explored,
    });
    setNotifiedList(notified);
  }, []);

  // Helper to save value
  const saveValue = (key, val) => {
    localStorage.setItem(key, val.toString());
  };

  const updateProgress = (key, val) => {
    setProgress((prev) => {
      const updated = { ...prev, [key]: val };
      if (key === 'favoritesCount') saveValue('makanyuk_favs_count', val);
      if (key === 'detailViewsCount') saveValue('makanyuk_details_count', val);
      if (key === 'plannerDaysCount') saveValue('makanyuk_planner_count', val);
      if (key === 'exploredRecipesCount') saveValue('makanyuk_explored_count', val);
      return updated;
    });
  };

  // Reset progress helper
  const resetProgress = () => {
    localStorage.removeItem('makanyuk_favs_count');
    localStorage.removeItem('makanyuk_details_count');
    localStorage.removeItem('makanyuk_planner_count');
    localStorage.removeItem('makanyuk_explored_count');
    localStorage.removeItem('makanyuk_notified_achievements');
    
    setProgress({
      favoritesCount: 0,
      detailViewsCount: 0,
      plannerDaysCount: 0,
      exploredRecipesCount: 0,
    });
    setNotifiedList([]);

    Swal.fire({
      title: 'Progress Direset',
      text: 'Semua kemajuan achievement Anda telah diatur ulang.',
      icon: 'info',
      confirmButtonColor: '#15803d',
    });
  };

  // Compute unlock status
  const achievements = achievementsList.map((ach) => {
    let current = 0;
    let isUnlocked = false;

    if (ach.id !== 'master_chef') {
      current = progress[ach.key] || 0;
      if (current > ach.maxProgress) current = ach.maxProgress;
      isUnlocked = current >= ach.maxProgress;
    }

    return {
      ...ach,
      current,
      isUnlocked,
    };
  });

  // Calculate master chef (unlocked if all others are unlocked)
  const othersUnlockedCount = achievements.filter(
    (a) => a.id !== 'master_chef' && a.isUnlocked
  ).length;

  const masterChefIndex = achievements.findIndex((a) => a.id === 'master_chef');
  if (masterChefIndex !== -1) {
    achievements[masterChefIndex].current = othersUnlockedCount;
    achievements[masterChefIndex].isUnlocked = othersUnlockedCount >= 4;
  }

  // Effect to watch for unlocks and trigger SweetAlert2
  useEffect(() => {
    if (achievements.length === 0) return;

    let updatedNotified = [...notifiedList];
    let changed = false;

    achievements.forEach((ach) => {
      if (ach.isUnlocked && !notifiedList.includes(ach.id)) {
        updatedNotified.push(ach.id);
        changed = true;

        Swal.fire({
          title: `<div class="text-green-700 font-bold text-2xl flex items-center justify-center gap-2">⭐ Achievement Terbuka!</div>`,
          html: `
            <div class="space-y-3">
              <p class="text-gray-600">Selamat! Anda telah membuka pencapaian baru:</p>
              <div class="p-4 bg-green-50 rounded-2xl border border-green-100 shadow-sm inline-block">
                <span class="text-3xl">${'⭐'.repeat(ach.stars)}</span>
                <h4 class="font-extrabold text-green-800 text-lg mt-1">${ach.name}</h4>
                <p class="text-xs text-green-700 mt-0.5">${ach.description}</p>
              </div>
            </div>
          `,
          icon: 'success',
          confirmButtonText: 'Luar Biasa!',
          confirmButtonColor: '#15803d',
          background: '#ffffff',
          customClass: {
            popup: 'rounded-3xl border border-gray-100',
            confirmButton: 'px-6 py-2.5 rounded-full font-bold text-sm transition duration-200'
          }
        });
      }
    });

    if (changed) {
      setNotifiedList(updatedNotified);
      localStorage.setItem('makanyuk_notified_achievements', JSON.stringify(updatedNotified));
    }
  }, [achievements, notifiedList]);

  // Statistics
  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const lockedCount = totalAchievements - unlockedCount;
  const completionPercentage = totalAchievements > 0 ? Math.round((unlockedCount / totalAchievements) * 100) : 0;

  return {
    achievements,
    stats: {
      total: totalAchievements,
      unlocked: unlockedCount,
      locked: lockedCount,
      percentage: completionPercentage,
    },
    updateProgress,
    resetProgress,
  };
}
