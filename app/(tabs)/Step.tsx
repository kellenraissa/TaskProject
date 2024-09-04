import { View, Text, TextInput, Button } from 'react-native';

interface FormValues {
    firstName: string;
    email: string;
    password: string;
  }

  interface StepProps {
    values: FormValues;
    handleChange: (field: string) => (text: string) => void;
    handleBlur: (field: string) => () => void;
    errors: Partial<FormValues>;
  }
// Componentes dos Steps
export const Step1: React.FC<StepProps> = ({ values, handleChange, handleBlur, errors }) => (
    <View>
      <Text>First Name</Text>
      <TextInput
        onChangeText={handleChange('firstName')}
        onBlur={handleBlur('firstName')}
        value={values.firstName}
      />
      {errors.firstName && <Text style={{ color: 'red' }}>{errors.firstName}</Text>}
    </View>
  );
  
  export const Step2: React.FC<StepProps> = ({ values, handleChange, handleBlur, errors }) => (
    <View>
      <Text>Email</Text>
      <TextInput
        onChangeText={(text) => handleChange('email')(text)}
        onBlur={handleBlur('email')}
        value={values.email}
        keyboardType="email-address"
      />
      {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
    </View>
  );
  
  export const Step3: React.FC<StepProps> = ({ values, handleChange, handleBlur, errors }) => (
    <View>
      <Text>Password</Text>
      <TextInput
        onChangeText={handleChange('password')}
        onBlur={ handleBlur('password')}
        value={values.password}
        secureTextEntry
      />
      {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
    </View>
  );