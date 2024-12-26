import React, { useState } from "react";

export default function App() {
  const [courses, setCourses] = useState([]);
  const [sgpa, setSGPA] = useState(null);

  // Predefined subject credits and names for each semester
  const semesterWiseCredits = {
    1: [
      { subject: "Math(DE & LA)", credits: 4 },
      { subject: "Physics", credits: 3 },
      { subject: "Science Elective ", credits: 2 },
      { subject: "Engineering Elective", credits: 2 },
      { subject: "Science of Living Systems", credits: 2 },
      { subject: "Environmental Science", credits: 2 },
      { subject: "Physics Lab", credits: 1 },
      { subject: "Programming Lab ", credits: 4 },
      { subject: "Engineering Drawing & Graphics", credits: 1 },
    ],
    2: [
      { subject: "Chemistry", credits: 3 },
      { subject: "Math(T & NA)", credits: 4 },
      { subject: "English", credits: 2 },
      { subject: "Basic Electronics", credits: 2 },
      { subject: "Basic Electrical Engineering ", credits: 2 },
      { subject: "HASS Elective I", credits: 2 },
      { subject: "Chemistry Lab", credits: 1 },
      { subject: "Engineering Lab(BEE) ", credits: 1 },
      { subject: "Workshop", credits: 1 },
      { subject: "Sports & Yoga", credits: 1 },
      { subject: "Communication Lab", credits: 1 },
    ],
    3: [
      { subject: "Scientific and Technical Writing", credits: 2 },
      { subject: "Probability and Statistics", credits: 4 },
      { subject: "Industry 4.0 Technologies", credits: 2 },
      { subject: "Data Structures", credits: 4 },
      { subject: "Digital Systems Design", credits: 3 },
      { subject: "Automata Theory and Formal Languages", credits: 4 },
      { subject: "Data Structures Lab", credits: 1},
      { subject: "Digital Systems Design Lab", credits: 1 },
    ],
    4: [
      { subject: "HASS Elective II", credits: 2 },
      { subject: "Discrete Mathematics", credits: 4 },
      { subject: "Operating Systems", credits: 3 },
      { subject: "Object Oriented Programming using Java", credits: 3 },
      { subject: "Database Management Systems", credits: 3 },
      { subject: "Computer Organization and Architecture", credits: 4 },
      { subject: "Operating Systems Lab", credits: 1 },
      { subject: "Object Oriented Programming using Java Lab", credits: 1 },
      { subject: "Database Management Systems Lab", credits: 1 },
      { subject: "Vocational Electives", credits: 1 },
    ],
    5: [
      { subject: "Engineering Economics & Costing", credits: 3 },
      { subject: "Design and Analysis of Algorithms", credits: 3 },
      { subject: "Software Engineering", credits: 4 },
      { subject: "Computer Networks", credits: 3 },
      { subject: "Professional Elective-I", credits: 3 },
      { subject: "Professional Elective-II", credits: 3 },
      { subject: "Algorithms Laboratory", credits: 1 },
      { subject: "Computer Networks Laboratory", credits: 1 },
      { subject: "K-Explore Open Elective-I", credits: 1 },
    ],
    6: [
      { subject: "HASS Elective-III", credits: 3 },
      { subject: "Machine Learning", credits: 4 },
      { subject: "Artificial Intelligence", credits: 3 },
      { subject: "Professional Elective-III", credits: 3 },
      { subject: "Open Elective-II/MI-1", credits: 3 },
      { subject: "Universal Human Values", credits: 3 },
      { subject: "Artificial Intelligence Laboratory", credits: 1 },
      { subject: "Applications Development Laboratory", credits: 2 },
      { subject: "Mini Project", credits: 2 },
    ],
    7: [
      { subject: "Professional Elective-IV", credits: 3 },
      { subject: "Engineering Professional Practice", credits: 2 },
      { subject: "Open Elective-III/ (MI-II)", credits: 3 },
      { subject: "Minor-III(Optional)", credits: 3 },
      { subject: "Minor-IV(Optional)", credits: 3 },
      { subject: "Project-I", credits: 5 },
      { subject: "Internship", credits: 2 },
      { subject: "MI-(Computing Laboratory)", credits: 2 },
    ],
    8: [
      { subject: "Professional Elective-V", credits: 3 },
      { subject: "Open Elective-IV/Minor-V (Optional)", credits: 3 },
      { subject: "Minor-VI", credits: 3 },
      { subject: "Project-II", credits: 9 },
    ],
  };

  // Populate courses based on selected semester
  const populateCoursesForSemester = (semester) => {
    const subjects = semesterWiseCredits[semester];
    if (subjects) {
      setCourses(subjects.map((subj) => ({ marks: "", credits: subj.credits, subject: subj.subject })));
    } else {
      alert("No subjects found for the selected semester.");
    }
  };

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  // Map marks to grade points
  const getGradePoint = (marks) => {
    if (marks < 40) return 0; // F
    if (marks >= 40 && marks < 50) return 4; // D
    if (marks >= 50 && marks < 60) return 5; // C
    if (marks >= 60 && marks < 70) return 6; // B
    if (marks >= 70 && marks < 80) return 7; // A
    if (marks >= 80 && marks < 90) return 8; // E
    if (marks >= 90 && marks <= 100) return 10; // O
    return 0; // Invalid marks
  };

  // Calculate SGPA
  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const marks = parseFloat(course.marks);
      const creditHours = parseFloat(course.credits);

      if (!isNaN(marks) && !isNaN(creditHours) && marks >= 0 && marks <= 100) {
        const gradePoint = getGradePoint(marks);
        totalPoints += gradePoint * creditHours;
        totalCredits += creditHours;
      } else {
        alert("Please enter valid marks (0-100).");
        return;
      }
    }

    const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setSGPA(sgpa.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        SGPA Calculator (Semester-Wise)
      </h1>
      <div className="flex space-x-4 mb-6">
        {Object.keys(semesterWiseCredits).map((semester) => (
          <button
            key={semester}
            onClick={() => populateCoursesForSemester(semester)}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:bg-purple-800 focus:outline-none"
          >
            Semester {semester}
          </button>
        ))}
      </div>
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        {courses.map((course, index) => (
          <div key={index} className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">{course.subject}</label>
            <div className="flex space-x-4 items-center">
              <input
                type="number"
                placeholder={`Marks (0-100)`}
                value={course.marks}
                onChange={(e) =>
                  handleInputChange(index, "marks", e.target.value)
                }
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder={`Credits for ${course.subject}`}
                value={course.credits}
                readOnly
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            onClick={calculateSGPA}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            Calculate SGPA
          </button>
        </div>
        {sgpa !== null && (
          <div className="mt-6 bg-blue-100 text-blue-800 p-4 rounded-md">
            <h3 className="text-lg font-medium">Your SGPA: {sgpa}</h3>
          </div>
        )}
      </div>
    </div>
  );
}