import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleBodyOverflow, toggleIconMenu } from '../../actions/layoutActions'
import './IconMenu.css'

class IconMenu extends Component {
  componentWillReceiveProps(np) {
    const { iconMenu = {} } = this.props.layout
    if (np.layout.iconMenu && np.layout.iconMenu.open && !iconMenu.open
    ) {
      // console.log('Layout')
      toggleBodyOverflow(np.layout.iconMenu.open)
    } else {
      // console.log('Layout2')
      toggleBodyOverflow()
    }
  }

  render() {
    const { head, menus = [], cannotClose, open, cancelLabel } = this.props.layout.iconMenu ? this.props.layout.iconMenu : {}
    return (
      <div className={open ? 'icon-menu-container icon-menu-open' : 'icon-menu-container'}>
        <div className='icon-menu-overlay' onClick={cannotClose ? () => { } : () => this.props.toggleIconMenu({
          open: false,
        })} />

        <div className='icon-menu-list'>
          <div className='head'>{head}</div>{
            menus && menus.map((menu, key) => <button key={key} onClick={menu.disabled ? () => { } : menu.onClick}>{menu.label}</button>)
          }
          {!cannotClose && <button className='cancel' onClick={() => this.props.toggleIconMenu({
            open: false,
          })}>{cancelLabel || 'Cancel'}</button>}
        </div>
      </div>
    )
  }
}

export default connect(state => state, dispatch => ({
  toggleIconMenu: (d) => dispatch(toggleIconMenu(d))
}))(IconMenu)
