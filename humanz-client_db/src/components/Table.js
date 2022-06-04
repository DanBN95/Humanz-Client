import React from 'react'
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/usersSlice'
import { FaTrashAlt } from "react-icons/fa";
export default function Table({ deleteUser, getGeoIP }) {

    const users = useSelector(selectUsers);
    const { colTitles, usersArray } = users;

    const renderTableHeaders = (item, index) => {
        return (
            <th>
                <strong>{item}</strong>
            </th>
        )
    }

    const onMouseOver = (index) => {
        console.log("mouse over: ", index);
        getGeoIP(usersArray[index].IP);
    }

    const renderTableData = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Email}</td>
                <td>{item.ID}</td>
                <td>{item.Phone}</td>
                <td 
                onMouseUp={() => onMouseOver(index)}
                >{item.IP}</td>
                <td>
                    <FaTrashAlt size={20} color={"black"} onClick={() => handleDelete(index)} />
                </td>
            </tr>
        )
    }

    const handleDelete = (index) => {
        deleteUser(usersArray[index]._id);
    }

  return (
    <div className='table-container'>
        <table className='table'>
            <thead>
                <tr>
                    {colTitles.map(renderTableHeaders)}
                    <th>
                        <strong>Actions</strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                {usersArray.map(renderTableData)}
            </tbody>
        </table>
    </div>
  )
}
