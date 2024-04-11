//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from './data/words';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name:"start"},
  {id:2, name:"game"},
  {id:3, name:"end"}
];

function App() {
  const [currentStage, setCurrentStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const[guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0)

  const pickedWordAnCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    

    return {word, category};
  },[words]);

//start secret word game
  const startGame = useCallback( () => {
    //clear all letters
    clearLetterStates();
    //pick word and category
    const {word, category} = pickedWordAnCategory();
    

    //create a array of letters
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase());
    

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setCurrentStage(stages[1].name)
  },[pickedWordAnCategory]);

//process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  
  const clearLetterStates = () =>{
    setGuessedLetters([]);
    setWrongLetters([]);
  };
//check if guesses ended
  useEffect(() =>{
    if(guesses<=0){
      //reset all states
      clearLetterStates()

      setCurrentStage(stages[2].name);
    }
  }, [guesses])

//check win condition
  useEffect(() =>{
    const uniqueLetters = [...new Set(letters)];
    //win condition
    if(guessedLetters.length === uniqueLetters.length && currentStage === stages[1].name){
      //add score
      setScore((actualScore) => actualScore += 100);

      //restart game with new word
      startGame();
      setGuesses(3);

    }
  } , [guessedLetters, letters, startGame,setGuesses, currentStage])

//Restart the Game
  const restartGame = () =>{
    setScore(0);
    setGuesses(3);
    setCurrentStage(stages[0].name)
  }

  return (
    <div className="App">
     {currentStage === 'start' && <StartScreen startGame={startGame}/>}
     {currentStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score}/>}
     {currentStage === 'end' && <GameOver restartGame={restartGame} score={score}/>}
    </div>
  );
}

export default App;
