import "mapbox-gl/dist/mapbox-gl.css"
import React, { Fragment, useEffect, useState } from "react"
import ReactMapGl, { Marker } from "react-map-gl"
import Header from "../../Header"
import Space from "../../Space"
import { InputField } from "../../FormComponents"
import { isPincodeValid } from "../../../GeneralFunctions"
import axios from "axios"
import Button from "../../Button"
import { useStateValue } from "../../../StateProvider"

const LocationMapper = ({
  label,
  desc,
  errorText,
  dataTip,
  info,
  onChange,
  value,
}) => {
  console.log("value", value)
  const [{ envs }] = useStateValue()
  const [pincode, setPincode] = useState()
  const [busy, setBusy] = useState()
  const [latlng, setLatLng] = useState({})
  const [place, setPlace] = useState()
  const [address, setAddress] = useState()
  const zoom = 13
  const [error, setError] = useState(null)

  const handlePincodeCheck = async () => {
    try {
      setBusy(true)
      let res = await axios.get(
        `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&format=json`,
      )
      console.log("Res", res)

      if (res?.data && res.data.length > 0) {
        setLatLng({
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
          zoom: zoom,
        })

        setPlace({
          lat: res.data[0].lat,
          lng: res.data[0].lon,
        })

        setError(null)
      } else {
        console.error("No data found for the given pincode")
        setError("No data found for the given pincode")
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Error fetching data. Please try again.")
    } finally {
      setBusy(false)
    }
  }

  useEffect(() => {
    if (value && value.lat && value.lng && value.pincode) {
      setAddress({
        lat: value?.lat,
        lng: value?.lng,
      })
      setLatLng({
        latitude: value?.lat,
        longitude: value?.lat,
        zoom: zoom,
      })
      setPincode(value?.pincode)
      setPlace({
        lat: value?.lat,
        lng: value?.lng,
      })
    }
  }, [value])
  const isValid = isPincodeValid(pincode)
  const mapProps = {
    mapboxAccessToken: "your-mapbox-api-key",
  }
  return (
    <div>
      <Space />
      <Header xs bold>
        {label}{" "}
        {dataTip && (
          <span className='fas fa-info-circle' data-tip={dataTip || info} />
        )}
      </Header>
      {desc}
      {!address && (
        <div>
          <InputField
            form={{
              touched: {
                pincode: true,
              },
              errors: {
                pincode:
                  error || !isValid ? "Please enter a valid pincode" : "",
              },
            }}
            field={{
              name: "pincode",
              value: pincode,
              onChange: e => {
                setLatLng({})
                setPincode(e.target.value)
                setError(null)
              },
            }}
            withButton
            hint={"Enter your pincode"}
            buttonDisabled={!isValid}
            buttonBusy={busy}
            buttonText={<span>Open map</span>}
            onButtonClick={() => handlePincodeCheck()}
          />
          {latlng?.latitude && latlng?.longitude && (
            <Fragment>
              <Header bold>
                Please use the map to pin point your store location
              </Header>
            </Fragment>
          )}
          {latlng?.latitude && latlng?.longitude && !address && (
            <div style={{ height: "350px", width: "100%" }}>
              <ReactMapGl
                initialViewState={latlng}
                {...mapProps}
                onClick={newPlace => {
                  setPlace(newPlace?.lngLat)
                }}
              >
                {place ? (
                  <Marker latitude={place?.lat} longitude={place?.lng} />
                ) : (
                  ""
                )}
              </ReactMapGl>
            </div>
          )}
          {place && (
            <Fragment>
              <Space lg />
              <Header bold>
                Is this the right location of your store/shop?
              </Header>
              <Button
                small
                onClick={() => {
                  onChange({ ...place, pincode })
                  setAddress(place)
                }}
              >
                Yes, this is correct
              </Button>
              <Button
                accent
                small
                onClick={() => {
                  setLatLng()
                  setPlace()
                  setPincode()
                }}
              >
                Try a different pincode
              </Button>
            </Fragment>
          )}
        </div>
      )}
      {address && (
        <div>
          <div style={{ height: "350px", width: "100%" }}>
            <ReactMapGl
              initialViewState={{
                latitude: address?.lat,
                longitude: address?.lng,
                zoom,
              }}
              {...mapProps}
            >
              {address ? (
                <Marker latitude={address?.lat} longitude={address?.lng} />
              ) : (
                ""
              )}
            </ReactMapGl>
          </div>
          <Space lg />
          {pincode && (
            <div
              className='flex'
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <Header bold>Pincode: {pincode}</Header>{" "}
              {place && (
                <Button
                  accent
                  small
                  onClick={() => {
                    setLatLng({
                      latitude: address?.lat,
                      longitude: address?.lng,
                      zoom: zoom,
                    })
                    setAddress()
                  }}
                >
                  Change pincode
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {errorText && <div className={"error"}>{errorText}</div>}
    </div>
  )
}
export default LocationMapper
