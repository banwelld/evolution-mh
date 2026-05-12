import './ProfileView.css';
import { ArticleFrame } from '../../components/Section';
import ContentLayout from './components/ContentLayout';
import MarkdownDisplay from '../../components/MarkdownDisplay';

export default function ProfileView({ data, domain }) {
  const { body, ...content } = data;
  return (
    <ArticleFrame modifier={domain}>
      <div className='wrapper wrapper--profile-header'>
        <ContentLayout content={content} />
      </div>
      <div className='wrapper wrapper--profile-text'>
        {body && <MarkdownDisplay markdownText={body} />}
      </div>
    </ArticleFrame>
  );
}
