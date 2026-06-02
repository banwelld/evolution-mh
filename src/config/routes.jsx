import App from '../app/App';
import ArticleView from '../features/article-view/ArticleView';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'profile',
        element: <ArticleView />,
      },
    ],
  },
];

export default routes;
