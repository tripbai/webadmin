'use client';

type Props = {
    type: 'success' | 'error' | 'warning'
    message: string
}

export default function Alert({type, message}: Props) {
    const colors = new Map<Props['type'], string>([
        ['success', 'text-green-500'],
        ['warning', 'text-yellow-500'],
        ['error', 'text-red-500']
    ])
    return (
        <div className="text-center p-4">
            <p className={`${colors.get(type)} text-sm`}>
                { message }
            </p>
        </div>
    )
}