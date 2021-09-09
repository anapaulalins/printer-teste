import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NetPrinter } from "react-native-thermal-receipt-printer";

interface INetPrinter {
  device_name?: string;
  host: string;
  port: number;
}

export default function App() {
  const [printers, setPrinters] = useState<INetPrinter[]>([]);
  const [currentPrinter, setCurrentPrinter] = useState(null as any);

  // host = ip impressora
  const [host] = useState('')
  const port = 9100

  useEffect(() => {
    if (host !== '') {
      connectPrinter()
    }
  }, [])

  const connectPrinter = () => {
    NetPrinter.init().then(() => {
      // setPrinters([{ host: '192.168.10.241', port: 9100, device_name: '' }])
      NetPrinter.connectPrinter(host, port).then((printer) => {
        console.log(printer)
        setCurrentPrinter(printer)
      })
    })
  }

  // const connectPrinter = (host, port) => {
  //   NetPrinter.connectPrinter(host, port).then((printer) => {
  //     console.log(printer)
  //     setCurrentPrinter(printer)
  //   })
  // }

  const printTextTest = () => {
    if (currentPrinter) {
      NetPrinter.printText("<C>sample text</C>\n");
    }
  }

  const printBillTest = () => {
    if (currentPrinter) {
      NetPrinter.printBill("<C>sample bill</C>");
    }
  }


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={printTextTest} style={{ padding: 10, backgroundColor: 'red' }}>
        <Text>Print Text</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={printBillTest} style={{ padding: 10, backgroundColor: 'blue', marginTop: 20 }}>
        <Text>Print Bill Text</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});