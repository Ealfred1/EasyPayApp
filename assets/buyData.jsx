import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createAuthAxios } from '../../api/authAxios'
import { Toast } from 'react-native-toast-message';
import Swal from 'sweetalert2';

// Import SVG logos
import Mtn from '@/assets/mtn.svg';
import Airtel from '@/assets/airtel.svg';
import NineMobile from '@/assets/9mobile.svg';
import Glo from '@/assets/glo.svg';

// Import your existing components
import ScreenLayout from '../../components/ScreenLayout';
import MainHeader from '../../components/MainHeader';
import CustomizableMainText from '../../components/CustomizableMainText';
import PrimaryInput from '../../components/PrimaryInput';
import PrimaryButton from '../../components/PrimaryButton';
import PinPopup from '../../components/Auth/PinPopup';

const DataPage = () => {
  const authAxios = createAuthAxios();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [dataType, setDataType] = useState('');
  const [amount, setAmount] = useState(0.0);
  const [monthValidate, setMonthValidate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataTypes, setDataTypes] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const networks = [
    { id: '1', name: 'MTN', logo: Mtn },
    { id: '2', name: 'AIRTEL', logo: Airtel },
    { id: '3', name: '9MOBILE', logo: NineMobile },
    { id: '4', name: 'GLO', logo: Glo },
  ];

  const handleAutoFill = () => {
    // Implement auto-fill logic, similar to web version
    const userPhoneNumber = JSON.parse(localStorage.getItem("user"))?.phone_number;
    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
    }
  };

  const handlePay = () => {
    if (!selectedNetwork || !phoneNumber || !selectedPlan || !amount) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all required fields'
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handlePinSuccess = () => {
    setIsModalOpen(false);
    setLoading(true);

    const requestBody = {
      network: selectedNetwork.id,
      phone_number: phoneNumber,
      plan_id: selectedPlan.dataplan_id,
      action: 'purchase',
      data_type: dataType
    };

    authAxios.post('/data/', requestBody)
      .then(res => {
        if (res.data.status === 'error') {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: res.data.message
          });
        } else {
          // Use a React Native compatible alert/modal
          Swal.fire('Success!', res.data.message, 'success');
        }
      })
      .catch(err => {
        const errorMessage = err.response?.data?.message || err.message;
        Swal.fire('Error!', errorMessage, 'error');
      })
      .finally(() => setLoading(false));
  };

  const handlePinError = () => setPin('');

  // Similar useEffect hooks from web version
  useEffect(() => {
    if (selectedNetwork) {
      setDataType('');
      setSelectedPlan(null);
      setAmount(0);
      setMonthValidate('');
      setIsLoading(true);

      authAxios.post(`/data/`, { action: 'network_data', network_id: selectedNetwork.id })
        .then(res => {
          if (res.data.status === 'success') {
            const networkData = res.data.message[selectedNetwork.name] || {};
            setDataTypes(Object.keys(networkData));
            setDataPlans([]);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res.data.message
            });
          }
        })
        .catch(err => {
          const errorMessage = err.response?.data?.message || err.message;
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: errorMessage
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedNetwork]);

  useEffect(() => {
    if (dataType && selectedNetwork) {
      setIsLoading(true);
      authAxios.post(`/data/`, { action: 'get_plans', network_id: selectedNetwork.id, data_type: dataType })
        .then(res => {
          if (res.data.status === 'success') {
            setDataPlans(res.data.message);
            const defaultPlan = res.data.message[0];
            setSelectedPlan(defaultPlan);
            setAmount(parseFloat(defaultPlan.plan_amount) + 8);
            setMonthValidate(defaultPlan.month_validate);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res.data.message
            });
          }
        })
        .catch(err => {
          const errorMessage = err.response?.data?.message || err.message;
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: errorMessage
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [dataType, selectedNetwork]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
    const percentage = parseFloat(plan.plan_amount) * 0.05;
    setAmount(parseFloat(plan.plan_amount) + 8);
    setMonthValidate(plan.month_validate);
  };

  return (
    <ScreenLayout>
      <ScrollView>
        <CustomizableMainText style={styles.titleText}>
          Buy Data
        </CustomizableMainText>

        {/* Network Selection */}
        <View style={styles.networkContainer}>
          {networks.map(network => (
            <TouchableOpacity
              key={network.id}
              onPress={() => setSelectedNetwork(network)}
              style={[
                styles.networkButton,
                { 
                  opacity: selectedNetwork?.id === network.id ? 1 : 0.5,
                  backgroundColor: selectedNetwork?.id === network.id ? 'rgba(0,0,0,0.1)' : 'transparent'
                }
              ]}
            >
              {network.logo}
            </TouchableOpacity>
          ))}
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={11}
            style={styles.input}
          />
          <TouchableOpacity onPress={handleAutoFill} style={styles.autoFillButton}>
            <Text style={styles.autoFillText}>Me</Text>
          </TouchableOpacity>
        </View>

        {/* Data Type Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Data Type</Text>
          <Picker
            selectedValue={dataType}
            onValueChange={(itemValue) => setDataType(itemValue)}
            enabled={!isLoading}
          >
            <Picker.Item label="Select Data Type" value="" />
            {dataTypes
              .filter((type) => {
                if (selectedNetwork?.name !== 'MTN' && type !== 'CORPORATE GIFTING') {
                  return false;
                }
                return true;
              })
              .map((type) => (
                <Picker.Item key={type} label={type} value={type} />
              ))}
          </Picker>
        </View>

        {/* Data Plan Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Data Plan</Text>
          <Picker
            selectedValue={selectedPlan?.dataplan_id}
            onValueChange={(itemValue) => {
              const plan = dataPlans.find(p => p.dataplan_id === itemValue);
              handlePlanChange(plan);
            }}
            enabled={!isLoading}
          >
            <Picker.Item label="Select Data Plan" value="" />
            {dataPlans.map((plan) => (
              <Picker.Item 
                key={plan.dataplan_id} 
                label={plan.plan} 
                value={plan.dataplan_id} 
              />
            ))}
          </Picker>
        </View>

        {/* Amount Input */}
        <PrimaryInput
          inputText="Amount"
          value={amount.toString()}
          editable={false}
          keyboardType="numeric"
        />

        {/* Month Validation Input */}
        <PrimaryInput
          inputText="Month Validation"
          value={monthValidate}
          editable={false}
        />

        {/* Purchase Button */}
        <PrimaryButton 
          btnText="Purchase" 
          onPress={handlePay}
          disabled={loading}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator 
            size="large" 
            color="#0000ff" 
            style={styles.loadingIndicator} 
          />
        )}

        {/* Pin Modal */}
        <PinPopup 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pin={pin}
          setPin={setPin}
          onSuccess={handlePinSuccess}
          onError={handlePinError}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  networkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  networkButton: {
    padding: 10,
    borderRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10
  },
  input: {
    flex: 1,
    padding: 10
  },
  autoFillButton: {
    backgroundColor: 'green',
    padding: 10
  },
  autoFillText: {
    color: 'white'
  },
  pickerContainer: {
    marginVertical: 10
  },
  pickerLabel: {
    fontSize: 10,
    opacity: 0.7
  },
  loadingIndicator: {
    marginTop: 20
  }
});

export default DataPage;