import {GoogleGenerativeAI} from "@google/generative-ai";


const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const FALLBACK_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
];

async function fileToGenerativePart(file) {
    const based64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inline_data: {data:await based64EncodedDataPromise, mime_type: file.type},
    };
}

function isRetryableError(error) {
    const msg = error.message || "";
    return (
        msg.includes("503") ||
        msg.includes("high demand") ||
        msg.includes("overloaded") ||
        msg.includes("429") ||
        msg.includes("quota")
    );
}

export async function generativeContentStream(prompt, imageFile){
    if(!prompt && !imageFile){
        throw new Error("Mohon berikan prompt atau gambar.");
    }
    const parts = [];
    if (imageFile) {
        const imagePart = await fileToGenerativePart(imageFile);
        parts.push(imagePart);
    }
    if (prompt) {
        parts.push({text:prompt});
    }
    const contents = [{role: 'user', parts}];

    let lastError;
    for (const modelName of FALLBACK_MODELS) {
        try {
            console.log(`[Gemini] Mencoba model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContentStream({contents});
            return result;
        } catch (error) {
            lastError = error;
            if (isRetryableError(error)) {
                console.warn(`[Gemini] Model "${modelName}" tidak tersedia, pindah ke model berikutnya...`);
                continue;
            }
            throw error;
        }
    }
    
    throw new Error(`Semua model tidak tersedia saat ini. Coba lagi beberapa saat. (${lastError?.message})`);
}
