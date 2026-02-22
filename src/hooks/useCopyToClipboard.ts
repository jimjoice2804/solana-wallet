import { useState } from "react";

export const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true);
            setTimeout(() => { setCopied(false) }, 2000)
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to copy")
        }
    }

    return {
        copied,
        error,
        copy
    }
}