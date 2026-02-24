export interface ImportFieldProps {
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
    value: string,
    style: string
    type?: string
}