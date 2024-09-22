import dayjs from 'dayjs'
import Calendar from './Calendar/index'

function App() {
	return (
		<div className="App">
			<Calendar value={dayjs('2024-09-22')} />
		</div>
	)
}

export default App
