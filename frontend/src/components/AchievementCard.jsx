import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaLock, FaLockOpen } from 'react-icons/fa';

export default function AchievementCard({ achievement }) {
  const { name, description, stars, maxProgress, current, isUnlocked } = achievement;
  const percentage = Math.round((current / maxProgress) * 100);

  // Array of stars to render
  const starsArray = Array.from({ length: 5 }, (_, i) => i < stars);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-3xl border p-6 overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 ${
        isUnlocked
          ? 'bg-gradient-to-br from-green-50 to-emerald-50/30 border-green-200 shadow-green-100/50'
          : 'bg-white border-gray-100 shadow-gray-100'
      }`}
    >
      {/* Decorative Top Glow for Unlocked Achievements */}
      {isUnlocked && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      )}

      <div className="space-y-4">
        {/* Star Rating & Status Badge */}
        <div className="flex items-center justify-between">
          {/* Star icons container */}
          <div className="flex gap-0.5">
            {starsArray.map((filled, idx) => (
              <FaStar
                key={idx}
                className={`text-lg ${
                  filled
                    ? isUnlocked
                      ? 'text-yellow-500 fill-yellow-500 drop-shadow-sm'
                      : 'text-yellow-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Status Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isUnlocked
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {isUnlocked ? (
              <>
                <FaLockOpen className="text-[10px]" /> Unlocked
              </>
            ) : (
              <>
                <FaLock className="text-[10px]" /> Locked
              </>
            )}
          </span>
        </div>

        {/* Content Description */}
        <div className="space-y-1">
          <h3
            className={`text-lg font-extrabold transition-colors duration-300 ${
              isUnlocked ? 'text-green-900' : 'text-gray-800'
            }`}
          >
            {name}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className={isUnlocked ? 'text-green-700' : 'text-gray-500'}>
            Progress: {current} / {maxProgress}
          </span>
          <span className={isUnlocked ? 'text-green-700' : 'text-gray-600'}>
            {percentage}%
          </span>
        </div>

        {/* Progress Bar Wrapper */}
        <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
          {/* Animating progress bar with Framer Motion */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              isUnlocked
                ? 'bg-gradient-to-r from-green-600 to-emerald-500'
                : 'bg-gradient-to-r from-gray-400 to-gray-500'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}
