import React,{useEffect,useMemo,useState} from 'react'
import {createEditor} from 'slate'
import {Slate,Editable,withReact} from 'slate-react'
function TextEditor(){


    const editor = useMemo(()=>withReact(createEditor()),[])
    const [value,setValue] = useState([
        {
            type:"paragraph",
            children:[{text:'A line of text '}],
        }
    ])

    return(
        <Slate editor={editor} value={value} onChange={newValue=>setValue(newValue)}>
            <Editable 
            onKeyDown ={e=>{
                
                if(event.key ==='&'){
                    event.preventDefault()
                    editor.insertText("and")
                }
            }}
            />
        </Slate>
    )
}

export default TextEditor