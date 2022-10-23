import { FormContainer, MinutesAmoutInput, TaskInput } from "./styles"

export const NewCycleForm = () => {
    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                type="text"
                placeholder="Dê um nome para seu projeto"
                {...register('task')}
                // disabled={hasCycleActived}
            />

            <label htmlFor="task">durante</label>
            <MinutesAmoutInput
                type="number"
                min={1}
                max={60}
                placeholder="00"
                {...register('minutesAmount', { valueAsNumber: true })}
                // disabled={hasCycleActived}
            />

            <span>Minutos</span>
        </FormContainer>

    )
}