import Badge from '@mui/material/Badge';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';

import { selectNotifications } from './store/dataSlice';
import { toggleNotificationPanel } from './store/stateSlice';

function NotificationPanelToggleButton(props) {
  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch();

  return (
    <IconButton
      className="w-40 h-40"
      onClick={(ev) => dispatch(toggleNotificationPanel())}
      size="large"
    >
      <Badge color="secondary" variant="dot" invisible={notifications.length === 0}>
        {props.children}
      </Badge>
    </IconButton>
  );
}

NotificationPanelToggleButton.defaultProps = {
  children: <Icon>notifications</Icon>,
};

export default withReducer('notificationPanel', reducer)(NotificationPanelToggleButton);
