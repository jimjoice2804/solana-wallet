export const encryptPrivateKey = async (privateKey: Uint8Array, password: string): Promise<string> => {
    const enc = new TextEncoder();
    const encodePassword = enc.encode(password);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const KeyData = new Uint8Array(privateKey)

    const baseKey = await crypto.subtle.importKey(
        "raw", encodePassword, "PBKDF2", false, ["deriveKey"]
    )

    const aesKey = await crypto.subtle.deriveKey({
        name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256"
    },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
    )

    const ciphertext = await crypto.subtle.encrypt({
        name: "AES-GCM", iv
    },
        aesKey,
        KeyData)

    const combine = new Uint8Array([...salt, ...iv, ...new Uint8Array(ciphertext)]);

    return btoa(String.fromCharCode(...combine))
}

export const decryptPrivateKey = async (encrypted: string, password: string): Promise<Uint8Array> => {
    const enc = new TextEncoder();
    const encPassword = enc.encode(password)
    const decodedString = atob(encrypted);
    const bytes = new Uint8Array(decodedString.length)
    for (let i = 0; i < decodedString.length; i++) {
        bytes[i] = decodedString.charCodeAt(i)
    }
    const salt = bytes.slice(0, 16);
    const iv = bytes.slice(16, 28);
    const ciphertext = bytes.slice(28)

    const baseKey = await crypto.subtle.importKey(
        "raw", encPassword, "PBKDF2", false, ["deriveKey"]
    )

    const aesKey = await crypto.subtle.deriveKey({
        name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256"
    },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    )

    const decrypted = await crypto.subtle.decrypt({
        name: "AES-GCM", iv
    },
        aesKey,
        ciphertext
    )

    return new Uint8Array(decrypted);
}