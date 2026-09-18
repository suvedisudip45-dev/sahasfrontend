import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import TeamDetail from "./TeamDetail";
import config from "../Constants/config";
import axios from "axios";

const TEAM_CATEGORY_ORDER = [
  'board-of-directors',
  'account-committee',
  'advisory-committee',
  'risk-management-committee',
  'loan-committee',
  'education-committee',
  'employees',
];
// Map DB category values → Nepali labels
const CATEGORY_LABELS = {
  'board-of-directors':          'संचालक समिति',
  'account-committee':           'लेखा समिति',
  'account-comittee':            'लेखा समिति',           // backward-compat typo
  'risk-management-committee':   'बिपद् व्यवस्थापन उप-समिति',
  'loan-committee':              'ऋण उप-समिति',
  'education-committee':         'शिक्षा उप-समिति',
  'advisory-committee':          'सल्लाहकार',
  'employees':                   'कर्मचारी',
};

function normalizeCategory(slug = '') {
  if (!slug) return '';
  const value = String(slug).trim();
  return value === 'account-comittee' ? 'account-committee' : value;
}

function getCategoryLabel(slug) {
  const normalized = normalizeCategory(slug);
  return CATEGORY_LABELS[normalized] ||
    normalized.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function sortCategories(categories = []) {
  return [...new Set(categories.map(normalizeCategory).filter(Boolean))].sort((a, b) => {
    const indexA = TEAM_CATEGORY_ORDER.indexOf(a);
    const indexB = TEAM_CATEGORY_ORDER.indexOf(b);
    const safeA = indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA;
    const safeB = indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB;
    return safeA - safeB;
  });
}

function TeamDetailContainer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    axios.get(`${config.baseUrl}/teamDetail/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to load categories", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  const orderedCategories = sortCategories(categories);

  if (orderedCategories.length === 0) {
    return (
      <p className="text-center text-muted py-5">
        No team information available yet.
      </p>
    );
  }

  return (
    <Container className="py-4">
      {orderedCategories.map((cat) => (
        <div key={cat} className="mb-5">
          {/* Section heading */}
          <h5
            className="mb-3 fw-bold"
            style={{
              color: '#002B5B',
              borderLeft: '4px solid #28A745',
              paddingLeft: '10px',
            }}
          >
            {getCategoryLabel(cat)}
          </h5>

          {/* Member list table */}
          <TeamDetail type={cat} />
        </div>
      ))}
    </Container>
  );
}

export default TeamDetailContainer;
