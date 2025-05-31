import { Redirect } from 'expo-router';

// Redirect from the root to the main tab navigation
export default function Root() {
  return <Redirect href="/(tabs)" />;
}