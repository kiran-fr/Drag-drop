// REACT COMPONENTS
import React,{useState} from 'react'

// UI COMPONENTS
import { Modal,Button,Form } from 'react-bootstrap'

// LOADASH
import _ from 'lodash'
import {v1}  from 'uuid';
// moment
import moment from 'moment'


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  


// MAIN FUNCTION
export default function CreateData({ save, show, onHide }) {
    // STATES
    const [text,setText] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("open")
    const [date,setDate]= useState(moment(new Date()).format('LLL'))
    const [id,setId] = useState(makeid())
    // FUNCTIONS
    
    // SAVE DATA
    
    const saveData = (e) =>{
        e.preventDefault()
        let taskobj ={}
        taskobj['title'] = text;
        taskobj["description"] = description;
        taskobj["category"] = category;
        taskobj["date"]=date
        save(taskobj) 
        onHide()  
        console.log(taskobj)
        setText("")  
        setDescription("")
        setCategory("")
    }
    const state = ["open","inprogress","completed"]
    // aria-labelledby="contained-modal-title-vcenter"
    return (
            // MODAL
            <Modal show={show} centered onHide={onHide}>
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        {"Create"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* CREATE FORM */}
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Title" 
                                onChange={e=>setText(e.target.value)}
                                value={text}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                value={description} 
                                as="textarea" 
                                rows={3} 
                                onChange={e=>setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <select className="custom-select form-control select_box mb-3" onChange={event=>setCategory(event.target.value)}>
                            {_.map(state,(data,key)=>{
                            return <option value={data} key={key}>{data}</option>
                            })}
                            </select>
                        </Form.Group>
                    </Form>                
                </Modal.Body>
                <Modal.Footer>
                    {/* CANCEL BUTTON */}
                     <Button onClick={onHide}  variant="secondary">Cancel</Button>
                    {/* CREATE BUTTON */}
                     <Button onClick={saveData}>Create</Button>
                </Modal.Footer>
            </Modal>
        
          )
}


 