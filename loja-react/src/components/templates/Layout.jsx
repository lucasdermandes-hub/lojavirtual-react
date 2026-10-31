import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';

export function Layout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <footer className="rodape">
        <p>
          Brivio - Loja Virtual | Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
