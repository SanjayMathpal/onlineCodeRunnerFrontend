import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./homepage.css"

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [language, setLanguage] = useState("");
    const [stdin, setStdin] = useState("");
    const [sourceCode, setSourceCode] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = {username, language, stdin, sourceCode}; 
        try {
            await axios.post('https://online-code-runner-backend.vercel.app/api/submit', formData);
            alert('Submitted successfully!');
            setUsername('');
            setLanguage('');
            setStdin('');
            setSourceCode('');
            navigate("/output");

        } catch (error) {
            console.error('Error submitting:', error);
            alert('An error occurred while submitting. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Code Submission Form</h1>
            <form className="submission-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Preferred Code Language:</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} required>
                        <option value="">Select Language</option>
                        <option value="C++">C++</option>
                        <option value="Java">Java</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Standard Input:</label>
                    <textarea value={stdin} onChange={(e) => setStdin(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Source Code:</label>
                    <textarea value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HomePage;
