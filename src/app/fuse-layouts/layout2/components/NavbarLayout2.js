import React from 'react';
import {withStyles} from '@material-ui/core';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import {FuseScrollbars} from '@fuse';

const styles = theme => ({});

const NavbarLayout2 = ({classes, navigation}) => {
    return (
        <div className="flex flex-1 justify-between items-center w-full h-full container p-0 lg:px-24">

            <div className="flex flex-no-shrink items-center pl-8 pr-16">
                <Logo/>
            </div>

            <FuseScrollbars className="flex h-full items-center">
                <Navigation className="w-full" layout="horizontal" dense/>
            </FuseScrollbars>
        </div>
    );
};

export default withStyles(styles, {withTheme: true})(NavbarLayout2);


