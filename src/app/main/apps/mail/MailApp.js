import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import MailDetails from './mail/MailDetails';
import MailToolbar from './mail/MailToolbar';
import MailAppHeader from './MailAppHeader';
import MailAppSidebarContent from './MailAppSidebarContent';
import MailAppSidebarHeader from './MailAppSidebarHeader';
import MailList from './mails/MailList';
import MailsToolbar from './mails/MailsToolbar';
import * as Actions from './store/actions';
import reducer from './store/reducers';

function MailApp(props)
{
    const dispatch = useDispatch();

    const pageLayout = useRef(null);

    useEffect(() => {
        dispatch(Actions.getFilters());
        dispatch(Actions.getFolders());
        dispatch(Actions.getLabels());
    }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                root   : "w-full",
                content: "flex flex-col",
                header : "items-center min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <MailAppHeader pageLayout={pageLayout}/>
            }
            contentToolbar={
                props.match.params.mailId ? (
                    <MailToolbar/>
                ) : (
                    <MailsToolbar/>
                )
            }
            content={
                props.match.params.mailId ? (
                    <MailDetails/>
                ) : (
                    <MailList/>
                )
            }
            leftSidebarHeader={
                <MailAppSidebarHeader/>
            }
            leftSidebarContent={
                <MailAppSidebarContent/>
            }
            ref={pageLayout}
            innerScroll
        />
    )
}

export default withReducer('mailApp', reducer)(MailApp);
