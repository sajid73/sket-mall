import { getSession, useSession } from "next-auth/client";
import db from "../../firebase";
import Header from "../Components/Header";
import moment from "moment";
import Order from "../Components/Order";

function Orders({ orders }) {
  const [session] = useSession();
  return (
    <div>
       
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-black">
          Your Orders
        </h1>

        {session ? <h2>Orders</h2> : <h2>Please Sign in to see your orders</h2>}
        <div className="mt-5 space-y-4">
            {orders?.map(({ id, amount, amountShipping, items, timestamp, images}) => (
                <Order
                    key={id}
                    id={id}
                    amount={amountShipping}
                    amountShipping={amountShipping}
                    items={items}
                    timestamp={timestamp}
                    images={images}
                />
            ))}
        </div>
      </main>
    </div>
  );
}

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    };
  }

  //Firebase DataBase

  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();


// //Stripe Orders 
    const orders = await Promise.all(
        stripeOrders.docs.map(async(order)=> ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listItems(order.id,{
                    limit: 100
                })
            ).data,
        }))
    )
        return {
            props:{
                orders,
            }
        }
}
