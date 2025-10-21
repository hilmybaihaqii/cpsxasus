import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="edit-profile" 
        options={{ 
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: '#ef4444',
          },
          headerTintColor: '#fff'
        }} 
      />
      <Stack.Screen 
        name="add-account" 
        options={{ 
          headerTitle: 'Add Account',
          headerStyle: {
            backgroundColor: '#ef4444',
          },
          headerTintColor: '#fff'
        }} 
      />
      <Stack.Screen 
        name="change-password" 
        options={{ 
          headerTitle: 'Change Password',
          headerStyle: {
            backgroundColor: '#ef4444',
          },
          headerTintColor: '#fff'
        }} 
      />
      <Stack.Screen 
        name="about" 
        options={{ 
          headerTitle: 'About App',
          headerStyle: {
            backgroundColor: '#ef4444',
          },
          headerTintColor: '#fff'
        }} 
      />
    </Stack>
  );
}