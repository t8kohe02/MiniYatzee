import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import  { Grid, Col, Row } from 'react-native-easy-grid';
import styles from '../style/style';


let board = [];
let spots = new Array(6).fill(0);

const NumDice = 5;
const NumThrows = 3;
const Bonus = 63;


export default function Gameboard() {
    const [throwsLeft, setThrowsLeft] = useState(NumThrows);
    const [points, setPoints] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDice, setSelectedDice] = useState(new Array(NumDice).fill(false));
    const [selectedSpots, setSelectedSpots] = useState(new Array(6).fill(false));

    function getDiceColor(i){
        return selectedDice[i] ? 'black' : 'darkgreen';        
    }

    function getSpotColor(i){
        return selectedSpots[i] ? 'black' : 'darkgreen';
    }

    function selectDice(i){
        if(throwsLeft > 2){
            setStatus('You have to throw dices first.')
        }else{
        let dice = [...selectedDice];
        dice[i] = selectedDice[i] ? false : true;
        setSelectedDice(dice);
        }
    }

    function selectSpot(i){
        let spot = [...selectedSpots];
        if(board.length <= 0 || throwsLeft > 0){
            setStatus('Throw 3 times before setting points.');
            return;
        }else if (spot[i] == true){
            setStatus('You have already selected points for '+(i+1));
            return;
        }
        spot[i] = true;
        setSelectedSpots(spot);
        countSpots(i);
        unSelectDices();
        setThrowsLeft(NumThrows);
        if(selectedSpots.every((val) => val === true)){
            if(Bonus <= points ) {
                setPoints(points+35);
            }
        }
    }

    function unSelectDices(){
        let dice = [...selectedDice];
        dice.fill(false);
        setSelectedDice(dice);
    }

    function countSpots(val) {
        let sum = 0;
        for (let i = 0; i < board.length; i++){
            if(board[i].endsWith(val+1)){
                sum += val+1;
            }
        }
        spots[val] = sum;
        setPoints(points+sum);
    }

    function throwDice() {
        if(throwsLeft == 0){
            return;
        } else if (selectedSpots.every((val) => val === true)){
            resetGame();
        } 
        for (let i = 0; i < NumDice; i++){
            if(!selectedDice[i]){
                let num = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-'+num;
            }
        }
        setThrowsLeft(throwsLeft-1);
    }

    function resetGame(){
        setThrowsLeft(NumThrows);
        spots.fill(0);
        selectedSpots.fill(false);
        setPoints(0);
    }

    function recievedBonus(){
        if (points < Bonus){
            return ('You are ' + (Bonus - points) + ' points away from bonus.')
        }else {
            return ('You got the bonus!')
        }
    }

    const diceRow = [];
    for (let i=0; i < NumDice; i++){
        diceRow.push(
            <Pressable key={'diceRow'+i} onPress={() => selectDice(i)}>
            <MaterialCommunityIcons name={board[i]} key={'diceRow'+i} size={50} color={getDiceColor(i)}>

            </MaterialCommunityIcons>
            </Pressable>
        )
    }

    const spotRow = [];
    for (let i = 0; i <6; i++){
        spotRow.push(
            <Col style={styles.column} key={'spotRow'+i}>
                <Text key={'spotCount'+i}>{spots[i]}</Text>
                <Pressable key={'spotPress'+i} onPress={() => selectSpot(i)}>
                <MaterialCommunityIcons name={'numeric-'+(i+1)+'-circle'} key={'spotRow'+i} size={30} color={getSpotColor(i)}>
                </MaterialCommunityIcons>    
                </Pressable>
            </Col>
        )
    }

    useEffect(() => {
        if(throwsLeft > 0){
            if(selectedSpots.every((val) => val === true)){
                setStatus('Game over. All points selected. Press Throw dice to start a new game.');
            }else {
            setStatus('Throw dice.');
            }
        }
        if(throwsLeft == 0){
            setStatus('Select your points before next throw.');
        }
        if(throwsLeft < 0){
            setThrowsLeft(NumThrows-1);
        }

    }, [throwsLeft])


    return (
        <View style={styles.gameboard}>
            <View style={styles.row}>{diceRow}</View>
            <Text style={styles.status}>Throws left: {throwsLeft}</Text>
            <Text style={styles.status}>{status}</Text>
            <Pressable style={styles.button} onPress={throwDice}>
                <Text>Throw dice</Text>
            </Pressable>
            <Text style={styles.status}>Total: {points}</Text>
            <Text style={styles.bonus}>{recievedBonus()}</Text>
            <Grid style={styles.grid}>
                <Row>{spotRow}</Row>
            </Grid>
        </View>
    );
}