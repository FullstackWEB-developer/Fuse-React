import ReactChartJs2Doc from 'main/content/components-third-party/react-chartjs-2/ReactChartJs2Doc';
import GoogleMapReactDoc from 'main/content/components-third-party/google-map-react/GoogleMapReactDoc';
import ReactTableDoc from 'main/content/components-third-party/datatables/react-table/ReactTableDoc';

export const ComponentsThirdPartyConfig = {
    routes: [
        {
            path     : '/components-third-party/datatables/react-table',
            component: ReactTableDoc
        },
        {
            path     : '/components-third-party/google-map-react',
            component: GoogleMapReactDoc
        },
        {
            path     : '/components-third-party/react-chartjs-2',
            component: ReactChartJs2Doc
        }

    ]
};

