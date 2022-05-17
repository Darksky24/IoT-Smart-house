import { LineChart } from "react-native-chart-kit";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import init from 'react_native_mqtt';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from "react"; 
import chart from "../components/chart";
import { useData } from "../context/DataContext";

//chart



const screenWidth = Dimensions.get('screen');

function HumidScreen() {
  //const { payload, topic } = useData();
  var [data, setData] = useState([50, 51, 49, 51, 51]);
  var humid = [50, 51, 49, 51, 51];
  const [h, setH] = useState();
  //data.shift();
  //data.push(6);
  /*useEffect(() => {
    if (topic == 'thienkun/feeds/test')
    {
      if (temp.length == 5)
        temp.shift();
      temp.push(parseInt(payload));
      setData(temp);
    }
  }, [payload, topic]);*/
  const feeds = ['thienkun/feeds/onoff', 'thienkun/feeds/test', 'thienkun/feeds/humid', 'thienkun/feeds/temp', 'tentoila24/feeds/humid'];
    //const topic = feeds[1];
    
    const password = //'aio_EVNi18eQsuWTkmrRxnPTKC8ZV5KJ';
    //'aio_MRjJ42fgnx14P2x4aAIy6OuylnNQ';
    'aio_usWu17O0FXcVE3lAletS2mcJS1I1';
    //const uri = 'mqtts://#thienkun:#aio_VwGf00hR9EfUZuJVX8yvnIwuGEf2@io.adafruit.com';
    const mqttHost = 'io.adafruit.com';
    
    var client;
    
    function mqtt() {
        var clientID = "myclientid_" + new Date().getTime() + new Date();
        client = new Paho.MQTT.Client(mqttHost, 443, clientID);
        // set callback handlers
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        // connect the client
        client.connect({onSuccess:subscribe, onFailure: check, useSSL: true, userName: 'tentoila24', password: password, keepAliveInterval: 1000 });
    }
    function check() 
    {
        console.log('No connection');
    }
    
    function subscribe()
    {
        client.subscribe(feeds[4]);
    }
    
    // called when the client connects
    function onConnect(mess, topic) {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        if (!client.isConnected())
        {
            console.log('No connection'); 
        }
        else
        { 
            var message = new Paho.MQTT.Message(mess.toString());
            message.destinationName = topic;
            message.retained = true;
            client.send(message);
        }
        
    }
    
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
        }
    }

    

    // called when a message arrives
    function onMessageArrived(message) {
        console.log("onMessageArrived:" + message.payloadString);
        //setTopic(message.topic);
        //setPayload(message.payloadString);
        if (message.topic == feeds[4])
        {
          if (humid.length == 5)
          {
            humid.shift();
          }
          humid.push(parseInt(message.payloadString));
          setData(humid);
          setH(parseInt(message.payloadString))
        }
        
    }
  //function refresh_data() {}
  mqtt();
  const width = Dimensions.get("screen").width * 0.8;
  return(
    <View style={{margin: '10%'}}>
      <Text> Humid Line Chart</Text>
      <LineChart
          data={{
            labels: ["1 min", "45 sec", "30 sec", "15 sec", "Now"],
            datasets: [{data: data}]
          }}
          width={width} 
          height={220}
          //yAxisLabel= 
          //yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
              borderRadius: 16
          },
          propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
          }
          }}
          bezier
          style={{
          marginVertical: 8,
          borderRadius: 16
          }}
      />
      {/* <Button title="Refresh" onPress={refresh_data} />  */}
      <Text style={{alignSelf: 'center'}}> Humid </Text>
      {/* <Text style={{margin: '20%'}}>{t}</Text> */}
  </View>
  )
}

/*const LightDensity = ({ onPress, title}) => (
  <TouchableOpacity style={styles.circleContainer}>
    <Text style={{ fontSize: 40, alignSelf: 'center'}}>{title}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  
})*/
export default HumidScreen;

