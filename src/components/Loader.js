import { Skeleton } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import React, { Fragment } from "react"
import { Col, Grid, Row } from "./Grid"
import { isMobile } from "../GeneralFunctions"
import "../styles/loader.css"
import Card from "./Card"
import Space from "./Space"

const SkeletonWrapper = ({ type }) => {
  const animation = { animation: "wave" }
  const productCol = (
    <Card rowStyle={{ padding: 0 }} noPadTop notFull style={{ padding: 0 }}>
      <Row center='xs'>
        <Col xs={6}>
          <Space />
          <Skeleton {...animation} variant='text' sx={{ fontSize: "2rem" }} />
        </Col>
        <Col xs={10}>
          <Space md />
          <Skeleton {...animation} variant='text' sx={{ fontSize: "2rem" }} />
          <Skeleton {...animation} variant='text' sx={{ fontSize: "2rem" }} />
          <Skeleton {...animation} variant='text' sx={{ fontSize: "2rem" }} />
        </Col>
        <Col xs={12} style={{ padding: 0 }}>
          <Space lg />
          <Skeleton
            variant='rectangular'
            width={"100%"}
            height={isMobile ? 185 : 212}
            style={{ marginRight: "2rem" }}
          >
            {" "}
          </Skeleton>
        </Col>
        <Col xs={12}>
          <Row start='xs'>
            <Col xs={6}>
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "6rem" }}
              />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "2rem" }}
              />
            </Col>
          </Row>
          <Row start='xs'>
            <Col xs={12}>
              <Space />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
  const productFullCol = (
    <>
      {isMobile ? (
        <div rowStyle={{ padding: 0 }} noPadTop notFull style={{ padding: 0 }}>
          <Row>
            <Col xs={12}>
              <Space />
              <Skeleton
                {...animation}
                variant='h1'
                sx={{ fontSize: "5rem", height: "10rem" }}
              />
            </Col>
          </Row>
        </div>
      ) : (
        ""
      )}
      <Space lg={5} />
      <div rowStyle={{ padding: 0 }} noPadTop notFull style={{}}>
        <Row top='xs' center='xs'>
          {isMobile ? (
            ""
          ) : (
            <Col xs={12} md={3}>
              <Row>
                <Col xs={12}>
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='h1'
                    sx={{ fontSize: "5rem", height: "10rem" }}
                  />
                </Col>
                <Col xs={5}>
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "2rem", height: "5rem" }}
                  />
                </Col>
                <Col xs={12}>
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='h1'
                    sx={{ fontSize: "5rem", height: "10rem" }}
                  />
                </Col>

                <Col xs={12}>
                  <Row start='xs'>
                    <Col xs={6}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "6rem" }}
                      />
                    </Col>
                  </Row>
                  <Row start='xs'>
                    <Col xs={6}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "4rem" }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          )}

          <Col xs={12} md={6}>
            <Row>
              <Col xs={12}>
                <Skeleton
                  variant='rectangular'
                  width={"100%"}
                  height={isMobile ? 185 : 350}
                  style={{ marginRight: "2rem" }}
                >
                  {" "}
                </Skeleton>
              </Col>
            </Row>
            <Space md />
            <Row start='xs'>
              <Col xs={12}>
                <Skeleton
                  variant='rectangular'
                  width={"100%"}
                  height={isMobile ? 20 : 60}
                  style={{ marginRight: "2rem" }}
                >
                  {" "}
                </Skeleton>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={3} style={{ padding: 0, marginTop: 20 }}>
            <Row>
              <Col xs={4}>
                <Space />
                <Skeleton
                  {...animation}
                  variant='h1'
                  sx={{ fontSize: "5rem", height: "8rem" }}
                />
              </Col>
              <Col xs={12}>
                <Space />
                <Skeleton
                  {...animation}
                  variant='h1'
                  sx={{ fontSize: "5rem", height: "8rem" }}
                />
              </Col>

              <Col xs={12}>
                <Row start='xs'>
                  <Col xs={12}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='h1'
                      sx={{ fontSize: "5rem", height: "8rem" }}
                    />
                  </Col>
                </Row>
                <Row start='xs'>
                  <Col xs={4}>
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "3rem" }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
  const myAccount = (
    <>
      {isMobile ? (
        <>
          <div
            rowStyle={{ padding: 0 }}
            noPadTop
            notFull
            style={{ padding: 0, marginTop: 20 }}
          >
            <Row>
              <Col xs={4}>
                <Space />
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "4rem", height: "5rem" }}
                />
              </Col>
              <Space lg={5} />

              <Col md={6} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 150 : 200 }}
                >
                  <Row>
                    <Col xs={12}>
                      <Col xs={6} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                      <Col xs={4} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={4} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={2} md={4}>
                        <Space lg={5} />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "2rem" }}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card>
                <Space lg={5} />

                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 150 : 200 }}
                >
                  <Row>
                    <Col xs={12}>
                      <Col xs={8} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                      <Col xs={5} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={5} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={2} md={4}>
                        <Space lg={5} />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "2rem" }}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card>
                <Space lg={5} />
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 150 : 200 }}
                >
                  <Row>
                    <Col xs={12}>
                      <Col xs={6} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                      <Col xs={4} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={4} md={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col xs={2} md={4}>
                        <Space lg={5} />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "2rem" }}
                        />
                      </Col>
                    </Col>
                  </Row>
                </Card>
                <Space lg={5} />
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 100 : 100 }}
                >
                  <Row start='xs'>
                    <Col xs={2} md={2}>
                      <Space lg />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 40 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={4} md={4}>
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
                <Space lg={5} />
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 100 : 100 }}
                >
                  <Row start='xs'>
                    <Col xs={2} md={2}>
                      <Space lg />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 40 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={4} md={4}>
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          <Space lg={5} />
          <div style={{ width: "100%" }}>
            <Row>
              <Col md={2} xs={12}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "4rem" }}
                />
              </Col>
            </Row>
            <Space />

            <Row>
              <Col md={6} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row>
                    <Col xs={12} md={6}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "5rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={3}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6}>
                      <Space />
                      <Row>
                        <Col xs={12} md={4}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='rectangular'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='rectangular'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={6} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "5rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={8}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={3}>
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "4rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Space lg />
            <Row>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 50 : 100 }}
                >
                  <Row>
                    <Col xs={12} md={2}>
                      <Space />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 20 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Row>
                <Col xs={12} md={4}></Col>
              </Row>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 50 : 100 }}
                >
                  <Row>
                    <Col xs={12} md={2}>
                      <Space />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 20 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 50 : 100 }}
                >
                  <Row>
                    <Col xs={12} md={2}>
                      <Space />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 20 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
            <Space lg />
            <Row>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 50 : 100 }}
                >
                  <Row>
                    <Col xs={12} md={2}>
                      <Space />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 20 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Row>
                <Col xs={12} md={4}></Col>
              </Row>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 50 : 100 }}
                >
                  <Row start='xs'>
                    <Col xs={12} md={2}>
                      <Space />
                      <Skeleton
                        variant='rectangular'
                        width={"100%"}
                        height={isMobile ? 20 : 40}
                        style={{ marginRight: "2rem" }}
                      />
                    </Col>
                    <Col xs={12} md={4}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "2rem" }}
                      />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "1rem" }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
  const checkoutCart = (
    <>
      {isMobile ? (
        <>
          <div
            rowStyle={{ padding: 0 }}
            noPadTop
            notFull
            style={{ padding: 0, marginTop: 20 }}
          >
            <Row>
              <Col xs={6}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "3rem" }}
                />
              </Col>
            </Row>
            <Space />
            <Row>
              <Col xs={5}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "2rem" }}
                />
              </Col>
            </Row>
            <Space />
            <Card
              rowStyle={{ padding: 0 }}
              noPadTop
              notFull
              style={{ padding: 0, height: 200 }}
            >
              <Row>
                <Col xs={4}>
                  <Space lg={5} />
                  <Skeleton
                    {...animation}
                    variant='rectangular'
                    sx={{ fontSize: "2rem" }}
                    style={{ padding: 0, height: 150 }}
                  />
                </Col>
                <Col xs={6}>
                  <Col xs={12}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "4rem" }}
                    />
                  </Col>
                  <Col xs={8} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "4rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Col xs={2} md={4}>
                    <Space lg={5} />
                    <Skeleton
                      {...animation}
                      variant='rectangular'
                      sx={{ fontSize: "3rem" }}
                      style={{ width: 50 }}
                    />
                  </Col>
                </Col>
              </Row>
            </Card>
            <Space lg />
            <Card
              rowStyle={{ padding: 0 }}
              noPadTop
              notFull
              style={{ padding: 0, height: 200 }}
            >
              <Row>
                <Col xs={4}>
                  <Space lg={5} />
                  <Skeleton
                    {...animation}
                    variant='rectangular'
                    sx={{ fontSize: "2rem" }}
                    style={{ padding: 0, height: 150 }}
                  />
                </Col>
                <Col xs={6}>
                  <Col xs={12}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "4rem" }}
                    />
                  </Col>
                  <Col xs={8} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "4rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Col xs={2} md={4}>
                    <Space lg={5} />
                    <Skeleton
                      {...animation}
                      variant='rectangular'
                      sx={{ fontSize: "3rem" }}
                      style={{ width: 50 }}
                    />
                  </Col>
                </Col>
              </Row>
            </Card>
            <Space lg={5} />

            <Card
              rowStyle={{ padding: 0 }}
              noPadTop
              notFull
              style={{ padding: 0, height: isMobile ? 150 : 200 }}
            >
              <Row>
                <Col xs={12}>
                  <Col xs={8} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "4rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Col xs={5} md={4}>
                    <Space />
                    <Skeleton
                      {...animation}
                      variant='text'
                      sx={{ fontSize: "1rem" }}
                    />
                  </Col>
                  <Row middle='xs' center='xs'>
                    <Col xs={12}>
                      <Space lg={5} />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <Space lg={5} />
          </div>
        </>
      ) : (
        <>
          <Space lg={5} />
          <div style={{ width: "100%" }}>
            <Row>
              <Col md={3} xs={12}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "4rem" }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={2} xs={12}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "3rem" }}
                />
              </Col>
            </Row>
            <Space />

            <Row>
              <Col md={8}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row>
                    <Col xs={12} md={3}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "5rem" }}
                        style={{
                          padding: 0,
                          height: isMobile ? 185 : 160,
                          width: 150,
                        }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "2rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "3rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={4}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='rectangular'
                            sx={{ fontSize: "3rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
                <Space lg />
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row>
                    <Col xs={12} md={3}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "5rem" }}
                        style={{
                          padding: 0,
                          height: isMobile ? 185 : 160,
                          width: 150,
                        }}
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "2rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "3rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={4}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='rectangular'
                            sx={{ fontSize: "3rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4} xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{
                    padding: 0,
                    height: 250,
                  }}
                >
                  <Row>
                    <Col xs={12} md={12}>
                      <Row middle='xs' center='xs'>
                        <Col xs={12} md={10}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "3rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "2rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={12}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "2rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row middle='xs' center='xs'>
                        <Col xs={12} md={12}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='rectangular'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
  const queries = (
    <>
      {isMobile ? (
        <>
          <Space lg={5} />
          <div
            rowStyle={{ padding: 0 }}
            noPadTop
            notFull
            style={{ padding: 0, marginTop: 20 }}
          >
            <Row>
              <Col xs={3}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "3rem" }}
                />
              </Col>
            </Row>
            <Space />
            <Row>
              <Col xs={8}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "2rem" }}
                />
              </Col>
            </Row>
            <Space />
            <Row middle='xs' center='xs'>
              <Col xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Col xs={12}>
                    <Row>
                      <Col xs={10}>
                        <Space lg />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "5rem" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Space lg />

            <Row middle='xs' center='xs'>
              <Col xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Col xs={12}>
                    <Row>
                      <Col xs={10}>
                        <Space lg />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "5rem" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Space lg />
            <Row middle='xs' center='xs'>
              <Col xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Col xs={12}>
                    <Row>
                      <Col xs={10}>
                        <Space lg />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={4}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "5rem" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Space lg />
          </div>
        </>
      ) : (
        <>
          <Space lg={5} />
          <Space lg={5} />
          <Space lg={5} />
          <div style={{ width: "100%" }}>
            <Row>
              <Col md={2} xs={12}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "3rem" }}
                />
              </Col>
            </Row>
            <Row>
              <Col md={3} xs={12}>
                <Skeleton
                  {...animation}
                  variant='text'
                  sx={{ fontSize: "2rem" }}
                />
              </Col>
            </Row>
            <Space />

            <Row>
              <Col md={4}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row middle='xs' center='xs'>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col xs={12} md={10}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "5rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row middle='xs' center='xs'>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col xs={12} md={10}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "5rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={4}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 200 }}
                >
                  <Row middle='xs' center='xs'>
                    <Col xs={12} md={12}>
                      <Row>
                        <Col xs={12} md={10}>
                          <Space lg />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "4rem" }}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <Space />
                          <Skeleton
                            {...animation}
                            variant='text'
                            sx={{ fontSize: "5rem" }}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
  const contactUs = (
    <>
      {isMobile ? (
        <>
          <Space lg={5} />
          <div
            rowStyle={{ padding: 0 }}
            noPadTop
            notFull
            style={{ padding: 0, marginTop: 20 }}
          >
            <Space />
            <Row middle='xs' center='xs'>
              <Col xs={12}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: 300 }}
                >
                  <Col xs={12}>
                    <Row>
                      <Col xs={6}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "5rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={10}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "5rem" }}
                          style={{ padding: 0, height: 150 }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Card>
              </Col>
            </Row>
            <Space lg />

            <Row middle='xs' center='xs'>
              <Col xs={12}>
                <Col xs={12}>
                  <Row>
                    <Col xs={4}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "4rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={10}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={10}>
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "5rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <Space lg />
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Space />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "5rem" }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <Space lg />
                      <Space lg />
                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "5rem" }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        <>
          <Space lg={5} />
          <Space lg={5} />
          <Space lg={5} />
          <div style={{ width: "100%" }}>
            <Row>
              <Col md={4}>
                <Card
                  rowStyle={{ padding: 0 }}
                  noPadTop
                  notFull
                  style={{ padding: 0, height: isMobile ? 185 : 400 }}
                >
                  <Row>
                    <Col md={10}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "4rem" }}
                      />
                    </Col>
                    <Col md={8}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                    <Col md={6}>
                      <Skeleton
                        {...animation}
                        variant='text'
                        sx={{ fontSize: "3rem" }}
                      />
                    </Col>
                    <Col md={12}>
                      <Space lg />

                      <Skeleton
                        {...animation}
                        variant='rectangular'
                        sx={{ fontSize: "3rem" }}
                        style={{ padding: 10, height: 200 }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col md={8}>
                <Row style={{ marginLeft: "1rem" }} middle='xs' center='xs'>
                  <Col xs={12} md={12}>
                    <Row>
                      <Col md={3}>
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                      <Col md={10}>
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "1rem" }}
                        />
                      </Col>
                      <Col md={8}>
                        <Space lg />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "2rem" }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} md={10}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "6rem" }}
                        />
                      </Col>
                      <Col md={3}>
                        <Space lg={5} />
                        <Space lg={5} />
                        <Skeleton
                          {...animation}
                          variant='text'
                          sx={{ fontSize: "2rem" }}
                        />
                      </Col>
                      <Col md={10}>
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "6rem" }}
                        />
                      </Col>
                      <Col md={3}>
                        <Space lg />
                        <Space />
                        <Skeleton
                          {...animation}
                          variant='rectangular'
                          sx={{ fontSize: "4rem" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
  return type === "jumbotron" ? (
    <div style={{ width: "100%" }}>
      <Card>
        {isMobile ? (
          <Row style={{ padding: 0 }}>
            <Col xs={6}>
              <Space />
              <Skeleton
                variant='rectangular'
                width={isMobile ? "100%" : 1114}
                height={window.innerHeight * 0.3}
              />
              <Space md />
              <Skeleton
                {...animation}
                variant='circle'
                width={60}
                height={60}
              />
              <Space />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
            </Col>
            <Col xs={6}>
              <Space />
              <Skeleton
                variant='rectangular'
                width={isMobile ? "100%" : 1114}
                height={window.innerHeight * 0.5}
              />
            </Col>
          </Row>
        ) : (
          <Row middle='xs' style={{ width: "100%" }}>
            <Col xs={12} md={9}>
              <Skeleton
                {...animation}
                variant='circle'
                width={60}
                height={60}
              />
              <Space />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
            </Col>
            <Col md={3}>
              <Skeleton
                variant='rectangular'
                width={"100%"}
                height={window.innerHeight * 0.22}
              />
            </Col>
          </Row>
        )}
      </Card>
    </div>
  ) : type === "store" ? (
    <div style={{ width: "100%" }}>
      <Card>
        {isMobile ? (
          <Row style={{ padding: 0 }}>
            <Col xs={6}>
              <Space />
              <Skeleton
                variant='rectangular'
                width={isMobile ? "100%" : 1114}
                height={window.innerHeight * 0.3}
              />
              <Space md />
              <Skeleton
                {...animation}
                variant='circle'
                width={60}
                height={60}
              />
              <Space />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
            </Col>
            <Col xs={6}>
              <Space />
              <Skeleton
                variant='rectangular'
                width={isMobile ? "100%" : 1114}
                height={window.innerHeight * 0.5}
              />
            </Col>
          </Row>
        ) : (
          <Row middle='xs' style={{ width: "100%" }}>
            <Col xs={12} md={6}>
              <Skeleton
                {...animation}
                variant='circle'
                width={60}
                height={60}
              />
              <Space />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
              <Skeleton
                {...animation}
                variant='text'
                sx={{ fontSize: "4rem" }}
              />
            </Col>
            <Col md={6}>
              <Skeleton
                variant='rectangular'
                width={"100%"}
                height={window.innerHeight * 0.6}
              />
            </Col>
          </Row>
        )}
      </Card>
    </div>
  ) : type === "jumbotron-2" ? (
    <div style={{ width: "100%" }}>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            {isMobile ? (
              <Row style={{ padding: 0 }}>
                <Col xs={12}>
                  <Space />
                  <Skeleton
                    variant='rectangular'
                    width={isMobile ? "100%" : 1114}
                    height={window.innerHeight * 0.3}
                  />
                  <Space md />
                  <Skeleton
                    {...animation}
                    variant='circle'
                    width={60}
                    height={60}
                  />
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                </Col>
              </Row>
            ) : (
              <Row middle='xs' style={{ width: "100%" }}>
                <Col xs={12} md={9}>
                  <Skeleton
                    {...animation}
                    variant='circle'
                    width={60}
                    height={60}
                  />
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                </Col>
                <Col md={3}>
                  <Skeleton
                    variant='rectangular'
                    width={"100%"}
                    height={window.innerHeight * 0.22}
                  />
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col xs={12} md={6}>
          <Card>
            {isMobile ? (
              <Row style={{ padding: 0 }}>
                <Col xs={12}>
                  <Space />
                  <Skeleton
                    variant='rectangular'
                    width={isMobile ? "100%" : 1114}
                    height={window.innerHeight * 0.3}
                  />
                  <Space md />
                  <Skeleton
                    {...animation}
                    variant='circle'
                    width={60}
                    height={60}
                  />
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                </Col>
              </Row>
            ) : (
              <Row middle='xs' style={{ width: "100%" }}>
                <Col xs={12} md={12}>
                  <Skeleton
                    {...animation}
                    variant='circle'
                    width={60}
                    height={60}
                  />
                  <Space />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                  <Skeleton
                    {...animation}
                    variant='text'
                    sx={{ fontSize: "4rem" }}
                  />
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  ) : type === "category" ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "1rem",
      }}
    >
      <Skeleton
        variant='rectangular'
        width={isMobile ? 120 : 121}
        height={isMobile ? 185 : 185}
        style={{ marginRight: "2rem" }}
      >
        {" "}
      </Skeleton>
      <Skeleton
        variant='rectangular'
        width={isMobile ? 120 : 121}
        height={isMobile ? 185 : 185}
        style={{ marginRight: "2rem", opacity: 0.8 }}
      >
        {" "}
      </Skeleton>
      <Skeleton
        variant='rectangular'
        width={isMobile ? 120 : 121}
        height={isMobile ? 185 : 185}
        style={{ marginRight: "2rem", opacity: 0.5 }}
      >
        {" "}
      </Skeleton>
    </div>
  ) : type === "product" ? (
    <Fragment>
      <Col xs={6} md={2}>
        {productCol}
      </Col>
      <Col xs={6} md={2}>
        {productCol}
      </Col>
    </Fragment>
  ) : type === "product-full" ? (
    <Fragment>
      <Grid>
        <Col xs={12} md={12}>
          {productFullCol}
        </Col>
      </Grid>
    </Fragment>
  ) : type === "my-account" ? (
    <Fragment>
      <Grid>
        <Col xs={12} md={12}>
          {myAccount}
        </Col>
      </Grid>
    </Fragment>
  ) : type === "checkout-cart" ? (
    <Fragment>
      <Grid>
        <Col xs={12} md={12}>
          {checkoutCart}
        </Col>
      </Grid>
    </Fragment>
  ) : type === "contactUs" ? (
    <Fragment>
      <Grid>
        <Col xs={12} md={12}>
          {contactUs}
        </Col>
      </Grid>
    </Fragment>
  ) : type === "queries" ? (
    <Fragment>
      <Grid>
        <Col xs={12} md={12}>
          {queries}
        </Col>
      </Grid>
    </Fragment>
  ) : type === "text" ? (
    <Fragment>
      <Skeleton
        variant='text'
        sx={{ fontSize: "2rem" }}
        style={{ width: 150 }}
      />
    </Fragment>
  ) : type === "review" ? (
    <Fragment>
      <Card rowStyle={{ padding: 0 }} noPadTop notFull>
        <Space lg />
        <Row middle='xs' center='xs'>
          <Col xs={12} md={2}>
            <Skeleton {...animation} variant='circle' width={60} height={60} />
          </Col>
          <Col xs={12} md={10}>
            <Skeleton
              variant='text'
              sx={{ fontSize: "4rem" }}
              style={{ width: 150 }}
            />
            <Skeleton
              variant='text'
              sx={{ fontSize: "2rem" }}
              style={{ width: "100%" }}
            />
            <Skeleton
              variant='text'
              sx={{ fontSize: "2rem" }}
              style={{ width: 100 }}
            />
          </Col>
        </Row>
        <Space lg />
      </Card>
    </Fragment>
  ) : (
    <div>
      <Skeleton {...animation} variant='rectangular' width={210} height={60} />
    </div>
  )
}

const Loader = ({ sm, style, center, full, type }) =>
  type ? (
    <SkeletonWrapper type={type} />
  ) : (
    <div
      style={
        type
          ? {}
          : {
              textAlign: "center",
              height: full ? "100vh" : null,
              width: full ? "100%" : null,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <CircularProgress size={sm ? 16 : 30} thickness={5} color={"primary"} />
    </div>
  )

export default Loader
