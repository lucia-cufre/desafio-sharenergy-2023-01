import { Button } from '@mui/material'
import { ReactElement } from 'react'

interface BotãoProps {
    children: ReactElement | string,
    onClick:any
}

const Botão = (props: BotãoProps) => {
    return (<Button
        onClick = {props.onClick}
    >
        {props.children}
    </Button>)
}

export default Botão