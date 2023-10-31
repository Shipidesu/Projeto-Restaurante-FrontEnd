
import styles from './styles.module.scss'

import { Header } from "../../components/Header"
import { useState, FormEvent } from "react"
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"
import { canSSRAuth } from "../../utils/canSSRAuth"

export default function Categoria(){

    const [name, setName] = useState('')

    async function handleRegister(event:FormEvent) {
        event.preventDefault();
        if(name == ''){
            toast.warn('Preencha todos os dados')
            return 
        }
        const apiClient =  setupAPIClient()
        await apiClient.post('/category', { name: name})

        toast.success('Categoria cadastrada com sucesso')
        setName('')
    } 

    return(
        <>
        <div>
            <Header/>
            <main className={styles.container}  onSubmit={handleRegister}>
                <h1> Cadastrar categorias de comida</h1>

                <form className={styles.form}>
                    <input type="text" placeholder="Digite o nome da categoria" className={styles.input} value={name} onChange={ (e) => setName(e.target.value) }/>
                    <button className={styles.buttonAdd} type="submit">
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {
            
        }
    }
})