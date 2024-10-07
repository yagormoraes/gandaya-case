

export default function Wallet() {
    return (
        <div className="bg-primary w-auto h-screen flex flex-col justify-between">
            <div>
                <div className="flex items-center h-28 justify-end text-white font-inter text-2xl pr-6 font-bold" >Carteira</div>

                <div className="bg-slate-400 flex items-center justify-between mx-3">
                    <div>
                        <div>Saldo disponível</div>
                        <div className="text-3xl">R$ 00,00</div>
                    </div>
                    <div>
                        <button onClick={() => alert("botao para ver saldo")} >Botao</button>
                    </div>

                </div>

                <div className="bg-slate-400 mt-5 flex flex-col items-start mx-3">
                    <div className="pb-1">
                        Histórico de pedidos
                    </div>
                    <div>
                        <div>Pedido1</div>
                    </div>
                    <div>
                        <div>Pedido2</div>
                    </div>

                </div>
            </div>


            <div className="bg-slate-400 mb-5 flex items-center justify-between mx-3">
                <button onClick={() => alert("botao para comprar produtos")}>
                    Comprar produtos
                </button>
                <button onClick={() => alert("botao para recarregar saldo")}>
                    Recarregar saldo
                </button>
            </div>
        </div>
    )
}