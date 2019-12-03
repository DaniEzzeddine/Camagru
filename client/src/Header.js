import React, { useState } from 'react'
import { Icon, Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import AuthService from './service/auth-service'



export default function Header(props) {
    const [activeItem, setActiveItem] = useState('home');
    return (
        <Segment inverted>
            <Menu inverted pointing secondary>
                <Menu.Item
                    as={Link}
                    to='/home'
                    name='Home'
                    active={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                />

                <Menu.Item
                    as={Link}
                    to='/settings'
                    name='settings'
                    active={activeItem === 'settings'}
                    onClick={() => setActiveItem('settings')}
                />

                <Menu.Item
                    as={Link}
                    to='/profile'
                    name='profile'
                    active={activeItem === 'profile'}
                    onClick={() => setActiveItem('profile')}
                />
                <Menu.Menu position="right">
                    <Menu.Item
                        as={Link}
                        to='/camera'
                        name='Camera'
                        active={activeItem === 'camera'}
                        onClick={() => setActiveItem('camera')}
                    >
                        <center><Icon name='plus square outline' size='big'></Icon></center>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/login' onClick={() => {
                            AuthService.invalidateUser()
                            props.changeAuthState(false)
                        }}>Log out</Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Segment>
    )
}