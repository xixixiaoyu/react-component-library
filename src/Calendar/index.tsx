import dayjs, { Dayjs } from 'dayjs'
import MonthCalendar from './MonthCalendar'
import './index.scss'
import Header from './Header'
import { CSSProperties, ReactNode, useState } from 'react'
import cs from 'classnames'
import LocaleContext from './LocaleContext'
import { useControllableValue } from 'ahooks'

// 定义日历组件的属性接口
export interface CalendarProps {
	value?: Dayjs // 当前选中的日期
	defaultValue?: Dayjs // 默认选中的日期
	style?: CSSProperties // 自定义样式
	className?: string | string[] // 自定义类名
	dateRender?: (currentDate: Dayjs) => ReactNode // 自定义日期渲染函数
	dateInnerContent?: (currentDate: Dayjs) => ReactNode // 自定义日期内容渲染函数
	locale?: string // 国际化设置
	onChange?: (date: Dayjs) => void // 日期变化回调函数
}

// 日历组件主体
function Calendar(props: CalendarProps) {
	const { style, className, locale, onChange } = props

	// 使用 ahooks 的 useControllableValue 来处理受控和非受控模式
	const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
		defaultValue: dayjs(),
	})

	// 当前显示的月份，初始值为当前选中的日期
	const [curMonth, setCurMonth] = useState<Dayjs>(curValue)

	// 组合类名
	const classNames = cs('calendar', className)

	// 日期选择处理函数
	function selectHandler(date: Dayjs) {
		setCurValue(date)
		setCurMonth(date)
		onChange?.(date)
	}

	// 切换到上一个月
	function prevMonthHandler() {
		setCurMonth(curMonth.subtract(1, 'month'))
	}

	// 切换到下一个月
	function nextMonthHandler() {
		setCurMonth(curMonth.add(1, 'month'))
	}

	// 跳转到今天
	function todayHandler() {
		const date = dayjs(Date.now())

		setCurValue(date)
		setCurMonth(date)
		onChange?.(date)
	}

	// 渲染日历组件
	return (
		<LocaleContext.Provider
			value={{
				locale: locale || navigator.language,
			}}
		>
			<div className={classNames} style={style}>
				<Header
					curMonth={curMonth}
					prevMonthHandler={prevMonthHandler}
					nextMonthHandler={nextMonthHandler}
					todayHandler={todayHandler}
				></Header>
				<MonthCalendar
					{...props}
					value={curValue}
					curMonth={curMonth}
					selectHandler={selectHandler}
				/>
			</div>
		</LocaleContext.Provider>
	)
}

export default Calendar
