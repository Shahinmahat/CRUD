import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TaskList.css';

const TaskList = ({ tasks, updateTask,setTasks }) => {
  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // default sort order
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  useEffect(()=>{
    setSortedTasks(tasks);
  },[tasks])

  const handleSort = (option) => {
    setSortOption(option);

    // Toggle between ascending and descending order
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    if (option === 'priority') {
      const sortedByPriority = [...sortedTasks].sort((a, b) => {
        const priorityOrder = {
          high: 1,
          medium: 2,
          low: 3
        };
        return sortOrder === 'asc'
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      });
      setSortedTasks(sortedByPriority);
    } else if (option === 'dueDate') {
      const sortedByDueDate = [...sortedTasks].sort((a, b) =>
        sortOrder === 'asc'
          ? new Date(a.dueDate) - new Date(b.dueDate)
          : new Date(b.dueDate) - new Date(a.dueDate)
      );
      setSortedTasks(sortedByDueDate);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = sortedTasks.filter((task) => task.id !== taskId);
    setSortedTasks(updatedTasks);

     // Update the tasks state as well
  const updatedAllTasks = tasks.filter((task) => task.id !== taskId);
  setTasks(updatedAllTasks);

  // Update local storage with the new tasks list
  localStorage.setItem('lists', JSON.stringify(updatedAllTasks));
  };
  
  

  const handleEdit = (taskId) => {
    navigate(`/list/${taskId}`); // Navigate to the edit page
  };

  const filteredTasks = sortedTasks.filter(
    (task) =>
      (task.title &&
        task.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.description &&
        task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  // Create a function to paginate the data
  const paginate = (tasks, page, perPage) => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return tasks.slice(startIndex, endIndex);
  };

  // Get the tasks to display on the current page
  const displayedTasks = paginate(filteredTasks, currentPage, itemsPerPage);

  return (
    <div className='task-list-container'>
      <h2>Task List</h2>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by title or description'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className='sort-container'>
        <label>Sort by:</label>
        <select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value=''>Select Sorting Option</option>
          <option value='priority'>Priority</option>
          <option value='dueDate'>Due Date</option>
        </select>
        <button onClick={() => handleSort(sortOption)}>Toggle Order</button>
      </div>
      <table className='task-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.dueDate}</td>
              <td>
                <button onClick={() => handleEdit(task.id)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
