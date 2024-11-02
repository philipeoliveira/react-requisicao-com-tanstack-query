import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function LastDraw() {
   const [ascOrder, setAscOrder] = useState(false);

   function toggleOrder() {
      ascOrder ? setAscOrder(false) : setAscOrder(true);
   }

   const { data, isLoading, isError, error } = useQuery({
      queryKey: ['lotofacil-draw-results'],
      queryFn: async () => {
         const response = await axios.get(
            'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/'
         );
         return response.data;
      },
   });

   return (
      <div>
         <main>
            <h1>Sorteio mais recente da Lotofácil</h1>
            {isLoading ? (
               <p>Carregando...</p>
            ) : isError ? (
               <div>
                  <p>{error.message}</p>
                  <p>Não foi possível conectar-se à API da Loterias Caixa.</p>
               </div>
            ) : (
               data && (
                  <div key={data.numero}>
                     <p>Data do sorteio: {data.dataApuracao}</p>
                     <div>
                        <p>
                           Concurso: <b>{data.numero}</b>
                        </p>
                        <h2>
                           {ascOrder
                              ? data.listaDezenas.join('-')
                              : data.dezenasSorteadasOrdemSorteio.join('-')}
                        </h2>
                        <p>
                           <button onClick={toggleOrder}>
                              {ascOrder ? 'Ordem de sorteio' : 'Ordem crescente'}
                           </button>
                        </p>
                     </div>
                  </div>
               )
            )}
         </main>
         <footer>
            <p>
               Desenvolvido por{' '}
               <a
                  href='https://github.com/philipeoliveira'
                  title='Abrir em nova aba o GitHub do autor Philipe Oliveira'
                  target='_blank'
               >
                  Philipe Oliveira
               </a>
            </p>
         </footer>
      </div>
   );
}
