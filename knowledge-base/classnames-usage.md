classnames 是一个非常实用的 JavaScript 库,用于动态地组合 CSS 类名：

1. 基本用法

classnames 最简单的用法是将多个类名组合在一起:

```javascript
import classNames from 'classnames';

const buttonClass = classNames('btn', 'btn-primary', 'btn-large');
console.log(buttonClass); // 输出: "btn btn-primary btn-large"
```

2. 条件类名

一个非常常见的用法是根据条件添加类名:

```javascript
const Button = ({ isActive, isDisabled }) => {
  const btnClass = classNames('btn', {
    'btn-active': isActive,
    'btn-disabled': isDisabled
  });
  
  return <button className={btnClass}>点击我</button>;
};
```

3. 数组语法

classnames 也支持数组作为参数:

```javascript
const classList = ['btn', 'btn-primary', 'btn-large'];
const buttonClass = classNames(classList);
console.log(buttonClass); // 输出: "btn btn-primary btn-large"
```

4. 混合使用

你可以混合使用字符串、对象和数组:

```javascript
const Button = ({ type, size, isOutline }) => {
  const btnClass = classNames(
    'btn',
    `btn-${type}`,
    `btn-${size}`,
    { 'btn-outline': isOutline },
    ['btn-rounded', 'btn-shadow']
  );
  
  return <button className={btnClass}>点击我</button>;
};
```

5. 处理 falsy 值

classnames 会自动忽略 falsy 值,这在处理可选类名时非常有用:

```javascript
const className = classNames(
  'btn',
  isActive && 'btn-active',
  isDisabled && 'btn-disabled'
);
```

6. 与 CSS Modules 结合使用

classnames 可以很好地与 CSS Modules 配合使用:

```javascript
import styles from './Button.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({ primary, size }) => {
  const btnClass = cx({
    btn: true,
    primary: primary,
    [size]: size
  });
  
  return <button className={btnClass}>点击我</button>;
};
```

7. 性能优化

对于频繁调用的场景,可以使用 classnames 的 `bind` 方法来创建一个优化版本:

```javascript
const classNames = require('classnames/bind');

const cx = classNames.bind({
  foo: true,
  bar: false,
  baz: true
});

const className = cx('a', 'b', { c: true, d: false });
console.log(className); // 输出: "a b foo baz c"
```

教学小贴士:

1. 强调 classnames 如何简化条件类名的处理,使代码更加清晰和易于维护。

2. 展示如何使用 classnames 来处理复杂的类名逻辑,特别是在 React 组件中。

3. 解释 classnames 如何帮助避免类名拼接时的常见错误,如多余的空格或逗号。

4. 鼓励学生思考在什么场景下使用 classnames 最为合适,以及它如何提高代码的可读性和可维护性。

5. 提供一些实际的练习,让学生尝试使用 classnames 来解决一些常见的类名组合问题。