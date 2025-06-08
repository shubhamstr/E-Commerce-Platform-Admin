// import Image from 'next/image';
import { Col, Container, Row } from 'reactstrap';
import styles from './page.module.css';
import ContainerRightSide from './components/ContainerRightSide';

export default function Home() {
  return (
    <Container style={{ backgroundColor: '#F9F9F9' }} fluid>
      <Row xs="1" sm="2">
        <Col>
          <div className={styles.landingImg}>
            {/* <Image src="/model_3.png" alt="model" fill={true} style={{ objectFit: 'cover' }} /> */}
          </div>
        </Col>
        <Col className={`d-flex flex-column justify-content-center align-items-center`}>
          <ContainerRightSide />
        </Col>
      </Row>
    </Container>
  );
}
