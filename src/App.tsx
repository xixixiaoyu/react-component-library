import dayjs from 'dayjs'
import Calendar from './Calendar'
import { useState } from 'react'

function App() {
	const [value, setValue] = useState(dayjs('2023-11-08'))

	return (
		<div className="App">
			{/* 受控模式 */}
			<Calendar
				value={value}
				onChange={val => {
					setValue(val)
				}}
			/>

			{/* 非受控模式 */}
			<Calendar defaultValue={dayjs('2023-11-08')} />
		</div>
	)
}

export default App
