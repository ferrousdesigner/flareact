import React from "react"
import { AdBig } from "./AdBanners"
import { Grid } from "../Grid"
import { useState } from "react"
import { useEffect } from "react"
import { useStateValue } from "../../StateProvider"
import { getDocFromDb } from "../../firebaseOperations"

const BigBannerTitle = () => {
  //store payment state variables
  const [paymentsData, setPaymentsData] = useState()

  const [{ userMeta }] = useStateValue()

  useEffect(() => {
    if (userMeta) {
      const getStorePayments = async () => {
        let payments_data = []
        if (userMeta?.stores) {
          for (let store of userMeta?.stores) {
            const storePay = await getDocFromDb("store_payments", store?.key)
            // console.log("storePay", storePay);
            if (storePay?.exists) {
              payments_data.push({
                storeName: store?.value,
                amount: storePay.amount,
                dueDate: storePay.dueDate,
              })
            }
          }
        }
        setPaymentsData(payments_data)
        // console.log("FINAL PAY", payments_data);
      }
      getStorePayments()
    }
    // console.log("userMeta", userMeta);
  }, [userMeta])

  return (
    <Grid>
      {paymentsData && paymentsData?.amount > 0 && (
        <AdBig
          title='Payment Due'
          desc={`Hi, Seller, glad to see that your store is running well. But now since your sales has reached our threshold. Please pay a nominal fee ${paymentsData?.reduce(
            (a, b) => a.amount + b.amount,
            0,
          )} to continue running your business smoothly.`}
          action={{ label: "Pay", onClick: () => alert("Clicked") }}
          detailsArray={paymentsData}
          detailInfo='Learn more about how we calculated this tax'
        />
      )}
    </Grid>
  )
}

// const BigBannerTitle = (date, amount) => {
//   return (
//     <Grid>
//       <AdBig
//         title="Payment Due"
//         desc={`Hi, Seller, glad to see that your store is running well. But now since your sales has reached our threshold. Please pay a nominal fee $XXX to continue running your business smoothly.`}
//         action={{ label: "Pay", onClick: () => alert("Clicked") }}
//         details={[
//           { title: "Due Date", subtitle: parseDateTime(date) },
//           { title: "Amount", subtitle: currencyformatter(amount, true) },
//         ]}
//         detailInfo="Learn more about how we calculated this tax"
//       />
//     </Grid>
//   );
// };

export default BigBannerTitle
