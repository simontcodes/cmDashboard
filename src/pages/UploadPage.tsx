import DefaultLayout from '../layout/DefaultLayout';
import FileUpload from '../components/FileUpload';
import Breadcrumb from '../components/Breadcrumb';

export default function UploadPage() {
  const currentUserId = 'user123'; // Replace with the actual user ID

  const handleFileUpload = (file: File, userId: string) => {
    // Handle the file upload logic here, including the user ID
    console.log('Uploading file:', file);
    console.log('User ID:', userId);
    // You can make an API call or perform any other necessary actions here
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Upload File" />
      <FileUpload
        onFileUpload={handleFileUpload}
        fileSizeLimit={1024 * 1024} // 1 MB limit
        userId={currentUserId}
      />
    </DefaultLayout>
  );
}
