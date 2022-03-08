// function sendOrderConfirmation(items) {


//     const itemsContent = getItemsDetails(items);

//     transport.sendMail({
//         from: process.env.MAIL_FROM,
//         to: "darshani@gapstars.net",
//         subject: "Test Email",
//         html: `<div className = "email" style="
//                 border:1px soild black;
//                 padding:20px;
//                 font-family:sans-serif;
//                 line-height:2;
//                 font-size:20px;">

//                 <h2>Order Summary</h2>
//                 <p>Total Amount: ${totalAmount}</p>
//                 ${itemsContent}
    
//                 <p><i>Thank you for your order!!!</i></p>
//                 </div>`
//     })
// }

// /**
//  * 
//  */
// function getItemsDetails(items) {
//     // for loop
//     let finalContent = '';
//     items.forEach(item => {
//         finalContent += `
//             <p>Item ID: ${item.productId} Item payablePrice: ${item.payablePrice} Item purchasedQty: ${item.purchasedQty}</p>
//         `;
//     });
//     // whatever iteration logic
//     return finalContent;
// }

// // const test = getItemsDetails([{ name: 'shirt', price: 111 }, { name: 'foo', price: 100 }]);
// // console.log(test);