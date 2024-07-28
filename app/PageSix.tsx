import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const { width: screenWidth } = Dimensions.get('window');

const statesOfIndia = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const PageSix = ({ route, navigation }) => {
  const { formData } = route.params;

  const handlePrevScreen = (values) => {
    navigation.navigate('PageFive', { formData: values });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.subtitle}>Address Details</Text>
          <View style={styles.progressBarContainer}>
            <ProgressBar progress={1} width={screenWidth / 2 - 40} />
          </View>
          <Formik
            initialValues={{ ...formData, addressLine1: '', addressLine2: '', pinCode: '', district: '', state: '' }}
            validationSchema={Yup.object({
              addressLine1: Yup.string().required('Required'),
              addressLine2: Yup.string(),
              pinCode: Yup.string()
                .matches(/^\d{6}$/, 'Pin Code must be exactly 6 digits')
                .required('Required'),
              district: Yup.string().required('Required'),
              state: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              console.log(values);
              // Handle form submission here (e.g., send data to a server)
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.formContainer}>
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address Line 1</Text>
                    {errors.addressLine1 && touched.addressLine1 && <Text style={styles.errorText}>{errors.addressLine1}</Text>}
                  </View>
                  <TextInput
                    onChangeText={handleChange('addressLine1')}
                    onBlur={handleBlur('addressLine1')}
                    value={values.addressLine1}
                    style={styles.input}
                  />
                  
                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Address Line 2</Text>
                    {errors.addressLine2 && touched.addressLine2 && <Text style={styles.errorText}>{errors.addressLine2}</Text>}
                  </View>
                  <TextInput
                    onChangeText={handleChange('addressLine2')}
                    onBlur={handleBlur('addressLine2')}
                    value={values.addressLine2}
                    style={styles.input}
                  />

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Pin Code</Text>
                    {errors.pinCode && touched.pinCode && <Text style={styles.errorText}>{errors.pinCode}</Text>}
                  </View>
                  <TextInput
                    onChangeText={handleChange('pinCode')}
                    onBlur={handleBlur('pinCode')}
                    value={values.pinCode}
                    style={styles.input}
                    keyboardType="numeric"
                  />

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>District</Text>
                    {errors.district && touched.district && <Text style={styles.errorText}>{errors.district}</Text>}
                  </View>
                  <TextInput
                    onChangeText={handleChange('district')}
                    onBlur={handleBlur('district')}
                    value={values.district}
                    style={styles.input}
                  />

                  <View style={styles.fieldContainer}>
                    <Text style={styles.label}>State</Text>
                    {errors.state && touched.state && <Text style={styles.errorText}>{errors.state}</Text>}
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={values.state}
                      onValueChange={handleChange('state')}
                      onBlur={handleBlur('state')}
                      style={styles.picker}
                    >
                      <Picker.Item label="Select State" value="" />
                      {statesOfIndia.map((state) => (
                        <Picker.Item key={state} label={state} value={state} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => handlePrevScreen(formData)}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    padding: 20,
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  fieldContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#D8BFD8',
    textDecorationLine: 'underline',
    textDecorationColor: '#BA55D3',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    height: 40,
    paddingHorizontal: 8,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 40,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginLeft: 8,
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
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PageSix;
