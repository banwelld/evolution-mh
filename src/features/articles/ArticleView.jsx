import { useState, useEffect } from 'react';
import ArticleLayout from './components/ArticleLayout';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import './ArticleView.css';

const ARIA_DECK_VIEW = 'Article Detail View';

export default function ArticleView({ activeArticle, inert }) {
  const [displayArticle, setDisplayArticle] = useState(activeArticle);

  useEffect(() => {
    if (activeArticle) {
      setDisplayArticle(activeArticle);
    } else if (displayArticle) {
      // Keep in DOM for 1000ms to match the CSS transition out
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
