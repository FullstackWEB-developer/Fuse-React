import React from 'react';
import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
import {Button, Icon, Typography} from 'material-ui';
import {withStyles} from 'material-ui/styles/index';
/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
const styles = theme => ({
    layoutRoot: {}
});

function Autocomplete({classes})
{
    return (

        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <Typography variant="title">Autocomplete</Typography>
                    <Button
                        className="normal-case"
                        variant="raised"
                        component="a"
                        href="https://material-ui-next.com/demos/autocomplete"
                        target="_blank"
                    >
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">
                    <Typography className="text-44 mt-32 mb-8" component="h1">Autocomplete</Typography>
                    <Typography className="mb-16" component="div">The autocomplete is a normal text input enhanced by a panel of suggested options.
                        Material-UI doesn&#39;t provide any high-level API for solving this problem.
                        We encourage people relying on the solutions the React community has built.</Typography>
                    <Typography className="text-32 mt-32 mb-8" component="h2">downshift</Typography>
                    <Typography className="mb-16" component="div">In the following example, we demonstrate how to use <a
                        href="https://github.com/paypal/downshift">downshift</a>.</Typography>
                    <FuseExample
                        className="my-24"
                        component={require('main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationDownshift.js').default}
                        raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationDownshift.js')}
                    />

                    <Typography className="text-32 mt-32 mb-8" component="h2">react-autosuggest</Typography>
                    <Typography className="mb-16" component="div">In the following example, we demonstrate how to use <a
                        href="https://github.com/moroshko/react-autosuggest">react-autosuggest</a>.
                        It&#39;s also using <a href="https://www.npmjs.com/package/autosuggest-highlight">autosuggest-highlight</a> for the highlighting logic.</Typography>
                    <FuseExample
                        className="my-24"
                        component={require('main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationAutosuggest.js').default}
                        raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationAutosuggest.js')}
                    />

                    <Typography className="text-32 mt-32 mb-8" component="h2">react-select</Typography>
                    <Typography className="mb-16" component="div">In the following example, we demonstrate how to use <a
                        href="https://github.com/JedWatson/react-select">react-select</a>.</Typography>
                    <FuseExample
                        className="my-24"
                        component={require('main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationReactSelect.js').default}
                        raw={require('!raw-loader!main/content/components/material-ui/material-ui-examples/autocomplete/IntegrationReactSelect.js')}
                    />
                </div>
            }
        />

    );
}

export default withStyles(styles, {withTheme: true})(Autocomplete);
                        