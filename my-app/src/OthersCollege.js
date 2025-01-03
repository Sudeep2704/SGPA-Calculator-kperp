import React, { useState } from "react";

export default function App() {
  const [courses, setCourses] = useState([{ marks: "", credits: "" }]);
  const [sgpa, setSGPA] = useState(null);

  // Function to add a new course
  const addCourse = () => {
    setCourses([...courses, { marks: "", credits: "" }]);
  };

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  // Function to map marks to grade points
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

  // Function to calculate SGPA
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
        alert("Please enter valid marks (0-100) and credit hours.");
        return;
      }
    }

    const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setSGPA(sgpa.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        SGPA Calculator (Marks-Based)
      </h1>
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {courses.map((course, index) => (
          <div key={index} className="flex space-x-4 items-center mb-4">
            <input
              type="number"
              placeholder="Marks (0-100)"
              value={course.marks}
              onChange={(e) =>
                handleInputChange(index, "marks", e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              placeholder="Credit Hours"
              value={course.credits}
              onChange={(e) =>
                handleInputChange(index, "credits", e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <div className="flex justify-between mt-4">
          <button
            onClick={addCourse}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none"
          >
            Add Course
          </button>
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





