import DefaultLayout from '../layout/DefaultLayout';
import MultiPartForm from '../components/MultiPartForm';
import Breadcrumb from '../components/Breadcrumb';
import questions from '../data/formQuestions';

export default function FormPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form" />
      <MultiPartForm questions={questions} />
    </DefaultLayout>
  );
}
