import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import CalendarViewMenu from 'app/main/apps/calendar/CalendarViewMenu';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { openNewEventDialog } from 'app/main/apps/calendar/store/eventsSlice';

function CalendarHeader(props) {
  const { calendarRef, currentDate, onToggleLeftSidebar } = props;

  const mainThemeDark = useSelector(selectMainThemeDark);
  const calendarApi = () => calendarRef.current?.getApi();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col md:flex-row w-full p-12 justify-between z-10 container">
      <div className="flex flex-col sm:flex-row items-center">
        <IconButton
          onClick={(ev) => onToggleLeftSidebar()}
          aria-label="open left sidebar"
          size="small"
        >
          <FuseSvgIcon>heroicons-outline:menu</FuseSvgIcon>
        </IconButton>

        <Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
          {currentDate?.view.title}
        </Typography>

        <Tooltip title="Previous">
          <IconButton aria-label="Previous" onClick={() => calendarApi().prev()}>
            <FuseSvgIcon size={20}>
              {mainThemeDark.direction === 'ltr'
                ? 'heroicons-solid:chevron-left'
                : 'heroicons-solid:chevron-right'}
            </FuseSvgIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Next">
          <IconButton aria-label="Next" onClick={() => calendarApi().next()}>
            <FuseSvgIcon size={20}>
              {mainThemeDark.direction === 'ltr'
                ? 'heroicons-solid:chevron-right'
                : 'heroicons-solid:chevron-left'}
            </FuseSvgIcon>
          </IconButton>
        </Tooltip>

        <Tooltip title="Today">
          <div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.3 } }}>
              <IconButton aria-label="today" onClick={() => calendarApi().today()} size="large">
                <FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
              </IconButton>
            </motion.div>
          </div>
        </Tooltip>
      </div>

      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
      >
        <IconButton
          className="mx-8"
          aria-label="add"
          onClick={() =>
            dispatch(
              openNewEventDialog({
                start: new Date(),
                end: new Date(),
              })
            )
          }
        >
          <FuseSvgIcon>heroicons-outline:plus-circle</FuseSvgIcon>
        </IconButton>

        <CalendarViewMenu currentDate={currentDate} calendarApi={calendarApi} />
      </motion.div>
    </div>
  );
}

export default CalendarHeader;
