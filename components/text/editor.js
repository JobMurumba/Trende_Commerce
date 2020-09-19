import React from 'react'
import {SlateEditor,SlateToolbar,SlateContent} from 'slate-editor'
import {BoldPlugin,BoldButton} from '@slate-editor/bold-plugin'


const plugins = [BoldPlugin()]
const SlateRichTextEditor = () =>{
    <SlateEditor plugins={plugins}>
        <SlateToolbar>
            <BoldButton/>
        </SlateToolbar>
        <SlateContent/>
    </SlateEditor>
}

export default SlateRichTextEditor