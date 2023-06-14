import React, { useState } from 'react';

interface Answer {
  questionIndex: number;
  value: string;
  subAnswers?: string[];
}

interface SubQuestion {
  title: string;
  description: string;
  type: string;
  answers?: string[];
}

interface Question {
  title: string;
  description: string;
  type: string;
  answers?: string[];
  subQuestions?: SubQuestion[];
}

interface MultiPartFormProps {
  questions: Question[];
}

const MultiPartForm: React.FC<MultiPartFormProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(answers); // You can save the data to the database here
  };

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const [questionIndex, subQuestionIndex] = name
      .replace('answer_', '')
      .split('_')
      .map((index) => parseInt(index, 10));

    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      let existingAnswer = updatedAnswers.find(
        (answer) => answer.questionIndex === questionIndex
      );

      if (!existingAnswer) {
        existingAnswer = { questionIndex, value };
        updatedAnswers.push(existingAnswer);
      } else if (subQuestionIndex !== undefined && !isNaN(subQuestionIndex)) {
        if (!existingAnswer.subAnswers) {
          existingAnswer.subAnswers = [];
        }
        existingAnswer.subAnswers[subQuestionIndex] = value; // Fix: Update subAnswer value
      } else {
        existingAnswer.value = value; // Fix: Update main answer value
      }

      return updatedAnswers;
    });
  };
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Update the answers state with the selected dates
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswer = updatedAnswers.find(
        (answer) => answer.questionIndex === currentQuestion
      );

      if (existingAnswer) {
        // If the answer already exists, update the value
        existingAnswer.value = value;
      } else {
        // If the answer doesn't exist, add a new answer object
        updatedAnswers.push({ questionIndex: currentQuestion, value });
      }

      return updatedAnswers;
    });

    // Update the dateRange state
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const nextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  const question = questions[currentQuestion];

  const buttonClass =
    'rounded bg-primary p-2 hover:bg-secondary hover:text-white hover:shadow-md hover:shadow-graydark dark:bg-primary dark:hover:bg-secondary  ';

  return (
    <div className="mx-auto  h-125 min-h-fit max-w-md  items-center justify-between space-y-19.5  rounded p-4 shadow dark:bg-boxdark">
      {question && (
        <form
          className=" flex h-full w-full flex-col space-y-4"
          onSubmit={handleSubmit}
        >
          <h2 className="mb-2 text-lg font-bold">{question.title}</h2>
          <p className="text-gray-500 mb-4">{question.description}</p>
          {question.type === 'text' ? (
            <input
              type="text"
              name={`answer_${currentQuestion}`}
              value={
                answers.find(
                  (answer) => answer.questionIndex === currentQuestion
                )?.value || ''
              }
              onChange={handleAnswerChange}
              className="border-gray-300 mb-4 rounded border p-2"
            />
          ) : question.type === 'select' ? (
            <select
              name={`answer_${currentQuestion}`}
              value={
                answers.find(
                  (answer) => answer.questionIndex === currentQuestion
                )?.value || ''
              }
              onChange={handleAnswerChange}
              className="border-gray-300 mb-4 rounded border p-2"
            >
              <option value="">Select an option</option>
              {question.answers?.map((answer, index) => (
                <option key={index} value={answer}>
                  {answer}
                </option>
              ))}
            </select>
          ) : question.type === 'date' ? (
            <div>
              <label htmlFor={`start_date_${currentQuestion}`}>
                Start Date:
              </label>
              <input
                type="date"
                name={`start_date_${currentQuestion}`}
                value={dateRange.startDate}
                onChange={handleDateChange}
              />
              <br />
              <label htmlFor={`end_date_${currentQuestion}`}>End Date:</label>
              <input
                type="date"
                name={`end_date_${currentQuestion}`}
                value={dateRange.endDate}
                onChange={handleDateChange}
              />
            </div>
          ) : (
            question.answers?.map((answer, index) => (
              <div key={index} className="mb-2 flex items-center">
                <input
                  type={question.type}
                  name={`answer_${currentQuestion}`}
                  value={answer}
                  checked={
                    answers.find((a) => a.questionIndex === currentQuestion)
                      ?.value === answer
                  }
                  onChange={handleAnswerChange}
                  className="mr-2"
                />
                <label
                  htmlFor={`answer_${currentQuestion}`}
                  className="text-gray-700"
                >
                  {answer}
                </label>
              </div>
            ))
          )}
          {/* Render subquestions if any */}
          {question.subQuestions &&
            question.subQuestions.map((subQuestion, index) => {
              const isSubQuestionVisible = answers.some(
                (answer) =>
                  answer.questionIndex === currentQuestion &&
                  answer.value === subQuestion.title
              );

              if (isSubQuestionVisible) {
                return (
                  <div key={index} className="mb-4">
                    <h3 className="mb-2 text-lg font-bold">
                      {subQuestion.title}
                    </h3>
                    <p className="text-gray-500 mb-2">
                      {subQuestion.description}
                    </p>
                    {/* Render subquestion input based on type */}
                    {subQuestion.type === 'text' ? (
                      <input
                        type="text"
                        name={`answer_${currentQuestion}_${index}`}
                        value={
                          answers.find(
                            (answer) =>
                              answer.questionIndex === currentQuestion &&
                              answer.value === subQuestion.title
                          )?.value || ''
                        }
                        onChange={handleAnswerChange}
                        className="border-gray-300 mb-2 rounded border p-2"
                      />
                    ) : subQuestion.type === 'select' ? (
                      <select
                        name={`answer_${currentQuestion}_${index}`}
                        value={
                          answers.find(
                            (answer) =>
                              answer.questionIndex === currentQuestion &&
                              answer.value === subQuestion.title
                          )?.value || ''
                        }
                        onChange={handleAnswerChange}
                        className="border-gray-300 mb-2 rounded border p-2"
                      >
                        <option value="">Select an option</option>
                        {subQuestion.answers?.map((answer, subIndex) => (
                          <option key={subIndex} value={answer}>
                            {answer}
                          </option>
                        ))}
                      </select>
                    ) : subQuestion.type === 'date' ? (
                      <div>
                        <label
                          htmlFor={`start_date_${currentQuestion}_${index}`}
                          className="text-gray-700 mb-1 block text-sm font-medium"
                        >
                          Start Date:
                        </label>
                        <input
                          type="date"
                          name={`start_date_${currentQuestion}_${index}`}
                          value={dateRange.startDate}
                          onChange={handleDateChange}
                          className="border-gray-300 mb-2 rounded-md p-2"
                        />
                        <br />
                        <label
                          htmlFor={`end_date_${currentQuestion}_${index}`}
                          className="text-gray-700 mb-1 block text-sm font-medium"
                        >
                          End Date:
                        </label>
                        <input
                          type="date"
                          name={`end_date_${currentQuestion}_${index}`}
                          value={dateRange.endDate}
                          onChange={handleDateChange}
                          className="border-gray-300 rounded-md p-2"
                        />
                      </div>
                    ) : (
                      subQuestion.answers?.map((answer, subIndex) => (
                        <div key={subIndex} className="mb-2 flex items-center">
                          <input
                            type={subQuestion.type}
                            name={`answer_${currentQuestion}_${index}`}
                            value={answer}
                            checked={
                              answers.find(
                                (a) =>
                                  a.questionIndex === currentQuestion &&
                                  a.value === subQuestion.title
                              )?.value === answer
                            }
                            onChange={handleAnswerChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`answer_${currentQuestion}_${index}`}
                            className="text-gray-700"
                          >
                            {answer}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                );
              }
              return null;
            })}

          <div className=" flex h-full w-full items-end">
            <div className=" flex h-fit w-40 justify-between">
              {currentQuestion > 0 && (
                <button
                  type="button"
                  onClick={previousQuestion}
                  className={buttonClass}
                >
                  Previous
                </button>
              )}
              {currentQuestion < questions.length - 1 && (
                <button
                  type="button"
                  onClick={nextQuestion}
                  className={buttonClass}
                >
                  Next
                </button>
              )}
            </div>
            {currentQuestion === questions.length - 1 && (
              <div className="flex w-full justify-end">
                <button type="submit" className={buttonClass}>
                  Submit
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default MultiPartForm;
