type MessageBoxProps = {
    message: string
}

export default function MessageBox({message}: MessageBoxProps) {
    return (
        <div className="text-center p-4">
            <p className="text-red-500 sm:text-sm">
                { message }
            </p>
        </div>
    )
}