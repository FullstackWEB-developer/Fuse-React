import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { openMainSidebar } from './store/sidebarsSlice';

const ChatFirstScreen = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-24">
      <FuseSvgIcon className="icon-size-128 mb-16" color="disabled">
        heroicons-outline:chat
      </FuseSvgIcon>
      <Typography
        className="hidden md:flex text-20 font-semibold tracking-tight text-secondary"
        color="textSecondary"
      >
        Select a conversation or start a new chat
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        className="flex md:hidden"
        onClick={() => dispatch(openMainSidebar())}
      >
        Select a conversation or start a new chat
      </Button>
    </div>
  );
};

export default ChatFirstScreen;
