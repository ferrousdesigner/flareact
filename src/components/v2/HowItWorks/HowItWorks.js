import Button from "../../Button"
import Tooltip from "../../Tooltip"
import "./HowItWorks.css"

export const HowItWorks = ({ points = [], subHead, children, allRight }) => {
  return (
    <div className='how-it-works-container'>
      <Row>
        <Col xs={12} sm={12} style={{ padding: 0 }}>
          <h4 className='how-it-works-subhead'>{subHead}</h4>
        </Col>
        <Col xs={12} sm={allRight ? 9 : 12}>
          <div className='how-it-works-data-container'>
            {points &&
              points.length > 0 &&
              points
                .filter(x => ![null, false].includes(x))
                .map(({ info, img, head, desc, action }, key) => {
                  let right = allRight || (key + 1) % 2 === 0
                  let imgData = <div className='how-it-works-image'>{img}</div>
                  let data = (
                    <div
                      className='how-it-works-data'
                      style={{
                        marginLeft: right ? 0 : !right && "auto",
                        marginRight: right && "auto",
                      }}
                    >
                      {head && (
                        <div className={"how-it-works-head"}>{head}</div>
                      )}
                      {desc && (
                        <div className={"how-it-works-desc"}>
                          {desc}
                          {info && <Tooltip tip={info} />}
                        </div>
                      )}
                      {action && (
                        <Button
                          small={!isMobile}
                          type='gray'
                          style={{
                            marginTop: 10,
                            marginRight: 0,
                          }}
                          sm
                          to={action.to}
                          onClick={action.onClick}
                          fullWidth={action.fullWidth}
                        >
                          {action.label}
                        </Button>
                      )}
                    </div>
                  )
                  return (
                    <div className='how-it-works-feature' key={key}>
                      {!right && (
                        <Row middle='xs' center='xs'>
                          <Col
                            xs={12}
                            sm={6}
                            style={{ textAlign: "right" }}
                            className='how-it-works-feature-data'
                          >
                            {data}
                          </Col>
                          <Col
                            xs={6}
                            className='hide-on-mobile how-it-works-image-container'
                            style={{
                              textAlign: "left",
                              justifyContent: "flex-start",
                            }}
                          >
                            {imgData}
                          </Col>
                        </Row>
                      )}
                      {right && (
                        <Row middle='xs' center='xs'>
                          <Col
                            xs={6}
                            className='hide-on-mobile how-it-works-image-container'
                            style={{
                              textAlign: "right",
                              justifyContent: "flex-end",
                            }}
                          >
                            {imgData}
                          </Col>
                          <Col
                            xs={12}
                            sm={6}
                            style={{ textAlign: "left" }}
                            className='how-it-works-feature-data'
                          >
                            {data}
                          </Col>
                        </Row>
                      )}
                    </div>
                  )
                })}
          </div>
          {children}
        </Col>
      </Row>
    </div>
  )
}
