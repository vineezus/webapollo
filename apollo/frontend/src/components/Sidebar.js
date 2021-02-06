import React, { useState } from 'react'
import { ProSidebar, SidebarHeader, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from "react-router-dom";
import SvgLogo from '../assets/Logo';
import './style/Sidebar.css';


function Sidebar() {
    const [isToggled, setToggle] = useState(true)

    return (
            <ProSidebar /*breakPoint='md'*/ image="https://i.ibb.co/BBjY6K0/imagem.jpg">
            <SidebarHeader>
                <div>
                    <SvgLogo/>
                </div>
            </SidebarHeader>
            <Menu iconShape="square" popperArrow="true">
                <MenuItem>
                    Dimensionamento
                    <Link to="/"/>
                </MenuItem>
                <MenuItem>
                    Como funciona?
                    <Link to="/how"/>
                </MenuItem>
                <MenuItem>
                    Energia<br></br> Fotovoltaica
                    <Link to="/fv"/>
                </MenuItem>
                <MenuItem>
                    Sobre
                </MenuItem>
            </Menu>
            </ProSidebar>
    )
}

export default Sidebar


