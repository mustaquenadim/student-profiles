import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Profile = ({ data, handleAddTag }) => {
  const [isHidden, setIsHidden] = useState(true);
  const { id, pic, firstName, lastName, email, company, skill, grades, tags } = data;
  let sum = 0;
  grades?.map((grade) => (sum += Number(grade)));
  const average = sum / grades?.length;
  const toggle = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className='container border-bottom'>
      <div className='row'>
        <div className='col-lg-3 d-flex justify-content-center align-items-center'>
          <img className='border rounded-circle w-75' src={pic} alt={lastName} />
        </div>
        <div className='col-lg-8'>
          <h1>
            {firstName} {lastName}
          </h1>
          <div className='container lh-1'>
            <p>Email: {email}</p>
            <p>Company: {company}</p>
            <p>Skill: {skill}</p>
            <p>Average: {average}%</p>
            <dl className='d-flex'>
              {tags?.map((tag, index) => (
                <dd key={index} className='tag'>
                  {tag}
                </dd>
              ))}
            </dl>
            <input type='text' placeholder='Add a tag' id={id} onKeyUp={(e) => handleAddTag(e, id)} />
          </div>
        </div>
        <div className='col-lg-1 my-auto'>
          <button className='btn' onClick={toggle}>
            <span>{isHidden ? <FaPlus className='icon' /> : <FaMinus className='icon' />}</span>
          </button>
        </div>
      </div>
      <div>
        {!isHidden && (
          <ul className='list-group lh-1'>
            {grades.map((test, index) => (
              <li key={index} className='list-group-item border-0'>
                Test {index + 1}: {test}%
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
