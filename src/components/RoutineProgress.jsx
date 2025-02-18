import React from 'react';
import { CheckCircle, Circle, Bell, BellOff } from 'lucide-react';
import { ROUTINE_STEPS } from '../data/routineSteps';

export default function RoutineProgress({
  skinType,
  timeOfDay,
  steps,
  onToggleStep,
  reminders,
  onToggleReminder,
}) {
  const today = new Date().toLocaleDateString();

  return (
    <div className='bg-white p-6 rounded-xl shadow-lg'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-xl font-bold'>Today's Progress</h3>
        <span className='text-gray-600'>{today}</span>
      </div>

      <div className='space-y-4'>
        {steps.map((step, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
          >
            <div className='flex items-center gap-3'>
              <button
                onClick={() => onToggleStep(index)}
                className='focus:outline-none'
              >
                {step.completed ? (
                  <CheckCircle
                    className={`w-6 h-6 ${
                      skinType.gender === 'female'
                        ? 'text-rose-600'
                        : 'text-cyan-600'
                    }`}
                  />
                ) : (
                  <Circle className='w-6 h-6 text-gray-300' />
                )}
              </button>
              <span
                className={step.completed ? 'line-through text-gray-400' : ''}
              >
                {step.type}
              </span>
            </div>

            <button
              onClick={() => onToggleReminder(index)}
              className='p-2 hover:bg-gray-100 rounded-full'
            >
              {reminders[index] ? (
                <Bell
                  className={`w-5 h-5 ${
                    skinType.gender === 'female'
                      ? 'text-rose-600'
                      : 'text-cyan-600'
                  }`}
                />
              ) : (
                <BellOff className='w-5 h-5 text-gray-400' />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className='mt-6'>
        <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
          <div
            className={`h-full ${
              skinType.gender === 'female' ? 'bg-rose-600' : 'bg-cyan-600'
            } transition-all duration-300`}
            style={{
              width: `${
                (steps.filter((s) => s.completed).length / steps.length) * 100
              }%`,
            }}
          />
        </div>
        <p className='text-center mt-2 text-sm text-gray-600'>
          {steps.filter((s) => s.completed).length} of {steps.length} steps
          completed
        </p>
      </div>
    </div>
  );
}
