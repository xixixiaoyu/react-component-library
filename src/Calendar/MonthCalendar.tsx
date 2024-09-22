import { Dayjs } from 'dayjs'
import { CalendarProps } from '.'

// 获取日历中显示的所有日期信息
function getAllDays(date: Dayjs) {
	// 获取当月第一天
	const startDate = date.startOf('month')
	// 获取当月第一天是星期几（0-6，0 表示星期日）
	const day = startDate.day()

	// 创建一个包含 6 周（42 天）的数组
	// 这样可以确保日历总是显示完整的 6 行，无论当月有多少天
	const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(6 * 7)

	// 填充当月第一天之前的日期
	// 这些日期属于上个月，但会显示在日历的第一行
	for (let i = 0; i < day; i++) {
		daysInfo[i] = {
			date: startDate.subtract(day - i, 'day'),
			currentMonth: false, // 标记为非当前月，用于后续样式区分
		}
	}

	// 填充当月及之后的日期
	// 包括当月所有日期和下个月的部分日期（如果需要填满 6 行）
	for (let i = day; i < daysInfo.length; i++) {
		const calcDate = startDate.add(i - day, 'day')

		daysInfo[i] = {
			date: calcDate,
			currentMonth: calcDate.month() === date.month(), // 判断是否属于当前月，用于后续样式区分
		}
	}

	return daysInfo
}

// 渲染日历天数
function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
	const rows = []
	// 遍历 6 行，每行代表一周
	for (let i = 0; i < 6; i++) {
		const row = []
		// 每行 7 列，代表一周的 7 天
		for (let j = 0; j < 7; j++) {
			const item = days[i * 7 + j]
			row[j] = (
				<div
					key={item.date.format('YYYY-MM-DD')} // 添加唯一的 key，用于 React 的性能优化
					className={
						'calendar-month-body-cell ' +
						(item.currentMonth ? 'calendar-month-body-cell-current' : '')
					}
				>
					{item.date.date()} {/* 显示日期数字 */}
				</div>
			)
		}
		rows.push(row)
	}
	// 渲染每一行，每一行是一个包含 7 个单元格的 div
	return rows.map((row, index) => (
		<div key={`row-${index}`} className="calendar-month-body-row">
			{row}
		</div>
	))
}

// 月历组件
function MonthCalendar(props: CalendarProps) {
	// 定义星期列表，用于渲染日历头部
	const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

	// 获取所有日期信息，包括上个月、当前月和下个月的日期
	const allDays = getAllDays(props.value)

	return (
		<div className="calendar-month">
			{/* 渲染星期头部 */}
			<div className="calendar-month-week-list">
				{weekList.map(week => (
					<div className="calendar-month-week-list-item" key={week}>
						{week}
					</div>
				))}
			</div>
			{/* 渲染日历主体，包含所有日期单元格 */}
			<div className="calendar-month-body">{renderDays(allDays)}</div>
		</div>
	)
}

export default MonthCalendar
