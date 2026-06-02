import App from '../app/App';
import DevApp from '../app/App_inDev';
import ErrorPage from '../components/ErrorPage';
import ArticleView from '../features/article-view/ArticleView';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'team/:id',
        element: <ArticleView />,
      },
      {
        path: 'service/:id',
        element: <ArticleView />,
      },
    ],
  },
  {
    path: 'dev-app/banwell/evolution-mhs',
    element: <DevApp />,
  },
];

export default routes;
