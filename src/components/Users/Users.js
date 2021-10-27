import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    const handleDeleteUser = (id) => {
        const proceed = window.confirm('Are you sure,You want to detete?');
        if (proceed) {
            const url = (`http://localhost:5000/users/${id}`);
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Successfully Deleted')
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers)
                    }
                })
        }
    }
    return (
        <div>
            <h2>Users Available: {users.length}</h2>
            <ul>
                {
                    users.map(user => <li
                        kay={user._id}
                    >
                        Name :  {user.name}   ::   Email : {user.email}
                        <Link to={`/users/update/${user._id}`}> <button>Update</button></Link>
                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;