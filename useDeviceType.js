import {useEffect, useState} from 'react'

export default function useDeviceType() {
    const [device, setDevice] = useState('')

    useEffect(() => {
        const breakPoints = {
            mobile: 320,
            tablet: 768,
            computer: 992,
            largeMonitor: 1280,
            widescreenMonitor: 1920
        }

        const handleResize = () => {
            const screenWidth = window.innerWidth

            if (screenWidth < breakPoints.tablet) setDevice('mobile')
            else if (screenWidth < breakPoints.computer) setDevice('tablet')
            else if (screenWidth < breakPoints.largeMonitor) setDevice('computer')
            else if (screenWidth < breakPoints.widescreenMonitor) setDevice('largeMonitor')
            else setDevice('widescreenMonitor')
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)

    }, [device])

    return [device]
}