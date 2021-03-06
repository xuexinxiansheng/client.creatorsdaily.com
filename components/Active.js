import styled from 'styled-components'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Box from './Box'
import UserCell from './UserCell'
import Time from './Time'
import ProductCell from './ProductCell'
import CommentCell from './CommentCell'

const Container = styled(Box)`
margin-bottom: 24px;
padding: 12px;
`
const Content = styled.div`
font-size: 12px;
margin-top: 12px;
margin-left: 44px;
img {
  max-width: 100%;
}
`
const TimeContainer = styled.div`
margin-top: 12px;
font-size: 12px;
margin-left: 44px;
color: #666;
`
const StyledProductCell = styled(ProductCell)`
display: flex;
flex: 1;
margin-top: 12px;
border: 1px solid #F0F0F0;
:last-child {
  margin-bottom: 0;
}
`
const StyledUserCell = styled(UserCell)`
margin-top: 12px;
`
const StyledCommentCell = styled(CommentCell)`
padding: 12px;
margin-bottom: 12px;
border: 1px solid #F0F0F0;
border-radius: 2px;
`
const getContent = ({ type, relation }) => {
  switch (type) {
    case 'option':
      return (
        <>
          <span>在问题「</span>
          <Link href={`/questions/${relation.question.id}`}>
            <a>
              {relation.question.name}
            </a>
          </Link>
          <span>」<strong>{relation.positive ? '推荐' : '反对'}</strong>了：</span>
          <StyledProductCell {...relation.product} size='small' />
        </>
      )
    case 'comment':
      return (
        <>
          <ReactMarkdown source={relation.content} />
          {relation.parent && (<StyledCommentCell comment={relation.parent} hideToolbar />)}
          {relation.products.map(x => (
            <StyledProductCell key={x.id} {...x} size='small' />
          ))}
        </>
      )
    case 'like':
      return (
        <>
          <strong>喜欢</strong><span>了</span>
          <StyledProductCell {...relation} size='small' />
        </>
      )
    case 'publish':
      return (
        <>
          <strong>发布</strong><span>了</span>
          <StyledProductCell {...relation} size='small' />
        </>
      )
    case 'follow':
      return (
        <>
          <strong>关注</strong><span>了</span>
          <StyledUserCell user={relation} />
        </>
      )
    case 'question':
      return (
        <div>
          发起<strong>问题</strong>：<Link href={`/questions/${relation.id}`}>
            <a>
              {relation.name}
            </a>
          </Link>
        </div>
      )
    default:
      console.log(type, relation)
  }
}

const Active = ({ active = {} }) => {
  return (
    <Container>
      <UserCell user={active.user} showDescription showFollow />
      <Content>{getContent(active)}</Content>
      <TimeContainer>
        <Time time={active.createdAt} />
      </TimeContainer>
    </Container>
  )
}

export default Active
