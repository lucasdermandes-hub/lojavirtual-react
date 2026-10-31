
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { Campo } from '../components/atoms/Campo';
import { ResumoCompra } from '../components/organisms/ResumoCompra';

import { useCarrinho } from '../hooks/useCarrinho';
import { usePagamento } from '../hooks/usePagamento';

import {
    esquemaPagamento,
    METODOS_PAGAMENTO,
} from '../utils/esquemaPagamento';

import {
    formatarCep,
    formatarCvv,
    formatarNumeroCartao,
    formatarValidade,
} from '../utils/pagamento';

import { formatarMoeda } from '../utils/moeda';

export function Pagamento() {
    const { itens, quantidadeTotal, valorTotal } = useCarrinho();

    const subtotal = valorTotal;
    const frete = 0;
    const total = subtotal + frete;

    const { processando, processarPagamento } = usePagamento();

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(esquemaPagamento),
        defaultValues: {
            metodoPagamento: 'cartao',
            parcelas: '1',
            complemento: '',
        },
    });

    const metodoPagamento = useWatch({
        control,
        name: 'metodoPagamento',
    });

    const vazio = itens.length === 0;

    if (vazio) {
        return (
            <main className="pagina">
                <h1>Pagamento</h1>

                <section className="carrinho-vazio">
                    <p>Não há itens para pagar.</p>

                    <Link to="/carrinho" className="botao-secundario">
                        Voltar ao carrinho
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="pagina">
            <h1>Checkout</h1>

            <div className="checkout-grade">
                <form
                    className="form-pagamento"
                    onSubmit={handleSubmit(processarPagamento)}
                    noValidate
                >
                    <fieldset className="grupo">
                        <legend>Forma de pagamento</legend>

                        <div className="opcoes-pagamento">
                            {METODOS_PAGAMENTO.map((metodo) => (
                                <label
                                    key={metodo.value}
                                    className={`opcao-pagamento ${
                                        metodoPagamento === metodo.value
                                            ? 'selecionada'
                                            : ''
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        value={metodo.value}
                                        {...register('metodoPagamento', {
                                            onChange: () => clearErrors(),
                                        })}
                                    />

                                    <span>{metodo.label}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {metodoPagamento === 'cartao' && (
                        <fieldset className="grupo">
                            <legend>Dados do cartão</legend>

                            <Campo
                                id="titular"
                                label="Nome do titular do cartão"
                                erro={errors.titular?.message}
                            >
                                <input
                                    id="titular"
                                    type="text"
                                    placeholder="Conforme aparece no cartão"
                                    autoComplete="cc-name"
                                    {...register('titular')}
                                />
                            </Campo>

                            <Campo
                                id="numeroCartao"
                                label="Número do cartão"
                                erro={errors.numeroCartao?.message}
                            >
                                <input
                                    id="numeroCartao"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="1234 5678 9034 2313"
                                    autoComplete="cc-number"
                                    {...register('numeroCartao', {
                                        onChange: (evento) => {
                                            evento.target.value =
                                                formatarNumeroCartao(
                                                    evento.target.value
                                                );
                                        },
                                    })}
                                />
                            </Campo>

                            <div className="linha-tripla">
                                <Campo
                                    id="validade"
                                    label="Validade (MM/AA)"
                                    erro={errors.validade?.message}
                                >
                                    <input
                                        id="validade"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="12/28"
                                        autoComplete="cc-exp"
                                        {...register('validade', {
                                            onChange: (evento) => {
                                                evento.target.value =
                                                    formatarValidade(
                                                        evento.target.value
                                                    );
                                            },
                                        })}
                                    />
                                </Campo>

                                <Campo
                                    id="cvv"
                                    label="CVV"
                                    erro={errors.cvv?.message}
                                >
                                    <input
                                        id="cvv"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="123"
                                        autoComplete="cc-csc"
                                        {...register('cvv', {
                                            onChange: (evento) => {
                                                evento.target.value =
                                                    formatarCvv(
                                                        evento.target.value
                                                    );
                                            },
                                        })}
                                    />
                                </Campo>

                                <Campo
                                    id="parcelas"
                                    label="Parcelas"
                                    erro={errors.parcelas?.message}
                                >
                                    <select
                                        id="parcelas"
                                        {...register('parcelas')}
                                    >
                                        {Array.from(
                                            { length: 12 },
                                            (_, indice) => indice + 1
                                        ).map((parcela) => (
                                            <option
                                                key={parcela}
                                                value={parcela}
                                            >
                                                {parcela}x de{' '}
                                                {formatarMoeda(
                                                    total / parcela
                                                )}
                                            </option>
                                        ))}
                                    </select>
                                </Campo>
                            </div>
                        </fieldset>
                    )}

                    <fieldset className="grupo">
                        <legend>Endereço de entrega</legend>

                        <div className="linha-dupla">
                            <Campo
                                id="cep"
                                label="CEP"
                                erro={errors.cep?.message}
                            >
                                <input
                                    id="cep"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="00000-000"
                                    autoComplete="postal-code"
                                    {...register('cep', {
                                        onChange: (evento) => {
                                            evento.target.value = formatarCep(
                                                evento.target.value
                                            );
                                        },
                                    })}
                                />
                            </Campo>

                            <Campo
                                id="uf"
                                label="UF"
                                erro={errors.uf?.message}
                            >
                                <input
                                    id="uf"
                                    type="text"
                                    maxLength={2}
                                    placeholder="SC"
                                    autoComplete="address-level1"
                                    {...register('uf', {
                                        onChange: (evento) => {
                                            evento.target.value =
                                                evento.target.value.toUpperCase();
                                        },
                                    })}
                                />
                            </Campo>
                        </div>

                        <Campo
                            id="endereco"
                            label="Endereço"
                            erro={errors.endereco?.message}
                        >
                            <input
                                id="endereco"
                                type="text"
                                placeholder="Rua, avenida..."
                                autoComplete="street-address"
                                {...register('endereco')}
                            />
                        </Campo>

                        <div className="linha-dupla">
                            <Campo
                                id="numero"
                                label="Número"
                                erro={errors.numero?.message}
                            >
                                <input
                                    id="numero"
                                    type="text"
                                    placeholder="123"
                                    autoComplete="address-line2"
                                    {...register('numero')}
                                />
                            </Campo>

                            <Campo
                                id="complemento"
                                label="Complemento"
                                erro={errors.complemento?.message}
                            >
                                <input
                                    id="complemento"
                                    type="text"
                                    placeholder="Apto, bloco..."
                                    autoComplete="address-line3"
                                    {...register('complemento')}
                                />
                            </Campo>
                        </div>

                        <div className="linha-dupla">
                            <Campo
                                id="bairro"
                                label="Bairro"
                                erro={errors.bairro?.message}
                            >
                                <input
                                    id="bairro"
                                    type="text"
                                    placeholder="Centro"
                                    autoComplete="address-level3"
                                    {...register('bairro')}
                                />
                            </Campo>

                            <Campo
                                id="cidade"
                                label="Cidade"
                                erro={errors.cidade?.message}
                            >
                                <input
                                    id="cidade"
                                    type="text"
                                    placeholder="Tubarão"
                                    autoComplete="address-level2"
                                    {...register('cidade')}
                                />
                            </Campo>
                        </div>
                    </fieldset>

                    <button
                        type="submit"
                        className="botao-primario"
                        disabled={processando}
                    >
                        {processando
                            ? 'Processando compra...'
                            : `Pagar ${formatarMoeda(total)}`}
                    </button>
                </form>

                <aside className="checkout-lateral">
                    <ResumoCompra
                        subtotal={subtotal}
                        frete={frete}
                        total={total}
                        quantidadeTotal={quantidadeTotal}
                    />

                    <ul className="checkout-itens">
                        {itens.map((item) => (
                            <li key={item.id}>
                                <span>
                                    {item.quantidade}× {item.nome}
                                </span>

                                <span>
                                    {formatarMoeda(
                                        item.preco * item.quantidade
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </main>
    );
}
