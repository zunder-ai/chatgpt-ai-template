import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { useRuntimeConfig } from '#imports'

const simulatedRoutes = ['/api/chat']

export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    const url = getRequestURL(event)


    if (config.useSimulatedChat && simulatedRoutes.includes(url.pathname)) {
        const parts = url.pathname.split('/')
        const routeName = parts.pop() // Remove the last part (route name)
        parts.push('test') // Add 'test' directory
        parts.push(`${routeName}-test`) // Add route name with '-test' suffix
        const redirectPath = parts.join('/')

        // Check if we're already on the redirected path
        if (url.pathname !== redirectPath) {
            return sendRedirect(event, redirectPath, 307)
        }
    }
})