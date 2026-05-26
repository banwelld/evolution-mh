import { useEffect, useState } from 'react';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import './ArticleView.css';
import ArticleLayout from './components/ArticleLayout';

const ARIA_DECK_VIEW = 'Article Detail View';

export default function ArticleView({ activeArticle, inert }) {
  const [prevArticle, setPrevArticle] = useState(null);
  const [displayArticle, setDisplayArticle] = useState(null);

  // Sync prop to state during render (avoids cascading render warnings)
  if (activeArticle !== prevArticle) {
    setPrevArticle(activeArticle);
    if (activeArticle) {
      setDisplayArticle(activeArticle);
    }
  }

  useEffect(() => {
    // Only use useEffect for the async unmount timeout
    if (!activeArticle && displayArticle) {
      const timer = setTimeout(() => setDisplayArticle(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [activeArticle, displayArticle]);

  if (!displayArticle) return null;

  const { body, ...articleData } = displayArticle;
  return (
    <aside className='article-deck' aria-label={ARIA_DECK_VIEW} inert={inert}>
      <ArticleLayout articleData={articleData}>
        {body && (
          <div className='wrapper wrapper--article-text'>
            <MarkdownDisplay markdownText={body} />
          </div>
        )}
      </ArticleLayout>
    </aside>
  );
}
