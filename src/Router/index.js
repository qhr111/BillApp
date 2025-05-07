import { createBrowserRouter } from 'react-router-dom'; 
import Layout from '../Pages/Layout';
import Month from '../Pages/Month';
import Year from '../Pages/Year';
import New from '@/Pages/New';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/month',
                element: <Month />,
            },
            {
                path: '/year',
                element: <Year />,
            },
        ],
    },
    {
        path: '/new',
        element: <New />,
    },
]);

export default routes;


