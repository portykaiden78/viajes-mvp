import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.porty.viajes',
  appName: 'viajesPorty',
  webDir: "public",
  server: {
    url: "http://192.168.0.127:55000",
    cleartext: true
  }
};

export default config;
