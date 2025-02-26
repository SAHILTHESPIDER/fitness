import React, { useState } from 'react';

const exerciseData = [
  {
    category: 'Upper Body',
    exercises: [
      { name: 'Push-ups', gif: 'https://media.tenor.com/xTj6p_KLZ-4AAAAC/push-ups.gif' },
      { name: 'Pull-ups', gif: 'https://media.tenor.com/J1diP2OJsLIAAAAM/pull-ups.gif' },
      { name: 'Bench Press', gif: 'https://media.tenor.com/NG94cfwOJ04AAAAd/bench-press.gif' },
      { name: 'Bicep Curls', gif: 'https://media.tenor.com/3ALR6l1JbwAAAAAM/bicep-curl.gif' },
      { name: 'Shoulder Press', gif: 'https://media.tenor.com/AxEXt-RY0KoAAAAC/shoulder-press.gif' }
    ]
  },
  {
    category: 'Lower Body',
    exercises: [
      { name: 'Squats', gif: 'https://media.tenor.com/hN2FLzWtfP0AAAAM/squat-fitness.gif' },
      { name: 'Lunges', gif: 'https://media.tenor.com/FtVAvAebGiAAAAAC/lunges-workout.gif' },
      { name: 'Deadlifts', gif: 'https://media.tenor.com/7fOHaJibkEYAAAAM/deadlift.gif' },
      { name: 'Leg Press', gif: 'https://media.tenor.com/ogxNnyKNPKsAAAAM/leg-press.gif' },
      { name: 'Calf Raises', gif: 'https://media.tenor.com/LZTcV_KXydEAAAAM/calf-raises.gif' }
    ]
  }
];

export default function Fit() {
  const [search, setSearch] = useState('');

  const filteredExercises = exerciseData.filter(({ category }) =>
    category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Search Input */}
      <div className="flex justify-end mb-6 space-x-3">
        <input
          type="text"
          placeholder="Search workouts..."
          className="h-10 px-4 border-2 border-gray-400 rounded-lg focus:outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Exercise Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(({ category, exercises }, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <ul className="space-y-3">
              {exercises.map(({ name, gif }, idx) => (
                <li key={idx} className="flex flex-col items-center">
                  <img src={gif} alt={name} className="w-40 h-40 rounded-md shadow-md" />
                  <p className="mt-2 text-gray-600">{name}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
