// import Image from 'next/image';
import { Col, Container, Row } from 'reactstrap';
// import styles from './page.module.css';
import LandingSection from './components/LandingSection';

export default function Home() {
  return (
    <Container fluid>
      <Row xs="1" style={{ backgroundColor: '#F9F9F9' }}>
        <Col>
          <LandingSection />
        </Col>
      </Row>
    </Container>
  );
}
