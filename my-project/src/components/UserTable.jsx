import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function UserTable() {
  const navigate = useNavigate();
  const [users,setUsers] = useState([]);

  const getUsers = async() =>{
    try {      
      const res = await fetch(`/api/admin/users`);
      const data = await res.json();
      if(data.success === false){
        console.log(data,"This is the users data")
        return;
      } 
      setUsers(data);
    } catch (error) {
      console.log(error,"Eror while fetching user data")
    }
  }
  
  useEffect(()=>{
    getUsers();    
  },[users]);

  const handleEditUser = (id) => {
    navigate(`/admin/edit/${id}`);
  }

  const handleDeleteUser = (id) => {
    console.log(id,"This is handle delete");
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        console.log("Delete confirmed");
        const res = await fetch(`/api/admin/delete/${id}`,{
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json();
        console.log(data);        
      } else {
        console.log("Delete canceled")
      }
    });    
  }



  return (    
    users && <Table striped bordered hover variant='dark' >
      <thead>
        <tr>
          <th>#</th>          
          <th>Username</th>
          <th>Email</th>          
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { users.map((user,index)=>{
          return (
          <tr key={user._id}>
            <td>{index+1}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>            
            <td>
              <FontAwesomeIcon onClick={()=> handleEditUser(user._id)} className='cursor-pointer' icon={faUserPen} /> 
              <FontAwesomeIcon onClick={()=> handleDeleteUser(user._id)} className='ms-4 cursor-pointer' icon={faTrash} />
            </td>         
          </tr>
          )
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;