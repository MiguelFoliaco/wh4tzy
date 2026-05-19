'use server'
import crypto from "node:crypto"

const ALGORITHM = "aes-256-gcm"

const SECRET_KEY = crypto
    .createHash("sha256")
    .update(process.env.TOKEN_SECRET!)
    .digest()

export async function encrypt(text: string) {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(
        ALGORITHM,
        SECRET_KEY,
        iv
    )

    const encrypted = Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ])

    const authTag = cipher.getAuthTag()

    return Buffer.concat([
        iv,
        authTag,
        encrypted,
    ]).toString("base64")
}

export async function decrypt(encryptedText: string) {
    const buffer = Buffer.from(encryptedText, "base64")

    const iv = buffer.subarray(0, 16)
    const authTag = buffer.subarray(16, 32)
    const encrypted = buffer.subarray(32)

    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        SECRET_KEY,
        iv
    )

    decipher.setAuthTag(authTag)

    const decrypted = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
    ])

    return decrypted.toString("utf8")
}