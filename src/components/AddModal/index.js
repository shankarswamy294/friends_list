import React from 'react';

const AddModal = ({onChange, successCallback, failureCallBack}) =>{
    return <div className={"delete-container"}>
                <div className={""}>
                    <input className="form-control" style={{width: '80%'}} onChange={(e)=>onChange(e.target.value)} placeholder="Enter your friends name"/>
                </div>
                <div>
                    <button className={"option-box button"} onClick={()=>successCallback()}>
                        Add
                    </button>
                    <button className={"option-box button"} onClick={()=>failureCallBack()} >
                        No
                    </button>
                </div>
            </div>
    };

export default AddModal;