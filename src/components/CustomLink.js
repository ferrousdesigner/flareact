import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class CustomLink extends Component {
    render() {
        return this.props.to ? (
            <Link to={this.props.to} onClick={this.props.onClick}>
                {this.props.children}
            </Link>
        ) : <div className='custom-link' onClick={this.props.onClick}>
            {this.props.children}
        </div>
    }
}
