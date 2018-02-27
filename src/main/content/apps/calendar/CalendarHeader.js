import React from 'react';
import {withStyles} from 'material-ui/styles';
import {Icon, IconButton, MuiThemeProvider, Tooltip, Typography} from 'material-ui';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import {navigate} from 'react-big-calendar/lib/utils/constants';
import classNames from 'classnames';
import {FuseThemes} from '@fuse';
import moment from 'moment';

const headerHeight = 200;

const styles = theme => ({
    root: {
        height            : headerHeight,
        minHeight         : headerHeight,
        display           : 'flex',
        backgroundImage   : 'url("../../assets/images/backgrounds/header-bg.png")',
        backgroundColor   : '#FAFAFA',
        color             : '#FFFFFF',
        backgroundSize    : '100% auto',
        backgroundPosition: '0 50%',
        backgroundRepeat  : 'no-repeat',
        position          : 'relative',
        '&:before'        : {
            content   : "''",
            position  : 'absolute',
            top       : 0,
            right     : 0,
            bottom    : 0,
            left      : 0,
            zIndex    : 1,
            background: 'rgba(0, 0, 0, 0.45)'
        },
        '&.Jan'           : {
            backgroundImage   : "url('/assets/images/backgrounds/winter.jpg')",
            backgroundPosition: '0 85%'
        },
        '&.Feb'           : {
            backgroundImage   : "url('/assets/images/backgrounds/winter.jpg')",
            backgroundPosition: '0 85%'
        },
        '&.Mar'           : {
            backgroundImage   : "url('/assets/images/backgrounds/spring.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.Apr'           : {
            backgroundImage   : "url('/assets/images/backgrounds/spring.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.May'           : {
            backgroundImage   : "url('/assets/images/backgrounds/spring.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.Jun'           : {
            backgroundImage   : "url('/assets/images/backgrounds/summer.jpg')",
            backgroundPosition: '0 80%'
        },
        '&.Jul'           : {
            backgroundImage   : "url('/assets/images/backgrounds/summer.jpg')",
            backgroundPosition: '0 80%'
        },
        '&.Aug'           : {
            backgroundImage   : "url('/assets/images/backgrounds/summer.jpg')",
            backgroundPosition: '0 80%'
        },
        '&.Sep'           : {
            backgroundImage   : "url('/assets/images/backgrounds/autumn.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.Oct'           : {
            backgroundImage   : "url('/assets/images/backgrounds/autumn.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.Nov'           : {
            backgroundImage   : "url('/assets/images/backgrounds/autumn.jpg')",
            backgroundPosition: '0 40%'
        },
        '&.Dec'           : {
            backgroundImage   : "url('/assets/images/backgrounds/winter.jpg')",
            backgroundPosition: '0 85%'
        }
    }
});

const viewNamesObj = {
    month    : {
        title: 'Month',
        icon : 'view_module'
    },
    week     : {
        title: 'Week',
        icon : 'view_week'
    },
    work_week: {
        title: 'Work week',
        icon : 'view_array'
    },
    day      : {
        title: 'Day',
        icon : 'view_day'
    },
    agenda   : {
        title: 'Agenda',
        icon : 'view_agenda'
    }
};

class CalendarHeader extends Toolbar {

    view = view => {
        this.props.onViewChange(view)
    };

    viewButtons()
    {
        let viewNames = this.props.views;
        const view = this.props.view;

        if ( viewNames.length > 1 )
        {
            return viewNames.map(name => (
                    <Tooltip title={viewNamesObj[name].title} key={name}>
                        <div>
                            <IconButton aria-label={this.props.messages[name]}
                                        onClick={this.view.bind(null, name)}
                                        disabled={view === name}>
                                <Icon>{viewNamesObj[name].icon}</Icon>
                            </IconButton>
                        </div>
                    </Tooltip>
                )
            )
        }
    }

    render()
    {
        const {classes, messages, label, date} = this.props;

        return (
            <MuiThemeProvider theme={FuseThemes['dark']}>

                <div className={classNames(classes.root, moment(date).format('MMM'))}>

                    <div className="flex flex-1 flex-col p-12 justify-between z-10">

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Icon className="text-32 mx-12">today</Icon>
                                <Typography variant="title">Calendar</Typography>
                            </div>

                            <div className="flex items-center">
                                <Tooltip title="Today">
                                    <IconButton aria-label="today" onClick={this.navigate.bind(null, navigate.TODAY)}>
                                        <Icon>today</Icon>
                                    </IconButton>
                                </Tooltip>
                                {this.viewButtons()}
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <Tooltip title={messages.previous}>
                                <IconButton aria-label={messages.previous} onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
                                    <Icon>chevron_left</Icon>
                                </IconButton>
                            </Tooltip>
                            <Typography variant="title">{label}</Typography>
                            <Tooltip title={messages.next}>
                                <IconButton aria-label={messages.next} onClick={this.navigate.bind(null, navigate.NEXT)}>
                                    <Icon>chevron_right</Icon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    };
}

export default withStyles(styles, {withTheme: true})(CalendarHeader);