import React from 'react';
import {useParams} from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import PostContent from '../../components/PostContent/PostContent';
import CommentsBox from '../../components/CommentsBox/CommentsBox';

const PostViewPage: React.FC = () => {    
    const { id } = useParams();
    return (
        <Container fluid="xl" className="mt-3">
            <Row>
                <Col md={{ span: 8, order: 1 }} xs={{ span: 12, order: 1 }}>
                    <PostContent id={id} />
                </Col>
                <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 2 }}> {/** Move under the post when on mobile */}
                    <CommentsBox id={id} />
                </Col>
            </Row>
        </Container>
    )
};
export default PostViewPage;
