// REACT COMPONENT
import React,{useState,useEffect} from 'react'

// UI COMPONENT
import { Modal,Button, Form } from 'react-bootstrap'

// LOADASH
import _ from 'lodash'
import moment from 'moment'

// Main function
export default function Update({ data, show, onHide, updateTask }) {
    // STATES
    const [text,setText] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [date,setDate] = useState(moment(new Date()).format('LLL'))
    // FUNCTION

    // UPDATE FUNCTION
    const updateData = (e) =>{
        e.preventDefault()
        let tempObj = {}
        tempObj['title'] = text
        tempObj['description'] = description
        tempObj['category'] = category
        tempObj["date"]=date
        updateTask(tempObj)
        onHide()
    }

    // Effects
    useEffect(()=>{
        setText(data.title)
        setDescription(data.description)
        setCategory(data.category)
    },[])

    const state = ["open","inprogress","completed"]
    return (

            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={onHide}>

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {"Update"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">                            
                            <Form.Label>Title</Form.Label>
                            {/* Title Text field */}
                            <Form.Control type="email" placeholder="Title" 
                                onChange={e=>setText(e.target.value)}
                                value={text}
                                />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            {/* description text field */}
                            <Form.Control 
                                value={description} 
                                as="textarea" 
                                rows={3} 
                                onChange={e=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            {/* select field */}
                            <select 
                              className="custom-select form-control select_box mb-3" 
                              value={category}
                              onChange={event=>setCategory(event.target.value)}>
                                {_.map(state,(dat,key)=>{
                                return <option value={dat} key={key}>{dat}</option>
                                })}
                            </select>
                        </Form.Group>
                    </Form>                
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary">Cancel</Button>
                    <Button onClick={updateData}>Update</Button>
                </Modal.Footer>
            </Modal>

    )
}


 