import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./output.css"

const Output = () => {
    const [snippetData, setSnippetData] = useState([]);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const response = await axios.get('https://online-code-runner-backend.vercel.app/api/output');
                setSnippetData(response.data);
            } catch (error) {
                console.error('Error fetching snippets:', error);
            }
        };
        fetchSnippets();
    }, []);

    const createSubmission = async (snippet) => {
        const encodedSourceCode = btoa(snippet.sourceCode);
        let lId;
        if (snippet.language === "Python") lId = 71;
        if (snippet.language === "C++") lId = 54;
        if (snippet.language === "Java") lId = 62;
        if (snippet.language === "JavaScript") lId = 63;

        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {
                base64_encoded: 'true',
                fields: '*'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '7a36f48934mshdd99fac113798a6p1c06b8jsn84284ee08593',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            },
            data: {
                language_id: lId,
                source_code: encodedSourceCode,
                stdin: snippet.stdin
            }
        };

        try {
            const response = await axios.request(options);
            const options2 = {
                method: 'GET',
                url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}`,
                params: {
                    base64_encoded: 'true',
                    fields: '*'
                },
                headers: {
                    'X-RapidAPI-Key': '7a36f48934mshdd99fac113798a6p1c06b8jsn84284ee08593',
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            };

            try {
                const response2 = await axios.request(options2);
                const outputData = atob(response2.data.stdout);
                const updatedSnippetData = snippetData.map(item => {
                    if (item.timeStamp === snippet.timeStamp) {
                        return { ...item, output: outputData };
                    }
                    return item;
                });
                setSnippetData(updatedSnippetData);
            } catch (error) {
                console.error(error);
            }

        } catch (error) {
            console.error(error);
            alert("Daily limit exceeds")
        }
    }

    return (
        <div className="output-container">
            <h2>Submitted Code</h2>
            <table className="snippet-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Code Language</th>
                        <th>Standard Input</th>
                        <th>Source Code (First 100 chars)</th>
                        <th>Timestamp</th>
                        {
                            snippetData.output && <th>Output</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {snippetData.map((snippet) => (
                        <tr key={snippet.timeStamp}>
                            <td>{snippet.username}</td>
                            <td>{snippet.language}</td>
                            <td>{snippet.stdin}</td>
                            <td>{snippet.sourceCode.slice(0, 100)}</td>
                            <td>{snippet.timeStamp}</td>
                            <td>{snippet.output}</td>
                            <td>
                                <button className="run-button" onClick={() => createSubmission(snippet)}>Run Code</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Output;
