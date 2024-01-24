import React, { Component, Fragment, useEffect, useState } from "react";
import "../styles/tabs.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  let children = props.children.length ? [...props.children].filter((c) => c) : [props.children].filter((c) => c);
  let icons =
    children &&
    children.length &&
    children.map((child) => child.props.icon || null);
  let buttons =
    children &&
    children.length &&
    children.map(
      (child) => child.props.head || child.props.label || "No tab head"
    );
    const activateTab = (index, onClick, to) => {
      if (to) {
        history.push(to)
      }
      setActiveTab(index);
      window.location.hash = buttons[index]?.toLowerCase().replace(' ', '_')
      if (onClick) onClick(index);
    };
  const handleTabSelection = (h) => {
    let hashedButton = buttons.filter((t) => t?.toLowerCase().replace(' ', '_') === h?.toLowerCase().replace(' ', '_'))[0]
    if(hashedButton) {
      let index = buttons.indexOf(hashedButton)
      activateTab(index, children[index]?.onClick, children[index]?.to)
    }
  }
  const history = useHistory();

  useEffect(() => {
    handleTabSelection(window.location.hash?.replace('#', ''))
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.hash])
  const { v2, v3, v4 } = props
  return (
    <div className={v2 ? "tabs tabs-v2" : v3 ? "tabs tabs-v3" : v4 ? "tabs tabs-v4" : "tabs"} style={{margin: props.compact ? '1rem 0' : ''}}>
      <div className="tabs-button-container">
        {buttons.length > 0 &&
          buttons.map((b, k) => {
            return (
              <button
                className={activeTab === k ? "tab-button active" : "tab-button"}
                onClick={() =>
                  activateTab(
                    k,
                    children[k]?.props?.onClick,
                    children[k]?.props?.to
                  )
                }
                key={k}
              >
                {v3 ? activeTab === k ? <span style={{fontSize: '2rem'}} className="fas fa-circle" /> : <span style={{fontSize: '2rem'}} className="far fa-circle" /> : '' }
                {icons[k] && <span className={icons[k]}></span>}
                {b}
              </button>
            );
          })}
      </div>
      {children && children.length > 0 && (
        <div className="tabs-content-containers" style={v2 ? {padding: 0} : {}}>
          {children.map((child, key) =>
            activeTab === key ? (
              <div
                className={
                  activeTab === key ? "tabs-content active" : "tabs-content"
                }
                key={key}
              >
                {child}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};
export class Tab extends Component {
  render() {
    let { children, padded } = this.props;
    return <Fragment><div style={padded ? {padding: '0 2rem' } : {}}>{children}</div></Fragment>;
  }
}

export default Tabs;
