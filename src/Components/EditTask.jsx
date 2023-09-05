import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './EditTask.css'

const EditTask = ({ tasks, updateTask }) => {
  const [editedTask, setEditedTask] = useState(tasks);
  const navigate = useNavigate();
  const { taskId } = useParams();

  useEffect(() => {
    const taskToEdit = tasks.find(task => task.id === parseInt(taskId));
    if (taskToEdit) {
      setEditedTask(taskToEdit);
    } else {
      navigate('/list'); // Redirect if the task is not found
    }
  }, [tasks, taskId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateTask(editedTask);
    navigate('/list'); // Navigate back to the list page
  };

  const handleCancel = () => {
    navigate('/list'); // Navigate back to the list page without saving
  };

  return (
    <div className='edit-task-container'>
      <h2>Edit Task</h2>
      <form className='edit-form'>
        <table>
          <tbody>
            <tr>
              <td><label>Title:</label></td>
              <td><input type="text" name="title" value={editedTask.title} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td><label>Description:</label></td>
              <td><textarea name="description" value={editedTask.description} onChange={handleInputChange}></textarea></td>
            </tr>
            <tr>
              <td><label>Priority:</label></td>
              <td>
                <select name="priority" value={editedTask.priority} onChange={handleInputChange}>
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label>Due Date:</label></td>
              <td><input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleInputChange} /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type='button' onClick={handleSave}>Save</button>
                <button type='button' onClick={handleCancel}>Cancel</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default EditTask;
