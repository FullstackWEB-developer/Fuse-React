import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {FusePageCarded, DemoContent, DemoSidebarContent} from '@fuse';
import {Hidden, Icon, IconButton} from 'material-ui';

const styles = theme => ({
    layoutRoot: {}
});

class CardedLeftSidebar2Sample extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-1">
                        <Hidden lgUp>
                            <IconButton onClick={(ev) => this.pageLayout.toggleLeftSidebar()}
                                        aria-label="open left sidebar">
                                <Icon>menu</Icon>
                            </IconButton>
                        </Hidden>
                        <div className="flex-1 py-16"><h4>Header</h4></div>
                    </div>
                }
                contentToolbar={
                    <div className="px-24"><h4>Content Toolbar</h4></div>
                }
                content={
                    <div className="p-24">
                        <h4>Content</h4>
                        <br/>
                        <DemoContent/>
                    </div>
                }
                leftSidebarHeader={
                    <div className="p-24"><h4>Sidebar Header</h4></div>
                }
                leftSidebarContent={
                    <div className="p-24">
                        <h4>Sidebar Content</h4>
                        <br/>
                        <DemoSidebarContent/>
                    </div>
                }
                singleScroll
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            />
        )
    };
}

export default withStyles(styles, {withTheme: true})(CardedLeftSidebar2Sample);