import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';
import axios from 'axios';
import config from "../Constants/config";
import "../Css/Downloads.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { resolveDocumentUrl } from '../utils/documentUrl';

const baseURL = `${config.baseUrl}/documents`;

function Downloads({ type }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`${baseURL}/category/${type}`);
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      } finally {
        setLoading(false);
      }
    };

    if (type) fetchDocuments();
  }, [type]);

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold" data-aos='fade-right'>
        Downloadable Resources
      </h2>
      <p className="text-center text-muted mb-5" data-aos='fade-right'>
        Access important documents and resources in PDF format.
      </p>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : documents.length === 0 ? (
        <p className="text-center text-muted">
          No documents found in "{type}" category.
        </p>
      ) : (
        <Row className="g-4 justify-content-center">
          {documents.map((doc, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 text-center shadow-sm border-0">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <FaFilePdf size={48} color="#e63946" className="mb-3" />
                    <Card.Title className="fs-5">{doc.heading}</Card.Title>
                  </div>
                  <Button
                    variant="outline-primary"
                    href={resolveDocumentUrl(config.baseUrl, doc.filePath)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="mt-3"
                    data-aos='fade-up'
                  >
                    Download PDF
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Downloads;
