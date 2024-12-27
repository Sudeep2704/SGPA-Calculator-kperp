import React, { useState } from "react";

export default function App() {
  const [branch, setBranch] = useState("CSE");
  const [year, setYear] = useState(null);
  const [semester, setSemester] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sgpa, setSGPA] = useState(null);

  const marksOptions = [
    "90 - 100",
    "80 - 89",
    "70 - 79",
    "60 - 69",
    "50 - 59",
    "40 - 49",
    "Below 40",
  ];

  const semesterWiseCredits = {
    1: [
      { subject: "Math(DE & LA)", credits: 4 },
      { subject: "Physics", credits: 3 },
      // Add more subjects here...
    ],
    2: [
      { subject: "Chemistry", credits: 3 },
      { subject: "Math(T & NA)", credits: 4 },
      // Add more subjects here...
    ],
  };

  const gradePointsMap = {
    "90 - 100": 10,
    "80 - 89": 8,
    "70 - 79": 7,
    "60 - 69": 6,
    "50 - 59": 5,
    "40 - 49": 4,
    "Below 40": 0,
  };

  const populateCourses = () => {
    if (branch === "CSE" && semester) {
      setCourses(semesterWiseCredits[semester] || []);
    } else {
      setCourses([]);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const addSubject = () => {
    setCourses([...courses, { subject: "", credits: 0, marks: "" }]);
  };

  const deleteSubject = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const course of courses) {
      const gradePoint = gradePointsMap[course.marks] || 0;
      totalPoints += gradePoint * course.credits;
      totalCredits += course.credits;
    }

    const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setSGPA(sgpa.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        SGPA Calculator
      </h1>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Branch</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="CSE">CSE</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Year</label>
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setSemester(null);
          }}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Year</option>
          {[1, 2, 3, 4].map((y) => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>
      </div>

      {year && (
        <div className="mb-4">
          <label className="block mb-2 font-medium">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Semester</option>
            <option value={2 * year - 1}>Sem {2 * year - 1}</option>
            <option value={2 * year}>Sem {2 * year}</option>
          </select>
        </div>
      )}

      <button
        onClick={populateCourses}
        className="bg-purple-500 text-white px-4 py-2 rounded mb-6"
      >
        Load Courses
      </button>

      <div className="w-full max-w-lg bg-white shadow-md rounded p-6">
        {courses.map((course, index) => (
          <div key={index} className="mb-4">
            <div className="flex space-x-4">
              <input
                type="text"
                value={course.subject}
                onChange={(e) =>
                  handleInputChange(index, "subject", e.target.value)
                }
                placeholder="Subject"
                className="border border-gray-300 rounded px-3 py-2 flex-1"
              />
              <input
                type="number"
                value={course.credits}
                onChange={(e) =>
                  handleInputChange(index, "credits", parseFloat(e.target.value))
                }
                placeholder="Credits"
                className="border border-gray-300 rounded px-3 py-2 w-24"
              />
              <select
                value={course.marks}
                onChange={(e) =>
                  handleInputChange(index, "marks", e.target.value)
                }
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Marks</option>
                {marksOptions.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <button
                onClick={() => deleteSubject(index)}
                className="bg-red-500 text-white px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {branch === "Other" && (
          <button
            onClick={addSubject}
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Subject
          </button>
        )}

        <button
          onClick={calculateSGPA}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Calculate SGPA
        </button>

        {sgpa !== null && (
          <div className="mt-6 bg-blue-100 text-blue-800 p-4 rounded">
            <h3 className="text-lg font-medium">Your SGPA: {sgpa}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
