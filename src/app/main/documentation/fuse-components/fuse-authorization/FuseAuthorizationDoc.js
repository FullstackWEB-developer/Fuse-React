import FuseHighlight from '@fuse/core/FuseHighlight';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

/* eslint import/no-webpack-loader-syntax: off */
/* eslint import/extensions: off */

function FuseAuthorizationDoc() {
  return (
    <>
      <Typography variant="h4" className="mb-40 font-700">
        FuseAuthorization
      </Typography>

      <Typography className="mb-16" component="p">
        <code>FuseAuthorization</code> is the authorization component of the Fuse React. It
        restricts unauthorized user access by looking at <b>route configs</b> and <b>user.role</b>.
      </Typography>

      <Typography className="text-20 mt-20 mb-10 font-700" variant="h5">
        Setup
      </Typography>

      <Typography className="mb-16" component="p">
        The component should wraps the FuseTheme component.
      </Typography>

      <Typography className="inline-block mb-8 italic" component="code">
        src/app/App.js
      </Typography>

      <FuseHighlight component="pre" className="language-jsx">
        {require('!raw-loader!src/app/App.js')}
      </FuseHighlight>

      <Typography className="text-20 mt-20 mb-10 font-700" variant="h5">
        Configuration
      </Typography>

      <Typography className="text-16 mt-16 mb-10 font-700" variant="h6">
        Route Configuration:
      </Typography>

      <Typography className="mb-16" component="p">
        You need to define authorization (auth) in the <b>route config files</b> to control the
        access via permission roles.
      </Typography>

      <Typography className="mt-32 mb-8" variant="subtitle2">
        Example Usage:
      </Typography>

      <Typography className="inline-block mb-8 italic" component="code">
        src/app/main/auth/admin-role-example/AdminRoleExampleConfig.js
      </Typography>

      <FuseHighlight component="pre" className="language-jsx">
        {require('!raw-loader!src/app/main/auth/admin-role-example/AdminRoleExampleConfig.js')}
      </FuseHighlight>

      <Typography className="my-16" component="p">
        You can also give different auth values for individual routes with writing auth value inside
        the route object.
      </Typography>

      <Paper className="max-w-md my-16">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-14">
                Authorization Role (auth) options
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code>null</code>
              </TableCell>
              <TableCell>Do not check, allow everyone</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>[]</code>
              </TableCell>
              <TableCell>Only guest allowed</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>[admin,user]</code>
              </TableCell>
              <TableCell>Only 'admin' and 'user' roles are allowed</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography className="mt-48 mb-8" variant="h6">
        User.role Configuration:
      </Typography>

      <Typography className="mb-16" component="p">
        User <b>role</b> and <b>data</b> are stored at <b>user</b> in the redux store.
      </Typography>

      <Typography className="mb-16" component="p">
        After successful login user.role will be updated and the FuseAuthorization automatically
        redirects the authorized user.
      </Typography>

      <Typography className="inline-block mb-8 italic" component="code">
        app/store/userSlice.js (initial user state)
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {`  
                const initialState = {
                role: [],//guest
                data: {
                    'displayName': 'John Doe',
                    'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
                    'email'      : 'johndoe@withinpixels.com',
                    shortcuts    : [
                      'calendar',
                      'mail',
                      'contacts',
                      'todo'
                    ]
                  }
                };
       `}
      </FuseHighlight>

      <Paper className="max-w-md my-16">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="font-semibold text-14">User Role options</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code>null</code> or <code>undefined</code> or <code>[]</code>
              </TableCell>
              <TableCell>Guest</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>['admin','user']</code> (array)
              </TableCell>
              <TableCell>User has roles 'admin' and 'user'</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>"admin"</code> (string)
              </TableCell>
              <TableCell>User has 'admin' role</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      <Typography className="mt-48 mb-8" variant="h6">
        Navigation Item Configuration:
      </Typography>

      <Typography className="mb-16" component="p">
        You can control the navigation <b>item/group/collapse</b> visibility by adding <b>auth</b>
        property in <code>src/app/fuse-configs/NavigationConfig.js</code>.
      </Typography>

      <Typography className="mt-32 mb-8" variant="subtitle2">
        Example Usage:
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {`
					 {
						'id'   : 'only-admin-navigation-item',
						'title': 'Nav item only for Admin',
						'type' : 'item',
						'auth' : authRoles.admin,//['admin']
						'url'  : '/auth/admin-role-example',
						'icon' : 'verified_user'
					  },
				`}
      </FuseHighlight>

      <Typography className="mt-48 mb-4" variant="h5">
        Making the the whole app auth protected:
      </Typography>

      <Typography className="mb-12" variant="subtitle2">
        On routesConfig.js file
      </Typography>

      <Typography className="mb-16" component="p">
        If you don't want to set auth on every page config;
        <br />
        You can give default auth role value in the{' '}
        <code>src/app/fuse-configs/routesConfig.js</code>
        file,
        <br />
        Set defaultAuth paramater
        <code>FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user'])</code>
        ,
        <br />
        The individual route configs which has auth option won't be overridden,
        <br />
        With this configuration below, makes <b>whole app</b> auth protected by default:
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {`
					import FuseUtils from '@fuse/utils';
          import FuseLoading from '@fuse/core/FuseLoading';
          import { Navigate } from 'react-router-dom';
          import userInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
          import SignInConfig from '../main/sign-in/SignInConfig';
          import SignUpConfig from '../main/sign-up/SignUpConfig';
          import SignOutConfig from '../main/sign-out/SignOutConfig';
          import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
          import appsConfigs from '../main/apps/appsConfigs';
          import pagesConfigs from '../main/pages/pagesConfigs';
          import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
          import DocumentationConfig from '../main/documentation/DocumentationConfig';
          
          const routeConfigs = [
            ...appsConfigs,
            ...dashboardsConfigs,
            ...pagesConfigs,
            ...authRoleExamplesConfigs,
            ...userInterfaceConfigs,
            DocumentationConfig,
            SignOutConfig,
            SignInConfig,
            SignUpConfig,
          ];
          
          const routes = [
            // if you want to make whole app auth protected by default change defaultAuth for example:
            // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
            // The individual route configs which has auth option won't be overridden.
            ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
            {
              path: '/',
              element: <Navigate to="dashboards/analytics" />,
            },
            {
              path: 'loading',
              element: <FuseLoading />,
            },
            {
              path: '*',
              element: <Navigate to="pages/error/404" />,
            },
          ];
          
          export default routes;

				`}
      </FuseHighlight>

      <Typography className="mt-48 mb-4" variant="h5">
        Allow everyone(guest,user) for accessing root (/) page as a landing page
      </Typography>

      <Typography className="mb-16" component="p">
        After configuring to make whole app protected as above, we need to set{' '}
        <code>auth:null</code> at the route: <code>/</code> to make it accessible for everyone.
        <br />
        If you redirect the main route (/), also make sure to set the redirected route config
        <code>auth:null</code>.
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {`
				import FuseUtils from '@fuse/utils';
        import FuseLoading from '@fuse/core/FuseLoading';
        import { Navigate } from 'react-router-dom';
        import userInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
        import SignInConfig from '../main/sign-in/SignInConfig';
        import SignUpConfig from '../main/sign-up/SignUpConfig';
        import SignOutConfig from '../main/sign-out/SignOutConfig';
        import dashboardsConfigs from '../main/dashboards/dashboardsConfigs';
        import appsConfigs from '../main/apps/appsConfigs';
        import pagesConfigs from '../main/pages/pagesConfigs';
        import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
        import DocumentationConfig from '../main/documentation/DocumentationConfig';
        
        const routeConfigs = [
          ...appsConfigs,
          ...dashboardsConfigs,
          ...pagesConfigs,
          ...authRoleExamplesConfigs,
          ...userInterfaceConfigs,
          DocumentationConfig,
          SignOutConfig,
          SignInConfig,
          SignUpConfig,
        ];
        
        const routes = [
          // if you want to make whole app auth protected by default change defaultAuth for example:
          // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
          // The individual route configs which has auth option won't be overridden.
          ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin']),
          {
            path     : '/',
            exact    : true,
            auth     : null,
            element:LandingPage
          },
          {
            path: 'loading',
            element: <FuseLoading />,
          },
          {
            path: '*',
            element: <Navigate to="pages/error/404" />,
          },
        ];
        
        export default routes;

				`}
      </FuseHighlight>

      <Typography className="mt-48 mb-4" variant="h5">
        Redirect the logged-in user to a specific route depending on his role
      </Typography>

      <Typography className="mb-16" component="p">
        Before dispatching <b>SET_USER_DATA</b> action you can set loginRedirectUrl on
      </Typography>

      <Typography className="inline-block mb-8 italic" component="code">
        app/store/userSlice.js
      </Typography>

      <FuseHighlight component="pre" className="language-js">
        {`
					export const setUserData = user => async (dispatch, getState) => {
					
					  /*
            You can redirect the logged-in user to a specific route depending on his role
            */
            if (user.loginRedirectUrl) {
              settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
            }
						
						/*
							Set User Settings
						*/
						dispatch(setDefaultSettings(user.data.settings));
						
						dispatch(setUser(user));
					};
				`}
      </FuseHighlight>
      <Typography className="mt-48 mb-4" variant="h5">
        Uncaught Error: Maximum update depth exceeded: Infinite loops
      </Typography>
      <Typography className="mb-16" component="p">
        If you are getting this error, make sure authenticated user has rights to access main route{' '}
        <b>"/"</b>
        or it's redirected route path.
      </Typography>
      <Typography className="mb-16" component="p">
        After successful login, every authenticated user should be able to access to main route path{' '}
        <b>"/"</b> or redirected route path.
      </Typography>
    </>
  );
}

export default FuseAuthorizationDoc;
