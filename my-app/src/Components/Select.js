import React, { useState } from "react";
import Trash from "../Components/Trash.svg"
import Swal from 'sweetalert2'

export default function App() {
    const [branch, setBranch] = useState("CSE");
    const [semester, setSemester] = useState(null);
    const [courses, setCourses] = useState([]);
    const [sgpa, setSGPA] = useState(null);
    const [isCoursesLoaded, setIsCoursesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [year, setYear] = useState(null);

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
            { subject: "Data Structures Lab", credits: 1 },
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

    const gradePointsMap = {
        "90 - 100": 10,
        "80 - 89": 9,
        "70 - 79": 8,
        "60 - 69": 7,
        "50 - 59": 6,
        "40 - 49": 5,
        "Below 40": 4,
    };

    const populateCourses = () => {
        if (branch === "Other") {
            // Display a single blank row for adding custom courses
            setCourses([{ subject: "", credits: 0, marks: "" }]);
            setIsCoursesLoaded(true); // Mark courses as loaded
        } else if (branch === "CSE" && semester) {
            // Load predefined courses for CSE
            setCourses(semesterWiseCredits[semester] || []);
            setIsCoursesLoaded(true); // Mark courses as loaded
        } else {
            // Reset courses if branch or semester is invalid
            setCourses([]);
            setIsCoursesLoaded(false);
        }
    };


    const getMotivationalMessage = (sgpa: number) => {
        if (sgpa >= 9) return {
            emoji: '🎯',
            title: 'Exceptional Performance!',
            message: 'You are among the top performers. Keep maintaining this excellence!'
        };
        if (sgpa >= 8) return {
            emoji: '⭐',
            title: 'Outstanding Work!',
            message: 'Your hard work is clearly showing. Keep this momentum!'
        };
        if (sgpa >= 7) return {
            emoji: '📈',
            title: 'Good Progress!',
            message: 'You\'re doing well! Push a little more for excellence.'
        };
        if (sgpa >= 6) return {
            emoji: '💪',
            title: 'Steady Progress!',
            message: 'Keep working hard, you\'re on the right path!'
        };
        return {
            emoji: '🎯',
            title: 'Time to Focus',
            message: 'Every challenge is an opportunity to improve!'
        };
    };

    const handleInputChange = (index, field, value) => {
        setCourses((prevCourses) => {
            const updatedCourses = [...prevCourses];
            updatedCourses[index][field] = value;
            return updatedCourses;
        });
    };

    const addSubject = () => {
        setCourses((prevCourses) => [
            ...prevCourses,
            { subject: "", credits: 0, marks: "" },
        ]);
    };

    const deleteSubject = (index) => {
        setCourses((prevCourses) => prevCourses.filter((_, i) => i !== index));
    };

    const calculateSGPA = () => {
        if (courses.length === 0) {
            Swal.fire({
                title: 'Oops!',
                text: 'Please add at least one subject to calculate SGPA!',
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
            return;
        }

        let totalPoints = 0;
        let totalCredits = 0;

        // Check if all marks are filled
        for (const course of courses) {
            if (!course.marks) {
                Swal.fire({
                    title: 'Add Marks',
                    icon: 'question',
                    confirmButtonText: 'Ok'
                })
                return;
            }

            const gradePoint = gradePointsMap[course.marks] || 0;
            totalPoints += gradePoint * course.credits;
            totalCredits += course.credits;
        }

        const sgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        setSGPA(sgpa.toFixed(2));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 ">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">SGPA Calculator</h1>

            <div className="mb-4 flex space-x-6">
                <div className="mb-4">
                    <label className="block mb-2 font-medium flex justify-center">Branch</label>
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
                    <label className="block mb-2 font-medium flex justify-center">Year</label>
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


                <div className="mb-4">
                    <label className="block mb-2 font-medium flex justify-center">Semester</label>
                    <select
                        value={semester}
                        onChange={(e) => setSemester(parseInt(e.target.value))}
                        className="border border-gray-300 rounded px-3 py-2"
                        disabled={!year} // Disable the dropdown if no year is selected
                    >
                        <option value="">Select Semester</option>
                        {year &&
                            Array.from({ length: 2 }, (_, i) => (year - 1) * 2 + i + 1).map((sem) => (
                                <option key={sem} value={sem}>
                                    Semester {sem}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            <button
                onClick={populateCourses}
                className="bg-purple-500 text-white px-4 py-2 rounded mb-6 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
                Load Courses
            </button>

            <div className="w-xl rounded-lg p-6">
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

                            <select
                                value={course.credits}
                                onChange={(e) =>
                                    handleInputChange(index, "credits", parseFloat(e.target.value))
                                }
                                className="border border-gray-300 rounded px-3 py-2 w-24"
                            >
                                <option value="">Select Credits</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((credit) => (
                                    <option key={credit} value={credit}>
                                        {credit}
                                    </option>
                                ))}
                            </select>
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
                                className="delete bg-red-500 hover:bg-red-600 px-2 py-2 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 glow-effect"
                            >
                                <img src={Trash} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))}

                {isCoursesLoaded && (
                    <div className="add-btn">
                        <button
                            onClick={addSubject}
                            className="bg-green-500 text-white px-4 py-2 rounded mb-4 mr-2"
                        >
                            Add Subject
                        </button>

                        <button
                            onClick={calculateSGPA}
                            className="bg-blue-500 text-white px-5 py-2 rounded ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isLoading ? "Calculating..." : "Calculate SGPA"}
                        </button>
                    </div>
                )}

                {sgpa !== null && (
                    <div className="Sgpa mt-6 bg-blue-300 text-blue-800 p-4 rounded">
                        <div>
                            <h3 className="text-lg font-medium">Your Estimated SGPA</h3>
                            <h3 className="text-lg font-medium">{sgpa}</h3>
                        </div>

                        <div className="Motivation">
                            <p className="text-xl font-semibold text-[#843AB1]">
                                {getMotivationalMessage(sgpa).emoji}  {getMotivationalMessage(sgpa).title}
                            </p>
                            <p className="text-[#843AB1]/80 text-sm">
                                {getMotivationalMessage(sgpa).message}
                            </p>
                        </div>


                    </div>
                )}
            </div>
        </div>
    );
}
