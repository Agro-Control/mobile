import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../../interface/user';
import "core-js/stable/atob";

export default function useUserData() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const jsonUser = await AsyncStorage.getItem('user');
      setUser(jsonUser != null ? JSON.parse(jsonUser) : null);
    };

    fetchUserData();
  }, []);

  const saveUserData = async (userData: User) => {
    const jsonUser = JSON.stringify(userData);
    await AsyncStorage.setItem('user', jsonUser);
    setUser(userData);
  };

  const clearUserData = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return { user, saveUserData, clearUserData };
}