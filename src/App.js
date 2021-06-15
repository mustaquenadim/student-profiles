import React, { useEffect, useState } from 'react';
import './App.css';
import Profile from './components/Profile/Profile'

const App = () => {
    const [students, setStudents] = useState([]);
    const [nameSearch, setNameSearch] = useState([]);
    const [tagSearch, setTagSearch] = useState([]);
    useEffect(() => {
        fetch('https://api.hatchways.io/assessment/students')
        .then(response => response.json())
        .then(data => {
            setStudents(data.students);
        });
    }, [])
    
    const handleAddTag = (event, id) => {
        if (event.key === "Enter" && event.target.value !== "") {
            setStudents(students.map((row, i) => {
                if (row.id === id) {
                    let newTag = row.tags ? [...row.tags] : [];
                    return {
                        ...row, tags: [...newTag, event.target.value]
                    };
                } else {
                    return row;
                }
            }));
            event.target.value = "";
        }
    };
    const handleNameSearch = (event) => {
        setNameSearch(event.target.value);
    }
    const handleTagSearch = (event) => {
        setTagSearch(event.target.value);
    }
    console.log(students);
    return (
        <div className="parent">
            <div className="child border" style={{borderRadius: "10px"}}>
                <div className="search">
                    <input type="search" placeholder='Search By name' onChange={handleNameSearch} />
                    <input type="search" placeholder='Search By tag' onChange={handleTagSearch} />
                </div>
                {students.filter((value) => {
                    if (nameSearch == '') {
                        console.log(value);
                        return value;
                    } else if (value.firstName.toLowerCase().includes(nameSearch.toLowerCase()) || value.lastName.toLowerCase().includes(nameSearch.toLowerCase())) {
                        console.log(value);
                        return value;
                    }
                }).map((data) => (
                    <Profile key={data.id} data={data} handleAddTag={handleAddTag}></Profile>
                ))}
            </div>
        </div>
    );
};

export default App;
