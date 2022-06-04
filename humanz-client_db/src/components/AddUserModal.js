import React, { useState } from 'react'
import Modal from 'react-modal'
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectUsers } from '../features/usersSlice';

function AddUserModal(props) {

    const {isOpen, setIsOpen, insertUser } = props;
    const [userInput, setUserInput] = useState('');

    const { colTitles } = useSelector(selectUsers);

    const customStyles = {
        content: {
          top: '40%',
          height: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }
    };

    const handleClostBtn = () => {
        setIsOpen(false);
        setUserInput('');
    }

    const handleInsertBtn = () => {
        //validateInsertion();
        insertUser(userInput);
        setUserInput('');
        setIsOpen(false);
    }

    const validateInsertion = () => {
        const splited = userInput.split('\n');
        // console.log(splited);

        if (splited.length <= 7)
        
        console.log(splited);
        if (splited[0] !== '{ ' || splited[splited.length - 1] !== '}') {
            console.log('error in brackets')
            alert('Error in brackets');
        }

        const tempColTitles = [...colTitles];
        let i;
        for (i=1; i<splited.length-1; i++) {
            const rowSplit = splited[i].split('"');
            console.log(rowSplit);

            if (rowSplit[0] !== '"' || rowSplit[4] !== ',') {alert('Missing or Unnecessary quotes');console.log(i); break;};
            
            let index = tempColTitles.indexOf(rowSplit[1]);
            if (index > -1) tempColTitles.splice(index, 1);
            else {alert("Missing user information"); break;}

            if(!(rowSplit[2] === ': ' || rowSplit[2 === ':'])) {alert('Missing colon'); break;};

            if (rowSplit[3].split('.').length !== 4) {alert('Wrong typing of IP'); break;};

        }

        if (i === 6 && tempColTitles.length !== 0) alert("Wrong typing of user information");
        
    }
    
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={() => setIsOpen(false)}
    style={customStyles}
    ariaHideApp={false}
    >
    <div style={{right: 0, position: 'absolute'}}>
        <AiOutlineClose size={24} onClick={handleClostBtn}/>
    </div>
    <h2>Insert new User to User Collection</h2>
    <textarea
    onChange={(e)=>{e.preventDefault(); setUserInput(e.target.value)}}
    value={userInput}
    className='add-user-ta' 
    placeholder='/**
        * Post one document here
            ex:
            {
                "Name": "My Name",
                "Email": "myEmail@email.com",
                "ID": "My ID",
                "Phone": "0501231234"
                "IP": "127.0.0.1"
            }
         */'>
    </textarea>
    <div style={{display:'flex', marginTop: 10, flexDirection: 'row-reverse', right: 0}}>
    <button className='button button-insert' onClick={handleInsertBtn}>Insert</button>
    <button className='button button-cancel' onClick={handleClostBtn}>Cancel</button>
    </div>
    </Modal>
  )
}

export default AddUserModal