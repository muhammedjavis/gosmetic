export const ROUTINE_STEPS = {
  basic: [
    {
      step: 1,
      type: 'Cleanser',
      time: ['AM', 'PM'],
      description: 'Start with a gentle cleanser to remove impurities',
    },
    {
      step: 2,
      type: 'Toner',
      time: ['AM', 'PM'],
      description: 'Balance skin pH and prep for next steps',
    },
    {
      step: 3,
      type: 'Serum',
      time: ['AM', 'PM'],
      description: 'Target specific skin concerns',
    },
    {
      step: 4,
      type: 'Moisturizer',
      time: ['AM', 'PM'],
      description: 'Lock in hydration',
    },
    {
      step: 5,
      type: 'Sunscreen',
      time: ['AM'],
      description: 'Protect from UV damage',
    },
  ],
  concerns: {
    acne: [
      {
        step: 2.5,
        type: 'Treatment',
        time: ['PM'],
        description: 'Apply acne treatment',
      },
    ],
    aging: [
      {
        step: 2.5,
        type: 'Retinol',
        time: ['PM'],
        description: 'Anti-aging treatment',
      },
    ],
    pigmentation: [
      {
        step: 2.5,
        type: 'Serum',
        time: ['AM'],
        description: 'Apply brightening ingredients like Vitamin C',
      },
    ],
    sensitivity: [
      {
        step: 2.5,
        type: 'Treatment',
        time: ['PM'],
        description: 'Use calming ingredients like centella asiatica',
      },
    ],
  },
};
