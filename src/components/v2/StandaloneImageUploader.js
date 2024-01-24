import ImageUploading from "react-images-uploading"
import { Row } from "./../Grid"
import { Col } from "./../Grid"
import Space from "../Space"
import React, { useEffect, useState } from "react"
import "./StandaloneImageUploader.css"
import {
  imageDeleteFromStorage,
  uploadImagesAndGetPaths,
} from "./ImageUploader"
import { Busy } from "./Busy/Busy"

const OldImage = ({ image, onDeleteSuccess }) => {
  const onDelete = url => {
    imageDeleteFromStorage(url)
    if (onDeleteSuccess) {
      onDeleteSuccess()
    }
  }
  return image ? (
    <div className='image-item'>
      <img src={image} alt='' width='100' />
      <div className='image-item__btn-wrapper'>
        <button
          type='button'
          className='btn-primary btn-accent btn-small'
          onClick={() => onDelete(image)}
        >
          Remove
        </button>
      </div>
    </div>
  ) : (
    <div />
  )
}
export function StandaloneImageUploader({
  onUpdate,
  errorText,
  onDelete,
  maxNumber = 1,
  info,
  label,
  value,
  pathToUpload,
  showUploadButton,
  onUpload,
}) {
  // console.log(oldImages, "ImageUploader");
  const [images, setImages] = useState([])
  const [busy, setBusy] = useState()
  const [saved, setSaved] = useState()

  const onChange = imageList => {
    // data for submit
    // console.log(imageList);
    onUpdate && onUpdate(imageList)
    setImages(imageList)
  }

  const deleteImage = async url => {
    let res = await imageDeleteFromStorage(url)
    if (res) {
      setBusy()
      setSaved()
    }
  }

  const onImageUploadToFirebase = async index => {
    setBusy(true)
    if (pathToUpload) {
      const img = images[index]
      await uploadImagesAndGetPaths(
        [img],
        `${pathToUpload}/product_images`,
        imagesPath => {
          setBusy()
          onUpload && onUpload(imagesPath)
          setSaved(imagesPath[0])
        },
      )
    }
  }
  // console.log(errorText);
  useEffect(() => {
    if (!saved && images.length > 0 && showUploadButton) {
      onImageUploadToFirebase(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length, saved])
  return (
    <Busy busy={busy}>
      <div
        className={`standalone-uploader ${errorText ? "standalone-error" : ""}`}
      >
        {errorText && <div className='error'>{errorText}</div>}
        {label && <label>{label} </label>}
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey='data_url'
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className='upload__image-wrapper'>
              <div className='sticky'>
                {((showUploadButton && !saved) || !showUploadButton) && (
                  <div className='flex'>
                    <span className='fas fa-upload' />
                    <div>
                      <br />
                      <p>{info}</p>
                      <br />
                      <Row>
                        <Col xs={12}>
                          {maxNumber !== imageList.length && (
                            <button
                              type='button'
                              style={isDragging ? { color: "red" } : undefined}
                              onClick={onImageUpload}
                              className='btn-primary btn-small'
                              {...dragProps}
                            >
                              {imageList.length > 0 &&
                              maxNumber > imageList.length
                                ? "Add More"
                                : "Upload"}
                            </button>
                          )}
                          {imageList.length > 1 && (
                            <button
                              type='button'
                              className='btn-primary btn-accent btn-small'
                              onClick={onImageRemoveAll}
                            >
                              Remove all
                            </button>
                          )}
                        </Col>
                      </Row>
                      <Space />
                    </div>
                  </div>
                )}
              </div>
              {imageList.length === 0 && value && (
                <OldImage image={value} onDeleteSuccess={onDelete} />
              )}
              {imageList.map((image, index) => (
                <div key={index} className='image-item'>
                  <img src={image["data_url"]} alt='' width='100' />
                  <div className='image-item__btn-wrapper'>
                    <button
                      type='button'
                      className='btn-primary btn-accent btn-small'
                      onClick={() => {
                        onImageUpdate(index)
                        if (saved) {
                          setBusy(true)
                          deleteImage(saved)
                        }
                      }}
                    >
                      Change
                    </button>
                    <button
                      type='button'
                      className='btn-primary btn-accent btn-small'
                      onClick={() => {
                        onImageRemove(index)
                        if (saved) {
                          setBusy(true)
                          deleteImage(saved)
                        }
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
      </div>
    </Busy>
  )
}
