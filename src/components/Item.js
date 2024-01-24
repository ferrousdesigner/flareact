import React from 'react'
import { truncate } from '../GeneralFunctions'
import Header from './Header'
import Space from './Space'

export default function Item({ title, subtitle, reverse, big }) {
  return reverse ? (
    <div>
      {big ? (
        <Header sm>{title}</Header>
      ) : (
        <div style={{ overflow: 'hidden' }}>{title}</div>
      )}
      {!big && <Space />}
      <Header bold md={big}>
        <div style={{ overflow: 'hidden' }}>{truncate(subtitle, 80)}</div>
      </Header>
      <Space md />
    </div>
  ) : (
    <div>
      <Header bold md={big}>
        <span>{title}</span>
      </Header>
      <div style={{ overflow: 'hidden' }}>{truncate(subtitle, 80)}</div>
      <Space md />
    </div>
  )
}
