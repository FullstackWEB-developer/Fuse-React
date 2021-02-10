import { lazy } from 'react';

const ThirdPartyComponentsRoutes = [
	{
		path: '/documentation/third-party-components/formsy',
		component: lazy(() => import('./formsy/FormsyDoc'))
	},
	{
		path: '/documentation/third-party-components/react-table',
		component: lazy(() => import('./react-table/ReactTableDoc'))
	},
	{
		path: '/documentation/third-party-components/google-map-react',
		component: lazy(() => import('./google-map-react/GoogleMapReactDoc'))
	},
	{
		path: '/documentation/third-party-components/react-chartjs-2',
		component: lazy(() => import('./react-chartjs-2/ReactChartJs2Doc'))
	}
];

export default ThirdPartyComponentsRoutes;
