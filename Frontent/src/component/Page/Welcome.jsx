import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
const Welcome = ({ userData }) => {

    return (
        <div>
            Welcome
            {userData.username}
        </div>
    )
}

export default Welcome