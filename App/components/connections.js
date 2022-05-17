/*import {AsyncStorage} from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import uuid from 'react-native-uuid';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    reconnect: true,
    sync : {
    }
});*/
  
/*function onConnect() {
    console.log("onConnect");
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
}

const client = new Paho.MQTT.Client('io.adafruit.com', 8883, 'thienkun');
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
client.connect({ onSuccess:onConnect, useSSL: true });*/

/*export default class MQTTConnection {
    constructor() {
        this.mqtt = null;
        this.QOS = 0;
        this.RETAIN = true;
    }
    connect(host, port, options = null) {
        if (options) {
            this.QOS = options.qos;
            this.RETAIN = options.retain;
        }

        let currentTime = +new Date();
        let clientID = currentTime + uuid.v1();
        clientID = clientID.slice(0, 23);
        console.log('clientID: ', clientID);

        this.mqtt = new Paho.MQTT.client(host, port, clientID);
        this.mqtt.onConnectionLost = (res) => {
            this.onMQTTLost;
        };
        this.mqtt.onMessageArrived = (message) => {
            this.onMQTTMessageArrived(message);
        };
        this.mqtt.onMessageDelivered = (message) => {
            this.onMessageDelivered(message);
        };

        const connectOptions = options ? options : defaultConnectOptions;

        this.mqtt.connect({
            onSuccess: this.onMQTTConnect,
            onFailure: this.onMQTTLost,
            ...connectOptions
        });
    }

    subscribeChannel(channel) {
        console.log('MQTTConnection subscribeChannel: ', channel)
        if (!this.mqtt || !this.mqtt.isConnected()) {
            return;
        }
        this.mqtt.subscribe(channel, this.QOS);
    }

    unsubscribeChannel(channel) {
        console.log('MQTTConnection unsubscribeChannel: ', channel)
        if (!this.mqtt || !this.mqtt.isConnected()) {
            return;
        }
        this.mqtt.unsubscribe(channel);
    }

    send(channel = null, payload) {
        console.log('MQTTConnection send: ')
        if (!this.mqtt || !this.mqtt.isConnected()) {
            return;
        }
        if (!channel || !payload) {
            return false;
        }
        console.log (`MQTTConnection send publish channel: ${channel}, payload: ${payload} qos:`, 
        this.mqtt.publish(channel,payload, this.QOS, this.RETAIN));
    }
    
    close() {
        this.mqtt && this.mqtt.disconnect();
        this.mqtt = null;
    }
}

MQTTConnection.prototype.onMQTTConnect = null
MQTTConnection.prototype.onMQTTLost = null
MQTTConnection.prototype.onMQTTMessageArrived = null
MQTTConnection.prototype.onMessageDelivered = null*/

   
import React, { Component } from 'react';
import init from 'react_native_mqtt';
import { StyleSheet, Text, View } from 'react-native';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

/*const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default class Mqtt extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client('io.adafruit.com', 443, 'tentoila24');
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({ onSuccess: this.onConnect, useSSL: true });
    this.state = {
      text: ['...'],
      client,
    };
  }

  pushText = entry => {
    const { text } = this.state;
    this.setState({ text: [...text, entry] });
  };

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('temp');
    this.pushText('Connected!');
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const { text } = this.state;

    return (
      <View style={styles.container}>
        {text.map(entry => <Text>{entry}</Text>)}
      </View>
    );
  }
}
*/
var client; topic;

export default function mqtt() {
  console.log("start");
  var mqttHost = 'io.adafruit.com';
  var port = '8883';
  topic = 'humid';
  client = new Paho.MQTT.Client(mqttHost, port, 'tentoila24');
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({ onSuccess: onConnect });
}

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe(topic);
  var message = new Paho.MQTT.Message(10);
  message.destinationName = topic;
  client.send(message);
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
}