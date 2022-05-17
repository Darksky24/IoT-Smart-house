import { LineChart } from "react-native-chart-kit";
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image, Switch, Dimensions } from 'react-native';
import init from 'react_native_mqtt';
import {AsyncStorage} from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from "react"; 

function chart(data, ylabel, name)
{
    return (
        <View>
            <Text>{name} Line Chart</Text>
            <LineChart
                data={{
                labels: ["1 hour", "45 min", "30 min", "15 min", "Now"],
                datasets: [{data}]
                }}
                width={Dimensions.get("screen").width} // from react-native
                height={220}
                yAxisLabel= {ylabel}
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
        </View>
    )
}

export default chart;