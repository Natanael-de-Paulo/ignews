import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeBtn } from '../components/SubscribeBtn'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'


// Client-side
// Server-side render
// Static Side Generation

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product} : HomeProps) {
  
  return (
      <>
        <Head>
          <title>Home | ig.news</title>
        </Head>

        <main className={styles.contentContainer}>
          <section className={styles.hero}>
            <span>👏 Hey, Welcome</span>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get access to all the publocations 
              <br />
              <span>for {product.amount} month </span>
            </p>
            <SubscribeBtn priceId={product.priceId}/>
          </section>
          <img src="\images\avatar.svg" alt="Girl coding" />
        </main>
      </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KRdsOEVuYTaV9fD3X2q0dFr')
  
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props : {
      product,
    }, 
    revalidate: 60 * 60 * 24, // 24 horas
  }
}