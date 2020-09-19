import React from 'react'
import {Button} from 'reactstrap'
export const inlinStyles = [
    {label:"B",style:"BOLD"},
    {label:"I",style:"ITALIC"},
    {label:"U",style:"UNDERLINE"},
    {label:"strike",style:"STRIKETHROUGH"},
    {label:"Header",style:"FONT_SIZE_30"},
    {label:"list",style:"LIST"},
    {label:"list2",style:"unordered-list-item"}
]


const InlineStyleControls = ({currentInlineStyle,onToggle}) =>{
    return(
        <div>
            {inlinStyles.map(type=>(
                <button type="button" style={{fontWeight:currentInlineStyle.has(type.style)?"bold":"normal"}}
                key={type.label}
                onMouseDown={e=>{
                    e.preventDefault();
                    onToggle(type.style);
                }}
                >{type.label}</button>
            ))}
        </div>
    )
}

export default  InlineStyleControls;