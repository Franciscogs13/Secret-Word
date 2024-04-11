import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='start'>
      <div>
        <h1 className='secret'>Secret</h1>
        <h1 className='word'> WO<p className='r'>R</p>D</h1>
      </div>
      <button onClick={startGame} className='play'>PLAY</button>
    </div>
  )
}

export default StartScreen