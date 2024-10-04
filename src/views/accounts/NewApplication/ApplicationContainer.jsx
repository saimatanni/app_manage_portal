import React, { useEffect } from 'react'
import { NewApplication } from '..'
import SubmittedApplication from '../submittedApplication/component/SubmittedApplication'

const ApplicationContainer = () => {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    // Scroll to top when component mounts
    handleScroll();

    // Scroll to top on navigate
    const scrollOnNavigate = () => {
      handleScroll();
    };

    // Attach scrollOnNavigate as a listener to the beforeunload event
    window.addEventListener('beforeunload', scrollOnNavigate);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', scrollOnNavigate);
    };
  }, []);
  return (
    <div>
        <NewApplication/>
        <br />
        <br />
        <SubmittedApplication/>
    </div>
  )
}

export default ApplicationContainer