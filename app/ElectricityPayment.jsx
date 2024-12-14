import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import ScreenLayout from "../components/ScreenLayout";
import PrimaryInput from "../components/PrimaryInput";
import PrimaryButton from "../components/PrimaryButton";
import { Fonts } from "../constants/Fonts";
import { createAuthAxios } from '../api/authAxios';
import PinPopup from '../components/PinPopup'; // You'll need to create this for React Native

export default function ElectricityPayment() {
  const authAxios = createAuthAxios();
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [customerDetails, setCustomerDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState('');

  // Fetch Providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await authAxios.get('/electricity/', { 
          params: { action: 'get_providers' } 
        });
        console.log("res", res.data)
        const providerList = res.data.message.lists;
        setProviders(providerList);
        
      } catch (err) {
        Alert.alert('Error', err.response?.data?.message || err.message);
        console.log("Error", err)
      }
    };

    fetchProviders();
  }, []);

  // Meter Validation
  const handleMeterValidation = async () => {
    if (meterNumber.length === 13 && selectedProvider) {
      setLoading(true);
      try {
        const res = await authAxios.post('/electricity/', {
          action: 'validate_meter',
          provider: selectedProvider,
          meter_number: meterNumber,
        });
        
        const responseData = res.data.message || res.data;
        const { status, name, minvend, maxvend, vendtype, address } = responseData || {};
      
        if (status) {
          setCustomerDetails({ name, vendtype, address, minvend, maxvend });
          Alert.alert('Success', 'Meter number validated!');
        } else {
          setCustomerDetails({});
          Alert.alert('Error', 'Validation failed. Check the meter number.');
        }
      } catch (err) {
        setCustomerDetails({});
        Alert.alert('Error', err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    } else if (meterNumber.length < 13) {
      Alert.alert('Error', 'Meter number must be 13 digits.');
      setCustomerDetails({});
    }
  };

  // Purchase Handler
  const handlePurchase = () => {
    if (!selectedProvider || !meterNumber || meterNumber.length !== 13) {
      Alert.alert('Error', 'Please select a provider and enter a valid meter number.');
      return;
    }
    setIsModalOpen(true);
  };

  // Pin Success Handler
  const handlePinSuccess = async () => {
    setIsModalOpen(false);
    setLoading(true);

    try {
      const res = await authAxios.post('/electricity/', {
        action: 'purchase',
        provider: selectedProvider,
        meter_number: meterNumber,
        amount: customerDetails.minvend,
      });

      if (res.data.status === 'error') {
        Alert.alert('Error', res.data.message.message);
      } else {
        Alert.alert('Success', 'Purchase successful!');
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Pin Error Handler
  const handlePinError = () => {
    setPin('');
  };

  // Close Modal
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <ScreenLayout>
      <ScrollView>
        <View style={{ marginVertical: 10 }}>
          <Text style={{
            fontSize: 16,
            fontFamily: Fonts.semiBold,
            marginBottom: 10,
          }}>
            Provider
          </Text>
          <View style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
          }}>
            <Picker
              selectedValue={selectedProvider}
              onValueChange={(itemValue) => {
                setSelectedProvider(itemValue);
                setCustomerDetails({});
                setMeterNumber('');
              }}
            >
              <Picker.Item label="Select a Provider" value="" />
              { providers && ( providers.map((provider) => (
                <Picker.Item 
                  key={provider.value} 
                  label={provider.disconame} 
                  value={provider.value} 
                />
              )))}
            </Picker>
          </View>
        </View>

        <PrimaryInput
          inputText="Meter Number"
          keyboardType="numeric"
          maxLength={13}
          value={meterNumber}
          onChangeText={setMeterNumber}
        />

        <TouchableOpacity 
          onPress={handleMeterValidation}
          style={{ 
            alignSelf: 'flex-start', 
            marginBottom: 10 
          }}
        >
          <Text style={{ 
            color: 'blue', 
            textDecorationLine: 'underline' 
          }}>
            Verify Meter Number
          </Text>
        </TouchableOpacity>

        {customerDetails.name && (
          <View style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 8,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text><Text style={{fontWeight: 'bold'}}>Name:</Text> {customerDetails.name}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Address:</Text> {customerDetails.address}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Type:</Text> {customerDetails.vendtype}</Text>
          </View>
        )}

        <PrimaryButton 
          btnText="Purchase" 
          onPress={handlePurchase}
          disabled={loading}
        >
          {loading && <ActivityIndicator color="white" />}
        </PrimaryButton>

        <PinPopup 
          isVisible={isModalOpen}
          onClose={handleCloseModal}
          pin={pin}
          onPinChange={setPin}
          onSuccess={handlePinSuccess}
          onError={handlePinError}
        />
      </ScrollView>
    </ScreenLayout>
  );
}