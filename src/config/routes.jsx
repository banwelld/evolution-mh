import App from '../app/App';
import ArticleView from '../features/article-view/ArticleView';
import ErrorPage from '../components/ErrorPage';

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
];

export default routes;
