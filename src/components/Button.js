import React from 'react'
import '../styles/button.css'

const Button = props => {
  const getClass = ({
    accent,
    disabled,
    small,
    loading,
    whiteFont,
    noHover,
    white,
    big,
    round,
    fullRound,
    marRight,
    link,
    verySmall,
    colored,
    noShadow,
    danger,
    animate,
    circle,
    alt,
    accentAlt,
    notFullMobile,
  }) => {
    let classNames = 'btn-primary noSelect'
    if (accent) classNames += ' btn-accent'
    if (circle) classNames += ' btn-circle'
    if (alt) classNames += ' btn-alt'
    if (accentAlt) classNames += ' btn-accent btn-accent-alt'
    if (disabled) classNames += ' disabled'
    if (colored) classNames += ' btn-colored'
    if (small) classNames += ' btn-small'
    if (white) classNames += ' btn-white'
    if (loading || disabled) classNames += ' btn-disabled'
    if (whiteFont) classNames += ' btn-white-font'
    if (noHover) classNames += ' btn-no-hover'
    if (big) classNames += ' btn-big'
    if (round) classNames += ' btn-round'
    if (fullRound) classNames += ' btn-full-round'
    if (marRight) classNames += ' btn-mar-right'
    if (link) classNames += ' btn-link'
    if (verySmall) classNames += ' btn-very-small'
    if (noShadow) classNames += ' btn-no-shadow'
    if (danger) classNames += ' btn-danger'
    if (animate) classNames += ' appear'
    if (notFullMobile) classNames += ' no-full-on-mobile'
    return classNames
  }
  return (
    <button
      data-tip={props.dataTip ? props.dataTip : null}
      type={props.submit ? 'submit' : 'button'}
      onClick={props.disabled ? () => {} : props.onClick}
      className={getClass(props) + ' ' + (props.className || '')}
      style={{
        width: props.fullWidth ? '100%' : '',
        backgroundColor: props.color ? props.color : '',
        boxShadow: props.color
          ? 'none'
          : props.accent || props.white
          ? 'none'
          : '',
        marginBottom: props.noMar ? 0 : '',
        ...props.style,
      }}
    >
      <span
        className={props.completed || props.checked ? 'has-check' : ''}
        style={{ height: '100%' }}
      >
        {(props.completed || props.checked) && (
          <span className='fas fa-check-circle' />
        )}
        {(props.loading || props.busy) && (
          <span className='fas fa-circle-notch fa-spin' />
        )}{' '}
        {!(props.loading || props.completed || props.busy)
          ? props.children
          : ''}
      </span>
      {props.active && <span className='button-active-tab' />}
    </button>
  )
}

export default Button
