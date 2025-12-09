import Hero from './sections/Hero';
import ReportClassification from './sections/ReportClassification';
import ComplaintsOverview from './sections/ComplaintsOverview';
import ReportingProcess from './sections/ReportingProcess';
import AlternativeChannels from './sections/AlternativeChannels';

const HomePage = () => {
  return (
    <>
      <Hero />
      <ReportClassification />
      <ComplaintsOverview />
      <ReportingProcess />
      <AlternativeChannels />
    </>
  );
};

export default HomePage;
