import React from 'react';

interface FormProps<K extends string, V> {
  init: Record<K, V>;
}

const useForm = <K extends string, V>({ init }: FormProps<K, V>) => {
  const [formData, setFormData] = React.useState(init);

  const handleChange = (key: K, value: V) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: value,
    }));
  };

  return {
    formData,
    handleChange,
  };
};

export default useForm;
