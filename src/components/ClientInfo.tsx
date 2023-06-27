interface Client {
  number?: number;
  role: 'admin' | 'client';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  payments: string[];
  appointments: string[];
  clientInfo: {
    educationLevel?: string;
    isMarried?: boolean;
    hasBeenInCanada?: boolean;
    hasEnglishTest?: boolean;
    englishTest?: 'ILTS' | 'TOEFL';
    englishTestScore?: {
      readingScore?: number;
      writingScore?: number;
      listeningScore?: number;
      speakingScore?: number;
    };
    jobExperience?: {
      workExp: {
        jobTitle?: string;
        yearsOfExp?: number;
      };
    }[];
  };
}

interface ClientInfoProps {
  client: Client;
}

export default function ClientInfo({ client }: ClientInfoProps) {
  return (
    <div className="rounded-lg border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      {/* Personal Information Section */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Name:</p>
            <p className="text-gray">
              {client.firstName} {client.lastName}
            </p>
          </div>
          <div>
            <p className="font-bold">Email:</p>
            <p className="text-gray">{client.email}</p>
          </div>
          <div>
            <p className="font-bold">Phone Number:</p>
            <p className="text-gray">{client.phoneNumber}</p>
          </div>
        </div>
      </div>
      {/* Education Section */}
      <hr className="my-8 bg-primary" /> {/* Horizontal line */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Education</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {client.clientInfo?.educationLevel && (
              <p className="font-bold">Highest level of education achieved:</p>
            )}
            <p className="text-gray">
              {client.clientInfo?.educationLevel || 'N/A'}
            </p>
          </div>
          <div>
            <p className="font-bold">English Test:</p>
            <p>
              {client.clientInfo?.hasEnglishTest
                ? client.clientInfo.englishTest
                : 'N/A'}
            </p>
          </div>
          <div className="col-span-2">
            <p className="font-bold">English Test Score:</p>
            {client.clientInfo?.englishTestScore ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray">Reading:</p>
                  <p className="text-gray">
                    {client.clientInfo.englishTestScore.readingScore}
                  </p>
                </div>
                <div>
                  <p className="text-gray">Writing:</p>
                  <p className="text-gray">
                    {client.clientInfo.englishTestScore.writingScore}
                  </p>
                </div>
                <div>
                  <p className="text-gray">Listening:</p>
                  <p className="text-gray">
                    {client.clientInfo.englishTestScore.listeningScore}
                  </p>
                </div>
                <div>
                  <p className="text-gray">Speaking:</p>
                  <p className="text-gray">
                    {client.clientInfo.englishTestScore.speakingScore}
                  </p>
                </div>
              </div>
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div>
      {/* Marital Status Section */}
      <hr className="my-8 bg-primary" /> {/* Horizontal line */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Marital Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {client.clientInfo?.isMarried !== undefined && (
              <>
                <p className="font-bold">Marital Status:</p>
                <p className="text-gray">
                  {client.clientInfo.isMarried ? 'Married' : 'Single'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Work Experience Section */}
      <hr className="my-8 bg-primary" /> {/* Horizontal line */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Work Experience</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Job Experience:</p>
            {client.clientInfo?.jobExperience ? (
              <ul>
                {client.clientInfo.jobExperience.map((exp, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-bold text-gray">
                      {exp.workExp.jobTitle}
                    </p>
                    <p className="text-gray">
                      {exp.workExp.yearsOfExp} years of experience
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No job experience</p>
            )}
          </div>
        </div>
      </div>
      <hr className="my-8 bg-primary" /> {/* Horizontal line */}
      <div className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Previous Canada visits</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            {client.clientInfo?.hasBeenInCanada && (
              <>
                <p className="font-bold">Has Been in Canada before:</p>
                <p>{client.clientInfo.hasBeenInCanada ? 'Yes' : 'No'}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
