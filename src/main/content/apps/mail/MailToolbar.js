import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles/index';
import {Checkbox, Icon, IconButton, Menu, MenuItem} from 'material-ui';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {withRouter} from 'react-router-dom';

const pathToRegexp = require('path-to-regexp');

const styles = theme => ({
    root              : {
        display: 'flex'
    },
    selectMenuButton  : {
        width: 24
    },
    toolbarSeperator  : {
        height     : 48,
        width      : 1,
        borderRight: '1px solid ' + theme.palette.divider,
        margin     : '0 12px'
    },
    mailListActions   : {
        [theme.breakpoints.down('sm')]: {
            '&.mail-selected': {
                display: 'none'
            }
        }
    },
    deselectMailButton: {
        display                       : 'none',
        [theme.breakpoints.down('sm')]: {
            '&.mail-selected': {
                display: 'block'
            }
        }
    }
});

class MailToolbar extends Component {
    state = {
        selectMenu   : null,
        foldersMenu  : null,
        labelsMenu   : null,
        checked      : false,
        indeterminate: false
    };

    handleMenuOpen = (event, menu) => {
        this.setState({[menu]: event.currentTarget});
    };

    handleMenuClose = (event, menu) => {
        this.setState({[menu]: null});
    };

    handleChange = () => event => {
        event.target.checked ? this.props.selectAllMails() : this.props.deselectAllMails();
    };

    componentWillReceiveProps(nextProps)
    {
        this.setState({indeterminate: nextProps.selectedMailIds.length !== Object.keys(nextProps.mails).length && nextProps.selectedMailIds.length > 0});
        this.setState({checked: nextProps.selectedMailIds.length === Object.keys(nextProps.mails).length && nextProps.selectedMailIds.length > 0});
    }

    render()
    {
        const {classes, match, history, selectAllMails, deselectAllMails, selectMailsByParameter, setFolderOnSelectedMails, toggleLabelOnSelectedMails, folders, labels, selectedMailIds, currentMail} = this.props;
        const {foldersMenu, selectMenu, labelsMenu, indeterminate, checked} = this.state;
        const toPath = pathToRegexp.compile(match.path);
        const matchParams = {...match.params};
        delete matchParams['mailId'];
        const deselectUrl = toPath(matchParams);

        return (
            <div className={classes.root}>

                <div className={classNames(classes.mailListActions, currentMail && "mail-selected", "flex items-center")}>

                    <Checkbox
                        onChange={this.handleChange()}
                        checked={checked}
                        indeterminate={indeterminate}
                    />

                    <IconButton
                        className={classes.selectMenuButton}
                        aria-label="More"
                        aria-owns={selectMenu ? 'select-menu' : null}
                        aria-haspopup="true"
                        onClick={(ev) => this.handleMenuOpen(ev, 'selectMenu')}
                    >
                        <Icon>arrow_drop_down</Icon>
                    </IconButton>

                    <Menu
                        id="select-menu"
                        anchorEl={selectMenu}
                        open={Boolean(selectMenu)}
                        onClose={(ev) => this.handleMenuClose(ev, 'selectMenu')}
                    >
                        <MenuItem onClick={(ev) => {
                            selectAllMails();
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>All</MenuItem>
                        <MenuItem onClick={(ev) => {
                            deselectAllMails();
                            this.handleMenuClose(ev, 'selectMenu')
                        }}>None</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('read', true);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Read</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('read', false);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Unread</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('starred', true);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Starred</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('starred', false);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Unstarred</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('important', true);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Important</MenuItem>
                        <MenuItem onClick={(ev) => {
                            selectMailsByParameter('important', false);
                            this.handleMenuClose(ev, 'selectMenu');
                        }}>Unimportant</MenuItem>
                    </Menu>

                    {selectedMailIds.length > 0 && (
                        <React.Fragment>

                            <div className={classes.toolbarSeperator}/>

                            <IconButton
                                onClick={(ev) => setFolderOnSelectedMails(4)}
                                aria-label="Delete"
                            >
                                <Icon>delete</Icon>
                            </IconButton>

                            < IconButton
                                aria-label="More"
                                aria-owns={foldersMenu ? 'folders-menu' : null}
                                aria-haspopup="true"
                                onClick={(ev) => this.handleMenuOpen(ev, 'foldersMenu')}
                            >
                                <Icon>folder</Icon>
                            </IconButton>

                            <Menu
                                id="folders-menu"
                                anchorEl={foldersMenu}
                                open={Boolean(foldersMenu)}
                                onClose={(ev) => this.handleMenuClose(ev, 'foldersMenu')}
                            >
                                {folders.length > 0 && folders.map((folder) => (
                                    <MenuItem onClick={(ev) => {
                                        setFolderOnSelectedMails(folder.id);
                                        this.handleMenuClose(ev, 'foldersMenu')
                                    }} key={folder.id}>{folder.title}</MenuItem>
                                ))}
                            </Menu>

                            <IconButton
                                aria-label="More"
                                aria-owns={labelsMenu ? 'labels-menu' : null}
                                aria-haspopup="true"
                                onClick={(ev) => this.handleMenuOpen(ev, 'labelsMenu')}
                            >
                                <Icon>label</Icon>
                            </IconButton>

                            <Menu
                                id="folders-menu"
                                anchorEl={labelsMenu}
                                open={Boolean(labelsMenu)}
                                onClose={(ev) => this.handleMenuClose(ev, 'labelsMenu')}
                            >
                                {labels.length > 0 && labels.map((label) => (
                                    <MenuItem onClick={(ev) => {
                                        toggleLabelOnSelectedMails(label.id);
                                        this.handleMenuClose(ev, 'labelsMenu')
                                    }} key={label.id}>{label.title}</MenuItem>
                                ))}
                            </Menu>
                        </React.Fragment>
                    )}
                </div>

                <IconButton className={classNames(classes.deselectMailButton, currentMail && "mail-selected")} onClick={() => history.push(deselectUrl)}>
                    <Icon>arrow_back</Icon>
                </IconButton>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        selectAllMails            : Actions.selectAllMails,
        deselectAllMails          : Actions.deselectAllMails,
        selectMailsByParameter    : Actions.selectMailsByParameter,
        setFolderOnSelectedMails  : Actions.setFolderOnSelectedMails,
        toggleLabelOnSelectedMails: Actions.toggleLabelOnSelectedMails
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    return {
        mails          : mailApp.mails.entities,
        currentMail    : mailApp.mails.currentMail,
        selectedMailIds: mailApp.mails.selectedMailIds,
        folders        : mailApp.folders,
        labels         : mailApp.labels,
        filters        : mailApp.filters
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(MailToolbar)));
