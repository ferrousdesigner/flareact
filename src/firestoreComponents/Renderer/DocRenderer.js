import { useEffect, useState } from 'react'
import { DB } from '../../firebaseSetting'
import Loader from '../../components/Loader'

export default function DocRenderer({
  collectionPath,
  docID,
  renderDoc,
  loaderType,
}) {
  const [data, setData] = useState(null) // Initialize with null
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    let isMounted = true // Variable to track component mount status

    if (collectionPath && docID) {
      DB.collection(collectionPath)
        .doc(docID)
        .get()
        .then(snp => {
          // Check if the component is still mounted before updating the state
          if (isMounted) {
            setBusy(false)
            setData(snp.data())
          }
        })
        .catch(error => {
          // Handle errors if needed
          console.error('Error fetching data:', error)
          setBusy(false)
        })
    } else {
      setBusy(false)
    }

    // Cleanup function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docID])

  return (
    <>
      {renderDoc && data && !busy ? (
        renderDoc(data, busy)
      ) : busy ? (
        <Loader type={loaderType} />
      ) : (
        ''
      )}
    </>
  )
}
