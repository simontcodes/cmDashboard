interface Client {
  number?: number;
  role: 'admin' | 'client';
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  payments: string;
  appointments: string;
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
    <div className=" rounded-lg border-stroke bg-white p-6 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <h2 className="mb-4 text-2xl font-bold">Client Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">Name:</p>
          <p>
            {client.firstName} {client.lastName}
          </p>
        </div>
        <div>
          <p className="font-bold">Email:</p>
          <p>{client.email}</p>
        </div>
        <div>
          <p className="font-bold">Phone Number:</p>
          <p>{client.phoneNumber}</p>
        </div>
        <div>
          {/* <p className="font-bold">Education Level:</p>
          <p>{client.clientInfo.educationLevel}</p> */}
          {client.clientInfo?.educationLevel && (
            <p className="font-bold">
              Education Level: {client.clientInfo.educationLevel}
            </p>
          )}
        </div>
        <div>
          {client.clientInfo?.isMarried && (
            <>
              <p className="font-bold">Marital Status:</p>
              <p>{client.clientInfo.isMarried ? 'Married' : 'Single'}</p>
            </>
          )}
        </div>
        <div>
          {client.clientInfo?.hasBeenInCanada && (
            <>
              <p className="font-bold">Has Been in Canada:</p>
              <p>{client.clientInfo.hasBeenInCanada ? 'Yes' : 'No'}</p>
            </>
          )}
        </div>
        <div>
          <p className="font-bold">English Test:</p>
          <p>
            {client.clientInfo?.hasEnglishTest
              ? client.clientInfo.englishTest
              : 'N/A'}
          </p>
        </div>
        <div>
          <p className="font-bold">English Test Score:</p>
          {client.clientInfo?.englishTestScore ? (
            <div>
              <p>Reading: {client.clientInfo.englishTestScore.readingScore}</p>
              <p>Writing: {client.clientInfo.englishTestScore.writingScore}</p>
              <p>
                Listening: {client.clientInfo.englishTestScore.listeningScore}
              </p>
              <p>
                Speaking: {client.clientInfo.englishTestScore.speakingScore}
              </p>
            </div>
          ) : (
            <p>N/A</p>
          )}
        </div>
        <div>
          <p className="font-bold">Job Experience:</p>
          {client.clientInfo?.jobExperience ? (
            <ul>
              {client.clientInfo.jobExperience.map((exp, index) => (
                <li key={index}>
                  <p className="font-bold">{exp.workExp.jobTitle}</p>
                  <p>{exp.workExp.yearsOfExp} years of experience</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No job experience</p>
          )}
        </div>
      </div>
    </div>
  );
}
