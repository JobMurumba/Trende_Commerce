import React,{useState} from 'react'
import {Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

const CommonModal = ({children,isOpen,toggle,title}) =>{

    

    return (

        <div>
            <Modal isOpen={isOpen} toggle={toggle} >
                <ModalHeader toggle={toggle}>
                    {title}
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary" onClick={toggle}>close</Button> */}
                    <Button color="secondary" onClick={toggle}>close</Button>
                    
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default CommonModal