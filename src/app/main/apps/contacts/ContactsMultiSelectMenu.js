import React, {useState} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList} from '@material-ui/core';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

function ContactsMultiSelectMenu(props)
{
    const [anchorEl, setAnchorEl] = useState(null);

    function openSelectedContactMenu(event)
    {
        setAnchorEl(event.currentTarget);
    }

    function closeSelectedContactsMenu()
    {
        setAnchorEl(null);
    }

    return (
        <React.Fragment>
            <IconButton
                className="p-0"
                aria-owns={anchorEl ? 'selectedContactsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedContactMenu}
            >
                <Icon>more_horiz</Icon>
            </IconButton>
            <Menu
                id="selectedContactsMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeSelectedContactsMenu}
            >
                <MenuList>
                    <MenuItem
                        onClick={() => {
                            props.removeContacts(props.selectedContactIds);
                            closeSelectedContactsMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>delete</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Remove"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            props.setContactsStarred(props.selectedContactIds);
                            closeSelectedContactsMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Starred"/>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            props.setContactsUnstarred(props.selectedContactIds);
                            closeSelectedContactsMenu();
                        }}
                    >
                        <ListItemIcon className="min-w-40">
                            <Icon>star_border</Icon>
                        </ListItemIcon>
                        <ListItemText primary="Unstarred"/>
                    </MenuItem>
                </MenuList>
            </Menu>
        </React.Fragment>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        removeContacts      : Actions.removeContacts,
        setContactsStarred  : Actions.setContactsStarred,
        setContactsUnstarred: Actions.setContactsUnstarred
    }, dispatch);
}

function mapStateToProps({contactsApp})
{
    return {
        selectedContactIds: contactsApp.contacts.selectedContactIds,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsMultiSelectMenu);

