import { useState, useRef} from "react"
import {File as FileIcon, Trash as TrashIcon, Upload as UploadIcon} from '@phosphor-icons/react'

const styles = {heading: {
  color: "white",
  textAlign: "left",
  marginBottom: "1em",
},
uploadBox: {
  padding: "4em 7em",
  border: "1px solid white",
  borderRadius: "5px",
  backgroundColor: "#1a1a1a",
  marginBottom: "2em",
  cursor: "pointer",
},
content: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1em",
},
circle: {
  padding: "1.25em",
  backgroundColor: "#3a3a3a",
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},
uploadText: {
  margin: 0,
  color: "white",
  textAlign: "center",
},
uploadSubtext: {
  margin: 0,
  color: "#3a3a3a",
  textAlign: "center",
},
fileList: {
  display: "flex",
  flexDirection: "column",
  gap: "1em",
},
fileElement: {
  display: "flex",
  padding: "1em",
  border: "1px solid white",
  borderRadius: "5px",
  backgroundColor: "#1a1a1a",
  alignItems: "flex-start",
  textAlign: "left",
  gap: "0.75em",
},
fileIcon: {
  padding: "0.5em",
  backgroundColor: "#3a3a3a",
  marginRight: "1em",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
},
fileDetails: {
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
},
fileName: {
  color: "white",
  margin: 0,
  fontWeight: 600,
},
fileSize: {
  color: "#808080",
  margin: 0,
  fontSize: "0.875em",
},
filler: {
  flex: 1,
},
trash: {
  backgroundColor: "transparent",
  padding: "0.5em",
  borderRadius: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  cursor: "pointer",
},
uploadButtonContainer: {
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  alignItems: "flex-end",
},
uploadButton: {
  backgroundColor: "#0450d5",
  color: "white",
  borderRadius: "4px",
  border: "none",
  padding: "0.5em",
  cursor: "pointer",
  marginTop: "1em",
},
uploadingText: {
  color: "white",
  margin: 0,
},
successText: {
  color: "#22c55e",
  margin: 0,
},
errorText: {
  color: "#ef4444",
  margin: 0,
},
uploadingProgress: {
  backgroundColor: "#3a3a3a",
  height: "24px",
  marginTop: "12px",
  maxWidth: "200px",
  width: "100%",
  textAlign: "center",
  lineHeight: "24px",
  position: "relative",
},
uploadingBar: {
  backgroundColor: "#0450d5",
  height: "24px",
  position: "absolute",
  width: "100%",
  zIndex: 0,
},
uploadPercent: {
  color: "white",
  margin: 0,
  lineHeight: "24px",
  position: "absolute",
  left: "50%",
  transform: "translate(-50%, 0%)",
  zIndex: 1,
}
}

const Playground = () => {
  const inputRef = useRef(null)

  const [file, setFile] = useState()
  const [status, setStatus] = useState("pending")
  const [progress, setProgress] = useState()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Validate file type before upload
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      alert("Invalid file type. Please select a JPEG or PNG image.");
      return;
    }
    // Proceed with file upload if validations pass
    // e.g., setFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault()
    setStatus("pending")
    setFile(e.dataTransfer.files[0])
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleUpload = () => {
    setStatus("uploading");
  
    const formData = new FormData();
    formData.append("file", file);
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3100/upload");

    xhr.upload.onprogress = (e) => {
      const percentLoaded = Math.round((e.loaded / e.total) * 100);
      setProgress(percentLoaded);
    };
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      }
    };
  
    xhr.send(formData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
      onReset={() => {
        setStatus("pending");
        setFile(null);
      }}
    >
      <h1 style={styles.heading}>Upload Files</h1>

      <div style={styles.uploadBox} 
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      >
        <div style={styles.content}>
          <div style={styles.circle}>
            <UploadIcon size={32} />
          </div>

          <h2 style={styles.uploadText}>
            Drop your files here,
            <br /> or browse
          </h2>
        </div>
      </div>
      <input
        type="file"
        onChange={(e) => {
          handleFileChange(e)
          setStatus("pending");
          setFile(e.target.files?.[0] || null);
        }}
        hidden
        ref={inputRef}
      />

      {file && (
        <>
          <div style={styles.fileList}>
            <div style={styles.fileElement}>
              <div style={styles.fileIcon}>
                <FileIcon size={32} />
              </div>
              <div style={styles.fileDetails}>
                <p style={styles.fileName}>{file.name}</p>
                <p style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</p>
              </div>

              <div style={styles.filler} />

              {status === "pending" && (
                <button
                  style={styles.trash}
                  onClick={(e) => {
                    e.preventDefault();
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                    setFile(null);
                  }}
                >
                  <TrashIcon size={32} />
                </button>
              )}
             {status === "uploading" && (
              <div style={styles.uploadingProgress}>
               <div
                style={{
                 ...styles.uploadingBar,
                  width: `${progress}%`,
                }}
                />
               <p style={styles.uploadPercent}>{progress}%</p>
               </div>
              )}
              {status === "success" && <p style={styles.successText}>File uploaded successfully!</p>}
              {status === "error" && <p style={styles.errorText}>File upload failed!</p>}
            </div>
          </div>
          <div style={styles.uploadButtonContainer}>
            {status === "success" ? (
              <button style={styles.uploadButton} type="reset">
                Reset
              </button>
            ) : (
              <button style={styles.uploadButton} type="submit" disabled={status === "uploading"}>
                Upload Files
              </button>
            )}
          </div>
        </>
      )}
    </form>
  );
}

export default Playground
