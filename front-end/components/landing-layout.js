import React from 'react'

import "../assets/layout.less"

const LandingLayout = props => (
    <div id={"landing-layout"}>
        <div className={"main-content"}>
            {props.children}
        </div>
    </div>
)

export default LandingLayout
