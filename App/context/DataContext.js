import React, { useState, useEffect, createContext, useContext } from 'react';
import init from 'react_native_mqtt';
import {AsyncStorage} from '@react-native-async-storage/async-storage';

init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {},
});
const DataContext = createContext();
export function useData()
{
    return useContext(DataContext);
}

export default function DataProvider({ children })
{
    const [payload, setPayload] = useState();
    const [topic, setTopic] = useState();  
    var tempData = [0, 5, 9, 2, 4];
    var lightData = [0, 5, 9, 2, 4];
    var humidData = [0, 5, 9, 2, 4];
    //handle data
    function shift(data, x)
    {
        if (data.length == 5)
        {
            data.shift();
        }
        data.push(x);
    }
    //mqtt
    const feeds = ['thienkun/feeds/onoff', 'thienkun/feeds/test', 'thienkun/feeds/humid', 'thienkun/feeds/temp'];
    //const topic = feeds[1];
    
    const password = //'aio_EVNi18eQsuWTkmrRxnPTKC8ZV5KJ';
    'aio_MRjJ42fgnx14P2x4aAIy6OuylnNQ';
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
        client.connect({onSuccess:subscribe, onFailure: check, useSSL: true, userName: 'thienkun', password: password, keepAliveInterval: 1000 });
    }
    function check() 
    {
        console.log('No connection');
    }
    
    function subscribe()
    {
        client.subscribe(feeds[0]);
        client.subscribe(feeds[1]);
        client.subscribe(feeds[2]);
        client.subscribe(feeds[3]);
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
        setTopic(message.topic);
        setPayload(message.payloadString);
        if (message.topic == feeds[2])
        {
            shift(humidData, parseFloat(message.payloadString));
        }
        if (message.topic == feeds[3])
        {
            shift(tempData, parseFloat(message.payloadString));
        }
        if (message.topic == feeds[1])
        {
            shift(lightData, parseFloat(message.payloadString));
        }
    }
    const data = {
        payload,
        topic,
        onConnect,
        //data
        lightData,
        humidData,
        tempData,
    }
    mqtt();
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    )
}