// import Image from 'next/image';
import { Col, Container, Row } from 'reactstrap';
// import styles from './page.module.css';
import LandingSection from './components/LandingSection';
import PopularProducts from './components/PopularProducts';
import MostRatedProducts from './components/MostRatedProducts';
import Collections from './components/Collections';

export default function Home() {
  return (
    <Container fluid>
      <Row xs="1" style={{ backgroundColor: '#F9F9F9' }}>
        <Col>
          <LandingSection />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <Collections />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <PopularProducts />
        </Col>
      </Row>
      <Row xs="1">
        <Col>
          <MostRatedProducts />
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
}
