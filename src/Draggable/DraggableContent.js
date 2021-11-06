// REACT COMPONENT
import React, { useEffect, useState } from 'react'

// CREATE DATA
import CreateData from './CreateData'
import Item from './Item'

// LOADASH METHOD
import _ from 'lodash'

// MAIN FUNCTION
 function DraggableContent() {

    // CONSTANT
    const tasks = {
        open:[],
        inprogress:[],
        completed:[]
    }

    // States
    const [item,setItem] = useState( { tasks:[] })
    const [modal,setModal] = useState(false)


    // FUNCTION

    // DRAG OVER FUNCTION
    const onDragOver = (e) =>{
        e.preventDefault()
       
    }

    // DRAG START FUNCTION
    const onDragStart = (e,id) =>{
        e.dataTransfer.setData("id",id)
    }

    // DROP FUNCTION
    const onDrop = (ev,cat)=>{
        let id = ev.dataTransfer.getData("id")
        let tasks = item.tasks.filter((task,key)=>{
            if(key == id){
                task.category = cat
             }
            return task
        })
        setItem({
            ...item,
            tasks
        })
    }

    // SAVE FUNCTION
    const saveData = (taskobj) =>{
        let temlist = item
        temlist.tasks.push(taskobj)
        setItem({...temlist})
        console.log(taskobj)
    }
    // UPDATE FUNCTION
    const updateData = (obj,index) =>{
        const tempList = item
        tempList.tasks[index] = obj    
        localStorage.setItem("item",JSON.stringify(item))
        setItem({...tempList})
    }
    // DELETE FUNCTION
    const deleteData = (index) =>{
        let temList = item
        temList.tasks.splice(index,1)
        localStorage.removeItem("item",JSON.stringify(item))
        setItem({...temList}) 
    }

    // Effects

    // get a data from local storage
    useEffect(() => {
        const json = localStorage.getItem("item");        
        const state = JSON.parse(json);
        setItem(state);    
    }, []);
    item.tasks.map((t,indx)=> {
        tasks[t.category].push(
            <div draggable className="item" 
                onDragStart= {(e)=>onDragStart(e,indx)} 
                style={{borderTop:t.category==="open"?"3px solid #6A6A6A":t.category==="inprogress"?
                "3px solid yellow":t.category==="completed"?"3px solid green":""
            }}
                key={indx} >
                <Item 
                    data = {t} 
                    indx={indx}  
                    updateData={updateData}
                    Delete={deleteData}
                />
            </div>
        )
    })
    // store data in local storage
    useEffect(()=>{
        let json = JSON.stringify(item)
        localStorage.setItem("item",json)
    },[item])

    
    return (
        <>
            <div className="form">
            {/* CREATE BUTTON */}
                <button className="btn btn-primary" onClick={()=>setModal(true)} >Create</button>
                {/* CREATE DATA */}
                    <CreateData
                    show={modal}
                    onHide = {()=>setModal(false)}
                    item={item}
                    setItem={setItem}
                    save={saveData}
                    />
            </div>
            {/* CATEGORY ITEM */}
           
            <div className="column row">
                {/* OPEN CATEGOEY */}
                <div className="col-md-4 dragcard">
                    <h4>Open</h4>
                    <div className={"droppable-col"}
                    onDragOver={(e)=>onDragOver(e)}
                    onDrop={(e)=>onDrop(e,"open")} >
                    {tasks.open}
                    </div>
                </div>

                {/* INPROGRESS CATEGOEY */}
                <div className="col-md-4">
                    <h4>Inprogress</h4>
                    <div 
                    className={"droppable-col"} 
                    onDragOver={(e)=>onDragOver(e)} 
                    onDrop={(e)=>onDrop(e,"inprogress")}>
                        {tasks.inprogress}
                    </div>
                </div>
                {/* COMPLETED CATEGOEY */}
                <div className="col-md-4">
                    <h4>Completed</h4>
                    <div 
                    className={"droppable-col"}  
                    onDragOver={(e)=>onDragOver(e)} 
                    onDrop={(e)=>onDrop(e,"completed")}>
                        {tasks.completed}
                    </div>
                </div>
            </div>
        </>
    )
 }

export default DraggableContent