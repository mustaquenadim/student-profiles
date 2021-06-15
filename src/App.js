import React, { useEffect, useState } from 'react';
import './App.css';
import Profile from './components/Profile/Profile'

const App = () => {
    const [students, setStudents] = useState([]);
    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState([]);
    useEffect(() => {
        fetch('https://api.hatchways.io/assessment/students')
        .then(response => response.json())
        .then(data => {
            setStudents(data.students);
            console.log(students);
        });
    }, [])
    const handleAddTag = (event, id) => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
            const stags = students.find(item => item.id === id);
            console.log(stags);
            setStudents([...students, tags]);
        }
    }
    
    console.log(students);
    // console.log(tags);
    const handleNameSearch = (event) => {
        setSearch(event.target.value);
    }
    const handleTagSearch = (event) => {

    }
    return (
        <div className="parent">
            <div className="child border" style={{borderRadius: "10px"}}>
                <div className="search">
                    <input type="search" placeholder='Search By name' onChange={handleNameSearch} />
                    <input type="search" placeholder='Search By tag' onChange={handleTagSearch} />
                </div>
                {students.filter((value) => {
                    if (search == '') {
                        return value;
                    } else if (value.firstName.toLowerCase().includes(search.toLowerCase())||value.lastName.toLowerCase().includes(search.toLowerCase())){
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
