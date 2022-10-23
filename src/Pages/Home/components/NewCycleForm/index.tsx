import { FormContainer, MinutesAmoutInput, TaskInput } from "./styles"
import { useFormContext } from 'react-hook-form'
import { useContext } from "react"
import { CycleContext } from "../../../../context/CycleContext"

export const NewCycleForm = () => {

    const { activeCycle } = useContext(CycleContext)

    const { register } = useFormContext()

    const hasCycleActived = !!activeCycle

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                placeholder="Dê um nome para seu projeto"
                {...register('task')}
                disabled={hasCycleActived}
            />

            <label htmlFor="task">durante</label>
            <MinutesAmoutInput
                type="number"
                min={1}
                max={60}
                placeholder="00"
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={hasCycleActived}
            />

            <span>Minutos</span>
        </FormContainer>

    )
}