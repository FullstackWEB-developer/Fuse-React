import Popover from '@material-ui/core/Popover';
import React from 'react';

function ToolbarMenu(props)
{
    return (
        <Popover
            open={Boolean(props.state)}
            anchorEl={props.state}
            onClose={props.onClose}
            anchorOrigin={{
                vertical  : 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical  : 'top',
                horizontal: 'center'
            }}
        >
            <React.Fragment>
                {props.children}
            </React.Fragment>
        </Popover>
    );
}

export default ToolbarMenu;
