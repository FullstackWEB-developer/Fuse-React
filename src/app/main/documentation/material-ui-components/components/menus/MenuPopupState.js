import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, {bindMenu, bindTrigger} from 'material-ui-popup-state';
import React from 'react';

export default function MenuPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Cake</MenuItem>
            <MenuItem onClick={popupState.close}>Death</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
