import { useEffect, useState } from 'react';
import MarkdownDisplay from '../../components/MarkdownDisplay';
import './ArticleView.css';
import ArticleLayout from './components/ArticleLayout';

const ARIA_DECK_VIEW = 'Article Detail View';

export default function ArticleView({ selectedArticle, inert }) {
  const [prevArticle, setPrevArticle] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);

  // Sync prop to state during render (avoids cascading render warnings)
  if (selectedArticle !== prevArticle) {
    setPrevArticle(selectedArticle);
    if (selectedArticle) {
      setActiveArticle(selectedArticle);
    }
  }

  useEffect(() => {
    // Only use useEffect for the async unmount timeout
    if (!selectedArticle && activeArticle) {
      const timer = setTimeout(() => setActiveArticle(null), 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedArticle, activeArticle]);

  if (!activeArticle) return null;

  const { body, ...articleData } = activeArticle;
  console.log(articleData);
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
