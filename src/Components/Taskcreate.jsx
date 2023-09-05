import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  "./Taskcreate.css"

const Taskcreate = ({ addTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.priority || !formData.dueDate) {
        alert('Please fill out all required fields.');
        return;
      }
  
      addTask({
        ...formData,
        id: new Date().getUTCMilliseconds()
      });
  
      setFormData({
        title: '',
        description: '',
        priority: '',
        dueDate: ''
      });

      navigate('/list')
    };

  return (
    <div>
      <h2 className='create_title'>Create New Task</h2>
      <form onSubmit={handleSubmit} className='task-form'>
        <table>
          <tbody>
            <tr>
              <td><label>Title:</label></td>
              <td><input type="text" name="title" value={formData.title} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td><textarea name="description" value={formData.description} onChange={handleInputChange}></textarea></td>
            </tr>
            <tr>
              <td><label>Priority:</label></td>
              <td>
                <select name="priority" value={formData.priority} onChange={handleInputChange}>
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Due Date:</label></td>
              <td><input type="date" name="dueDate" value={formData.dueDate} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td><button type="submit">Add Task</button></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default Taskcreate;
