import './ArticleView.css';
import { ArticleFrame } from '../../components/Section';
import ContentLayout from './components/ContentLayout';
import MarkdownDisplay from '../../components/MarkdownDisplay';

export default function ArticleView({ data, domain }) {
  const { body, ...content } = data;
  return (
    <ArticleFrame modifier={domain}>
      <div className='wrapper wrapper--article-header'>
        <ContentLayout content={content} />
      </div>
      <div className='wrapper wrapper--article-text'>
        {body && <MarkdownDisplay markdownText={body} />}
      </div>
    </ArticleFrame>
  );
}
