import React from 'react'
import { Link } from 'react-router-dom'

function Switch() {
    return (
        <div>
            <Link to="/">Off-Grid</Link> | <Link to="/calc-ongrid">On-Grid</Link>
        </div>
    )
}

export default Switch
