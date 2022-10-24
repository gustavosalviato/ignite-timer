import { useContext } from "react"
import { CycleContext } from '../../context/CycleContext'
import { HistoryContainer, HistoryList, Status } from "./styles"
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
export const History = () => {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>

      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}a</td>
                <td>{cycle.minutesAmount}</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, { addSuffix: true, locale: ptBR },)}
                </td>
                <td>
                  {cycle.interruptDate && <Status statusColor="red">Interrompido</Status>}

                  {cycle.finishedDate && <Status statusColor="green">Concluído</Status>}

                  {!cycle.finishedDate && !cycle.interruptDate && <Status statusColor="yellow">Em Andamento</Status>}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
