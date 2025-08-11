import React from "react";
import Layout from "../components/Layout";
import Breadcumbs from "../components/breadcumbs/Breadcumbs";

const page = () => {
  return (
    <Layout>
      <Breadcumbs title="Shipping Return" pageUrl="shipping-return" />
      <section className="mt-4">
        <div className="p-tb-60">
          <div className="col-10 m-auto">
            <div className="title">
              <h1>Shipping & Returns</h1>
            </div>
            <div className="content">
                <p>
                    To edit this page, log in to your control panel and go to Storefront › Web Pages. Click Edit next to the Shipping & Returns page and you can change this text. A sample returns policy is shown below which you can edit as needed.
                </p>
                <h2>Returns Policy</h2>
                <p>You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.).</p>
                <p>You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).</p>
                <p>If you need to return an item, please Contact Us with your order number and details about the product you would like to return. We will respond quickly with instructions for how to return items from your order.</p>
                <h2>Shipping</h2>
                <p>We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations.</p>
                <p>When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose, shipping date estimates may appear on the shipping quotes page.</p>
                <p>Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default page;
