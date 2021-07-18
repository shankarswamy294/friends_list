import React from 'react';

const GenericModal = ({message, successCallback, failureCallBack}) =>{
    return <div className={"delete-container"}>
                <div>{message}</div>
                <div>
                    <button className={"option-box button"} onClick={()=>successCallback()}>
                        Yes
                    </button>
                    <button className={"option-box button"} onClick={()=>failureCallBack()} >
                        No
                    </button>
                </div>
            </div>
    };

export default GenericModal;