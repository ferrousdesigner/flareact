import { Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Col, Row } from "./../Grid"
import ImageUploading from "react-images-uploading"
import Loader from "../Loader"
import Space from "../Space"
import Highlight from "../Highlight/Highlight"
import { env, firebaseApp, storage } from "../../firebaseSetting"
import { busyStyle } from "../../styles/CommonStyles"
import "./ImageUploader.css"

const Image = ({ src }) => {
  const [busy, setBusy] = useState(true)
  return (
    <div>
      <div style={busy ? { visibility: "hidden" } : {}}>
        <img
          src={src}
          alt={src}
          onLoad={() => setBusy()}
          style={busy ? { height: 0, marginBottom: 0 } : { marginBottom: 0 }}
        />
      </div>
      {busy && (
        <div>
          <Skeleton
            variant='rectangular'
            width={"100%"}
            height={"500px"}
            style={{ marginBottom: "2rem" }}
          />
        </div>
      )}
    </div>
  )
}

export const uploadImagesAndGetPaths = (mayBePics, path, finalCB) => {
  // console.log("Sheiku", pics);
  let pics = mayBePics
  if (pics && pics.filter(p => typeof p !== "string").length > 0) {
    pics = pics.filter(p => typeof p !== "string")
  } else {
    return finalCB(pics)
  }
  let paths = []
  if (pics && pics.length > 0) {
    // console.log(pics);
    pics.forEach(pic => {
      if (pic) {
        // console.log("user: ", pic);
        let name = Date.now() + "-" + pic?.file?.name
        // make ref to your firebase storage and select images folder
        let storageRef = storage.ref(`${path}/${name}`)
        // put file to Firebase
        let uploadTask = storageRef.put(pic.file)

        uploadTask.on(
          "state_changed",
          () => {},
          err => console.log(err),
          async () => {
            let backgroundURL = await uploadTask.snapshot.ref.getDownloadURL()
            paths.push(backgroundURL)
            if (paths.length === pics.length) {
              finalCB(paths)
            }
          },
        )
      }
    })
  } else {
    finalCB([])
  }
}
export const imageDeleteFromStorage = imgSrc =>
  new Promise(async (resolve, reject) => {
    try {
      if (imgSrc && !imgSrc.includes("firebasestorage")) resolve(true)
      let actualPath = await storage.refFromURL(imgSrc).location.path_
      await storage.ref().child(actualPath).delete()
      console.log("ractualPathes")
      resolve(true)
    } catch (e) {
      reject(e)
    }
  })
const UploadedImages = ({ images, onDelete }) => {
  const [busy, setBusy] = useState()
  const [tempImages, setTemp] = useState(images ? [...images] : [])
  const onDeleteFile = async url => {
    setBusy(true)
    let deleted = await imageDeleteFromStorage(url)
    setBusy(false)
    if (deleted) {
      let finalImages = tempImages.filter(img => img !== url)
      setTemp(finalImages)
      onDelete([...finalImages])
    }
  }
  useEffect(() => {
    if (tempImages?.length !== images?.length) setTemp([...images])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.length])
  return (
    <>
      {tempImages?.map((img, key) => {
        return (
          <Col
            xs={12}
            md={6}
            lg={4}
            key={key}
            style={busy ? { ...busyStyle } : {}}
          >
            <div className='image-item'>
              <Image src={img} />
              <div className='image-item__btn-wrapper'>
                <button
                  type={"button"}
                  className='btn-primary btn-accent'
                  onClick={() => onDeleteFile(img)}
                >
                  Remove
                </button>
              </div>
            </div>
          </Col>
        )
      })}
    </>
  )
}

