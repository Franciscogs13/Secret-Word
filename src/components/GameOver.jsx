import './GameOver.css'

const GameOver = ({restartGame,score}) => {
  return (
    <div className='container'>
      <h1>Game Over</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={restartGame}>Resetar Jogo</button>
    </div>
  )
}

export default GameOver