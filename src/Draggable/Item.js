// REACT COMPONENTS
import React, { useState } from 'react'

// UI COMPONENTS
import { Card } from 'react-bootstrap'

// UPDATE COMPONENT
import Update from './Update'

// MOMENTS
import moment from 'moment'

// LOADASH
import _ from 'lodash'

// MAIN FUNCTION
export default function Item({data,Delete,indx,updateData}) {
    // CONSTANTS
    const {date} = data

    // STATES
    const [open,setOpen] = useState(false)
    
    // FUNCTIONS

    // DELETE FUNCTION
    const handleDelete = (e) =>{
      e.preventDefault()
      Delete(indx)
    }
    // EDIT FUNCTION
    const showModal = () =>{
      setOpen(true)
    }
    // UPDATE FUNCTION
    const updateTask  = (obj) =>{
        updateData(obj,indx)
    }
    return (
      <>
        <Card >
          <Card.Header as="h5">{data.category}</Card.Header>
          <Card.Body>
            <Card.Title>{data.title}</Card.Title>
            <Card.Text>
              {data.description}
            </Card.Text>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <Card.Text>{data.date}</Card.Text>
              <Card.Text style={{cursor:"pointer"}}>
                {/* EDIT ICON */}
                <i 
                  onClick={showModal} 
                  style={{marginRight:10}} 
                  class="fa fa-edit" 
                  aria-hidden="true" />
                {/* DELETE ICON */}
                <i 
                  onClick={handleDelete} 
                  class="fa fa-trash" 
                  aria-hidden="true"/>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
        {/* UPDATE DATA */}
        <Update
        show={open}
        onHide={()=>setOpen(false)}
        data={data}    
        indx={indx}
        updateTask={updateTask}
        />
    </>
    )
}

