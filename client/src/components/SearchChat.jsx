import { IconButton } from '@mui/material'
import React from 'react'
import '../css/SideChats.css'
import SearchIcon from '@mui/icons-material/Search';

function SearchChat() {
    return (
        <div className="sidechats_search_master">
            <div className = 'sidechats_search'>
                <div className="sidechats_search_btn">
                    <IconButton>
                        <SearchIcon /> 
                    </IconButton>
                </div>
                <div className="sidechats_search_input">
                    <input type="text" placeholder='Search or start new chat'/>
                </div>
            </div>  
        </div>
    )
}

export default SearchChat
