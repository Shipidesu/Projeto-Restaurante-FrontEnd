import Head from 'next/head'
import styles from './styles.module.scss'
import Modal from 'react-modal'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { Header } from '../../components/Header'
import { FiRefreshCw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'
import { useState } from 'react'


type OrderProps = {
  id: string
  table: string | number
  status: boolean
  draft: boolean
  name: string | null
}

interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps){

  const [orderList, setOrderList] = useState( orders || [])

  function handleOpenModalView(){
    alert("TESTE")
  }
    return(
      <>
      <Head>
        <title> Painel </title>
      </Head>
      <div>
        <Header/>
        
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1> Pedidos </h1>
            <button> 
              <FiRefreshCw size={25} color='#3fffa3'/>
            </button>
          </div>

          <article className={styles.containerArticle}>
            {orderList.map( item => (
              <section key={item.id} className={styles.containerSection}>
                <button onClick={ () => handleOpenModalView()}>
                  <div className={styles.tag}> </div>
                  <span> Mesa {item.table} </span>
                </button>              
              </section>
            ))}

          </article>
        </main>
      </div>
      </>
    )
  }

  export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
  
    const response = await apiClient.get('/orders');
  
    return {
      props: {
        orders: response.data
      }
    }
  })