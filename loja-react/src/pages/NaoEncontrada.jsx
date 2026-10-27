import { Link } from 'react-router-dom';

export function NaoEncontrada() {
    return (
        <main className='menssagem de erro'>
            <h1>404- Página não Encontrada</h1>
            <p> A página que você está procurando não existe ou foi removida</p>

            <div className='acoes'>
                <Link to="/produtos" className= "botao-primario">
                Voltar
                </Link>
            </div>
        </main>
    );
}