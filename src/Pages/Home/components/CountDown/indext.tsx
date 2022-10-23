import { differenceInSeconds } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { CyclesContext } from "../.."
import { CountDownContainer, Separator } from "./styles"

export const CountDown = () => {
    const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

    const { activeCycle, activeCycleId, markCurrentCycleAsFinished } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - secondsAmountPassed : 0

    const minutesAmount = Math.floor(totalSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(() => {
        let interval: number

        if (activeCycle) {
            setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if (secondsDifference >= totalSeconds) {
                    markCurrentCycleAsFinished()

                    setSecondsAmountPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setSecondsAmountPassed(secondsDifference)
                }
            }, 1000)

        }


        return () => clearInterval(interval)
    }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

    useEffect(() => {
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [activeCycle, minutes, seconds])



    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}