export function ImageUploader(props) {
  const { onUpdate, errorText, value, onDelete } = props || {}

  const [images, setImages] = React.useState([])
  const [uploadedImages, setUploadedImages] = React.useState(value ? value : [])
  const [busy, setBusy] = useState()
  const maxNumber = 5
  const getDataAfterImageUpload = (files = [], path = "data") =>
    new Promise((resolve, reject) => {
      if (files.length === 0) {
        // console.log("Test");
        resolve([])
      }
      let urlBucket = []
      files.forEach(pic => {
        if (pic) {
          const user = firebaseApp.auth().currentUser
          // console.log("user: ", pic);
          const timestamp = new Date().getTime()
          let name = timestamp + "-" + pic?.file?.name
          // make ref to your firebase storage and select images folder
          let storageRef = storage.ref(`${env}/images/${user?.uid}/${name}`)
          // put file to Firebase
          if (!pic.file) {
            return
          }
          let uploadTask = storageRef.put(pic.file)
          uploadTask.on(
            "state_changed",
            () => {},
            err => {
              // setBusy()
              console.log(err)
            },
            async () => {
              urlBucket.push(await uploadTask.snapshot.ref.getDownloadURL())
              if (urlBucket.length === files.length) {
                // console.log("Uploaded Successfully", name)
                setTimeout(() => {
                  resolve({ images: urlBucket })
                  setImages([])
                  setBusy()
                }, 200)
              } else {
                // console.log("Uploading Failes", pic.file.name)
                setBusy()
              }
            },
          )
        }
      })
    })

  const onChange = imageList => {
    setImages(imageList)
  }
  const getImagesWhichAreNotUpload = (files, uploadedHash) => {
    const filtered = files.filter(({ file }) => {
      return !uploadedHash?.some(url => {
        return decodeURIComponent(url).includes(file.name)
      })
    })
    return filtered
  }
  const uploadImages = async () => {
    let notUploadedImages = getImagesWhichAreNotUpload(images, uploadedImages)
    if (notUploadedImages?.length === 0) return
    setBusy(true)
    const newUploaded = await getDataAfterImageUpload(notUploadedImages)
    console.log("uploadedImages", uploadedImages)

    const finalImages = uploadedImages
      ? [...uploadedImages, ...newUploaded?.images]
      : [...newUploaded?.images]
    setUploadedImages(finalImages)
    onUpdate([...finalImages])
  }

  useEffect(() => {
    if (value?.length > 0 && value?.length !== uploadedImages?.length) {
      setUploadedImages([...value])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value?.length])

  // console.log("ImageUploader Value: ", value)
  // console.log("ImageUploader State:", uploadedImages)

  useEffect(() => {
    uploadImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images?.length])

  return (
    <div
      style={{
        padding: "2rem",
        position: "relative",
        border: "1px solid #ddd",
      }}
    >
      {errorText && <div className='error'>{errorText}</div>}
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey='data_url'
        disabled={busy}
        maxFileSize={1048576}
        resolutionType='more'
        resolutionWidth={500}
        resolutionHeight={500}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div className='upload__image-wrapper' style={busy ? busyStyle : {}}>
            <div className='sticky'>
              <div className='flex'>
                <span className='fas fa-upload' />
                <div>
                  <h2>Upload Product Images</h2>
                  <br />
                  <p>
                    Max size per image is 1MB, {maxNumber} Images per product is
                    allowed.
                  </p>
                  <br />
                  <Row>
                    <Col xs={12}>
                      <button
                        style={{ marginBottom: 0 }}
                        onClick={onImageUpload}
                        className='btn-primary'
                        type={"button"}
                        {...dragProps}
                      >
                        {uploadedImages?.length > 0 ? "Upload More" : "Upload"}
                      </button>
                      {/* {imageList.length > 0 && (
                        <button
                          className='btn-primary btn-accent'
                          onClick={onImageRemoveAll}
                        >
                          Remove all
                        </button>
                      )} */}
                    </Col>
                  </Row>
                  <Space />
                </div>
              </div>
            </div>

            <Row>
              {imageList.map((image, index) => (
                <Col xs={12} md={6} lg={4}>
                  <div key={index} className='image-item'>
                    <img src={image["data_url"]} alt='' width='100' />
                    <div className='image-item__btn-wrapper'>
                      {busy ? <Loader /> : ""}
                    </div>
                  </div>
                </Col>
              ))}
              <UploadedImages images={uploadedImages} onDelete={onDelete} />
            </Row>
            {errors && (
              <div>
                {errors.maxNumber && (
                  <Highlight type={"danger"}>
                    Number of selected images exceed {errors.maxNumber}
                  </Highlight>
                )}
                {errors.acceptType && (
                  <Highlight type={"danger"}>
                    Your selected file type is not allow
                  </Highlight>
                )}
                {errors.maxFileSize && (
                  <Highlight type={"danger"}>
                    Selected file size exceed 1 MB
                  </Highlight>
                )}
                {errors.resolution && (
                  <span>
                    Image resolution should be greater 500px by 500px.
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
