import React, { useEffect, useState } from 'react';
import './App.css';
import Profile from './components/Profile/Profile';

const App = () => {
  const [students, setStudents] = useState([]);
  const [nameSearch, setNameSearch] = useState([]);
  const [tagSearch, setTagSearch] = useState([]);
  useEffect(() => {
    fetch('https://api.hatchways.io/assessment/students')
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.students);
      });
  }, []);

  const handleAddTag = (event, id) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setStudents(
        students.map((row, i) => {
          if (row.id === id) {
            let newTag = row.tags ? [...row.tags] : [];
            return {
              ...row,
              tags: [...newTag, event.target.value],
            };
          } else {
            return row;
          }
        })
      );
      event.target.value = '';
    }
  };

  return (
    <div className='parent'>
      <div className='child border' style={{ borderRadius: '10px' }}>
        <div className='search'>
          <input type='search' placeholder='Search By name' onChange={(e) => setNameSearch(e.target.value.toLowerCase())} />
          <input type='search' placeholder='Search By tag' onChange={(e) => setTagSearch(e.target.value.toLowerCase())} />
        </div>
        {students
          .filter((value) => {
            if (tagSearch != '') {
              return value?.tags?.includes(tagSearch);
            } else if (nameSearch == '' && tagSearch == '') {
              return value;
            } else if (nameSearch != '') {
              if (value.firstName.toLowerCase().includes(nameSearch.toLowerCase()) || value.lastName.toLowerCase().includes(nameSearch.toLowerCase())) {
                return value;
              }
            }
          })
          .map((data) => (
            <Profile key={data.id} data={data} handleAddTag={handleAddTag}></Profile>
          ))}
      </div>
    </div>
  );
};

export default App;
