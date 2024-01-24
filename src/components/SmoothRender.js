import React, { Component } from 'react';
import '../styles/smooth_render.css'

class SmoothRender extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initialClass: 'initially-invisible',
			anchor: !props.initiallyHidden,
		};
	}
	UNSAFE_componentWillReceiveProps(np) {
		if (!np.hideOn && this.state.initialClass === 'initially-invisible') {
			this.setState({ initialClass: '' });
		}
		if (np.hideOn && this.state.anchor) {
			setTimeout(() => {
				this.setState({anchor: false})
			}, np.timing)
		}
		if (!np.hideOn && !this.state.anchor) {
			setTimeout(() => {
				this.setState({anchor: true})
			}, 0)
		}
  }
  
	render() {
		const { children, hideOn, initiallyHidden, } = this.props;
		const { anchor, initialClass } = this.state;
		return (
			<div>
				{anchor && (
					<div
						className={
							'react-smooth-render' +
							(initiallyHidden ? ` ${initialClass}` : '') +
							(hideOn ? ' hide' : ' reveal')
						}
					>
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default SmoothRender;
