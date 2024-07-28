import React from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ProgressBar from 'react-native-progress/Bar';
import { ThemedText } from '@/components/ThemedText';

const { width: screenWidth } = Dimensions.get('window');

const PageOne = ({ navigation }) => {
  const handlePrevScreen = () => {
    navigation.navigate('index');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>Member Form</ThemedText>
          <Text style={styles.subtitle}>Personal Details</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar progress={0.1667} width={screenWidth * 0.5 - 40} />
        </View>
        <Formik
          initialValues={{ salutation: '', gender: '', name: '', middleName: '', surname: '' }}
          validationSchema={Yup.object({
            salutation: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
            middleName: Yup.string(),
            surname: Yup.string().required('Required'),
          })}
          onSubmit={(values) => {
            console.log(values);
            navigation.navigate('PageTwo', { formData: values });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, touched }) => (
            <>
              <View style={styles.formContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Salutation</Text>
                  {errors.salutation && touched.salutation && <Text style={styles.errorText}>{errors.salutation}</Text>}
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={values.salutation}
                    onValueChange={(itemValue) => setFieldValue('salutation', itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Below" value="" />
                    <Picker.Item label="Mr." value="Mr." />
                    <Picker.Item label="Ms." value="Ms." />
                  </Picker>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Gender</Text>
                  {errors.gender && touched.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
                </View>
                <View style={styles.radioGroup}>
                  <TouchableWithoutFeedback onPress={() => setFieldValue('gender', 'Male')}>
                    <View style={styles.radioButtonContainer}>
                      <View style={[styles.radioButton, values.gender === 'Male' && styles.radioButtonSelected]} />
                      <Text style={styles.radioLabel}>Male</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => setFieldValue('gender', 'Female')}>
                    <View style={styles.radioButtonContainer}>
                      <View style={[styles.radioButton, values.gender === 'Female' && styles.radioButtonSelected]} />
                      <Text style={styles.radioLabel}>Female</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Name</Text>
                  {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={styles.input}
                />

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Middle Name</Text>
                  {errors.middleName && touched.middleName && <Text style={styles.errorText}>{errors.middleName}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('middleName')}
                  onBlur={handleBlur('middleName')}
                  value={values.middleName}
                  style={styles.input}
                />

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Surname</Text>
                  {errors.surname && touched.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
                </View>
                <TextInput
                  onChangeText={handleChange('surname')}
                  onBlur={handleBlur('surname')}
                  value={values.surname}
                  style={styles.input}
                />

              </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.submitButton, styles.backButton]}
                    onPress={handlePrevScreen}
                  >
                    <Text style={styles.submitButtonText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:50,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop:'auto',
  },
  titleContainer: {
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    flex: 1,
    margin:'auto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
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
  pickerContainer: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
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
  backButton: {
    backgroundColor: '#cccccc',
  },
  submitButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#D8BFD8',
    textDecorationLine: 'underline',
    textDecorationColor: '#BA55D3',
    marginBottom: 20,
    textAlign: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
  radioLabel: {
    fontSize: 16,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default PageOne;
