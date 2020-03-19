import {useEffect, useState} from 'react'
import axios from 'axios'

function useFetch(config) {
    const [isLoading, setIsLoading] = useState(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [previousConfig, setPreviousConfig] = useState()

    useEffect(() => {
        let mounted = true

        // React considers config object as a new object on every render which causes infinite loads,
        // so need to instead check if object values have changes
        if (JSON.stringify(config) !== JSON.stringify(previousConfig)) {
            setPreviousConfig(config)

            const fetchData = async () => {
                const defaultConfig = {
                    method: 'get',
                    url: '',
                    params: {}
                }

                try {
                    setIsLoading(true)
                    setError(null)
                    if (mounted) {
                        const response = await axios({...defaultConfig, ...config})
                        setError(null)
                        setIsLoading(false)
                        setResponse(response)
                    }
                } catch (error) {
                    setError(error)
                    setIsLoading(false)
                }
            }
            fetchData()
        }

        return () => { mounted = false }

    }, [config, previousConfig])

    return {response, error, isLoading}
}

export default useFetch