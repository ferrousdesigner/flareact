import React from "react"
import { Header, Space, Divider } from "./"
import { Grid, Row, Col } from "./Grid"
import "../styles/page_header.css"
import Jumbotron from "./Jumbotron/Jumbotron"

const PageHeader = ({
  head,
  desc,
  icon,
  children,
  inCard,
  colored,
  action,
}) => {
  return !inCard ? (
    <div className='page-header' style={{}}>
      <Grid>
        <Jumbotron icon={icon} title={head} desc={desc} />
      </Grid>
    </div>
  ) : (
    <div className='page-header'>
      <Row top='xs'>
        <Col xs={12} sm={12}>
          <Header lg bold>
            {head}
          </Header>
          <Space />
          <Header sm accent>
            {desc}
          </Header>
          <Space />
          <Space />
          <Divider />
          <Space />
          <Space />
        </Col>
      </Row>
      {action && (
        <button
          className='page-header-action'
          data-tip={action.tip}
          onClick={action.onClick}
        >
          {action.label}
        </button>
      )}{" "}
    </div>
  )
}

export default PageHeader
