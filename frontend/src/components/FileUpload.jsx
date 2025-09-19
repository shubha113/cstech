import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFile,
  clearError,
  clearMessage,
  getDistributedLists,
} from "../redux/listSlice";
import "../styles/FileUpload.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, message, uploadStats } = useSelector(
    (state) => state.list
  );
  const { agents } = useSelector((state) => state.agent);

  const handleFileSelect = (file) => {
    const allowedTypes = [".csv", ".xlsx", ".xls"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      alert("Please select a CSV, XLSX, or XLS file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size should be less than 5MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    if (agents.length === 0) {
      alert("Please create agents first before uploading files");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    dispatch(uploadFile(formData));
  };

  useEffect(() => {
    if (message) {
      setSelectedFile(null);
      dispatch(getDistributedLists()); // Refresh the lists
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error, dispatch]);

  return (
    <div className="dashboard-card">
      <h2 className="card-title">Upload and Distribute File</h2>

      {agents.length === 0 && (
        <div className="alert alert-error">
          You need to create agents first before uploading files.
        </div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {message && <div className="alert alert-success">{message}</div>}

      <div
        className={`file-upload-area ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p>Drag and drop your file here or click to browse</p>
        <p className="file-types">Supported formats: CSV, XLSX, XLS (Max 5MB)</p>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileChange}
          className="file-input"
          id="file"
        />

        <label htmlFor="file" className="file-upload-btn">
          Browse File
        </label>
      </div>

      {selectedFile && (
        <div className="file-info">
          <span className="file-name">Selected file: {selectedFile.name}</span>
          <br />
          <span className="file-size">
            Size: {(selectedFile.size / 1024).toFixed(2)} KB
          </span>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="btn btn-primary"
        disabled={loading || !selectedFile}
      >
        {loading ? "Uploading..." : "Upload & Distribute"}
      </button>

      {uploadStats && (
        <div className="upload-stats">
          <div className="stat-box">
            <h3>{uploadStats.totalItems}</h3>
            <p>Total Items</p>
          </div>
          <div className="stat-box">
            <h3>{uploadStats.distributedLists}</h3>
            <p>Lists Distributed</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;