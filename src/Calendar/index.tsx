import { Dayjs } from 'dayjs'
import MonthCalendar from './MonthCalendar'
import Header from './Header'
import './index.scss'
import { CSSProperties, ReactNode } from 'react'
import cs from 'classnames'

export interface CalendarProps {
	value: Dayjs
	style?: CSSProperties
	className?: string | string[]
	// 定制日期显示，会完全覆盖日期单元格
	dateRender?: (currentDate: Dayjs) => ReactNode
	// 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
	dateInnerContent?: (currentDate: Dayjs) => ReactNode
	// 国际化相关
	locale?: string
	onChange?: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
	const { value, style, className } = props

	const classNames = cs('calendar', className)

	return (
		<div className={classNames} style={style}>
			<Header />
			<MonthCalendar {...props} />
		</div>
	)
}

export default Calendar
