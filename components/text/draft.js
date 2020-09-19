import React from 'react';
import {Editor,EditorState,RichUtils} from 'draft-js'
import InlineStyleControls from "./inlineStyleControls"
import { Button,FormGroup} from 'reactstrap';
import {stateToHTML} from 'draft-js-export-html'

const styles = {
    editor:{
        border:"1px solid gray",
        minHeight:"6em"
    }
}


const customStyleMap ={
    STRIKETHROUGH:{
        textDecoration:"line-through"
    },
    FONT_SIZE_30:{
        fontSize:"30px"
    },
    LIST:{
        display:"list-item",
        listStyleType:"disc",
        listStylePosition:"inside"
    }

}


export default function MyEditor(props){
    const [editorState,setEditorState] = React.useState(EditorState.createEmpty())
    const [display,setDisplay] = React.useState("")
    const editor = React.useRef(null)

    function focusEditor(){
        editor.current.focus()
    }

    React.useEffect(()=>{
        focus();
    },[]);

    const toggleInlineStyle = inlineStyle =>{
        switch(inlineStyle){
            case "unordered-list-item":
               console.log("hey")
                const newState = RichUtils.toggleBlockType(editorState,'header-one')
                setEditorState(newState)
            default:
                console.log(inlineStyle)
                const newState1 = RichUtils.toggleInlineStyle(editorState,inlineStyle)
                setEditorState(newState1)

        }
       
    }
    function doTask(){
        props.theClick();
        props.sendDesc(editorState)
        console.log(stateToHTML(editorState.getCurrentContent()))
        setDisplay(stateToHTML(editorState.getCurrentContent()))

    }

    
    return(
        <div>
            
        
        <div onClick={focusEditor} style={styles.editor}>
            <InlineStyleControls currentInlineStyle={editorState.getCurrentInlineStyle()}
            onToggle={toggleInlineStyle}/>
            <Editor
            ref={editor}
            customStyleMap={customStyleMap}
            editorState={editorState}
            onChange={editorState=>setEditorState(editorState)}
            />
        </div>
        <FormGroup>
            <br></br>
        <Button  color="primary" className="btn-block" onClick={doTask}>Save</Button>
        </FormGroup>
        {/* <div dangerouslySetInnerHTML={{__html:display}}>
           
        </div> */}
        </div>
    )
}