import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProgressBar from 'react-native-progress/Bar';

const { width: screenWidth } = Dimensions.get('window');

const PageTwo = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = (values) => {
    navigation.navigate('PageOne', { formData: values });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      
      <Formik
        initialValues={{ ...formData, fatherName: formData.middleName, fatherMiddleName: '', fatherSurnameName: formData.surname }}
        validationSchema={Yup.object({
          fatherName: Yup.string().required('Required'),
          fatherMiddleName: Yup.string(),
          fatherSurnameName: Yup.string().required('Required'),
        })}
        onSubmit={(values) => {
          console.log(values);
          navigation.navigate('PageThree', { formData: values });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.formWrapper}>
              <Text style={styles.title}>Father Information</Text>
              <View style={styles.progressBarContainer}>
                <ProgressBar progress={0.33334} width={screenWidth / 2 - 40} />
              </View>

              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Father Name</Text>
                  {errors.fatherName && touched.fatherName && <Text style={styles.errorText}>{errors.fatherName}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('fatherName')}
                  onBlur={handleBlur('fatherName')}
                  value={values.fatherName}
                  style={styles.input}
                />

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Father Middle Name</Text>
                  {errors.fatherMiddleName && touched.fatherMiddleName && <Text style={styles.errorText}>{errors.fatherMiddleName}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('fatherMiddleName')}
                  onBlur={handleBlur('fatherMiddleName')}
                  value={values.fatherMiddleName}
                  style={styles.input}
                />

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Father Surname</Text>
                  {errors.fatherSurnameName && touched.fatherSurnameName && <Text style={styles.errorText}>{errors.fatherSurnameName}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('fatherSurnameName')}
                  onBlur={handleBlur('fatherSurnameName')}
                  value={values.fatherSurnameName}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.backButton]}
                onPress={() => handlePrevScreen(values)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 150,
  },
  formWrapper: {
    width: '90%',
    maxWidth: 600,
    alignSelf: 'center',
    // padding: 20,
    flex: 1,
    margin:'auto',
  },
  formContainer: {
    marginTop: 30,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginRight:0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 600,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#cccccc',
  },
  submitButton: {
    backgroundColor: '#0066cc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    color: '#D8BFD8',
    textDecorationLine: 'underline',
    textDecorationColor: '#BA55D3',
    marginBottom: 20,
    textAlign: 'center',
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PageTwo;
