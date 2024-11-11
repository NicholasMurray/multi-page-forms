import { useContext } from 'react';
import { FormContext, FormContextType } from '../providers/MultiPageFormProvider';

// Custom hook to use form context
export const useMultiPageForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};