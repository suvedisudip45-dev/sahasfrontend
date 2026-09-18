import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import config from "../Constants/config";
import { FaFilePdf, FaTimes, FaDownload } from "react-icons/fa";
import "../Css/DocumentManager.css";
import { resolveDocumentUrl } from "../utils/documentUrl";

const baseURL = `${config.baseUrl}/documents`;

function DocumentManager() {
  const [heading, setHeading] = useState("");
  const [category, setCategory] = useState("reports");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await axios.get(`${baseURL}/category/${category}`);
      setDocuments(res.data);
    } catch (err) {
      console.error("Error fetching documents:", err);
      alert("Failed to load documents.");
    }
  }, [category]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) return alert("Only PDF files are allowed for reports and downloads.");

    if (!['reports', 'downloads'].includes(category)) {
      return alert("Category must be reports or downloads.");
    }

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("category", category);
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(`${baseURL}/save`, formData);
      setHeading("");
      setFile(null);
      await fetchDocuments();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, filePath) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`${baseURL}/delete/${id}`, {
        data: { filePath },
      });
      await fetchDocuments();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="doc-manager">
      <h2>Document Manager</h2>

      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Enter heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="reports">Reports</option>
          <option value="downloads">Downloads</option>
        </select>
        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        {file && <small>Selected: {file.name}</small>}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <hr />

      <div className="doc-list">
        {documents.length === 0 ? (
          <p>No {category} documents available.</p>
        ) : (
          documents.map((doc) => {
            const pdfUrl = resolveDocumentUrl(config.baseUrl, doc.filePath);
            const pdfFileName = `${(doc.heading || 'document').replace(/[^a-z0-9-_]+/gi, '_')}.pdf`;

            return (
              <div className="doc-item" key={doc._id}>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(doc._id, doc.filePath)}
                >
                  <FaTimes />
                </button>
                <FaFilePdf size={30} color="red" />

                <p>{doc.heading}</p>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={pdfFileName}
                  className="view-link"
                >
                  View PDF
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={pdfFileName}
                  className="download-link"
                >
                  <FaDownload /> Download
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DocumentManager;
