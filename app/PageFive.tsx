import React from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');

const PageFive = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = (values) => {
    navigation.navigate('PageFour', { formData: values });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.subtitle}>School Details</Text>
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={0.833335} width={screenWidth / 2 - 40} />
          </View>
          <Formik
            initialValues={{
              ...formData,
              schoolName: '',
              udiseCode: '',
              district: '',
              schoolCategory: '',
            }}
            validationSchema={Yup.object({
              schoolName: Yup.string().required('Required'),
              udiseCode: Yup.string().required('Required'),
              district: Yup.string().required('Required'),
              schoolCategory: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate('PageSix', { formData: values });
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.formContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>School Name</Text>
                    {errors.schoolName && touched.schoolName && (
                      <Text style={styles.errorText}>{errors.schoolName}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('schoolName')}
                    onBlur={handleBlur('schoolName')}
                    value={values.schoolName}
                  />

                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>Udise Code</Text>
                    {errors.udiseCode && touched.udiseCode && (
                      <Text style={styles.errorText}>{errors.udiseCode}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('udiseCode')}
                    onBlur={handleBlur('udiseCode')}
                    value={values.udiseCode}
                  />

                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>District</Text>
                    {errors.district && touched.district && (
                      <Text style={styles.errorText}>{errors.district}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('district')}
                    onBlur={handleBlur('district')}
                    value={values.district}
                  />

                  <View style={styles.labelContainer}>
                    <Text style={styles.label}>School Category</Text>
                    {errors.schoolCategory && touched.schoolCategory && (
                      <Text style={styles.errorText}>{errors.schoolCategory}</Text>
                    )}
                  </View>
                  <RadioButton.Group
                    onValueChange={(value) => setFieldValue('schoolCategory', value)}
                    value={values.schoolCategory}
                  >
                    <View style={styles.radioContainer}>
                      <RadioButton value="Primary" />
                      <Text style={styles.radioText}>Primary</Text>
                    </View>
                    <View style={styles.radioContainer}>
                      <RadioButton value="Upper Primary" />
                      <Text style={styles.radioText}>Upper Primary</Text>
                    </View>
                    <View style={styles.radioContainer}>
                      <RadioButton value="Composite" />
                      <Text style={styles.radioText}>Composite</Text>
                    </View>
                  </RadioButton.Group>
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
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
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
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    marginRight: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    marginTop: 'auto',
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
  subtitle: {
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

export default PageFive;
