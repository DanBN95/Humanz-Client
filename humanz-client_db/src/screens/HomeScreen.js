import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import humanzServer from '../api/humanzServer';
import { IoIosAddCircle } from "react-icons/io";
import SearchBar from '../components/SearchBar'
import Table from '../components/Table';
import { selectUsers, updateUsers } from '../features/usersSlice';
import AddUserModal from '../components/AddUserModal';
import AlertMsg from '../components/AlertMsg';
import apiGeo from '../api/apiGeo';
import GeoIPModal from '../components/GeoIPModal';
import db_bg from '../assets/db-bg.png'

function HomeScreen() {

    const dispatch = useDispatch();

    const [saveLastUserId, setSaveLastUserId] = useState(null);
    const [saveBeforeLastId, setSaveBeforeLastId] = useState(null);

    const users = useSelector(selectUsers);
    const [currentPage, setCurrentPage] = useState(1);

    const [status, setStatus] = useState('Deleted');
    const [isUpdated, setIsUpdated] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);

    const [geoIP, setGeoIP] = useState({
        country: '',
        city: '',
        org: ''
    });
    const [showGeoIpModal, setShowGeoIpModal] = useState(false);

    const getUsers = async () => {
        console.log("Get users from server");
        await humanzServer.get('/', {
            params: {
                lastID: saveLastUserId
            }
        })
        .then(res => {
            setSaveBeforeLastId(saveLastUserId);
            setSaveLastUserId(res.data.userLastID);
            dispatch(updateUsers(res.data.allUsers));
        })
        .catch(e => console.log(e))
    }

    useEffect(() => {
        if(!isUpdated)
            getUsers();
    }, [isUpdated, currentPage])

    const deleteUserById = async (userId) => {
        humanzServer.put('/delete-user', {userId})
        .then(res => {
            if(res.data.isDeleted) {
                let tableLen = users.usersArray.length;
                if (users.usersArray[tableLen - 1] === userId) {
                    setSaveLastUserId(saveBeforeLastId);
                }
                setStatus('Deleted');
                setIsUpdated(true);
            }
        })
        .catch(e => console.log(e));
    }

    const addUser = () => {
        setShowAddModal(true);
    }

    const insertUserToDB = async (userInput) => {
        const input_json = JSON.parse(userInput);
        humanzServer.post('/add-user', input_json)
        .then(res => {
            setStatus('Added');
            setIsUpdated(true);
        })
        .catch(e => console.log(e))
    }

    const findUsersByFilter = (filter) => {
        if (filter) {
            const filter_json = JSON.parse(filter);
            humanzServer.post('/filter-data', filter_json)
            .then(res => {
                dispatch(updateUsers(res.data.filteredUsers))
            })
            .catch(e => console.log(e.data))
        }   
    }

    const handleCloseModal = () => {
        setIsUpdated(false);
    }

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }

    const goToPrevPage = () => {
        setSaveLastUserId(saveBeforeLastId);
        setCurrentPage((page) => page - 1);
    }

    const getGeoIP = async (ip) => {
        apiGeo.get(`/${ip}`, {
            params: {
                fields: ["status", "message", "country", "city"]
            }
        })
        .then(res => {
            if(res.data.status === 'success') {
            setGeoIP({
                ...geoIP, 
                country: res.data.country,
                city: res.data.city,
                org: res.data.org
            })
                setShowGeoIpModal(true);
            }
        })
        .catch(e => console.log(e))
    }

    const handleGeoIpModalClose = () => {
        setShowGeoIpModal(false);
    }


  return (
    <div className='home-screen-container'>
        
        <div className='top-row-container' style={{ backgroundImage: `url(${db_bg})`, backgroundSize: 'auto'}}>
            <h1>Humanz Client DB</h1>
            <SearchBar findUsersByFilter={findUsersByFilter} />
        </div>
        <div class='add-user-btn'>
            <IoIosAddCircle size={50} color={"#97D2EF"} onClick={addUser} />
        </div>
        {isUpdated && (
            <AlertMsg 
            showModal={isUpdated} 
            handleCloseModal={handleCloseModal} 
            modalText={{
                title: `User is ${status}`,
                body: ""
            }} />
        )}

        {showGeoIpModal && (
            <GeoIPModal showModal={showGeoIpModal} handleCloseModal={handleGeoIpModalClose} modalText={{ title: `${geoIP.city}, ${geoIP.country}`, body: geoIP.org}} />
        )}

        <AddUserModal isOpen={showAddModal} setIsOpen={setShowAddModal} insertUser={insertUserToDB} />
        <div className='table-container'>
            <Table deleteUser={deleteUserById} getGeoIP={getGeoIP} />
        </div>
        <div className='pagination'>
            <button
             className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
             onClick={goToPrevPage}
            >
                prev
            </button>
            <button
             className={`next ${currentPage === users?.usersArray.length - 1 ? 'disabled' : ''}`}
             onClick={goToNextPage}
            >
                next
            </button>
        </div>
    </div>
  )
}

export default HomeScreen