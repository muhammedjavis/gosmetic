import React, { useState } from 'react';
import { ArrowRight, Loader2, User2, UserCircle2 } from 'lucide-react';

const questions = [
  {
    id: 1,
    text: 'Who are you shopping for?',
    description: 'Help us personalize your skincare recommendations.',
    options: [
      {
        value: 'female',
        label: "Women's Skincare",
        description: "Products formulated for women's skin needs",
      },
      {
        value: 'male',
        label: "Men's Skincare",
        description: "Products specifically designed for men's skin",
      },
    ],
  },
  {
    id: 2,
    text: 'How does your skin feel after cleansing?',
    description:
      "Your skin's post-cleanse feeling can reveal a lot about your skin type.",
    options: [
      {
        value: 'tight',
        label: 'Tight and dry',
        description: 'Feels uncomfortable and needs immediate moisturizer',
      },
      {
        value: 'normal',
        label: 'Normal and balanced',
        description: 'Feels clean and comfortable',
      },
      {
        value: 'oily',
        label: 'Still slightly oily',
        description: "Feels like there's a light residue",
      },
      {
        value: 'combination',
        label: 'Combination',
        description: 'Some areas feel dry, others feel oily',
      },
    ],
  },
  {
    id: 3,
    text: 'What are your main skin concerns?',
    description:
      'Understanding your concerns helps us recommend the most effective products.',
    options: [
      {
        value: 'acne',
        label: 'Acne and breakouts',
        description: 'Dealing with pimples, blackheads, or clogged pores',
      },
      {
        value: 'aging',
        label: 'Anti-aging',
        description: 'Fine lines, wrinkles, or loss of firmness',
      },
      {
        value: 'pigmentation',
        label: 'Dark spots',
        description: 'Uneven skin tone or dark patches',
      },
      {
        value: 'sensitivity',
        label: 'Sensitivity',
        description: 'Redness, irritation, or reactive skin',
      },
    ],
  },
  {
    id: 4,
    text: 'What type of climate do you live in?',
    description:
      "Your environment plays a crucial role in your skin's behavior.",
    options: [
      {
        value: 'humid',
        label: 'Humid',
        description: 'Hot and moist air most of the year',
      },
      {
        value: 'dry',
        label: 'Dry',
        description: 'Low humidity, can be hot or cold',
      },
      {
        value: 'moderate',
        label: 'Moderate',
        description: 'Balanced humidity with seasonal changes',
      },
    ],
  },
];

export default function SkinTypeQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = async (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsAnalyzing(true);
      // Simulate analysis delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const skinType = {
        type: determineSkinType(answers[1]),
        concerns: [answers[2]],
        climate: answers[3],
        gender: answers[0],
      };
      console.log('Quiz answers:', skinType);
      onComplete(skinType);
    }
  };

  const determineSkinType = (answer) => {
    switch (answer) {
      case 'tight':
        return 'dry';
      case 'oily':
        return 'oily';
      case 'combination':
        return 'combination';
      default:
        return 'normal';
    }
  };

  const question = questions[currentQuestion];

  if (isAnalyzing) {
    return (
      <div className='max-w-2xl mx-auto p-12 bg-white rounded-xl shadow-lg text-center'>
        <Loader2 className='w-12 h-12 text-rose-600 animate-spin mx-auto mb-6' />
        <h2 className='text-2xl font-semibold mb-4'>
          Analyzing Your Skin Profile
        </h2>
        <p className='text-gray-600'>
          We're creating your personalized skincare recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='bg-white p-8 rounded-xl shadow-lg'>
        <div className='mb-8'>
          <div className='w-full bg-gray-100 rounded-full h-2'>
            <div
              className='bg-rose-600 h-2 rounded-full transition-all duration-300'
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className='text-sm text-gray-600 mt-2'>
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <h2 className='text-2xl font-semibold mb-2'>{question.text}</h2>
        <p className='text-gray-600 mb-8'>{question.description}</p>

        <div className='space-y-4'>
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className='w-full p-6 text-left rounded-xl border border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-all duration-200'
            >
              <div className='flex justify-between items-start mb-2'>
                <div className='flex items-center space-x-3'>
                  {currentQuestion === 0 &&
                    (option.value === 'male' ? (
                      <User2 className='w-5 h-5 text-blue-600' />
                    ) : (
                      <UserCircle2 className='w-5 h-5 text-rose-600' />
                    ))}
                  <span className='font-semibold'>{option.label}</span>
                </div>
                <ArrowRight className='w-5 h-5 text-gray-400' />
              </div>
              <p className='text-sm text-gray-600'>{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
