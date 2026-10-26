import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';

export function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <footer className="rodape">
                <p>Loja React — projeto de estudo com carrinho e checkout.</p>
            </footer>
        </>
    );
}
