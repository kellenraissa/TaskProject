// import React, {Component} from 'react'
// import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native'
// import moment from 'moment'
// import 'moment/locale/pt-br'
// import commonStyles from '../../components/commonStyles'

// import Task from '../../components/Task'

// export default class TaskList extends Component {

//   state = {
//     tasks: [{
//       id: Math.random(),
//       desc: 'Comprar Livro de React Native',
//       estimatedAt: new Date(),
//       doneAt: new Date()
//     },
//     {
//       id: Math.random(),
//       desc: 'Ler Livro de React Native',
//       estimatedAt: new Date(),
//       doneAt: null
//     },
//   ]
//   }

//   toggleTask = taskId => {
//     const tasks = [...this.state.tasks]
//     tasks.forEach(task => {
//       if(task.id === taskId) {
//         task.doneAt = task.doneAt ? null : new Date()
//       }
//     })
//     this.setState({tasks})
//   }

//   render() {
//     const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
//     return (
//       <View  style={styles.container }>
//         <ImageBackground  source={require('@/assets/images/today.jpg')} style={styles.background }>
//           <View style={styles.titleBar}>
//             <Text style={styles.title}>Hoje</Text>  
//             <Text style={styles.subtitle}>{today}</Text>  
//           </View>  
//         </ImageBackground>
//         <View style={styles.taskList }>
//           <FlatList data={this.state.tasks}
//             keyExtractor={item => `${item.id}`}
//             renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask(item.id)}/>}/>
//         </View>
//       </View>
//     )
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1
//   },
//   background: {
//     flex: 3,
//     height: '100%',
//     width: '100%'
//   },
//   taskList: {
//     flex: 7
//   },
//   titleBar: {
//     flex: 1,
//     justifyContent: 'flex-end'
//   },
//   title: {
//     fontFamily: commonStyles.fontFamily,
//     color: commonStyles.colors.secondary,
//     fontSize: 50,
//     marginLeft: 20,
//     marginBottom: 20
//   },
//   subtitle: {
//     fontFamily: commonStyles.fontFamily,
//     color: commonStyles.colors.secondary,
//     fontSize: 20,
//     marginLeft: 20,
//     marginBottom: 20

//   }
// })

import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Step1, Step2, Step3 } from './Step';

// Definição dos tipos dos valores do formulário
interface FormValues {
  firstName: string;
  email: string;
  password: string;
}

// Schemas de validação para cada step
const step1ValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  email: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
  password: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
});

const step2ValidationSchema = Yup.object().shape({
  firstName: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
});

const step3ValidationSchema = Yup.object().shape({
  firstName: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
  email: Yup.string().notRequired().ensure(), // Usa ensure para garantir que sempre será uma string
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

// Array com os schemas de validação
const validationSchemas: Yup.ObjectSchema<FormValues>[] = [
  step1ValidationSchema,
  step2ValidationSchema,
  step3ValidationSchema,
];



// Props para os componentes dos steps
interface StepProps {
  values: FormValues;
  handleChange: (field: string) => void;
  handleBlur: (field: string) => void;
  errors: Partial<FormValues>;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);

  // Pega o schema de validação para o step atual
  const currentValidationSchema = validationSchemas[step];

  const isLastStep = step === validationSchemas.length - 1;

  const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    if (isLastStep) {
      // Envia o formulário finalizado
      console.log(values);
    } else {
      // Vai para o próximo step
      setStep((prevStep) => prevStep + 1);
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ firstName: '', email: '', password: '' }}
      validationSchema={currentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
        <View>
          {step === 0 && (
            <Step1 values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
          )}
          {step === 1 && (
            <Step2 values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
          )}
          {step === 2 && (
            <Step3 values={values} handleChange={handleChange} handleBlur={handleBlur} errors={errors} />
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            {step > 0 && (
              <Button title="Back" onPress={() => setStep((prevStep) => prevStep - 1)} />
            )}
            <Button
              title={isLastStep ? 'Submit' : 'Next'}
              onPress={handleSubmit as any}
            />
          </View>

          {/* Para depuração, mostra os valores atuais do formulário */}
          <Text>{JSON.stringify(values, null, 2)}</Text>
        </View>
      )}
    </Formik>
  );
};

export default MultiStepForm;
