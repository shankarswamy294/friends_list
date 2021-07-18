// global lib imports
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// local imports
import FriendsData from '../../config/dummyFriends.json';
import { PAGE_SIZE } from '../../contants';

// media imports
import deleteIcon from '../../media/icons/delete.png';
import fav from '../../media/icons/fav.png';
import fav_selected from '../../media/icons/fav_selected.png';
import addFriend from '../../media/icons/addFriend.png';
import GenericModal from '../GenericModal';
import Pagination from '../Pagination';
import AddModal from '../AddModal';

const FriendsList = () => {
    const [activePage, setActivePage] = useState(1);
    const [presentFriendsList, setPresentFriendsList] = useState(FriendsData || []);
    const [presentFav, setPresentFav] = useState({});
    const [selectedFriendToDelete, setSelectedFriendToDelete] = useState(false);
    const [searchName, setSearchName] = useState("");
    const [presentFilteredFriendsList, setPresentFilteredFriendsList] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(()=>{
        if(searchName && presentFriendsList){
            setPresentFilteredFriendsList(presentFriendsList.filter(friend=>friend.name.toLowerCase().includes(searchName.toLowerCase())))
        }else{
            setPresentFilteredFriendsList(null)
        }
    },[searchName, presentFriendsList]);

    useEffect(()=>{
        if(presentFriendsList && activePage*PAGE_SIZE > presentFriendsList.length){
            setActivePage([...Array(presentFriendsList.length < PAGE_SIZE ? 1 : Math.ceil(presentFriendsList.length / PAGE_SIZE)).keys()].length);
        }
    },[presentFriendsList, activePage])

    const paginationClickHandler = (page) => {
        setActivePage(page);
    }

    const AddOrRemoveFromFavroites = (name) =>{
        let presentFav_ = {...presentFav};
        if(presentFav_[name]){
            delete presentFav_[name];
            toast.warning(`${name} removed from fav`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        }else{
            presentFav_[name] = true;
            toast.success(`${name} added to fav`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
        setPresentFav(presentFav_)
    }

    const deleteHandler = (index) => {
        setSelectedFriendToDelete(index);
    }

    const deleteConfirmationHandler = () =>{
        let presentFriendsList_ = [...presentFriendsList];
        const name = presentFriendsList[selectedFriendToDelete].name;
        presentFriendsList_.splice(selectedFriendToDelete,1)
        setPresentFriendsList(presentFriendsList_);
        toast.warning(`${name} deleted from friends list`, {
            position: "bottom-right",
            autoClose: 2000,
        });
        setTimeout(()=>setSelectedFriendToDelete(false),0);
        setSearchName(false);
    }

    const addFriendHandler = () => {
        const checkForSameName = presentFriendsList && presentFriendsList.filter(friend=>friend.name===newName.trim());
        if(checkForSameName && checkForSameName.length){
            toast.warning(`You have already added friend with same name.`, {
                position: "bottom-right",
                autoClose: 2000,
            });
        }else{
            const newList = [...presentFriendsList, {name: newName.trim()}];
            setActivePage([...Array(newList.length < PAGE_SIZE ? 1 : Math.ceil(newList.length / PAGE_SIZE)).keys()].length);
            setPresentFriendsList(newList);
            setSearchName(false);
            setNewName(false);
            setShowAddModal(false);
        }
    }

    const FriendsList = searchName ? presentFilteredFriendsList : presentFriendsList;

    return <>
        <div>
            <div className={"friends-list-header"}>
                <div>Friends List</div>
            </div>
            <div className={"friends-list-search"}>
                <input className="form-control" value={searchName ? searchName : ""} onChange={(e)=>setSearchName(e.target.value)} placeholder="Enter your friends name"/>
            </div>
            <div className={"friends-list-container"}>
                {FriendsList && FriendsList.length ? FriendsList.map((friend, index)=>{
                    if(index>=PAGE_SIZE*(activePage-1) && index<PAGE_SIZE*activePage){
                        return <div class="flex-container" key={index}>
                        <div class="flex-child">
                            {friend.name}
                            <div className={"description"}>is your friend</div>
                        </div>
                        
                        <div class="flex-child green">
                            <span>
                                <button className={"option-box"} onClick={()=>AddOrRemoveFromFavroites(friend.name)}>
                                    {presentFav[friend.name] ? <img alt="fav-selected-icon" src={fav_selected} width="20" height="20"/> : <img alt="fav-icon" src={fav} width="20" height="20"/>}
                                </button>
                            </span>
                            <span>
                                <button className={"option-box"} onClick={()=>deleteHandler(index)}>
                                    <img alt="delete-icon" src={deleteIcon} width="20" height="20"/>
                                </button>
                            </span>
                        </div>
                    </div>
                    }
                    return null
                }): <div className={"list-empty"}>
                        No Friends added yet.
                    </div>}
            </div>
        </div>
        {FriendsList && FriendsList.length ?
            <Pagination 
                activePage={activePage}
                data={FriendsList}
                paginationClickHandler={paginationClickHandler}
            /> : null
        }

        <div className={"add-btn-container"}>
            <button className={"option-box"} onClick={()=>setShowAddModal(!showAddModal)}>
                <img alt="add-icon" src={addFriend} width="25" height="25"/>
            </button>
        </div>

        {showAddModal && <AddModal 
            onChange={setNewName}
            successCallback={()=>addFriendHandler()}
            failureCallBack={()=>setShowAddModal(!showAddModal)}
        />}

        {selectedFriendToDelete!==false && 
            <GenericModal 
                message={`Do you want to remove ${FriendsList[selectedFriendToDelete] && FriendsList[selectedFriendToDelete].name} from list?`}
                successCallback={()=>deleteConfirmationHandler(selectedFriendToDelete)}
                failureCallBack={()=>setSelectedFriendToDelete(false)}
            />
        }

        <div className="note-description">Note : Data will get reset on hard refresh as we are storing everything in local state</div>
    </>
}

export default FriendsList;