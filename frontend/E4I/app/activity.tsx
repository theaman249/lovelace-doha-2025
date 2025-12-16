import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';
import { ChevronLeft, CheckCircle, XCircle } from 'lucide-react-native';

// Quiz data for Course 1
const quizQuestions = [
  {
    id: 1,
    question: 'Which of the following best describes the approach of the United Nations Convention against Corruption (UNCAC) to defining corruption?',
    options: [
      'It focuses exclusively on the World Bank definition: "the use of public office for private gain" Not quite',
      'It provides one overarching definition: "the abuse of entrusted power for private gain"',
      'It defines a list of specific acts of corruption that States should criminalize, rather than defining the term "corruption" itself. - correct',
      'It defines corruption as a moral failing, focusing on the decay of civic virtue rather than legal terms'
    ],
    correctAnswer: 2
  },
  {
    id: 2,
    question: 'A manager at a private construction company accepts a large sum of money from a supplier in return for exclusively using that supplier\'s materials for all projects, even though they are of lower quality. Which act of corruption best describes the manager\'s action?',
    options: [
      'Abuse of functions',
      'Money-laundering',
      'Embezzlement in the private sector',
      'Bribery in the private sector - correct'
    ],
    correctAnswer: 3
  },
  {
    id: 3,
    question: 'An accountant at a government agency is responsible for managing a community development fund. Over several months, they secretly transfer small portions of the fund into their personal bank account. Which act of corruption has the accountant committed?',
    options: [
      'Bribery in the public sector',
      'Illicit enrichment',
      'Trading in influence',
      'Embezzlement in the public sector - correct'
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: 'A well-connected consultant is paid by a corporation to persuade a former colleague, who is now a senior government official, to approve a permit for them. The consultant uses their personal relationship to lobby the official. This scenario is an example of which act of corruption?',
    options: [
      'Abuse of functions',
      'Trading in influence - correct',
      'Obstruction of justice',
      'Bribery'
    ],
    correctAnswer: 1
  },
  {
    id: 5,
    question: 'A city planning official uses their position to fast-track a building permit for their brother\'s construction company, bypassing several required safety inspections. No money is exchanged. Which corrupt act best describes the official\'s conduct?',
    options: [
      'Embezzlement',
      'Abuse of functions - correct',
      'Concealment',
      'Bribery'
    ],
    correctAnswer: 1
  }
];

// Match the column data for Course 1
const matchColumnData = {
  columnA: [
    {
      id: 'a1',
      text: 'A low-level civil servant, after only two years in their post, is found to own multiple luxury properties and vehicles that far exceed what their salary could support. They are unable to provide a legitimate explanation for this wealth. Which offence does this situation suggest?'
    },
    {
      id: 'a2',
      text: 'A criminal organisation generates large amounts of cash from drug trafficking. To make the money appear legitimate, they purchase a chain of cash-intensive businesses such as laundromats and mix their illicit cash with the daily earnings. What criminal act are they engaging in?'
    },
    {
      id: 'a3',
      text: 'An individual who is not a politician holds a portfolio of stocks that were purchased with embezzled public funds. The individual knows the stocks are proceeds of a crime but agrees to hold them in their name to avoid detection by authorities. What offence has this individual committed?'
    },
    {
      id: 'a4',
      text: 'During a major corruption investigation into a government department, a key witness is threatened by an unknown person and told not to testify in court. Which corrupt act does this threat represent?'
    },
    {
      id: 'a5',
      text: 'A police officer accepts a payment from a suspect in a theft case in exchange for "losing" the key piece of evidence against them. By doing so, the officer has committed an act of corruption, as defined by the UNCAC. Has the officer clearly committed?'
    }
  ],
  columnB: [
    { id: 'b1', text: 'Illicit enrichment', correctMatch: 'a1' },
    { id: 'b2', text: 'Money-laundering', correctMatch: 'a2' },
    { id: 'b3', text: 'Concealment', correctMatch: 'a3' },
    { id: 'b4', text: 'Obstruction of Justice', correctMatch: 'a4' },
    { id: 'b5', text: 'Bribery and Obstruction of Justice', correctMatch: 'a5' }
  ]
};

export default function ActivityScreen() {
  const { title, courseId } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  
  // Match column state
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedColumnA, setSelectedColumnA] = useState<string | null>(null);
  const [showMatchResults, setShowMatchResults] = useState(false);

  // Determine activity type
  const isQuiz = title?.toString().toLowerCase().includes('quiz') || 
                 title?.toString().toLowerCase().includes('scenario');
  const isMatch = title?.toString().toLowerCase().includes('match');
  const isCourse1 = courseId === '1';

  // Quiz handlers
  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  // Match column handlers
  const handleColumnASelect = (id: string) => {
    if (showMatchResults) return;
    
    if (selectedColumnA === id) {
      setSelectedColumnA(null);
    } else {
      setSelectedColumnA(id);
    }
  };

  const handleColumnBSelect = (id: string) => {
    if (showMatchResults || !selectedColumnA) return;
    
    setMatches({ ...matches, [selectedColumnA]: id });
    setSelectedColumnA(null);
  };

  const handleSubmitMatches = () => {
    setShowMatchResults(true);
  };

  const checkMatch = (columnAId: string): boolean => {
    const columnBItem = matchColumnData.columnB.find(b => b.id === matches[columnAId]);
    return columnBItem?.correctMatch === columnAId;
  };

  const calculateMatchScore = (): number => {
    let correct = 0;
    Object.keys(matches).forEach(aId => {
      if (checkMatch(aId)) correct++;
    });
    return correct;
  };

  // Quiz Activity
  if (isCourse1 && isQuiz) {
    if (quizComplete) {
      const percentage = Math.round((score / quizQuestions.length) * 100);
      return (
        <Box className="flex-1 bg-background-0" style={{ backgroundColor: '#94d2fb' }}>
          <Box className="px-6 pt-12 pb-4 bg-primary-500">
            <HStack space="md" className="items-center">
              <Pressable onPress={() => router.back()}>
                <ChevronLeft color="white" size={28} />
              </Pressable>
              <Heading size="xl" className="text-white flex-1">
                Quiz Complete!
              </Heading>
            </HStack>
          </Box>

          <ScrollView className="flex-1">
            <VStack space="lg" className="p-6 items-center">
              <Box className="w-32 h-32 rounded-full bg-primary-500 items-center justify-center">
                <Text className="text-4xl font-bold text-white">{percentage}%</Text>
              </Box>
              
              <VStack space="sm" className="items-center">
                <Heading size="2xl" className="text-typography-900 text-center">
                  Great Job!
                </Heading>
                <Text className="text-lg text-typography-600 text-center">
                  You scored {score} out of {quizQuestions.length}
                </Text>
              </VStack>

              {percentage >= 70 ? (
                <Box className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <Text className="text-green-800 text-center">
                    🎉 Excellent work! You've passed this assessment.
                  </Text>
                </Box>
              ) : (
                <Box className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Text className="text-orange-800 text-center">
                    Keep learning! Review the course materials and try again.
                  </Text>
                </Box>
              )}

              <VStack space="md" className="w-full mt-4">
                <Button onPress={() => {
                  setCurrentQuestion(0);
                  setScore(0);
                  setQuizComplete(false);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                  className="border-2 border-black-800 bg-background-0">
                  <ButtonText>Retry Quiz</ButtonText>
                </Button>
                <Button onPress={() => router.back()} className="bg-background-0 border-2 border-black-800">
                  <ButtonText className="text-typography-900">Back to Course</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </ScrollView>
        </Box>
      );
    }

    return (
      <Box className="flex-1 bg-background-0 " style={{ backgroundColor: '#94d2fb' }}>
        <Box className="px-6 pt-12 pb-4 bg-primary-500">
          <HStack space="md" className="items-center">
            <Pressable onPress={() => router.back()}>
              <ChevronLeft color="white" size={28} />
            </Pressable>
            <VStack className="flex-1">
              <Heading size="xl" className="text-white">
                Knowledge Check
              </Heading>
              <Text className="text-white/80 text-sm">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </Text>
            </VStack>
          </HStack>
        </Box>

        <ScrollView className="flex-1">
          <VStack space="lg" className="p-6">
            <Box className="bg-white rounded-xl p-6 border border-outline-200">
              <Text className="text-lg font-semibold text-typography-900 mb-4">
                {quizQuestions[currentQuestion].question}
              </Text>

              <VStack space="sm">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === quizQuestions[currentQuestion].correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showIncorrect = showResult && isSelected && !isCorrect;

                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={showResult}
                    >
                      <Box
                        className="p-4 rounded-lg border-2"
                        style={{
                          borderColor: showCorrect ? '#10B981' : showIncorrect ? '#EF4444' : isSelected ? '#3B82F6' : '#E5E7EB',
                          backgroundColor: showCorrect ? '#ECFDF5' : showIncorrect ? '#FEF2F2' : isSelected ? '#EFF6FF' : '#FFFFFF'
                        }}
                      >
                        <HStack space="sm" className="items-center">
                          <Box
                            className="w-6 h-6 rounded-full items-center justify-center"
                            style={{
                              backgroundColor: showCorrect ? '#10B981' : showIncorrect ? '#EF4444' : isSelected ? '#3B82F6' : '#E5E7EB'
                            }}
                          >
                            {showResult && isCorrect && <CheckCircle color="white" size={16} />}
                            {showResult && showIncorrect && <XCircle color="white" size={16} />}
                            {!showResult && (
                              <Text className="text-xs text-white font-semibold">
                                {String.fromCharCode(65 + index)}
                              </Text>
                            )}
                          </Box>
                          <Text
                            className="flex-1"
                            style={{
                              color: showCorrect ? '#059669' : showIncorrect ? '#DC2626' : '#1F2937'
                            }}
                          >
                            {option.replace(' - correct', '')}
                          </Text>
                        </HStack>
                      </Box>
                    </Pressable>
                  );
                })}
              </VStack>
            </Box>

            {!showResult ? (
              <Button
                onPress={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={selectedAnswer === null ? 'bg-gray-300' : 'bg-blue-800'}
              >
                <ButtonText>Submit Answer</ButtonText>
              </Button>
            ) : (
              <Button onPress={handleNextQuestion}
                className="border-2 border-blue-800 bg-background-0">
                <ButtonText>
                  {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                </ButtonText>
              </Button>
            )}
          </VStack>
        </ScrollView>
      </Box>
    );
  }

  // Match Column Activity
  if (isCourse1 && isMatch) {
    const matchScore = showMatchResults ? calculateMatchScore() : 0;
    const totalMatches = matchColumnData.columnA.length;

    return (
      <Box className="flex-1 bg-background-0" style={{ backgroundColor: '#94d2fb' }}>
        <Box className="px-6 pt-12 pb-4 bg-primary-500">
          <HStack space="md" className="items-center">
            <Pressable onPress={() => router.back()}>
              <ChevronLeft color="white" size={28} />
            </Pressable>
            <Heading size="xl" className="text-white flex-1">
              Match the Columns
            </Heading>
          </HStack>
        </Box>

        <ScrollView className="flex-1">
          <VStack space="lg" className="p-6">
            <Box className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <Text className="text-blue-900 text-sm">
                💡 Tap a scenario in Column A, then tap the matching corruption type in Column B
              </Text>
            </Box>

            {showMatchResults && (
              <Box className="bg-white rounded-xl p-6 border border-outline-200">
                <VStack space="sm" className="items-center">
                  <Text className="text-3xl font-bold text-typography-900">
                    {matchScore} / {totalMatches}
                  </Text>
                  <Text className="text-typography-600">
                    {matchScore === totalMatches ? '🎉 Perfect Score!' : 'Matches Correct'}
                  </Text>
                </VStack>
              </Box>
            )}

            {/* Column A */}
            <VStack space="md">
              <Heading size="lg" className="text-typography-900">
                Column A - Scenarios
              </Heading>
              {matchColumnData.columnA.map((item) => {
                const isSelected = selectedColumnA === item.id;
                const hasMatch = matches[item.id];
                const isCorrectMatch = showMatchResults && hasMatch && checkMatch(item.id);
                const isIncorrectMatch = showMatchResults && hasMatch && !checkMatch(item.id);

                return (
                  <Pressable key={item.id} onPress={() => handleColumnASelect(item.id)}>
                    <Box
                      className="p-4 rounded-lg border-2"
                      style={{
                        borderColor: isCorrectMatch ? '#10B981' : isIncorrectMatch ? '#EF4444' : isSelected ? '#3B82F6' : hasMatch ? '#9CA3AF' : '#E5E7EB',
                        backgroundColor: isCorrectMatch ? '#ECFDF5' : isIncorrectMatch ? '#FEF2F2' : isSelected ? '#EFF6FF' : '#FFFFFF'
                      }}
                    >
                      <HStack space="sm">
                        <Box
                          className="w-6 h-6 rounded-full items-center justify-center"
                          style={{
                            backgroundColor: isCorrectMatch ? '#10B981' : isIncorrectMatch ? '#EF4444' : isSelected ? '#3B82F6' : hasMatch ? '#9CA3AF' : '#E5E7EB'
                          }}
                        >
                          {isCorrectMatch && <CheckCircle color="white" size={16} />}
                          {isIncorrectMatch && <XCircle color="white" size={16} />}
                        </Box>
                        <VStack className="flex-1">
                          <Text className="text-sm text-typography-900">{item.text}</Text>
                          {hasMatch && (
                            <Text className="text-xs text-typography-500 mt-2">
                              → {matchColumnData.columnB.find(b => b.id === matches[item.id])?.text}
                            </Text>
                          )}
                        </VStack>
                      </HStack>
                    </Box>
                  </Pressable>
                );
              })}
            </VStack>

            {/* Column B */}
            <VStack space="md">
              <Heading size="lg" className="text-typography-900">
                Column B - Corruption Types
              </Heading>
              {matchColumnData.columnB.map((item) => {
                const isMatched = Object.values(matches).includes(item.id);
                
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => handleColumnBSelect(item.id)}
                    disabled={showMatchResults}
                  >
                    <Box
                      className="p-4 rounded-lg border-2"
                      style={{
                        borderColor: isMatched ? '#9CA3AF' : '#E5E7EB',
                        backgroundColor: isMatched ? '#F3F4F6' : '#FFFFFF',
                        opacity: isMatched ? 0.6 : 1
                      }}
                    >
                      <Text className="text-sm font-semibold text-typography-900 text-center">
                        {item.text}
                      </Text>
                    </Box>
                  </Pressable>
                );
              })}
            </VStack>

            {Object.keys(matches).length === totalMatches && !showMatchResults && (
              <Button onPress={handleSubmitMatches}>
                <ButtonText>Submit Matches</ButtonText>
              </Button>
            )}

            {showMatchResults && (
              <VStack space="md">
                {matchScore < totalMatches && (
                  <Button onPress={() => {
                    setMatches({});
                    setShowMatchResults(false);
                    setSelectedColumnA(null);
                  }}>
                    <ButtonText>Try Again</ButtonText>
                  </Button>
                )}
                <Button onPress={() => router.back()} className="bg-background-0 border-2 border-black-800">
                  <ButtonText className="text-typography-900">Back to Course</ButtonText>
                </Button>
              </VStack>
            )}
          </VStack>
        </ScrollView>
      </Box>
    );
  }

  // Default activity template for other courses
  return (
    <Box className="flex-1 bg-background-0" style={{ backgroundColor: '#94d2fb' }}>
      <Box className="px-6 pt-12 pb-4 bg-primary-500">
        <HStack space="md" className="items-center">
          <Pressable onPress={() => router.back()}>
            <ChevronLeft color="white" size={28} />
          </Pressable>
          <Heading size="xl" className="text-white flex-1">
            {title}
          </Heading>
        </HStack>
      </Box>

      <ScrollView className="flex-1">
        <VStack space="lg" className="p-6">
          <Box className="bg-white rounded-xl p-6 border border-outline-200">
            <Heading size="lg" className="text-typography-900 mb-4">
              Activity Coming Soon
            </Heading>
            <Text className="text-typography-700 mb-4">
              This activity is currently being developed. Check back soon for interactive content!
            </Text>
            
            <Box className="p-4 bg-background-50 rounded-lg">
              <Text className="text-center text-typography-500">
                📝 Activity content will be available shortly
              </Text>
            </Box>
          </Box>

          <Button onPress={() => router.back()} className="bg-background-0 border-2 border-black-800">
            <ButtonText>Back to Course</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}