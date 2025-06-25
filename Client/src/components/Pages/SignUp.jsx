import React from 'react';
import ImageSection from '../Common/ImageSection';
import FormSection from '../SignupComponents/FormSection';
const SignUp = () => {
    return (
        <div className='flex justify-center items-center  gap-12 overflow-y-hidden px-6 md:px-12 lg:px-20'>
          <ImageSection />
          <FormSection />
        </div>
      );
}

export default SignUp
