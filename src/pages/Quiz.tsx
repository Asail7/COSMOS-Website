import { useState } from 'react';
import { quiz } from '../data/quiz';
import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';

export default function Quiz() {
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const q = quiz[currentQuestion];
  const questionText = language === 'ar' ? q.questionAr : q.questionEn;
  const options = language === 'ar' ? q.optionsAr : q.optionsEn;

  const handleAnswer = (index: number) => {
    if (index === q.correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-24 relative z-10 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {language === 'ar' ? 'اختبار المعرفة' : 'Space Knowledge Quiz'}
          </h1>
        </div>

        <motion.div 
          key={currentQuestion + (showResults ? 'r' : 'q')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 md:p-12"
        >
          {showResults ? (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'ar' ? 'اكتمل الاختبار!' : 'Quiz Complete!'}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {language === 'ar' ? 'نتيجتك:' : 'Your Score:'} {score} / {quiz.length}
              </p>
              <button 
                onClick={resetQuiz}
                className="px-8 py-3 bg-primary text-white rounded-full font-bold tracking-wider hover:bg-primary/90 transition-colors"
              >
                {language === 'ar' ? 'إعادة الاختبار' : 'Try Again'}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8 text-muted-foreground text-sm font-mono">
                <span>{language === 'ar' ? `سؤال ${currentQuestion + 1} من ${quiz.length}` : `Question ${currentQuestion + 1} of ${quiz.length}`}</span>
                <span>{language === 'ar' ? `النتيجة: ${score}` : `Score: ${score}`}</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                {questionText}
              </h2>
              
              <div className="space-y-4">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left rtl:text-right p-4 rounded-xl border border-white/10 hover:border-accent hover:bg-white/5 transition-all text-lg"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
