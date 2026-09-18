import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import config from '../Constants/config';
import TeamRecordList from './TeamRecordList';

const TeamDetail = () => {
  const [entries, setEntries] = useState([{ name: '', position: '', contactNumber: '', positionOrder: '' }]);
  const [category, setCategory] = useState('board-of-directors');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const categories = [
    { label: 'Board of Directors (संचालक समिति)', value: 'board-of-directors' },
    { label: 'Advisory Committee (सल्लाहकार)', value: 'advisory-committee' },
    { label: 'Account Committee (लेखा समिति)', value: 'account-committee' },
    { label: 'Risk Management Committee (बिपद् व्यवस्थापन उप-समिति)', value: 'risk-management-committee' },
    { label: 'Loan Sub-Committee (ऋण उप-समिति)', value: 'loan-committee' },
    { label: 'Education Sub-Committee (शिक्षा उप-समिति)', value: 'education-committee' },
    { label: 'Employees (कर्मचारी)', value: 'employees' },
  ];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...entries];
    updated[index][name] = value;
    setEntries(updated);
  };

  const addNewEntry = () => {
    setEntries([...entries, { name: '', position: '', contactNumber: '', positionOrder: '' }]);
  };

  const removeEntry = (index) => {
    if (entries.length === 1) return;
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      for (const entry of entries) {
        const params = new URLSearchParams();
        params.append('name', entry.name);
        params.append('position', entry.position);
        if (entry.contactNumber) params.append('contactNumber', entry.contactNumber);
        if (entry.positionOrder !== '') params.append('positionOrder', entry.positionOrder);

        await axios.post(
          `${config.baseUrl}/teamDetail/save/${category}`,
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
      }

      setSuccess('Team member(s) added successfully!');
      setEntries([{ name: '', position: '', contactNumber: '', positionOrder: '' }]);
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add one or more team members.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4 rounded-4">
            <h3 className="mb-4 text-center">Add Team Members</h3>
            {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}
            {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Category */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Entries */}
              {entries.map((entry, index) => (
                <div key={index} className="border rounded-3 p-3 mb-3 bg-light position-relative">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-semibold text-muted" style={{ fontSize: '0.85rem' }}>
                      Member #{index + 1}
                    </span>
                    {entries.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeEntry(index)}
                        style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                      >
                        ✕ Remove
                      </Button>
                    )}
                  </div>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="e.g. Ram Bahadur Thapa"
                          value={entry.name}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Position / Role <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="position"
                          placeholder="e.g. अध्यक्ष"
                          value={entry.position}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>
                          Contact Number{' '}
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="contactNumber"
                          placeholder="e.g. 9800000000"
                          value={entry.contactNumber}
                          onChange={(e) => handleChange(index, e)}
                          maxLength={15}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>
                          Display Order{' '}
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}>(Optional)</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="positionOrder"
                          placeholder="e.g. 1"
                          min={0}
                          value={entry.positionOrder}
                          onChange={(e) => handleChange(index, e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ))}

              <div className="d-grid mb-3">
                <Button variant="outline-secondary" onClick={addNewEntry}>
                  + Add Another Member
                </Button>
              </div>

              <div className="d-grid">
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? <><Spinner animation="border" size="sm" className="me-2" />Saving...</> : 'Save Members'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <TeamRecordList selectedCategory={category} refreshKey={refreshKey} />
    </Container>
  );
};

export default TeamDetail;
