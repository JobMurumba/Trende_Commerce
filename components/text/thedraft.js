import React, { Component } from 'react';
import { EditorState,convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {stateToHTML} from 'draft-js-export-html'
import {FormGroup,Button} from 'reactstrap'
class MyEditor extends Component {
   constructor(props) {
   super(props);
   if(typeof window==='undefined'){
     global.window = {}
   }
   this.state = {
     editorState: EditorState.createEmpty(),
     display:"",
     error:""
     };
   }

   htmltotext = (data)=>{
     let ses=data.toString();
     return ses.replace(/<[^>]*(>|$)|&nbsp;&zwnj;|&raquo;|@laquo;|&gt;/g,'')
   }
 onEditorStateChange = editorState => {
    this.setState({ editorState });
    if(this.props.msg   && (this.htmltotext(stateToHTML(this.state.editorState.getCurrentContent()))!=="")   ){
     // console.log(this.htmltotext( this.state.editorState.getCurrentContent))
     this.setState({error:""})
     // console.log(stateToHTML(this.state.editorState.getCurrentContent()))
      
    }
 };

 doTask=async ()=>{
 
  if( (this.htmltotext(stateToHTML(this.state.editorState.getCurrentContent()))).trim()===""){
    this.setState({
      error:"description is required"
    })
  }else{
    this.setState({error:""})
  }
  await  this.props.sendDesc(stateToHTML(this.state.editorState.getCurrentContent()))
 
  this.props.theClick();
  //console.log(stateToHTML(this.state.editorState.getCurrentContent()))
  this.setState({display:(stateToHTML(this.state.editorState.getCurrentContent())
    
    )})

}
render() {
const { editorState } = this.state;


return (
  <div>
    <Editor 
      editorState={editorState}
      wrapperClassName="rich-editor"
      editorClassName="description-editor"
      onEditorStateChange={this.onEditorStateChange}
      placeholder="product description..." />

<FormGroup>
  <br/>
<span className="error">{this.state.error}</span>
        <Button  color="primary" className="btn-block" onClick={this.doTask}>Save</Button>
        </FormGroup>
        {/* <span className="error" >{this.props.msg && this.props.msg}</span> */}
      
        <div dangerouslySetInnerHTML={{__html:this.state.display}}>
           
        </div>
  </div>
);
} }
//export { MyEditor };
export default MyEditor