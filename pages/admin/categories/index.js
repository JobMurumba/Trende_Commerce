import NewCategory from '../../../components/categories/new_category';
import AppContext from '../../../context/AppContext';
import {useRouter} from 'next/router'
import {useContext,useEffect} from  'react'
import {Protectoute} from '../../../components/guard'
function CategoryView(){
    return(
        <div>
            <NewCategory/>
        </div>
    )
}

export default Protectoute(CategoryView)