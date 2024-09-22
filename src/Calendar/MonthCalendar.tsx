import { Dayjs } from 'dayjs'
import { CalendarProps } from '.'
import LocaleContext from './LocaleContext'
import { useContext } from 'react'
import allLocales from './locale'
import cs from 'classnames'

// 定义 MonthCalendar 组件的 props 接口，继承自 CalendarProps
interface MonthCalendarProps extends CalendarProps {
	selectHandler?: (date: Dayjs) => void // 日期选择处理函数
	curMonth: Dayjs // 当前月份
}

// 获取当前月份的所有日期信息
function getAllDays(date: Dayjs) {
	const startDate = date.startOf('month') // 获取月份的第一天
	const day = startDate.day() // 获取月份第一天是星期几（0-6）

	const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(6 * 7) // 创建一个 6 行 7 列的数组，用于存储日期信息

	// 填充当前月份之前的日期
	for (let i = 0; i < day; i++) {
		daysInfo[i] = {
			date: startDate.subtract(day - i, 'day'),
			currentMonth: false,
		}
	}

	// 填充当前月份及之后的日期
	for (let i = day; i < daysInfo.length; i++) {
		const calcDate = startDate.add(i - day, 'day')

		daysInfo[i] = {
			date: calcDate,
			currentMonth: calcDate.month() === date.month(),
		}
	}

	return daysInfo
}

// MonthCalendar 组件定义
function MonthCalendar(props: MonthCalendarProps) {
	// 使用 Context 获取语言环境
	const localeContext = useContext(LocaleContext)

	// 从 props 中解构需要的属性
	const { value, curMonth, dateRender, dateInnerContent, selectHandler } = props

	// 获取当前语言环境的日历本地化信息
	const CalendarLocale = allLocales[localeContext.locale]

	// 定义星期列表
	const weekList = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
	]

	// 获取当前月份的所有日期信息
	const allDays = getAllDays(curMonth)

	// 渲染日期单元格
	function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
		const rows = []
		for (let i = 0; i < 6; i++) {
			const row = []
			for (let j = 0; j < 7; j++) {
				const item = days[i * 7 + j]
				row[j] = (
					<div
						key={item.date.format('YYYY-MM-DD')} // 添加唯一的 key
						className={
							'calendar-month-body-cell ' +
							(item.currentMonth ? 'calendar-month-body-cell-current' : '')
						}
						onClick={() => selectHandler?.(item.date)}
					>
						{dateRender ? (
							dateRender(item.date)
						) : (
							<div className="calendar-month-body-cell-date">
								<div
									className={cs(
										'calendar-month-body-cell-date-value',
										value?.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD')
											? 'calendar-month-body-cell-date-selected'
											: ''
									)}
								>
									{item.date.date()}
								</div>
								<div className="calendar-month-cell-body-date-content">
									{dateInnerContent?.(item.date)}
								</div>
							</div>
						)}
					</div>
				)
			}
			rows.push(row)
		}
		return rows.map((row, index) => (
			<div key={`row-${index}`} className="calendar-month-body-row">
				{row}
			</div>
		))
	}

	// 渲染月历组件
	return (
		<div className="calendar-month">
			{/* 渲染星期头部 */}
			<div className="calendar-month-week-list">
				{weekList.map(week => (
					<div className="calendar-month-week-list-item" key={week}>
						{CalendarLocale.week[week]}
					</div>
				))}
			</div>
			{/* 渲染日期主体 */}
			<div className="calendar-month-body">{renderDays(allDays)}</div>
		</div>
	)
}

export default MonthCalendar
