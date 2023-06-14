import React, { ChangeEvent, useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File, userId: string) => void;
  fileSizeLimit: number; // Maximum file size in bytes
  userId: string; // User ID
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  fileSizeLimit,
  userId,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file && file.size <= fileSizeLimit) {
      setSelectedFile(file);
      setErrorMessage('');
    } else {
      setSelectedFile(null);
      setErrorMessage(
        `File size should be less than ${fileSizeLimit / 1024} KB`
      );
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile, userId);
    }
  };

  const buttonClass =
    'rounded bg-primary p-2 mt-10 hover:bg-secondary hover:text-white hover:shadow-md hover:shadow-graydark dark:bg-primary dark:hover:bg-secondary  ';

  return (
    <div className="mx-auto flex h-80 max-w-md flex-col items-center justify-center rounded dark:bg-boxdark">
      <input
        className="ml-30"
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        onChange={handleFileChange}
      />
      {selectedFile && (
        <div className="mt-4">
          <p className="mr-10">Selected file: {selectedFile.name}</p>
          <button className={buttonClass} onClick={handleUpload}>
            Upload
          </button>
        </div>
      )}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
